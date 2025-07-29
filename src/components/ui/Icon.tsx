import React from 'react';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ icon: IconComponent, size = 'md', className, color = 'default' }, ref) => {
    const sizes = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8'
    };
    
    const colors = {
      default: 'text-gray-600',
      primary: 'text-blue-600',
      secondary: 'text-gray-500',
      success: 'text-green-600',
      warning: 'text-orange-600',
      error: 'text-red-600'
    };
    
    return (
      <div ref={ref} className={cn('flex-shrink-0', className)}>
        <IconComponent 
          className={cn(
            sizes[size],
            colors[color]
          )} 
        />
      </div>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon; 