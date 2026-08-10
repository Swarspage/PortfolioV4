import React from 'react';

/**
 * DarkButton — Dark-themed version of Button.
 * Identical API to Button.jsx, but styled for dark backgrounds.
 * Variants: 'primary', 'secondary', 'postit', 'outline'
 */
export const DarkButton = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'postit', 'outline', 'ghost'
  size = 'md',         // 'sm', 'md', 'lg'
  className = '',
  onClick,
  type = 'button',
  icon: Icon,
  disabled = false,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-handwriting font-bold tracking-wide
    border-[3px] wobbly-btn
    transition-all duration-150 ease-out select-none
    cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    sm: 'text-base px-4 py-1.5 h-10',
    md: 'text-xl px-6 py-2.5 h-12 md:h-14',
    lg: 'text-2xl px-8 py-3.5 h-14 md:h-16'
  };

  // Dark palette buttons — hard ink shadows replaced with subtle dark glows
  const variantClasses = {
    primary: `
      bg-[#1a1a2e] text-[#89b4fa] border-[#89b4fa]/60
      shadow-[3px_3px_0px_rgba(137,180,250,0.3)]
      hover:bg-[#89b4fa] hover:text-[#0d0d1a] hover:border-[#89b4fa]
      hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_rgba(137,180,250,0.3)]
      active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
    `,
    secondary: `
      bg-[#1e1e1e] text-[#c9c3b8] border-[#444]/80
      shadow-[3px_3px_0px_rgba(80,80,80,0.4)]
      hover:bg-[#2d5da1] hover:text-white hover:border-[#2d5da1]
      hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_rgba(45,93,161,0.4)]
      active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
    `,
    postit: `
      bg-[#3a3520] text-[#f7df1e] border-[#f7df1e]/50
      shadow-[3px_3px_0px_rgba(247,223,30,0.25)]
      hover:bg-[#f7df1e] hover:text-[#1a1a00] hover:border-[#f7df1e]
      hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_rgba(247,223,30,0.25)]
      active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
    `,
    outline: `
      bg-transparent text-[#e8e3dc] border-[#666]/70
      shadow-[3px_3px_0px_rgba(100,100,100,0.3)]
      hover:bg-[#e8e3dc] hover:text-[#1a1a1a] hover:border-[#e8e3dc]
      hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_rgba(200,200,200,0.2)]
      active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
    `,
    ghost: `
      bg-transparent text-[#e8e3dc] border-transparent
      hover:bg-white/10 hover:border-white/20
      active:bg-white/15
    `
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />}
      <span>{children}</span>
    </button>
  );
};
