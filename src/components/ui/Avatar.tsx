import React from 'react';
import { cn } from '../../lib/utils';
import { getInitials } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  const [error, setError] = React.useState(false);
  
  const handleError = () => {
    setError(true);
  };
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };
  
  return (
    <div className={cn(
      'relative flex overflow-hidden rounded-full bg-gray-200',
      sizeClasses[size],
      className
    )}>
      {src && !error ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="h-full w-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className={cn(
          'flex h-full w-full items-center justify-center bg-primary-600 text-white font-medium',
          textSizeClasses[size]
        )}>
          {name ? getInitials(name) : 'U'}
        </div>
      )}
    </div>
  );
}