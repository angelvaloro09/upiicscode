'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, CheckSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BottomNavProps {
  currentPath?: string;
  className?: string;
}

export function BottomNav({ currentPath, className }: BottomNavProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname || '';

  const navItems = [
    {
      label: 'Materias',
      href: '/materias',
      icon: BookOpen,
      isActive:
        activePath === '/materias' ||
        activePath === '/' ||
        activePath.startsWith('/materias'),
    },
    {
      label: 'Tareas',
      href: '/tareas',
      icon: CheckSquare,
      isActive: activePath.startsWith('/tareas'),
    },
    {
      label: 'Perfil',
      href: '/perfil',
      icon: User,
      isActive: activePath.startsWith('/perfil'),
    },
  ];

  return (
    <nav
      aria-label="Navegación móvil inferior"
      className={cn(
        'border-border bg-card fixed right-0 bottom-0 left-0 z-40 h-16 border-t md:hidden',
        'safe-area-bottom flex items-center justify-around px-2',
        className,
      )}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex min-h-[44px] flex-1 flex-col items-center justify-center py-1 text-[11px] font-medium transition-colors select-none',
              item.isActive
                ? 'text-primary dark:text-primary-text font-semibold'
                : 'text-muted-foreground hover:text-foreground',
            )}
            aria-current={item.isActive ? 'page' : undefined}
          >
            <Icon className="mb-1 size-5 stroke-[1.8]" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
