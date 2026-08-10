import React from 'react';

export const DashedArrow = ({ className = '', color = '#2d2d2d' }) => (
  <svg
    className={`inline-block ${className}`}
    width="110"
    height="50"
    viewBox="0 0 110 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 25 Q 35 5, 75 22 T 100 35"
      stroke={color}
      strokeWidth="2.5"
      strokeDasharray="5,4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M90 24 L102 36 L86 42"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const SquigglyUnderline = ({ className = '', color = '#ff4d4d' }) => (
  <svg
    className={`w-full h-4 ${className}`}
    viewBox="0 0 200 16"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 10 C 35 2, 70 14, 105 6 C 140 -2, 170 12, 197 8"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const MarkerHighlight = ({ className = '', color = '#fff9c4' }) => (
  <span className={`relative inline-block ${className}`}>
    <span
      className="absolute inset-0 -skew-y-1 bg-[#fff9c4] opacity-80 -z-10 rounded-sm"
      style={{
        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
        transform: 'scale(1.08, 0.9) rotate(-1deg)'
      }}
    />
  </span>
);

export const SketchCircle = ({ className = '', color = '#2d5da1' }) => (
  <svg
    className={`inline-block ${className}`}
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32 6 C 48 4, 58 16, 58 32 C 58 48, 44 58, 28 58 C 12 58, 4 44, 6 28 C 8 12, 22 4, 38 6 C 50 8, 60 20, 56 36"
      stroke={color}
      strokeWidth="2.5"
      strokeDasharray="6,3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const SketchStar = ({ className = '', color = '#ff4d4d' }) => (
  <svg
    className={`inline-block ${className}`}
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
  </svg>
);

export const TapeStrip = ({ className = '' }) => (
  <div className={`tape-strip ${className}`} aria-hidden="true" />
);

export const Thumbtack = ({ className = '' }) => (
  <div className={`thumbtack-pin ${className}`} aria-hidden="true" />
);

export const PostItTag = ({ children, className = '' }) => (
  <div
    className={`inline-block bg-[#fff9c4] text-[#2d2d2d] font-heading font-bold text-sm px-3 py-1 border-2 border-[#2d2d2d] shadow-hard-sm wobbly-tag -rotate-2 ${className}`}
  >
    {children}
  </div>
);
