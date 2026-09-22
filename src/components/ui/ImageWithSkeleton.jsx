import React, { useState } from 'react';

/**
 * ImageWithSkeleton
 * Skeleton and image share the exact same space — skeleton fades out as image fades in.
 * The outer wrapper must have a defined size (pass via skeletonClass or parent styles).
 */
export const ImageWithSkeleton = ({ src, alt, className = '', skeletonClass = '', children }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${skeletonClass}`}>
      {/* Skeleton — absolutely fills the wrapper, fades out once image is ready */}
      <div
        className={`skeleton-hatch absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-500 pointer-events-none ${loaded ? 'opacity-0' : 'opacity-100'}`}
      >
        <svg
          width="32" height="32" viewBox="0 0 36 36" fill="none"
          className="opacity-30 animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 28 L3 33 L8 32 Z" fill="var(--color-ink)" />
          <path d="M4 28 L10 22 L14 26 L8 32 Z" fill="#ff4d4d" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M10 22 L25 7 L29 11 L14 26 Z" fill="#F7DF1E" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M25 7 L28 4 L32 8 L29 11 Z" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <span className="font-handwriting text-xs font-bold text-[var(--color-ink)]/40 tracking-wider">
          loading...
        </span>
      </div>

      {/* Image — fills the wrapper absolutely, fades in on load */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {children}
    </div>
  );
};
