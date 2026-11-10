import React from 'react';

interface BracketProps {
  className?: string;
  style?: React.CSSProperties;
}

export const TopLeftBracket: React.FC<BracketProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    focusable="false"
    className={className}
    style={style}
  >
    <path d="M0 11.5V0.5H11.5" />
  </svg>
);

export const TopRightBracket: React.FC<BracketProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    focusable="false"
    className={className}
    style={style}
  >
    <path d="M0.5 0.5H11.5V11.5" />
  </svg>
);

export const BottomLeftBracket: React.FC<BracketProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    focusable="false"
    className={className}
    style={style}
  >
    <path d="M0 0.5V11.5H11.5" />
  </svg>
);

export const BottomRightBracket: React.FC<BracketProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    focusable="false"
    className={className}
    style={style}
  >
    <path d="M0.5 11.5H11.5V0.5" />
  </svg>
);
