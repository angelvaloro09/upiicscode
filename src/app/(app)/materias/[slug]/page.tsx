import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMateria, listMaterias } from '@/lib/content';
import { MateriaView } from './materia-view';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const materias = listMaterias();
  return materias.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const materia = getMateria(slug);
  if (!materia) {
    return {
      title: 'Materia no encontrada | UPIICSCode',
    };
  }

  return {
    title: `${materia.nombre} | UPIICSCode`,
    description: materia.descripcion,
  };
}

export default async function MateriaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const materia = getMateria(slug);

  if (!materia) {
    notFound();
  }

  return <MateriaView materia={materia} />;
}
