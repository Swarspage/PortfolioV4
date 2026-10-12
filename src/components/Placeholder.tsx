import React from 'react';
import { ImageIcon } from 'lucide-react';

type PlaceholderVariant = 'image' | 'portrait' | 'icon';

interface PlaceholderProps {
  variant?: PlaceholderVariant;
  /** Set this to a real URL and the placeholder becomes the image. */
  src?: string | null;
  label: string;
  tone?: 'dark' | 'light';
  accent?: string;
  hideLabel?: boolean;
  className?: string;
}

/**
 * The single placeholder used everywhere: project shots, achievement photos,
 * your portrait and small icons. Pass `src` to swap in the real asset.
 */
export function Placeholder({
  variant = 'image',
  src,
  label,
  tone = 'dark',
  accent,
  hideLabel = false,
  className = ''
}: PlaceholderProps) {
  if (src) {
    return <img src={src} alt={label} loading="lazy" className={`object-cover ${className}`} />;
  }

  const palette =
  tone === 'dark' ? 'bg-char border-line text-steel' : 'bg-[#E1DDD4] border-[#C9C4B8] text-smoke';

  if (variant === 'icon') {
    return (
      <span
        role="img"
        aria-label={`${label} icon placeholder`}
        className={`relative grid place-items-center border border-dashed font-mono text-[11px] font-bold uppercase ${palette} ${className}`}>
        
        {initials(label)}
        {accent &&
        <span aria-hidden className="absolute -bottom-px -right-px h-2 w-2" style={{ backgroundColor: accent }} />
        }
      </span>);

  }

  if (variant === 'portrait') {
    return (
      <div
        role="img"
        aria-label={`${label} placeholder`}
        className={`relative overflow-hidden border border-dashed ${palette} ${className}`}>
        
        <svg
          viewBox="0 0 100 125"
          preserveAspectRatio="xMidYMax meet"
          className="absolute inset-0 h-full w-full"
          aria-hidden>
          
          <circle cx="50" cy="50" r="17" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path
            d="M14 125 C16 94 32 78 50 78 C68 78 84 94 86 125"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 3" />
          
        </svg>
        <Corners />
        {!hideLabel &&
        <span className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] uppercase tracking-[0.14em]">
            {label}
          </span>
        }
      </div>);

  }

  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={`relative grid place-items-center overflow-hidden border border-dashed ${palette} ${className}`}>
      
      <Corners />
      {!hideLabel &&
      <span className="flex flex-col items-center gap-2 px-4 text-center">
          <ImageIcon className="h-5 w-5" aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em]">{label}</span>
        </span>
      }
    </div>);

}

function Corners() {
  const base = 'absolute h-3 w-3 border-current opacity-60';
  return (
    <span aria-hidden>
      <span className={`${base} left-2 top-2 border-l border-t`} />
      <span className={`${base} right-2 top-2 border-r border-t`} />
      <span className={`${base} bottom-2 left-2 border-b border-l`} />
      <span className={`${base} bottom-2 right-2 border-b border-r`} />
    </span>);

}

function initials(label: string): string {
  const parts = label.split(/[\s.]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return parts.map((p) => p[0]).join('').slice(0, 2);
}