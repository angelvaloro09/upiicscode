import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'border-border bg-card space-y-4 rounded-[12px] border p-5 shadow-2xs',
        className,
      )}
    >
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/5 rounded-md" />
        <Skeleton className="h-4 w-2/5 rounded-md" />
      </div>
      <div className="border-border/60 flex items-center gap-2 border-t pt-3">
        <Skeleton className="size-2 rounded-full" />
        <Skeleton className="h-3 w-1/3 rounded-md" />
      </div>
    </div>
  );
}
