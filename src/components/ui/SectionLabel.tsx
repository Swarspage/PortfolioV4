import React from "react";

export function SectionLabel({ children, className = "" }: {children: React.ReactNode;className?: string;}) {
  return (
    <p className={`flex items-center gap-3 font-mono text-xs text-muted ${className}`}>
      <span aria-hidden className="h-px w-8 bg-accent" />
      {children}
    </p>);

}