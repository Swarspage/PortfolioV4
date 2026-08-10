import React from 'react';

/**
 * DarkBadge — Dark-themed version of Badge.
 * Identical API to Badge.jsx, but inverted for dark backgrounds.
 * Variants: 'postit', 'red', 'blue', 'paper', 'outline'
 */
export const DarkBadge = ({
  children,
  variant = 'postit', // 'postit', 'red', 'blue', 'paper', 'outline'
  rotate = 'none',    // 'none', 'left', 'right'
  className = '',
  icon: Icon,
  ...props
}) => {
  const rotationClasses = {
    none: 'rotate-0',
    left: '-rotate-2',
    right: 'rotate-2'
  };

  // Dark palette: deep ink backgrounds, lighter text, glow-ish borders
  const variantClasses = {
    postit:  'bg-[#3a3520] text-[#f7df1e] border-2 border-[#f7df1e]/60 shadow-[2px_2px_0px_#f7df1e]/30',
    red:     'bg-[#4a1515] text-[#ff8080] border-2 border-[#ff4d4d]/60 shadow-[2px_2px_0px_#ff4d4d]/30',
    blue:    'bg-[#0d1f40] text-[#89b4fa] border-2 border-[#2d5da1]/70 shadow-[2px_2px_0px_#2d5da1]/30',
    paper:   'bg-[#1e1e1e] text-[#c9c3b8] border-2 border-[#444]/70 shadow-[2px_2px_0px_#444]/40',
    outline: 'bg-transparent text-[#e8e3dc] border-2 border-[#666]/70 shadow-[2px_2px_0px_#555]/30'
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
