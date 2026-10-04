import type { Metadata } from 'next';
import { listMaterias } from '@/lib/content';
import { MateriaCard } from '@/components/materia-card';

export const metadata: Metadata = {
  title: 'Materias | UPIICSCode',
  description: 'Catálogo de materias disponibles en UPIICSCode.',
};

export default function MateriasPage() {
  const materias = listMaterias();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Materias
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          Explora la teoría y contenidos de las asignaturas de la carrera.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {materias.map((materia) => (
          <MateriaCard
            key={materia.slug}
            href={`/materias/${materia.slug}`}
            title={materia.nombre}
            advisor={materia.asesor}
            statusText={`${materia.leccionesCount} ${
              materia.leccionesCount === 1 ? 'lección' : 'lecciones'
            }`}
            statusVariant="ok"
          />
        ))}
      </div>
    </div>
  );
}
