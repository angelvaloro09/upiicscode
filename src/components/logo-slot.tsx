import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LogoSlotProps {
  variant: 'ipn' | 'upiicsa';
  className?: string;
}

export function LogoSlot({ variant, className }: LogoSlotProps) {
  const isIpn = variant === 'ipn';
  const label = isIpn ? 'Escudo IPN' : 'Escudo UPIICSA';

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'border-border text-muted-foreground inline-flex h-7 items-center justify-center rounded-[4px] border border-dashed px-2 text-xs font-medium tracking-tight select-none',
        'bg-surface-subtle/50 transition-colors',
        className,
      )}
      title={label}
    >
      <span>{label}</span>
    </div>
  );
}
