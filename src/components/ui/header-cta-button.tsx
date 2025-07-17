
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderCtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const HeaderCtaButton: React.FC<HeaderCtaButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}) => {
  return (
    <button
      className={cn(
        // Base styles - consistent height, padding, and margin
        "flex items-center justify-center gap-2 h-8 px-3 py-1.5 rounded-md text-sm font-normal leading-[23.94px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        // Variant styles
        variant === 'primary' && "bg-slate-900 text-slate-50 hover:bg-slate-800 focus:ring-slate-500",
        variant === 'secondary' && "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-300 border border-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
