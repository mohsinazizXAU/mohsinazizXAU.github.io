import React from 'react';

interface WireframeGlobeProps {
  className?: string;
  style?: React.CSSProperties;
}

export const WireframeGlobeSvg: React.FC<WireframeGlobeProps> = ({ className, style }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        width: 'var(--globe)',
        height: 'var(--globe)',
        display: 'block',
        ...style,
      }}
    >
      {/* Outer circle (radius 28, center 32,32) */}
      <circle cx="32" cy="32" r="28" />
      {/* Equator line */}
      <line x1="4" y1="32" x2="60" y2="32" />
      {/* Horizontal ellipses */}
      <ellipse cx="32" cy="32" rx="28" ry="14" />
      <ellipse cx="32" cy="32" rx="28" ry="22" />
      {/* Meridian line */}
      <line x1="32" y1="4" x2="32" y2="60" />
      {/* Vertical ellipses */}
      <ellipse cx="32" cy="32" rx="14" ry="28" />
      <ellipse cx="32" cy="32" rx="22" ry="28" />
    </svg>
  );
};
