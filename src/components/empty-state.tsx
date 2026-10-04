import * as React from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'border-border bg-surface-subtle/30 flex flex-col items-center justify-center rounded-[12px] border border-dashed px-6 py-12 text-center',
        className,
      )}
    >
      <div className="bg-surface-subtle text-muted-foreground mb-3 flex size-12 items-center justify-center rounded-full">
        <Icon className="size-6 stroke-[1.75]" aria-hidden="true" />
      </div>
      <h3 className="text-foreground text-base font-semibold tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="text-muted-foreground mt-1.5 max-w-sm text-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
