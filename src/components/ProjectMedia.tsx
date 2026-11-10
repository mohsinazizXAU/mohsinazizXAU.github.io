import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface ProjectMediaProps {
  image: string;
  video: string;
  title: string;
  width?: number;
  height?: number;
}

export const ProjectMedia: React.FC<ProjectMediaProps> = ({
  image,
  video,
  title,
  width = 1280,
  height = 720,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const basePath = image.replace(/\.webp$/i, '');

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleTogglePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      if (isHovered) {
        videoRef.current.pause();
        setIsHovered(false);
      } else {
        setIsHovered(true);
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTogglePlay();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Toggle live video preview for ${title}`}
      aria-pressed={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTogglePlay}
      onKeyDown={handleKeyDown}
      className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-200 bg-black group shadow-xs cursor-pointer active:scale-[0.98] select-none transition-transform duration-100 ease-out"
    >
      {/* 1. Base Static High-Res Screenshot (AVIF + WebP Responsive) */}
      <picture className="absolute inset-0 block w-full h-full">
        <source
          type="image/avif"
          srcSet={`${basePath}-640.avif 640w, ${basePath}-800.avif 800w, ${basePath}.avif 1280w`}
          sizes="(max-width: 1023px) 92vw, 55vw"
        />
        <source
          type="image/webp"
          srcSet={`${basePath}-640.webp 640w, ${basePath}-800.webp 800w, ${basePath}.webp 1280w`}
          sizes="(max-width: 1023px) 92vw, 55vw"
        />
        <img
          src={image}
          alt={`${title} application interface preview by Mohsin Aziz`}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-contain transition-all duration-500 ease-out ${
            isHovered ? 'scale-[1.01] filter brightness-95' : 'scale-100'
          }`}
        />
      </picture>

      {/* 2. Seamless Hover Video (Lazy-fetched on interaction) */}
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 3. Subtle Live Video Badge on Top-Right */}
      <div
        aria-hidden="true"
        className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-md text-[10px] font-mono text-white tracking-wider uppercase transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } group-hover:opacity-100`}
      >
        <Play size={10} className="fill-white animate-pulse" />
        <span>LIVE PREVIEW</span>
      </div>
    </div>
  );
};
