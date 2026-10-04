'use client';

import * as React from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="hover:bg-muted focus-visible:ring-ring flex items-center gap-2 rounded-full p-1 text-left transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label="Menú de usuario"
          >
            <Avatar className="bg-surface-subtle border-border size-8 border">
              <AvatarFallback className="bg-primary/10 text-primary dark:text-primary-text text-xs font-semibold">
                NA
              </AvatarFallback>
            </Avatar>
            <span className="text-foreground hidden max-w-[130px] truncate text-sm font-medium sm:inline-block">
              Nombre Apellido
            </span>
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-foreground text-sm leading-none font-medium">
              Nombre Apellido
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              alumno@alumno.ipn.mx
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="text-muted-foreground mr-2 size-4" />
          <span>Mi Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="text-muted-foreground mr-2 size-4" />
          <span>Ajustes</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
          <LogOut className="mr-2 size-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
