import React from 'react';

export const Input = ({
  label,
  error,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full font-handwriting">
      {label && (
        <label htmlFor={inputId} className="font-heading font-bold text-xl text-[#2d2d2d] flex items-center gap-1">
          <span>{label}</span>
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`
          w-full px-4 py-3 text-xl bg-white text-[#2d2d2d]
          border-[3px] border-[#2d2d2d] wobbly-input shadow-hard-sm
          placeholder:text-[#2d2d2d]/40 placeholder:font-handwriting
          focus:outline-none focus:border-[#2d5da1] focus:ring-4 focus:ring-[#2d5da1]/20
          transition-all duration-150
          ${error ? 'border-[#ff4d4d] focus:border-[#ff4d4d]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-[#ff4d4d] font-bold text-lg -rotate-1 ml-1">
          * {error}
        </span>
      )}
    </div>
  );
};

export const TextArea = ({
  label,
  error,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full font-handwriting">
      {label && (
        <label htmlFor={inputId} className="font-heading font-bold text-xl text-[#2d2d2d] flex items-center gap-1">
          <span>{label}</span>
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={`
          w-full px-4 py-3 text-xl bg-white text-[#2d2d2d]
          border-[3px] border-[#2d2d2d] wobbly-input shadow-hard-sm
          placeholder:text-[#2d2d2d]/40 placeholder:font-handwriting
          focus:outline-none focus:border-[#2d5da1] focus:ring-4 focus:ring-[#2d5da1]/20
          transition-all duration-150 resize-y
          ${error ? 'border-[#ff4d4d] focus:border-[#ff4d4d]' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-[#ff4d4d] font-bold text-lg -rotate-1 ml-1">
          * {error}
        </span>
      )}
    </div>
  );
};
