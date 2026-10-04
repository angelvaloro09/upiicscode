import * as React from 'react';
import { BookOpen, Code2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CalloutVariant = 'definicion' | 'ejemplo' | 'ojo';

export interface CalloutProps {
  variant?: CalloutVariant;
  type?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CALLOUT_CONFIG: Record<
  CalloutVariant,
  {
    defaultTitle: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
    borderClass: string;
  }
> = {
  definicion: {
    defaultTitle: 'Definición',
    icon: BookOpen,
    iconClass: 'text-primary dark:text-primary-text',
    borderClass: 'border-l-primary dark:border-l-primary-text',
  },
  ejemplo: {
    defaultTitle: 'Ejemplo',
    icon: Code2,
    iconClass: 'text-muted-foreground',
    borderClass: 'border-l-muted-foreground',
  },
  ojo: {
    defaultTitle: 'Ojo',
    icon: AlertCircle,
    iconClass: 'text-verdict-wa-fg dark:text-verdict-wa-fg',
    borderClass: 'border-l-verdict-wa-fg',
  },
};

export function Callout({
  variant,
  type,
  title,
  children,
  className,
}: CalloutProps) {
  const selectedVariant = type || variant || 'definicion';
  const config = CALLOUT_CONFIG[selectedVariant];
  const Icon = config.icon;
  const headerTitle = title || config.defaultTitle;

  return (
    <aside
      className={cn(
        'border-border bg-surface-subtle rounded-[8px] border border-l-4 p-4 font-sans text-sm',
        config.borderClass,
        className,
      )}
    >
      <div className="text-foreground mb-1.5 flex items-center gap-2 font-semibold">
        <Icon
          className={cn('size-4 shrink-0', config.iconClass)}
          aria-hidden="true"
        />
        <span>{headerTitle}</span>
      </div>
      <div className="text-foreground/90 pl-6 text-[13px] leading-relaxed sm:text-sm">
        {children}
      </div>
    </aside>
  );
}
