import React from 'react';

interface CheckerboardProps {
  className?: string;
  style?: React.CSSProperties;
}

export const CheckerboardSvg: React.FC<CheckerboardProps> = ({ className, style }) => {
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <svg
      viewBox="0 0 36 18"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        width: 'var(--checker-w)',
        height: 'var(--checker-h)',
        transform: 'translateY(2px)',
        display: 'inline-block',
        ...style,
      }}
    >
      {rows.map((row) => {
        const y = row * 4.5;
        const shift = row % 2 === 1 ? 2.25 : 0;
        return cols.map((col) => {
          const x = shift + col * 4.5;
          if (x + 3.8 > 36) return null;
          return (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="3.8"
              height="3.8"
              fill="black"
            />
          );
        });
      })}
    </svg>
  );
};
