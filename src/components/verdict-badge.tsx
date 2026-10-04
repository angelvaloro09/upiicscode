import * as React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  HardDrive,
  AlertTriangle,
  FileCode,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type Verdict = 'ac' | 'wa' | 'tle' | 'mle' | 're' | 'ce' | 'running';

export interface VerdictBadgeProps {
  verdict: Verdict;
  className?: string;
}

const VERDICT_CONFIG: Record<
  Verdict,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    className: string;
    isSpinning?: boolean;
  }
> = {
  ac: {
    label: 'Aceptado',
    icon: CheckCircle2,
    className: 'bg-verdict-ac-bg text-verdict-ac-fg border-verdict-ac-border',
  },
  wa: {
    label: 'Respuesta incorrecta',
    icon: XCircle,
    className: 'bg-verdict-wa-bg text-verdict-wa-fg border-verdict-wa-border',
  },
  tle: {
    label: 'Tiempo excedido',
    icon: Clock,
    className:
      'bg-verdict-tle-bg text-verdict-tle-fg border-verdict-tle-border',
  },
  mle: {
    label: 'Memoria excedida',
    icon: HardDrive,
    className:
      'bg-verdict-mle-bg text-verdict-mle-fg border-verdict-mle-border',
  },
  re: {
    label: 'Error de ejecución',
    icon: AlertTriangle,
    className: 'bg-verdict-re-bg text-verdict-re-fg border-verdict-re-border',
  },
  ce: {
    label: 'Error de compilación',
    icon: FileCode,
    className: 'bg-verdict-ce-bg text-verdict-ce-fg border-verdict-ce-border',
  },
  running: {
    label: 'Evaluando…',
    icon: Loader2,
    isSpinning: true,
    className:
      'bg-verdict-running-bg text-verdict-running-fg border-verdict-running-border',
  },
};

export function VerdictBadge({ verdict, className }: VerdictBadgeProps) {
  const config = VERDICT_CONFIG[verdict];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex h-[26px] items-center gap-1.5 rounded-[6px] border px-2 font-sans text-xs font-semibold tracking-tight select-none',
        config.className,
        className,
      )}
      role="status"
    >
      <Icon
        className={cn(
          'size-3.5 shrink-0',
          config.isSpinning && 'animate-spin motion-reduce:animate-none',
        )}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </span>
  );
}
