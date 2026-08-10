import React from 'react';

export const Badge = ({
  children,
  variant = 'postit', // 'postit', 'red', 'blue', 'paper', 'outline'
  rotate = 'none',    // 'none', 'left', 'right'
  className = '',
  icon: Icon,
  ...props
}) => {
  const rotationClasses = {
    none:  'rotate-0',
    left:  '-rotate-2',
    right: 'rotate-2'
  };

  const variantClasses = {
    postit:  'bg-[var(--color-postit)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] shadow-hard-sm',
    red:     'bg-[#ff4d4d] text-white border-2 border-[var(--color-ink)] shadow-hard-sm',
    blue:    'bg-[#2d5da1] text-white border-2 border-[var(--color-ink)] shadow-hard-sm',
    paper:   'bg-[var(--color-muted)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] shadow-hard-sm',
    outline: 'bg-[var(--color-surface)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] shadow-hard-sm'
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 text-lg font-handwriting font-bold
        wobbly-tag select-none
        ${variantClasses[variant]}
        ${rotationClasses[rotate]}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 stroke-[2.5]" />}
      <span>{children}</span>
    </span>
  );
};
