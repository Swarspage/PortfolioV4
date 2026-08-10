import React from 'react';
import { TapeStrip, Thumbtack } from '../decorations/HandDrawnDecorations';

export const Card = ({
  children,
  variant = 'default', // 'default', 'postit', 'speech', 'muted', 'accentRed', 'accentBlue'
  decoration = 'none', // 'none', 'tape', 'tack'
  rotate = 'none', // 'none', 'left', 'right', 'slightLeft', 'slightRight'
  className = '',
  hoverJiggle = true,
  ...props
}) => {
  // Rotations
  const rotationClasses = {
    none: 'rotate-0',
    left: '-rotate-2',
    right: 'rotate-2',
    slightLeft: '-rotate-1',
    slightRight: 'rotate-1'
  };

  // Hover jiggle effect
  const hoverClasses = hoverJiggle
    ? 'transition-all duration-150 ease-out hover:scale-[1.01] hover:-rotate-1 hover:shadow-hard-lg'
    : '';

  // Background & Variant styles
  const variantClasses = {
    default: 'bg-white text-[#2d2d2d] shadow-hard border-[3px] border-[#2d2d2d] wobbly-card',
    postit: 'bg-[#fff9c4] text-[#2d2d2d] shadow-hard-postit border-[3px] border-[#2d2d2d] wobbly-card',
    muted: 'bg-[#e5e0d8] text-[#2d2d2d] shadow-hard border-[3px] border-[#2d2d2d] wobbly-card',
    accentRed: 'bg-[#ff4d4d] text-white shadow-hard border-[3px] border-[#2d2d2d] wobbly-card',
    accentBlue: 'bg-[#2d5da1] text-white shadow-hard border-[3px] border-[#2d2d2d] wobbly-card',
    speech: 'bg-white text-[#2d2d2d] shadow-hard border-[3px] border-[#2d2d2d] wobbly-card relative'
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
      {/* Decorative Strip / Pin */}
      {decoration === 'tape' && <TapeStrip />}
      {decoration === 'tack' && <Thumbtack />}

      {children}

      {/* Speech Bubble Tail if speech variant */}
      {variant === 'speech' && (
        <>
          <div className="speech-tail-bottom" aria-hidden="true" />
          <div className="speech-tail-bottom-inner" aria-hidden="true" />
        </>
      )}
    </div>
  );
};
