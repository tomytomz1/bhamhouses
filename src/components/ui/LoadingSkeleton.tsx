import React from 'react';
import { cn } from '@/utils/cn';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'rectangular',
  width = '100%',
  height = '1rem'
}) => {
  const baseClasses = 'animate-pulse bg-gray-200';
  
  const variantClasses = {
    text: 'rounded-sm',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  };
  
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  };
  
  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
    />
  );
};

// Pre-built skeleton components for common use cases
export const FormFieldSkeleton: React.FC = () => (
  <div className="space-y-2">
    <LoadingSkeleton width="60px" height="14px" />
    <LoadingSkeleton height="40px" />
  </div>
);

export const ButtonSkeleton: React.FC = () => (
  <LoadingSkeleton height="44px" className="rounded-xl" />
);

export const CardSkeleton: React.FC = () => (
  <div className="p-6 space-y-4">
    <LoadingSkeleton width="75%" height="20px" />
    <div className="space-y-2">
      <LoadingSkeleton height="16px" />
      <LoadingSkeleton width="90%" height="16px" />
      <LoadingSkeleton width="60%" height="16px" />
    </div>
  </div>
);