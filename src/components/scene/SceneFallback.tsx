import React from "react";

// Static stand-in when WebGL is unavailable: the core as a quiet line drawing.
export function SceneFallback() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] flex items-center justify-end overflow-hidden pr-[6vw]">
      <svg viewBox="0 0 400 400" className="h-[52vmin] w-[52vmin] text-muted" fill="none">
        <circle cx="200" cy="200" r="118" stroke="currentColor" strokeOpacity="0.35" />
        <circle cx="200" cy="200" r="96" stroke="currentColor" strokeOpacity="0.18" />
        <ellipse cx="200" cy="200" rx="190" ry="54" stroke="currentColor" strokeOpacity="0.4" transform="rotate(-18 200 200)" />
        <circle cx="356" cy="158" r="5" fill="var(--accent-ink)" />
      </svg>
    </div>);

}