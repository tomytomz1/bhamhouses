import React from 'react';
import { cn } from '@/utils/cn';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'light' | 'dark' | 'gradient';
  children: React.ReactNode;
  container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', children, container = true, ...props }, ref) => {
    const variants = {
      default: 'bg-white',
      light: 'bg-gray-50',
      dark: 'bg-gray-900 text-white',
      gradient: 'bg-gradient-to-br from-gray-50 to-white'
    };
    
    const content = container ? (
      <div className="container-max">
        {children}
      </div>
    ) : children;
    
    return (
      <section
        ref={ref}
        className={cn(
          'section-padding',
          variants[variant],
          className
        )}
        {...props}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section; 