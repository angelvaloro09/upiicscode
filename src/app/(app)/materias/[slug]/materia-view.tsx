'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';
import type { MateriaDetail } from '@/lib/content';
import { EmptyState } from '@/components/empty-state';
import { cn } from '@/lib/utils';

type TabKey = 'tablon' | 'teoria' | 'practica' | 'tareas';

interface MateriaViewProps {
  materia: MateriaDetail;
}

export function MateriaView({ materia }: MateriaViewProps) {
  const [activeTab, setActiveTab] = React.useState<TabKey>('teoria');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'tablon', label: 'Tablón' },
    { key: 'teoria', label: 'Teoría' },
    { key: 'practica', label: 'Práctica' },
    { key: 'tareas', label: 'Tareas' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-border border-b pb-6">
        <Link
          href="/materias"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring mb-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          ← Volver a Materias
        </Link>
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          {materia.nombre}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          Asesor:{' '}
          <span className="text-foreground font-medium">{materia.asesor}</span>
        </p>
        {materia.descripcion && (
          <p className="text-foreground/80 mt-2 max-w-2xl text-sm leading-relaxed">
            {materia.descripcion}
          </p>
        )}
      </div>

      {/* Tabs Navigation (Guinda underline, no background fill) */}
      <div className="border-border border-b">
        <nav
          className="-mb-px flex space-x-6 sm:space-x-8"
          aria-label="Pestañas de la materia"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'focus-visible:ring-ring relative inline-flex min-h-[44px] items-center border-b-2 px-1 py-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  isActive
                    ? 'border-primary text-foreground dark:border-primary-text font-semibold'
                    : 'text-muted-foreground hover:text-foreground border-transparent',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'teoria' && (
          <div className="space-y-8">
            {materia.unidades.length === 0 ? (
              <EmptyState
                title="Sin lecciones de teoría"
                description="No hay lecciones registradas para esta materia aún."
              />
            ) : (
              materia.unidades.map((group) => (
                <section key={group.unidad} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-foreground text-base font-semibold tracking-tight sm:text-lg">
                      {group.unidadTitulo}
                    </h2>
                    <span className="text-muted-foreground text-xs">
                      {group.lecciones.length}{' '}
                      {group.lecciones.length === 1 ? 'lección' : 'lecciones'}
                    </span>
                  </div>

                  <div className="border-border bg-card divide-border divide-y overflow-hidden rounded-[8px] border">
                    {group.lecciones.map((leccion) => (
                      <Link
                        key={leccion.slug}
                        href={`/materias/${materia.slug}/teoria/${leccion.slug}`}
                        className="hover:bg-surface-subtle group flex items-center justify-between p-4 transition-colors"
                      >
                        <div className="min-w-0 pr-4">
                          <h3 className="text-foreground group-hover:text-primary dark:group-hover:text-primary-text truncate text-sm font-medium sm:text-base">
                            {leccion.titulo}
                          </h3>
                          <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                            <Clock className="size-3.5 shrink-0" />
                            <span>{leccion.minutosLectura} min de lectura</span>
                          </div>
                        </div>
                        <ChevronRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        )}

        {activeTab === 'tablon' && (
          <EmptyState
            title="Próximamente"
            description="El tablón de anuncios y avisos de la materia estará disponible próximamente."
          />
        )}

        {activeTab === 'practica' && (
          <EmptyState
            title="Próximamente"
            description="El catálogo de problemas prácticos con juez en línea estará disponible en la Fase 3."
          />
        )}

        {activeTab === 'tareas' && (
          <EmptyState
            title="Próximamente"
            description="La gestión de tareas y entregas de código estará disponible en la Fase 2."
          />
        )}
      </div>
    </div>
  );
}
