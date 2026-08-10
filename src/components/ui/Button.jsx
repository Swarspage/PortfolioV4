import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'postit', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  onClick,
  type = 'button',
  icon: Icon,
  disabled = false,
  ...props
}) => {
  // Base classes for the hand-drawn button
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-handwriting font-bold tracking-wide
    border-[3px] border-[#2d2d2d] wobbly-btn
    transition-all duration-150 ease-out select-none
    cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Size variants
  const sizeClasses = {
    sm: 'text-base px-4 py-1.5 h-10',
    md: 'text-xl px-6 py-2.5 h-12 md:h-14',
    lg: 'text-2xl px-8 py-3.5 h-14 md:h-16'
  };

  // Color & Hover variants
  // Primary: White bg -> Hover Red fill (#ff4d4d), text white, shadow 2px, translate 2px
  // Active: Shadow 0px, translate 4px (press flat)
  const variantClasses = {
    primary: `
      bg-white text-[#2d2d2d] shadow-hard
      hover:bg-[#ff4d4d] hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm
      active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
    `,
    secondary: `
      bg-[#e5e0d8] text-[#2d2d2d] shadow-hard
      hover:bg-[#2d5da1] hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm
      active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
    `,
    postit: `
      bg-[#fff9c4] text-[#2d2d2d] shadow-hard
      hover:bg-[#ff4d4d] hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm
      active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
    `,
    outline: `
      bg-transparent text-[#2d2d2d] shadow-hard
      hover:bg-[#2d2d2d] hover:text-[#fdfbf7] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm
      active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
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
