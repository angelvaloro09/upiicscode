# UPIICSCode — Arquitectura v1

Plataforma educativa para alumnos de Ingeniería en Informática y Ciencias de la Informática (UPIICSA-IPN).
Combina teoría, tareas/anuncios y práctica de código con juez (estilo OmegaUp), todo organizado por **materia** al estilo de Google Classroom (sin concepto de "aula").

## 1. Restricciones

- **Costo $0.** Solo tiers gratuitos. Toda decisión se evalúa contra esto.
- **Lenguajes del juez:** solo C y C++ (por ahora).
- **Acceso:** únicamente correos `@alumno.ipn.mx`.
- **Teoría:** hardcodeada en MDX dentro del repo (sin CMS, sin editor).
- **Desarrollo:** lo implementa otro agente (Gemini). El arquitecto planifica y audita.

## 2. Stack

| Capa | Elección |
|---|---|
| Framework | Next.js (App Router) + TypeScript estricto |
| Hosting | Vercel Hobby |
| BD + Auth | Supabase (Postgres + Auth), tier gratuito |
| ORM | Drizzle ORM + drizzle-kit |
| UI | Tailwind CSS + shadcn/ui |
| Teoría | MDX en `content/` |
| Editor de código | Monaco (Fase 3) |
| Validación | zod |
| Gestor de paquetes | npm |
| Runtime | Node.js 24 LTS |

Notas de plataforma:
- Supabase gratuito pausa el proyecto tras ~1 semana sin actividad. Aceptado.
- Vercel no puede ejecutar código de usuarios (serverless, sin aislamiento). El juez es un servicio externo.

## 3. Estructura del repo

```
/
├─ content/                  # Teoría en MDX
│  └─ materias/<materia>/<tema>.mdx
├─ docs/                     # Arquitectura, decisiones (ADR), auditorías
├─ drizzle/                  # Migraciones generadas
├─ src/
│  ├─ app/                   # Rutas (App Router)
│  │  ├─ (public)/           # Landing, páginas públicas
│  │  ├─ (auth)/             # Login
│  │  └─ (app)/              # Zona autenticada
│  ├─ components/
│  │  ├─ ui/                 # shadcn/ui (no editar a mano salvo necesidad)
│  │  └─ ...                 # Componentes propios por feature
│  ├─ db/
│  │  ├─ schema.ts           # Esquema Drizzle
│  │  └─ index.ts            # Cliente
│  ├─ lib/
│  │  ├─ auth/               # Capa de auth AISLADA (ver §5)
│  │  ├─ content/            # Carga de MDX
│  │  ├─ judge/              # Interfaz JudgeProvider (Fase 3)
│  │  └─ env.ts              # Validación de variables de entorno (zod)
│  └─ proxy.ts               # Next.js 16: reemplaza a middleware.ts
├─ GEMINI.md                 # Reglas permanentes para el agente dev
└─ .env.example
```

Regla: la lógica de negocio vive en `src/lib/` y en server actions / route handlers. Los componentes no hablan con la BD directamente.

## 4. Modelo de datos (alto nivel)

Se detalla por fase; no crear tablas de fases futuras antes de tiempo.

**Fase 1**
- `profiles` (id = auth.users.id, email, full_name, role: `student | advisor | admin`, created_at)
- La teoría NO está en BD. Opcional: `topic_progress` (profile_id, materia_slug, tema_slug, completed_at).

**Fase 2** (no existe el concepto de "aula": la unidad es la **materia**, como la "clase" de Classroom)
- Las materias se definen en `content/materias/` (slug, nombre, descripción); la BD las referencia por `materia_slug`.
- **Decisión (2026-10):** la unidad es solo la materia (sin grupo/secuencia). El modelo puede cambiar después: mantener `materia_slug` como única referencia y no incrustar supuestos de grupo en la lógica.
- `enrollments`: materia_slug, profile_id, role_in_materia (`student | advisor`). *Pendiente de decidir:* inscripción libre vs. por código.
- `announcements`: materia_slug, author_id, body
- `assignments`: materia_slug, title, description, due_at
- `assignment_submissions`: assignment_id, profile_id, content, grade, feedback

**Fase 3**
- `problems`: slug, title, statement_mdx, time_limit_ms, memory_limit_kb
- `problem_tests`: problem_id, input, expected_output, is_sample, weight
- `code_submissions`: problem_id, profile_id, language (`c | cpp`), source, verdict, time_ms, memory_kb, created_at

## 5. Autenticación y autorización

- Dominio permitido: **solo `@alumno.ipn.mx`**. La validación se hace **en el servidor** (trigger en BD y/o callback de auth). Nunca confiar en parámetros de cliente como `hd`.
- Proveedor: el correo es Microsoft.
  - **Plan A:** Microsoft OAuth (provider Azure de Supabase). Riesgo: el tenant del IPN puede bloquear el consentimiento. Se prueba al inicio de Fase 1.
  - **Plan B:** OTP por correo (SMTP propio, p. ej. Gmail con contraseña de aplicación).
- Todo detrás de `src/lib/auth/` con una API estable (`getCurrentUser()`, `requireUser()`, `requireRole()`), para cambiar de plan sin tocar el resto.
- Roles: `student` por defecto. `advisor` y `admin` se asignan manualmente (SQL / panel admin).
- Acceso a datos: solo desde servidor con Drizzle. RLS activado y sin políticas permisivas en las tablas (defensa en profundidad). La autorización real se verifica en código de servidor.

## 6. Juez de código (Fase 3)

Interfaz única:

```ts
interface JudgeProvider {
  run(input: {
    language: 'c' | 'cpp';
    source: string;
    stdin: string;
    timeLimitMs: number;
    memoryLimitKb: number;
  }): Promise<{
    status: 'ok' | 'compile_error' | 'runtime_error' | 'time_limit' | 'memory_limit' | 'internal_error';
    stdout: string;
    stderr: string;
    timeMs: number;
    memoryKb: number;
  }>;
}
```

Implementaciones candidatas (se decide al llegar a la Fase 3): Judge0 CE o Jobe en tu PC con túnel (desarrollo), Judge0 en RapidAPI (puente), WASM en navegador (práctica libre). Oracle Cloud descartado (sin disponibilidad).
Los veredictos con calificación NUNCA se calculan en el cliente.

## 7. Fases

| Fase | Contenido | Depende del juez |
|---|---|---|
| 0 | Repo, scaffolding, convenciones, CI | No |
| 1 | Auth restringida, roles, materias y teoría MDX | No |
| 2 | Materias estilo Classroom: inscripción, tablón de anuncios, tareas | No |
| 3 | Problemas, editor, envíos, JudgeProvider | Sí |
| 4 | Calificaciones, rankings, concursos | Sí |

## 8. Criterios de calidad (auditoría)

Cada entrega se audita contra:
1. `npm run lint`, `npm run typecheck`, `npm run build` pasan.
2. Sin dependencias fuera de la lista aprobada.
3. Sin secretos en el repo.
4. Autorización verificada en servidor para cada acción protegida.
5. Sin cambios fuera del alcance del prompt.
6. Accesibilidad básica y responsive.
7. Textos de UI en español; código, nombres e identificadores en inglés.
