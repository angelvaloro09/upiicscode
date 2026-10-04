import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';

export const materiaMetaSchema = z.object({
  slug: z.string().min(1),
  nombre: z.string().min(1),
  descripcion: z.string(),
  asesor: z.string().min(1),
});

export const leccionFrontmatterSchema = z.object({
  titulo: z.string().min(1),
  unidad: z.number().int().positive(),
  unidadTitulo: z.string().min(1),
  orden: z.number().int().positive(),
  minutosLectura: z.number().int().positive(),
  borrador: z.boolean(),
});

export type MateriaMeta = z.infer<typeof materiaMetaSchema>;
export type LeccionFrontmatter = z.infer<typeof leccionFrontmatterSchema>;

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface LeccionItem extends LeccionFrontmatter {
  slug: string;
  filename: string;
  materiaSlug: string;
}

export interface UnidadGroup {
  unidad: number;
  unidadTitulo: string;
  lecciones: LeccionItem[];
}

export interface MateriaDetail extends MateriaMeta {
  lecciones: LeccionItem[];
  leccionesCount: number;
  unidades: UnidadGroup[];
}

export interface LeccionNav {
  slug: string;
  titulo: string;
}

export interface LeccionDetail extends LeccionItem {
  materia: MateriaMeta;
  headings: HeadingItem[];
  body: string;
  anterior: LeccionNav | null;
  siguiente: LeccionNav | null;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'materias');

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function parseFrontmatter(
  rawContent: string,
  filePath: string,
): { frontmatter: LeccionFrontmatter; body: string } {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    throw new Error(
      `Frontmatter no encontrado o delimitadores '---' ausentes en el archivo: "${filePath}"`,
    );
  }

  const yamlContent = match[1];
  const body = rawContent.slice(match[0].length);
  const data: Record<string, unknown> = {};

  for (const line of yamlContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    const key = trimmed.slice(0, colonIndex).trim();
    let valStr = trimmed.slice(colonIndex + 1).trim();

    if (
      (valStr.startsWith('"') && valStr.endsWith('"')) ||
      (valStr.startsWith("'") && valStr.endsWith("'"))
    ) {
      valStr = valStr.slice(1, -1);
    }

    if (valStr === 'true') {
      data[key] = true;
    } else if (valStr === 'false') {
      data[key] = false;
    } else if (/^\d+$/.test(valStr)) {
      data[key] = parseInt(valStr, 10);
    } else {
      data[key] = valStr;
    }
  }

  const result = leccionFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    throw new Error(
      `Frontmatter inválido en el archivo "${filePath}": ${issues}`,
    );
  }

  return {
    frontmatter: result.data,
    body,
  };
}

export function extractHeadings(markdown: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const lines = markdown.split(/\r?\n/);

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = h2Match[1].trim();
      headings.push({
        id: slugify(text),
        text,
        level: 2,
      });
      continue;
    }
    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      const text = h3Match[1].trim();
      headings.push({
        id: slugify(text),
        text,
        level: 3,
      });
    }
  }

  return headings;
}

export function listMaterias(): (MateriaMeta & { leccionesCount: number })[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const materias: (MateriaMeta & { leccionesCount: number })[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const materiaDir = path.join(CONTENT_DIR, entry.name);
    const metaFile = path.join(materiaDir, 'meta.json');

    if (!fs.existsSync(metaFile)) continue;

    const rawMeta = fs.readFileSync(metaFile, 'utf-8');
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(rawMeta);
    } catch (err) {
      throw new Error(
        `Error de sintaxis JSON en "${metaFile}": ${(err as Error).message}`,
      );
    }

    const metaResult = materiaMetaSchema.safeParse(parsedJson);
    if (!metaResult.success) {
      const issues = metaResult.error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');
      throw new Error(`meta.json inválido en "${metaFile}": ${issues}`);
    }

    const lecciones = listLecciones(metaResult.data.slug);
    materias.push({
      ...metaResult.data,
      leccionesCount: lecciones.length,
    });
  }

  return materias;
}

export function listLecciones(materiaSlug: string): LeccionItem[] {
  const materiaDir = path.join(CONTENT_DIR, materiaSlug);
  if (!fs.existsSync(materiaDir)) {
    return [];
  }

  const files = fs
    .readdirSync(materiaDir)
    .filter((f) => f.endsWith('.mdx'))
    .sort();

  const lecciones: LeccionItem[] = [];

  for (const file of files) {
    const filePath = path.join(materiaDir, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter } = parseFrontmatter(rawContent, filePath);

    // Extract slug from filename: "01-apuntadores-y-memoria.mdx" -> "apuntadores-y-memoria"
    const slug = file.replace(/^\d+-/, '').replace(/\.mdx$/, '');

    lecciones.push({
      ...frontmatter,
      slug,
      filename: file,
      materiaSlug,
    });
  }

  return lecciones.sort((a, b) => a.orden - b.orden);
}

export function getMateria(slug: string): MateriaDetail | null {
  const materiaDir = path.join(CONTENT_DIR, slug);
  const metaFile = path.join(materiaDir, 'meta.json');

  if (!fs.existsSync(metaFile)) {
    return null;
  }

  const rawMeta = fs.readFileSync(metaFile, 'utf-8');
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawMeta);
  } catch (err) {
    throw new Error(
      `Error de sintaxis JSON en "${metaFile}": ${(err as Error).message}`,
    );
  }

  const metaResult = materiaMetaSchema.safeParse(parsedJson);
  if (!metaResult.success) {
    const issues = metaResult.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    throw new Error(`meta.json inválido en "${metaFile}": ${issues}`);
  }

  const lecciones = listLecciones(slug);

  // Group by unidad
  const unidadesMap = new Map<number, UnidadGroup>();
  for (const leccion of lecciones) {
    if (!unidadesMap.has(leccion.unidad)) {
      unidadesMap.set(leccion.unidad, {
        unidad: leccion.unidad,
        unidadTitulo: leccion.unidadTitulo,
        lecciones: [],
      });
    }
    unidadesMap.get(leccion.unidad)!.lecciones.push(leccion);
  }

  const unidades = Array.from(unidadesMap.values()).sort(
    (a, b) => a.unidad - b.unidad,
  );

  return {
    ...metaResult.data,
    lecciones,
    leccionesCount: lecciones.length,
    unidades,
  };
}

export function getLeccion(
  materiaSlug: string,
  leccionSlug: string,
): LeccionDetail | null {
  const materia = getMateria(materiaSlug);
  if (!materia) {
    return null;
  }

  const lecciones = materia.lecciones;
  const index = lecciones.findIndex(
    (l) =>
      l.slug === leccionSlug ||
      l.filename === `${leccionSlug}.mdx` ||
      l.filename.replace(/\.mdx$/, '') === leccionSlug,
  );

  if (index === -1) {
    return null;
  }

  const current = lecciones[index];
  const filePath = path.join(CONTENT_DIR, materiaSlug, current.filename);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(rawContent, filePath);
  const headings = extractHeadings(body);

  const anterior =
    index > 0
      ? {
          slug: lecciones[index - 1].slug,
          titulo: lecciones[index - 1].titulo,
        }
      : null;

  const siguiente =
    index < lecciones.length - 1
      ? {
          slug: lecciones[index + 1].slug,
          titulo: lecciones[index + 1].titulo,
        }
      : null;

  return {
    ...current,
    ...frontmatter,
    materia: {
      slug: materia.slug,
      nombre: materia.nombre,
      descripcion: materia.descripcion,
      asesor: materia.asesor,
    },
    headings,
    body,
    anterior,
    siguiente,
  };
}
