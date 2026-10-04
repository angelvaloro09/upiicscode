import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ChevronDown } from 'lucide-react';
import { getLeccion, listMaterias, listLecciones } from '@/lib/content';
import { getLessonMDX } from '@/lib/content/mdx-loader';
import { cn } from '@/lib/utils';
import { ReaderNavSetter } from './reader-nav-setter';

interface PageProps {
  params: Promise<{
    slug: string;
    leccion: string;
  }>;
}

export async function generateStaticParams() {
  const materias = listMaterias();
  const params: { slug: string; leccion: string }[] = [];

  for (const m of materias) {
    const lecciones = listLecciones(m.slug);
    for (const l of lecciones) {
      params.push({
        slug: m.slug,
        leccion: l.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, leccion: leccionSlug } = await params;
  const leccion = getLeccion(slug, leccionSlug);

  if (!leccion) {
    return {
      title: 'Lección no encontrada | UPIICSCode',
    };
  }

  return {
    title: `${leccion.titulo} — ${leccion.materia.nombre} | UPIICSCode`,
    description: `Lección de ${leccion.materia.nombre}: ${leccion.titulo} (${leccion.unidadTitulo}).`,
  };
}

export default async function LeccionReaderPage({ params }: PageProps) {
  const { slug, leccion: leccionSlug } = await params;
  const leccion = getLeccion(slug, leccionSlug);

  if (!leccion) {
    notFound();
  }

  const LessonMDX = await getLessonMDX(slug, leccion.slug);
  if (!LessonMDX) {
    notFound();
  }

  const { materia, headings, anterior, siguiente } = leccion;

  return (
    <>
      <ReaderNavSetter
        materiaSlug={materia.slug}
        materiaNombre={materia.nombre}
        leccionTitulo={leccion.titulo}
      />

      <div className="mx-auto flex w-full max-w-[1020px] justify-between gap-12 py-4">
        {/* Main Reading Column (~680px wide) */}
        <article className="w-full max-w-[680px] min-w-0">
          {/* Lesson Header */}
          <header className="border-border mb-8 border-b pb-6">
            <span className="text-muted-foreground text-[13px] font-semibold tracking-wider uppercase">
              {leccion.unidadTitulo}
            </span>
            <h1 className="text-foreground mt-2 mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {leccion.titulo}
            </h1>
            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-[13px] sm:text-sm">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden="true" />
                {leccion.minutosLectura} min de lectura
              </span>
              <span aria-hidden="true">·</span>
              <span>Asesor: {materia.asesor}</span>
            </div>
          </header>

          {/* Mobile Collapsible Table of Contents */}
          {headings.length > 0 && (
            <details className="border-border bg-surface-subtle/50 mb-8 rounded-[8px] border p-4 lg:hidden">
              <summary className="text-foreground flex cursor-pointer items-center justify-between text-sm font-medium select-none">
                <span>En esta página ({headings.length} secciones)</span>
                <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <nav
                className="border-border mt-3 space-y-2 border-t pt-3"
                aria-label="Índice de la lección (móvil)"
              >
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={cn(
                      'text-muted-foreground hover:text-foreground block transition-colors',
                      h.level === 3 ? 'pl-4 text-xs' : 'text-sm font-medium',
                    )}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </details>
          )}

          {/* MDX Body Content */}
          <div className="prose-custom font-sans leading-relaxed">
            <LessonMDX />
          </div>

          {/* Bottom Navigation (Anterior / Siguiente) */}
          <nav
            className="border-border mt-12 flex flex-col justify-between gap-4 border-t pt-6 sm:flex-row"
            aria-label="Navegación entre lecciones"
          >
            {anterior ? (
              <Link
                href={`/materias/${materia.slug}/teoria/${anterior.slug}`}
                className="border-border bg-card hover:border-foreground/20 hover:bg-surface-subtle flex-1 rounded-[8px] border p-4 transition-all"
              >
                <span className="text-muted-foreground mb-1 block text-xs">
                  ← Anterior
                </span>
                <span className="text-foreground group-hover:text-primary dark:group-hover:text-primary-text line-clamp-1 text-sm font-medium transition-colors">
                  {anterior.titulo}
                </span>
              </Link>
            ) : (
              <div className="hidden flex-1 sm:block" />
            )}

            {siguiente ? (
              <Link
                href={`/materias/${materia.slug}/teoria/${siguiente.slug}`}
                className="border-border bg-card hover:border-foreground/20 hover:bg-surface-subtle flex-1 rounded-[8px] border p-4 text-right transition-all"
              >
                <span className="text-muted-foreground mb-1 block text-xs">
                  Siguiente →
                </span>
                <span className="text-foreground group-hover:text-primary dark:group-hover:text-primary-text line-clamp-1 text-sm font-medium transition-colors">
                  {siguiente.titulo}
                </span>
              </Link>
            ) : (
              <div className="hidden flex-1 sm:block" />
            )}
          </nav>
        </article>

        {/* Desktop Sticky Table of Contents (from h2/h3) */}
        {headings.length > 0 && (
          <aside
            className="sticky top-20 hidden h-fit w-[240px] shrink-0 self-start pl-4 lg:block"
            aria-label="Índice de contenidos"
          >
            <h2 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
              En esta página
            </h2>
            <nav
              className="space-y-2 text-sm"
              aria-label="Secciones de la página"
            >
              {headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className={cn(
                    'text-muted-foreground hover:text-foreground block leading-snug transition-colors',
                    h.level === 3
                      ? 'pl-3 text-xs font-normal'
                      : 'text-sm font-medium',
                  )}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </aside>
        )}
      </div>
    </>
  );
}
