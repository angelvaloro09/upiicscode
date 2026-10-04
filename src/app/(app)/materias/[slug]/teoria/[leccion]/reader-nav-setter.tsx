'use client';

import * as React from 'react';
import { useSetNavConfig } from '@/components/top-nav';

interface ReaderNavSetterProps {
  materiaSlug: string;
  materiaNombre: string;
  leccionTitulo: string;
}

export function ReaderNavSetter({
  materiaSlug,
  materiaNombre,
  leccionTitulo,
}: ReaderNavSetterProps) {
  const config = React.useMemo(
    () => ({
      variant: 'compact' as const,
      backHref: `/materias/${materiaSlug}`,
      backLabel: `Volver a ${materiaNombre}`,
      title: leccionTitulo,
    }),
    [materiaSlug, materiaNombre, leccionTitulo],
  );

  useSetNavConfig(config);

  return null;
}
