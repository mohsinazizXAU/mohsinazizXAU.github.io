import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroCanvas3DProps {
  baseImage?: string;
  revealImage?: string;
  depthMap?: string;
  revealDepthMap?: string;
  className?: string;
  isMobileInline?: boolean;
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({
  baseImage = '/assets/before-hover-nobg.png',
  revealImage = '/assets/after-hover-nobg.png',
  depthMap = '/assets/before-depth.png',
  revealDepthMap = '/assets/after-depth.png',
  className = '',
  isMobileInline = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isDisposed = false;
    let animId = 0;

    // ── 1. Renderer Setup ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── 2. Scene & Camera ──────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 2.8;

    // ── 3. Texture Loading ─────────────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= 3 && !isDisposed) {
        setIsLoaded(true);
      }
    };

    const loadTex = (url: string, isSRGB = true) => {
      const tex = textureLoader.load(
        url,
        () => checkLoaded(),
        undefined,
        (err) => console.warn('[HeroCanvas3D] Failed loading texture:', url, err)
      );
      if (isSRGB) {
        tex.colorSpace = THREE.SRGBColorSpace;
      }
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    };

    const baseTex = loadTex(baseImage, true);
    const revealTex = loadTex(revealImage, true);
    const depthTex = loadTex(depthMap, false);
    const revealDepthTex = loadTex(revealDepthMap, false);

    // ── 4. Shaders & Material ──────────────────────────────────────────────
    const uniforms = {
      uBase: { value: baseTex },
      uReveal: { value: revealTex },
      uDepth: { value: depthTex },
      uRevealDepth: { value: revealDepthTex },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uCursorUv: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0.0 },
      uTime: { value: 0.0 },
      uParallax: { value: isMobileInline ? 0.035 : 0.055 },
      uDepthIntensity: { value: isMobileInline ? 0.12 : 0.22 },
    };

    const vertexShader = `
      uniform sampler2D uDepth;
      uniform float uDepthIntensity;
      varying vec2 vUv;
      varying vec3 vPos;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        float d = texture2D(uDepth, uv).r;
        vec3 displaced = position;
        displaced.z += (d - 0.5) * uDepthIntensity;
        vPos = displaced;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform sampler2D uBase;
      uniform sampler2D uReveal;
      uniform sampler2D uDepth;
      uniform sampler2D uRevealDepth;
      uniform vec2 uMouse;
      uniform vec2 uCursorUv;
      uniform float uHover;
      uniform float uTime;
      uniform float uParallax;

      varying vec2 vUv;
      varying vec3 vPos;
      varying vec3 vNormal;

      void main() {
        // 1. Initial depth sample
        float rawDepth = texture2D(uDepth, vUv).r;

        // 2. Depth Parallax Ray Offset
        vec2 parallaxOffset = uMouse * (rawDepth - 0.5) * uParallax;
        vec2 uv = clamp(vUv + parallaxOffset, 0.001, 0.999);

        // 3. Texture Sampling with displaced UV
        vec4 baseCol = texture2D(uBase, uv);
        vec4 revealCol = texture2D(uReveal, uv);
        float d = texture2D(uDepth, uv).r;

        // Alpha discard for transparent background
        if (baseCol.a < 0.01 && revealCol.a < 0.01) {
          discard;
        }

        // 4. Normal estimation from depth gradient for 3D Specular highlight
        float delta = 0.003;
        float dR = texture2D(uDepth, uv + vec2(delta, 0.0)).r;
        float dL = texture2D(uDepth, uv - vec2(delta, 0.0)).r;
        float dU = texture2D(uDepth, uv + vec2(0.0, delta)).r;
        float dD = texture2D(uDepth, uv - vec2(0.0, delta)).r;

        vec3 norm = normalize(vec3(-(dR - dL) * 3.5, -(dU - dD) * 3.5, 1.0));
        vec3 lightDir = normalize(vec3(uMouse.x * 2.0, uMouse.y * 2.0, 1.4));
        float spec = pow(max(dot(norm, lightDir), 0.0), 16.0) * 0.35;

        // 5. Interactive Reveal Mask (Cursor-centered cyber pulse)
        float distToCursor = distance(uv, uCursorUv);
        float maskRadius = 0.35;
        float revealMask = smoothstep(maskRadius, maskRadius - 0.16, distToCursor) * uHover;

        // Dynamic Holographic Ring boundary
        float ringDist = abs(distToCursor - maskRadius + 0.03);
        float cyberRing = smoothstep(0.022, 0.0, ringDist) * uHover;

        // 6. Composite
        vec4 col = mix(baseCol, revealCol, revealMask);

        // Add specular sheen (cyber cyan-white light)
        vec3 specTint = mix(vec3(1.0), vec3(0.25, 0.75, 1.0), 0.45);
        col.rgb += spec * specTint * col.a;

        // Add cyber holographic boundary ring
        col.rgb += cyberRing * vec3(0.0, 0.85, 1.0) * col.a;

        // Subtle high-tech scanline sweep
        float scanline = sin((vUv.y * 220.0) + (uTime * 3.5)) * 0.015;
        col.rgb += scanline * col.a;

        gl_FragColor = col;
      }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // ── 5. Avatar Mesh with 3D Grid Resolution ─────────────────────────────
    const planeGeo = new THREE.PlaneGeometry(1, 1, 96, 96);
    const avatarMesh = new THREE.Mesh(planeGeo, shaderMaterial);
    scene.add(avatarMesh);

    // ── 6. 3D Cyber Dust Particle System ───────────────────────────────────
    const particleCount = isMobileInline ? 60 : 130;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 3.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.0;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.0;

      particleSpeeds[i * 3 + 0] = (Math.random() - 0.5) * 0.002;
      particleSpeeds[i * 3 + 1] = 0.001 + Math.random() * 0.002;
      particleSpeeds[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle sprite texture (circular soft glow)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(56, 189, 248, 1)');
      grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.6)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      map: pTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── 7. Soft Ambient Backlight Halo ─────────────────────────────────────
    const haloGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = haloCanvas.height = 128;
    const hCtx = haloCanvas.getContext('2d');
    if (hCtx) {
      const hGrad = hCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      hGrad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
      hGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.08)');
      hGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      hCtx.fillStyle = hGrad;
      hCtx.fillRect(0, 0, 128, 128);
    }
    const haloTex = new THREE.CanvasTexture(haloCanvas);
    const haloMat = new THREE.MeshBasicMaterial({
      map: haloTex,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.z = -0.3;
    scene.add(haloMesh);

    // ── 8. Responsive Sizing & Frustum Math ─────────────────────────────────
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width > 10 ? rect.width : window.innerWidth;
      const height = rect.height > 10 ? rect.height : window.innerHeight;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Compute visible plane dimensions at z=0
      const vFovRad = (camera.fov * Math.PI) / 180;
      const frustumH = 2 * Math.tan(vFovRad / 2) * camera.position.z;
      const frustumW = frustumH * camera.aspect;

      // Image texture is 1:1 square. Size mesh to fit prominently
      // In Surge, the portrait occupies ~90% of hero height and is centered at the bottom
      let meshH = frustumH * (isMobileInline ? 0.95 : 0.90);
      let meshW = meshH; // Maintain 1:1 square aspect ratio!

      // If screen is narrow (e.g. mobile or small window), ensure width doesn't exceed frustum width
      if (meshW > frustumW * 0.95 && !isMobileInline) {
        meshW = frustumW * 0.95;
        meshH = meshW;
      }

      avatarMesh.scale.set(meshW, meshH, 1);

      // Anchor portrait to bottom center (Surge alignment)
      // When anchored at bottom, the bottom of the plane touches bottom edge of frustum:
      const bottomY = -frustumH / 2 + meshH / 2;
      avatarMesh.position.set(0, bottomY, 0);

      // Position halo behind portrait head/torso
      haloMesh.position.set(0, bottomY + meshH * 0.25, -0.3);
      haloMesh.scale.set(meshW * 1.3, meshW * 1.3, 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ── 9. Mouse / Touch Pointer Tracking ──────────────────────────────────
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      cursorUvX: 0.5,
      cursorUvY: 0.5,
      targetHover: 0,
      currentHover: 0,
      lastActive: performance.now(),
    };

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      // Normalized coordinates [-1, 1] relative to container center
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);

      mouse.targetX = Math.max(-1, Math.min(1, nx));
      mouse.targetY = Math.max(-1, Math.min(1, ny));

      // UV coordinates for the reveal mask [0, 1]
      // Project pointer into the avatar mesh's local UV space
      const uvX = (clientX - rect.left) / rect.width;
      const uvY = 1.0 - (clientY - rect.top) / rect.height;
      mouse.cursorUvX = Math.max(0, Math.min(1, uvX));
      mouse.cursorUvY = Math.max(0, Math.min(1, uvY));

      mouse.targetHover = 1.0;
      mouse.lastActive = performance.now();
    };

    const handlePointerMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handlePointerLeave = () => {
      mouse.targetHover = 0.0;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // ── 10. Animation Loop ─────────────────────────────────────────────────
    let clock = 0;
    const maxRotY = isMobileInline ? 0.12 : 0.22; // ~12 degrees max tilt
    const maxRotX = isMobileInline ? 0.08 : 0.14;

    const animate = () => {
      if (isDisposed) return;
      animId = requestAnimationFrame(animate);
      clock += 0.016;

      // Idle check (floating cyber breath when idle)
      const isIdle = performance.now() - mouse.lastActive > 2000;
      let targetX = mouse.targetX;
      let targetY = mouse.targetY;

      if (isIdle) {
        targetX = Math.sin(clock * 0.7) * 0.25;
        targetY = Math.cos(clock * 0.9) * 0.18;
      }

      // Smooth inertia interpolation (lerp)
      const lerpFactor = isIdle ? 0.03 : 0.065;
      mouse.currentX += (targetX - mouse.currentX) * lerpFactor;
      mouse.currentY += (targetY - mouse.currentY) * lerpFactor;
      mouse.currentHover += (mouse.targetHover - mouse.currentHover) * 0.06;

      // Update shader uniforms
      uniforms.uMouse.value.set(mouse.currentX, mouse.currentY);
      uniforms.uCursorUv.value.set(mouse.cursorUvX, mouse.cursorUvY);
      uniforms.uHover.value = mouse.currentHover;
      uniforms.uTime.value = clock;

      // Physical 3D Euler Mesh Rotation (authentic depth perspective)
      avatarMesh.rotation.y = mouse.currentX * maxRotY;
      avatarMesh.rotation.x = -mouse.currentY * maxRotX;

      // Parallax camera displacement for heightened 3D immersion
      camera.position.x = mouse.currentX * 0.12;
      camera.position.y = mouse.currentY * 0.08;
      camera.lookAt(0, avatarMesh.position.y * 0.6, 0);

      // Animate floating dust particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += particleSpeeds[i * 3 + 1];
        posArray[i * 3 + 0] += particleSpeeds[i * 3 + 0] + mouse.currentX * 0.001;

        // Reset particles that drift too high
        if (posArray[i * 3 + 1] > 2.0) {
          posArray[i * 3 + 1] = -1.8;
          posArray[i * 3 + 0] = (Math.random() - 0.5) * 3.5;
        }
      }
      posAttr.needsUpdate = true;
      particles.rotation.y = clock * 0.03 + mouse.currentX * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('pointerleave', handlePointerLeave);

      planeGeo.dispose();
      shaderMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      pTexture.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      haloTex.dispose();
      baseTex.dispose();
      revealTex.dispose();
      depthTex.dispose();
      revealDepthTex.dispose();
      renderer.dispose();
    };
  }, [baseImage, revealImage, depthMap, revealDepthMap, isMobileInline]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        position: isMobileInline ? 'relative' : 'absolute',
        inset: isMobileInline ? undefined : 0,
        width: '100%',
        height: '100%',
        touchAction: 'pan-y',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ pointerEvents: 'none' }}
      />
      {/* 3D Indicator Badge for Future-Forward Cyber aesthetic */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-700 opacity-70 hover:opacity-100 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/15 text-[10px] tracking-[0.2em] font-mono uppercase text-black shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
        <span>3D DEPTH AVATAR // HOVER TO REVEAL</span>
      </div>
    </div>
  );
};
