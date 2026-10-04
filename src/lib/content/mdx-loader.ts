import * as React from 'react';

type MDXComponentType = React.ComponentType<{
  components?: Record<string, React.ComponentType<unknown> | React.ElementType>;
}>;

const mdxRegistry: Record<
  string,
  Record<string, () => Promise<{ default: MDXComponentType }>>
> = {
  'estructuras-de-datos': {
    'apuntadores-y-memoria': () =>
      import('../../../content/materias/estructuras-de-datos/01-apuntadores-y-memoria.mdx'),
    'memoria-dinamica': () =>
      import('../../../content/materias/estructuras-de-datos/02-memoria-dinamica.mdx'),
    'listas-simplemente-enlazadas': () =>
      import('../../../content/materias/estructuras-de-datos/03-listas-simplemente-enlazadas.mdx'),
  },
  'programacion-estructurada': {
    'tipos-de-datos-y-operadores': () =>
      import('../../../content/materias/programacion-estructurada/01-tipos-de-datos-y-operadores.mdx'),
    'estructuras-de-control': () =>
      import('../../../content/materias/programacion-estructurada/02-estructuras-de-control.mdx'),
    'funciones-y-paso-por-referencia': () =>
      import('../../../content/materias/programacion-estructurada/03-funciones-y-paso-por-referencia.mdx'),
  },
};

export async function getLessonMDX(
  materiaSlug: string,
  leccionSlug: string,
): Promise<MDXComponentType | null> {
  const materiaMap = mdxRegistry[materiaSlug];
  if (!materiaMap) return null;

  const loader = materiaMap[leccionSlug];
  if (!loader) return null;

  try {
    const mod = await loader();
    return mod.default;
  } catch (error) {
    console.error(
      `Error cargando MDX para ${materiaSlug}/${leccionSlug}:`,
      error,
    );
    return null;
  }
}
