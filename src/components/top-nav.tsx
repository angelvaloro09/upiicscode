'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Wordmark } from '@/components/wordmark';
import { LogoSlot } from '@/components/logo-slot';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserMenu } from '@/components/user-menu';
import { cn } from '@/lib/utils';

export interface TopNavProps {
  variant?: 'default' | 'compact';
  title?: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  currentPath?: string;
  className?: string;
}

export function TopNav({
  variant = 'default',
  title,
  backHref = '/materias',
  backLabel = 'Volver',
  actions,
  currentPath,
  className,
}: TopNavProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname || '';

  const isCompact = variant === 'compact';

  const isMateriasActive =
    activePath === '/' ||
    activePath === '/materias' ||
    activePath.startsWith('/materias');
  const isTareasActive = activePath.startsWith('/tareas');

  return (
    <header
      className={cn(
        'border-border bg-card sticky top-0 z-40 h-14 border-b select-none',
        className,
      )}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 md:px-10">
        {isCompact ? (
          /* Compact Variant: Back button + Title + Actions */
          <>
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href={backHref}
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-1 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label={`Volver: ${backLabel}`}
              >
                <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">{backLabel}</span>
              </Link>
              {title && <div className="bg-border hidden h-4 w-px sm:block" />}
              {title && (
                <h1 className="text-foreground max-w-[200px] truncate text-sm font-semibold tracking-tight sm:max-w-md">
                  {title}
                </h1>
              )}
            </div>

            <div className="flex items-center gap-2">
              {actions && (
                <div className="flex items-center gap-2">{actions}</div>
              )}
              <ThemeToggle />
              <UserMenu />
            </div>
          </>
        ) : (
          /* Default Variant: Brand & LogoSlots + Center Links + Right Menu */
          <>
            {/* Left: Wordmark + Logos */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="focus-visible:ring-ring flex min-h-[44px] items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label="Ir al inicio de UPIICSCode"
              >
                <Wordmark size="sm" />
              </Link>

              <div className="border-border/70 hidden items-center gap-1.5 border-l pl-2 sm:flex">
                <LogoSlot variant="ipn" />
                <LogoSlot variant="upiicsa" />
              </div>
            </div>

            {/* Center: Navigation Links (Desktop) */}
            <nav
              aria-label="Navegación principal"
              className="hidden h-full items-center gap-8 md:flex"
            >
              <Link
                href="/materias"
                className={cn(
                  'focus-visible:ring-ring relative flex h-full items-center px-1 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  isMateriasActive
                    ? 'text-foreground after:bg-primary dark:after:bg-primary-text font-semibold after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[2px]'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-current={isMateriasActive ? 'page' : undefined}
              >
                Materias
              </Link>
              <Link
                href="/tareas"
                className={cn(
                  'focus-visible:ring-ring relative flex h-full items-center px-1 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  isTareasActive
                    ? 'text-foreground after:bg-primary dark:after:bg-primary-text font-semibold after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[2px]'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-current={isTareasActive ? 'page' : undefined}
              >
                Tareas
              </Link>
            </nav>

            {/* Right: ThemeToggle + UserMenu */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <UserMenu />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
