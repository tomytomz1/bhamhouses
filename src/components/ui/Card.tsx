import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white rounded-lg shadow-sm border border-gray-200',
      elevated: 'bg-white rounded-xl shadow-luxury border border-gray-200',
      outlined: 'bg-transparent rounded-lg border-2 border-gray-200'
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'p-6',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card; 