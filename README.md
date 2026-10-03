# UPIICSCode

Plataforma educativa para estudiantes y docentes de la comunidad de informática de la UPIICSA (IPN). Integra teoría organizada por materia, gestión de aulas virtuales y práctica de programación con juez automatizado.

Para consultar los principios de diseño, stack tecnológico, modelo de datos y roadmap de fases, consulta el documento de arquitectura:

- [Arquitectura del Proyecto](docs/ARCHITECTURE.md)

## Requisitos

- **Node.js**: `>= 24.0.0`
- **npm**: `>= 10.0.0`

## Comandos del Proyecto

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo en `http://localhost:3000`:

```bash
npm run dev
```

Ejecutar el linter (ESLint):

```bash
npm run lint
```

Verificar tipos con TypeScript (`tsc --noEmit`):

```bash
npm run typecheck
```

Compilar para producción:

```bash
npm run build
```

Verificar y dar formato al código con Prettier:

```bash
npm run format:check
npm run format
```

## Estado del Proyecto

- **Fase 0**: Scaffolding inicial, configuración de base de datos y autenticación pendiente para fases subsecuentes.
