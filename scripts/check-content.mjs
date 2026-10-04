// NOTA: Los esquemas de validación de este script (materiaMetaSchema y leccionFrontmatterSchema)
// deben mantenerse iguales a src/lib/content/index.ts (hasta unificarlos).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'content', 'materias');

const materiaMetaSchema = z.object({
  slug: z.string().min(1, 'El slug no puede estar vacío'),
  nombre: z.string().min(1, 'El nombre no puede estar vacío'),
  descripcion: z.string(),
  asesor: z.string().min(1, 'El asesor no puede estar vacío'),
});

const leccionFrontmatterSchema = z.object({
  titulo: z.string().min(1, 'El título no puede estar vacío'),
  unidad: z.number().int().positive('La unidad debe ser un entero positivo'),
  unidadTitulo: z
    .string()
    .min(1, 'El título de la unidad no puede estar vacío'),
  orden: z.number().int().positive('El orden debe ser un entero positivo'),
  minutosLectura: z
    .number()
    .int()
    .positive('Los minutos de lectura deben ser un entero positivo'),
  borrador: z.boolean(),
});

function parseFrontmatter(rawContent, filePath) {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    throw new Error(
      `Frontmatter ausente o delimitadores '---' no encontrados en: "${filePath}"`,
    );
  }

  const yamlContent = match[1];
  const data = {};

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
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join(', ');
    throw new Error(`Frontmatter inválido en "${filePath}": ${issues}`);
  }

  return result.data;
}

function runValidation() {
  console.log('🔍 Validando contenido en:', contentDir);

  if (!fs.existsSync(contentDir)) {
    console.error(`❌ El directorio "${contentDir}" no existe.`);
    process.exit(1);
  }

  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  const materiasDirs = entries.filter((e) => e.isDirectory());

  if (materiasDirs.length === 0) {
    console.error(
      '❌ No se encontraron materias en el directorio de contenido.',
    );
    process.exit(1);
  }

  const materiaSlugs = new Set();
  let totalLecciones = 0;
  let errorsCount = 0;

  for (const dir of materiasDirs) {
    const materiaPath = path.join(contentDir, dir.name);
    const metaPath = path.join(materiaPath, 'meta.json');

    console.log(`\n📚 Validando materia: [${dir.name}]`);

    if (!fs.existsSync(metaPath)) {
      console.error(`  ❌ Falta el archivo "meta.json" en: "${materiaPath}"`);
      errorsCount++;
      continue;
    }

    let meta;
    try {
      const rawMeta = fs.readFileSync(metaPath, 'utf-8');
      const parsed = JSON.parse(rawMeta);
      meta = materiaMetaSchema.parse(parsed);
      console.log(
        `  ✓ meta.json válido (${meta.nombre} — Asesor: ${meta.asesor})`,
      );
    } catch (err) {
      console.error(`  ❌ Error en "${metaPath}": ${err.message}`);
      errorsCount++;
      continue;
    }

    if (meta.slug !== dir.name) {
      console.error(
        `  ❌ El slug en meta.json ("${meta.slug}") no coincide con el nombre de la carpeta ("${dir.name}").`,
      );
      errorsCount++;
    }

    if (materiaSlugs.has(meta.slug)) {
      console.error(`  ❌ Slug de materia duplicado detectado: "${meta.slug}"`);
      errorsCount++;
    }
    materiaSlugs.add(meta.slug);

    // Validate lecciones
    const mdxFiles = fs
      .readdirSync(materiaPath)
      .filter((file) => file.endsWith('.mdx'));

    if (mdxFiles.length === 0) {
      console.warn(`  ⚠️ La materia "${meta.slug}" no tiene lecciones .mdx.`);
    }

    const leccionSlugs = new Set();
    const leccionOrdenes = new Set();

    for (const file of mdxFiles) {
      const filePath = path.join(materiaPath, file);
      try {
        const rawContent = fs.readFileSync(filePath, 'utf-8');
        const frontmatter = parseFrontmatter(rawContent, filePath);
        const slug = file.replace(/^\d+-/, '').replace(/\.mdx$/, '');

        if (leccionSlugs.has(slug)) {
          console.error(
            `  ❌ Slug de lección duplicado en la materia "${meta.slug}": "${slug}" (${file})`,
          );
          errorsCount++;
        }
        leccionSlugs.add(slug);

        if (leccionOrdenes.has(frontmatter.orden)) {
          console.error(
            `  ❌ Orden duplicado (${frontmatter.orden}) en la materia "${meta.slug}" en el archivo: "${file}"`,
          );
          errorsCount++;
        }
        leccionOrdenes.add(frontmatter.orden);

        console.log(
          `  ✓ Lección [${frontmatter.orden}] ${frontmatter.titulo} (${frontmatter.minutosLectura} min, Unidad ${frontmatter.unidad})`,
        );
        totalLecciones++;
      } catch (err) {
        console.error(`  ❌ Error en lección "${filePath}": ${err.message}`);
        errorsCount++;
      }
    }
  }

  console.log('\n----------------------------------------');
  if (errorsCount > 0) {
    console.error(`❌ Validación fallida con ${errorsCount} error(es).`);
    process.exit(1);
  } else {
    console.log(
      `✅ Validación exitosa: ${materiaSlugs.size} materias y ${totalLecciones} lecciones verificadas correctamente.`,
    );
  }
}

runValidation();
