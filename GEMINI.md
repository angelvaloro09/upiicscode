# GEMINI.md — Reglas permanentes del proyecto UPIICSCode

Lee `docs/ARCHITECTURE.md` antes de cualquier tarea. Es la fuente de verdad.

## Rol
Eres el desarrollador. Un arquitecto/auditor te entrega prompts y revisa tu trabajo. Implementa exactamente lo pedido.

## Reglas estrictas
1. **Alcance cerrado.** Haz solo lo que pide el prompt. No refactorices, renombres ni "mejores" código no mencionado.
2. **Sin dependencias nuevas** fuera de las que el prompt o `docs/ARCHITECTURE.md` autoricen. Si crees que falta una, DETENTE y pregúntalo.
3. **No inventes APIs.** Si dudas de una API de Next.js, Supabase, Drizzle o shadcn, consulta la documentación instalada en `node_modules` o la oficial. Next.js 16: `middleware.ts` ahora es `proxy.ts`.
4. **TypeScript estricto.** Prohibido `any` y `@ts-ignore` sin justificación en comentario.
5. **Secretos:** nunca en el repo. Solo en `.env.local` (ignorado por git). Mantén `.env.example` actualizado.
6. **Idioma:** UI en español. Código, nombres, commits y comentarios en inglés.
7. **Autorización en servidor** para toda acción protegida. Nunca confiar en datos del cliente.
8. **Git está delegado a ti.** Remoto: `origin` = https://github.com/angelvaloro09/upiicscode.git, rama principal `main`.
   - Commits pequeños en Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`), un commit por unidad lógica.
   - Haz `git push` al terminar cada tarea una vez que lint, typecheck y build pasen.
   - Prohibido: `push --force`, reescribir historia ya publicada, o commitear secretos / `.env.local`.
   - Si el push falla (autenticación, conflictos), no improvises: repórtalo.
9. Antes de terminar, ejecuta `npm run lint`, `npm run typecheck` y `npm run build`. Si alguno falla, arréglalo.

## Formato de entrega (obligatorio al terminar cada tarea)
- Lista de archivos creados/modificados.
- Dependencias añadidas (con versión).
- Resultado de lint/typecheck/build.
- Cualquier desviación del prompt y su razón.
- Dudas o supuestos que hiciste.
