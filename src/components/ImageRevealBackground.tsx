import React, { useEffect, useRef, useState } from 'react';

interface ImageRevealBackgroundProps {
  baseImage?: string;
  revealImage?: string;
  className?: string;
  isMobileInline?: boolean;
}

export const ImageRevealBackground: React.FC<ImageRevealBackgroundProps> = ({
  baseImage = '/assets/before-hover.webp',
  revealImage = '/assets/after-hover-no-glasses.webp',
  className = '',
  isMobileInline = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const gridLayerRef = useRef<HTMLDivElement>(null);

  // Positions relative to container
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });

  // Interaction & Smooth Opacity Tracking
  const isInteractedRef = useRef(false);
  const opacityRef = useRef(0);
  const targetOpacityRef = useRef(0);

  const [cellSize, setCellSize] = useState(48);
  const [isRevealMounted, setIsRevealMounted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mq = window.matchMedia('(min-width: 1024px)');
    let isActiveViewport = isMobileInline ? !mq.matches : mq.matches;
    let isVisible = true;
    let animationFrameId: number | null = null;
    let listenersAttached = false;
    let idleTimerId: ReturnType<typeof setTimeout> | number | null = null;
    let usedIdleCallback = false;

    const initCenter = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      mouseRef.current = { x: w / 2, y: h / 2 };
      smoothRef.current = { x: w / 2, y: h / 2 };
      const calculatedCell = Math.round(Math.min(64, Math.max(28, w * 0.035)));
      setCellSize(calculatedCell);
    };

    const stopLoop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const render = () => {
      animationFrameId = null;
      if (!isActiveViewport || !isVisible) return;

      const mouse = mouseRef.current;
      const smooth = smoothRef.current;

      const dx = mouse.x - smooth.x;
      const dy = mouse.y - smooth.y;
      smooth.x += dx * 0.15;
      smooth.y += dy * 0.15;

      const dOpacity = targetOpacityRef.current - opacityRef.current;
      opacityRef.current += dOpacity * 0.08;

      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      const radius = Math.round(Math.min(440, Math.max(120, w * (isMobileInline ? 0.45 : 0.17))));

      // Hardware-accelerated CSS radial mask on reveal layer
      if (revealLayerRef.current) {
        if (opacityRef.current <= 0.005) {
          revealLayerRef.current.style.opacity = '0';
        } else {
          revealLayerRef.current.style.opacity = opacityRef.current.toFixed(3);
          const maskGradient = `radial-gradient(circle ${radius}px at ${smooth.x.toFixed(1)}px ${smooth.y.toFixed(1)}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.80) 65%, rgba(0,0,0,0.45) 82%, rgba(0,0,0,0.15) 92%, transparent 100%)`;
          revealLayerRef.current.style.webkitMaskImage = maskGradient;
          revealLayerRef.current.style.maskImage = maskGradient;
        }
      }

      // GPU-composited grid parallax (0 SVG layout mutations)
      const normX = smooth.x / w - 0.5;
      const normY = smooth.y / h - 0.5;
      const targetOffsetX = normX * 16;
      const targetOffsetY = normY * 16;

      const pdx = targetOffsetX - parallaxRef.current.x;
      const pdy = targetOffsetY - parallaxRef.current.y;
      parallaxRef.current.x += pdx * 0.06;
      parallaxRef.current.y += pdy * 0.06;

      if (gridLayerRef.current) {
        gridLayerRef.current.style.transform = `translate3d(${parallaxRef.current.x.toFixed(2)}px, ${parallaxRef.current.y.toFixed(2)}px, 0)`;
      }

      // Auto-sleep rAF loop as soon as all animations settle (0% idle CPU/GPU)
      const isMoving =
        Math.abs(dx) > 0.05 ||
        Math.abs(dy) > 0.05 ||
        Math.abs(dOpacity) > 0.002 ||
        Math.abs(pdx) > 0.05 ||
        Math.abs(pdy) > 0.05;

      if (isMoving) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const scheduleRender = () => {
      if (animationFrameId === null && isActiveViewport && isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const updatePosition = (clientX: number, clientY: number) => {
      if (!isActiveViewport) return;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      mouseRef.current = { x, y };

      if (!isInteractedRef.current) {
        isInteractedRef.current = true;
        smoothRef.current = { x, y };
        setIsRevealMounted(true);
      }
      targetOpacityRef.current = 1;
      scheduleRender();
    };

    const handleLeave = () => {
      targetOpacityRef.current = 0;
      scheduleRender();
    };

    const handlePointer = (e: PointerEvent) => updatePosition(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const attachListeners = () => {
      if (listenersAttached) return;
      listenersAttached = true;
      initCenter();
      window.addEventListener('resize', initCenter, { passive: true });
      window.addEventListener('pointermove', handlePointer, { passive: true });
      window.addEventListener('pointerdown', handlePointer, { passive: true });
      window.addEventListener('touchmove', handleTouch, { passive: true });
      window.addEventListener('touchstart', handleTouch, { passive: true });
      window.addEventListener('pointerleave', handleLeave, { passive: true });
      document.body.addEventListener('mouseleave', handleLeave, { passive: true });
    };

    const detachListeners = () => {
      if (!listenersAttached) return;
      listenersAttached = false;
      stopLoop();
      window.removeEventListener('resize', initCenter);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('pointerleave', handleLeave);
      document.body.removeEventListener('mouseleave', handleLeave);
    };

    const onViewportChange = () => {
      isActiveViewport = isMobileInline ? !mq.matches : mq.matches;
      if (isActiveViewport) {
        attachListeners();
      } else {
        detachListeners();
      }
    };

    if (isActiveViewport) {
      attachListeners();
      // Pre-mount reveal image lazily on idle so first hover is instant without blocking LCP
      if (typeof window.requestIdleCallback === 'function') {
        usedIdleCallback = true;
        idleTimerId = window.requestIdleCallback(() => setIsRevealMounted(true), { timeout: 2000 });
      } else {
        idleTimerId = setTimeout(() => setIsRevealMounted(true), 1200);
      }
    }

    mq.addEventListener('change', onViewportChange);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (!isVisible) {
          stopLoop();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    return () => {
      mq.removeEventListener('change', onViewportChange);
      observer.disconnect();
      detachListeners();
      if (idleTimerId !== null) {
        if (usedIdleCallback && typeof window.cancelIdleCallback === 'function') {
          window.cancelIdleCallback(idleTimerId as number);
        } else {
          clearTimeout(idleTimerId);
        }
      }
    };
  }, [isMobileInline]);

  const portraitStyle: React.CSSProperties = isMobileInline
    ? {
        width: '158%',
        height: 'auto',
        top: 'calc((100% - 158cqw) * 0.15)',
      }
    : {
        width: 'clamp(740px, 65vw, 1160px)',
        height: 'auto',
        top: '-60px',
      };

  const responsiveSizes = isMobileInline
    ? '(max-width: 1023px) 158vw, 1px'
    : '(min-width: 1024px) clamp(740px, 65vw, 1160px), 1px';

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        touchAction: 'pan-y',
        containerType: isMobileInline ? 'inline-size' : undefined,
      }}
    >
      {/* 1. Base Layer (True LCP <img> with AVIF + WebP srcSet) */}
      <picture className="absolute inset-0 block pointer-events-none">
        <source
          type="image/avif"
          srcSet="/assets/before-hover-640.avif 640w, /assets/before-hover-800.avif 800w, /assets/before-hover.avif 1200w"
          sizes={responsiveSizes}
        />
        <source
          type="image/webp"
          srcSet="/assets/before-hover-640.webp 640w, /assets/before-hover-800.webp 800w, /assets/before-hover.webp 1200w"
          sizes={responsiveSizes}
        />
        <img
          src={baseImage}
          alt="Mohsin Aziz — Future Forward Frontend Developer"
          width={1200}
          height={1200}
          fetchPriority="high"
          decoding="sync"
          className="absolute left-1/2 -translate-x-1/2 max-w-none pointer-events-none select-none"
          style={portraitStyle}
        />
      </picture>

      {/* 2. Reveal Layer (Demand-mounted after LCP / on interaction) */}
      <div
        ref={revealLayerRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          opacity: 0,
        }}
      >
        {isRevealMounted && (
          <picture className="absolute inset-0 block pointer-events-none">
            <source
              type="image/avif"
              srcSet="/assets/after-hover-no-glasses-640.avif 640w, /assets/after-hover-no-glasses-800.avif 800w, /assets/after-hover-no-glasses.avif 1024w"
              sizes={responsiveSizes}
            />
            <source
              type="image/webp"
              srcSet="/assets/after-hover-no-glasses-640.webp 640w, /assets/after-hover-no-glasses-800.webp 800w, /assets/after-hover-no-glasses.webp 1024w"
              sizes={responsiveSizes}
            />
            <img
              src={revealImage}
              alt=""
              width={1024}
              height={1024}
              decoding="async"
              className="absolute left-1/2 -translate-x-1/2 max-w-none pointer-events-none select-none"
              style={portraitStyle}
            />
          </picture>
        )}
      </div>

      {/* 3. Subtle GPU-Composited Parallax Grid Overlay */}
      <div
        ref={gridLayerRef}
        aria-hidden="true"
        className="absolute -inset-6 opacity-10 pointer-events-none will-change-transform"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.8) 0.8px, transparent 0.8px), linear-gradient(to bottom, rgba(0,0,0,0.8) 0.8px, transparent 0.8px)',
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      />
    </div>
  );
};
