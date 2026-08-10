import React from 'react';

/**
 * DarkInput — Dark-themed version of Input.
 * Identical API to Input.jsx, but styled for dark backgrounds.
 */
export const DarkInput = ({
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
        <label
          htmlFor={inputId}
          className="font-heading font-bold text-xl text-[#e8e3dc] flex items-center gap-1"
        >
          <span>{label}</span>
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`
          w-full px-4 py-3 text-xl
          bg-[#111] text-[#e8e3dc]
          border-[3px] border-[#444] wobbly-input
          shadow-[3px_3px_0px_rgba(100,100,100,0.2)]
          placeholder:text-[#666] placeholder:font-handwriting
          focus:outline-none focus:border-[#89b4fa] focus:ring-4 focus:ring-[#89b4fa]/15
          transition-all duration-150
          ${error ? 'border-[#ff4d4d] focus:border-[#ff4d4d] focus:ring-[#ff4d4d]/15' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-[#ff8080] font-bold text-lg -rotate-1 ml-1">
          * {error}
        </span>
      )}
    </div>
  );
};

/**
 * DarkTextArea — Dark-themed version of TextArea.
 * Identical API to TextArea in Input.jsx, but styled for dark backgrounds.
 */
export const DarkTextArea = ({
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
        <label
          htmlFor={inputId}
          className="font-heading font-bold text-xl text-[#e8e3dc] flex items-center gap-1"
        >
          <span>{label}</span>
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={`
          w-full px-4 py-3 text-xl
          bg-[#111] text-[#e8e3dc]
          border-[3px] border-[#444] wobbly-input
          shadow-[3px_3px_0px_rgba(100,100,100,0.2)]
          placeholder:text-[#666] placeholder:font-handwriting
          focus:outline-none focus:border-[#89b4fa] focus:ring-4 focus:ring-[#89b4fa]/15
          transition-all duration-150 resize-y
          ${error ? 'border-[#ff4d4d] focus:border-[#ff4d4d] focus:ring-[#ff4d4d]/15' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-[#ff8080] font-bold text-lg -rotate-1 ml-1">
          * {error}
        </span>
      )}
    </div>
  );
};
