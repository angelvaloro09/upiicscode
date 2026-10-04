import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface MateriaCardProps {
  href: string;
  title: string;
  advisor: string;
  statusText: string;
  statusVariant?: 'pending' | 'ok';
  className?: string;
}

export function MateriaCard({
  href,
  title,
  advisor,
  statusText,
  statusVariant = 'ok',
  className,
}: MateriaCardProps) {
  const isPending = statusVariant === 'pending';

  return (
    <Link
      href={href}
      className={cn(
        'group border-border bg-card relative block rounded-[12px] border p-5 transition-all duration-150',
        'hover:border-foreground/20 hover:shadow-xs',
        'focus-visible:ring-ring outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-foreground group-hover:text-primary dark:group-hover:text-primary-text text-lg font-semibold tracking-tight transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">{advisor}</p>
        </div>

        <div className="border-border/60 flex items-center gap-2 border-t pt-2 text-[13px] font-medium">
          <span
            className={cn(
              'size-2 shrink-0 rounded-full',
              isPending
                ? 'bg-primary dark:bg-primary-text'
                : 'bg-muted-foreground/50',
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              isPending
                ? 'text-primary dark:text-primary-text font-semibold'
                : 'text-muted-foreground',
            )}
          >
            {statusText}
          </span>
        </div>
      </div>
    </Link>
  );
}
