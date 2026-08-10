import React from 'react';
import { TapeStrip, Thumbtack } from '../decorations/HandDrawnDecorations';
import { soundManager } from '../../utils/soundFx';

export const Card = ({
  children,
  variant = 'default', // 'default', 'postit', 'speech', 'muted', 'accentRed', 'accentBlue'
  decoration = 'none', // 'none', 'tape', 'tack'
  rotate = 'none',     // 'none', 'left', 'right', 'slightLeft', 'slightRight'
  className = '',
  hoverJiggle = true,
  onClick,
  ...props
}) => {
  const rotationClasses = {
    none:       'rotate-0',
    left:       '-rotate-2',
    right:      'rotate-2',
    slightLeft: '-rotate-1',
    slightRight:'rotate-1'
  };

  const hoverClasses = hoverJiggle
    ? 'transition-all duration-200 ease-out hover:scale-[1.02] hover:-rotate-1 hover:shadow-hard-xl'
    : '';

  const variantClasses = {
    default:    'bg-[var(--color-surface)] text-[var(--color-ink)] shadow-hard border-[3px] border-[var(--color-ink)] wobbly-card',
    postit:     'bg-[var(--color-postit)]  text-[var(--color-ink)] shadow-hard-postit border-[3px] border-[var(--color-ink)] wobbly-card',
    muted:      'bg-[var(--color-muted)]   text-[var(--color-ink)] shadow-hard border-[3px] border-[var(--color-ink)] wobbly-card',
    accentRed:  'bg-[#ff4d4d] text-white shadow-hard border-[3px] border-[var(--color-ink)] wobbly-card',
    accentBlue: 'bg-[#2d5da1] text-white shadow-hard border-[3px] border-[var(--color-ink)] wobbly-card',
    speech:     'bg-[var(--color-surface)] text-[var(--color-ink)] shadow-hard border-[3px] border-[var(--color-ink)] wobbly-card relative'
  };

  const handleClick = (e) => {
    soundManager.playClick();
    if (onClick) onClick(e);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative p-6 md:p-8
        ${variantClasses[variant]}
        ${rotationClasses[rotate]}
        ${hoverClasses}
        ${className}
      `}
      {...props}
    >
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
