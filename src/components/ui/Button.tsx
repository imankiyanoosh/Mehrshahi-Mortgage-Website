import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500': variant === 'primary',
          'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500': variant === 'secondary',
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500': variant === 'outline',
          'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary-500': variant === 'ghost',
        },
        {
          'px-3 py-1.5 text-sm rounded-md': size === 'sm',
          'px-4 py-2 text-sm rounded-lg': size === 'md',
          'px-6 py-3 text-base rounded-lg': size === 'lg',
        },
        {
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};