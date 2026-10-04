'use client';

import * as React from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme, type Theme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions: { label: string; value: Theme; icon: React.ReactNode }[] =
    [
      { label: 'Claro', value: 'light', icon: <Sun className="size-4" /> },
      { label: 'Oscuro', value: 'dark', icon: <Moon className="size-4" /> },
      {
        label: 'Sistema',
        value: 'system',
        icon: <Monitor className="size-4" />,
      },
    ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="border-border/50 text-foreground hover:bg-muted focus-visible:ring-ring size-9 rounded-md border focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label="Cambiar tema visual"
          >
            {mounted ? (
              resolvedTheme === 'dark' ? (
                <Moon className="size-4" />
              ) : (
                <Sun className="size-4" />
              )
            ) : (
              <span className="size-4" />
            )}
            <span className="sr-only">Cambiar tema</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-36">
        {themeOptions.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className="flex cursor-pointer items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2">
              {opt.icon}
              <span>{opt.label}</span>
            </span>
            {theme === opt.value && (
              <Check className="text-primary dark:text-primary-text size-3.5" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
