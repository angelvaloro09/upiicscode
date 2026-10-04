import * as React from 'react';
import { cn } from '@/lib/utils';

export interface WordmarkProps {
  size?: 'sm' | 'md';
  className?: string;
}

export function Wordmark({ size = 'md', className }: WordmarkProps) {
  const isSm = size === 'sm';

  return (
    <div
      className={cn(
        'inline-flex items-center font-sans select-none',
        isSm ? 'gap-1.5' : 'gap-2',
        className,
      )}
      aria-label="UPIICSCode"
    >
      <div
        className={cn(
          'bg-primary flex items-center justify-center text-white shadow-xs',
          isSm ? 'size-5 rounded-[5px]' : 'size-6.5 rounded-[6px]',
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isSm ? 'size-3' : 'size-4'}
        >
          <polyline points="8 6 2 12 8 18" />
          <polyline points="16 18 22 12 16 6" />
        </svg>
      </div>
      <div
        className={cn(
          'leading-none font-bold tracking-tight',
          isSm ? 'text-base' : 'text-lg',
        )}
      >
        <span className="text-foreground">UPIICS</span>
        <span className="text-primary dark:text-primary-text">Code</span>
      </div>
    </div>
  );
}
