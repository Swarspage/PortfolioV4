import React from 'react';
import { TapeStrip, Thumbtack } from '../../decorations/HandDrawnDecorations';

/**
 * DarkCard — Dark-themed version of Card.
 * Identical API to Card.jsx, but inverted for dark/night-mode backgrounds.
 * Variants: 'default', 'postit', 'speech', 'muted', 'accentRed', 'accentBlue'
 */
export const DarkCard = ({
  children,
  variant = 'default', // 'default', 'postit', 'speech', 'muted', 'accentRed', 'accentBlue'
  decoration = 'none', // 'none', 'tape', 'tack'
  rotate = 'none',     // 'none', 'left', 'right', 'slightLeft', 'slightRight'
  className = '',
  hoverJiggle = true,
  ...props
}) => {
  const rotationClasses = {
    none: 'rotate-0',
    left: '-rotate-2',
    right: 'rotate-2',
    slightLeft: '-rotate-1',
    slightRight: 'rotate-1'
  };

  const hoverClasses = hoverJiggle
    ? 'transition-all duration-150 ease-out hover:scale-[1.01] hover:-rotate-1'
    : '';

  // Dark palette: deep backgrounds, softer glow borders, muted shadows
  const variantClasses = {
    default:    'bg-[#1a1a1a] text-[#e8e3dc] shadow-[4px_4px_0px_rgba(232,227,220,0.15)] border-[3px] border-[#444] wobbly-card',
    postit:     'bg-[#2e2a10] text-[#f7df1e] shadow-[4px_4px_0px_rgba(247,223,30,0.15)] border-[3px] border-[#f7df1e]/40 wobbly-card',
    muted:      'bg-[#161616] text-[#a09a94] shadow-[4px_4px_0px_rgba(100,100,100,0.15)] border-[3px] border-[#333] wobbly-card',
    accentRed:  'bg-[#3a0a0a] text-[#ff8080] shadow-[4px_4px_0px_rgba(255,77,77,0.2)]  border-[3px] border-[#ff4d4d]/50 wobbly-card',
    accentBlue: 'bg-[#0a1628] text-[#89b4fa] shadow-[4px_4px_0px_rgba(45,93,161,0.25)] border-[3px] border-[#2d5da1]/60 wobbly-card',
    speech:     'bg-[#1a1a1a] text-[#e8e3dc] shadow-[4px_4px_0px_rgba(232,227,220,0.15)] border-[3px] border-[#444] wobbly-card relative'
  };

  return (
    <div
      className={`
        relative p-6 md:p-8
        ${variantClasses[variant]}
        ${rotationClasses[rotate]}
        ${hoverClasses}
        ${className}
      `}
      {...props}
    >
      {/* Decorative Strip / Pin — kept as-is; decorations work on any bg */}
      {decoration === 'tape' && <TapeStrip />}
      {decoration === 'tack' && <Thumbtack />}

      {children}

      {variant === 'speech' && (
        <>
          <div className="speech-tail-bottom" aria-hidden="true" />
          <div className="speech-tail-bottom-inner" aria-hidden="true" />
        </>
      )}
    </div>
  );
};
