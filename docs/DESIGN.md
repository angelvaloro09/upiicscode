# UPIICSCode — Contrato de diseño v1

Fuente de verdad visual. Los mockups de Stitch están en `docs/design/upiicscode_wireframe_mockup_2/` (la carpeta `upiicscode_wireframe_mockup/` es una iteración anterior: ignorarla).
**Si un mockup contradice este documento, gana este documento.** Los mockups son referencia de layout, no de datos ni de detalles marcados como "Corregir" abajo.

## 1. Concepto
El "Google Classroom" de las materias de informática del IPN, con teoría y práctica de C/C++ integradas. Unidad central: la **materia**. Cada materia tiene 4 pestañas: Tablón, Teoría, Práctica, Tareas. No hay "aulas", ni dashboard, ni gamificación (sin rachas, puntos, rankings, "tablero de honor", porcentajes de avance globales).
Sensación: curso guiado, calmado, editorial. Pocos elementos por pantalla, una acción principal por pantalla.

## 2. Tokens

### Claro
| Token | Valor |
|---|---|
| background (lienzo) | `#FBFBFA` |
| card / surface | `#FFFFFF` |
| surface-subtle | `#F3F2EE` |
| border | `#E7E6E2` (1px) |
| foreground | `#1E1E20` |
| muted-foreground | `#5F6368` (mín. 13px) |
| primary (guinda IPN) | `#6F1D46` · hover `#581637` · active `#4B102E` |
| primary-foreground | `#FFFFFF` |
| code-inline-bg | `#EFECE6` |
| code-block-bg | `#F7F7F5` |

### Oscuro (derivado, NO tomar de los mockups oscuros)
| Token | Valor |
|---|---|
| background | `#141416` |
| card / surface | `#1C1C1F` |
| border | `#2A2A2E` |
| foreground | `#EDEDEC` |
| muted-foreground | `#A0A0A4` |
| primary (relleno de botón) | `#A33B6E` con texto **blanco** |
| primary-text (enlaces, indicador activo, iconos) | `#E08AB0` |
Regla: `#A33B6E` NO se usa como color de texto sobre fondo oscuro (contraste ~2.9:1). El texto sobre el botón primario es siempre blanco.

### Veredictos (badge: icono + texto, nunca solo color; Inter 600 o mono 600 12px, radio 6px, alto 26px)
| Veredicto | Etiqueta ES | Claro (texto / fondo / borde) | Oscuro (texto / fondo) |
|---|---|---|---|
| AC | Aceptado | `#0F766E` / `#F0FDF4` / `#BBF7D0` | `#34D399` / `#064E3B` |
| WA | Respuesta incorrecta | `#BE123C` / `#FFF1F2` / `#FECDD3` | `#FB7185` / `#4C0519` |
| TLE | Tiempo excedido | `#B45309` / `#FFFBEB` / `#FDE68A` | `#FBBF24` / `#451A03` |
| MLE | Memoria excedida | `#C2410C` / `#FFF7ED` / `#FFEDD5` | `#FB923C` / `#431407` |
| RE | Error de ejecución | `#9F1239` / `#FFF1F2` / `#FECDD3` | `#FDA4AF` / `#4C0519` |
| CE | Error de compilación | `#475569` / `#F1F5F9` / `#CBD5E1` | `#94A3B8` / `#1E293B` |
| Evaluando | Evaluando… | `#475569` / `#F8FAFC` + pulso guinda | `#94A3B8` / `#1E293B` |
Etiquetas SIEMPRE en español (nada de "Wrong Answer").

## 3. Tipografía
- **Inter** para TODA la interfaz: etiquetas, metadatos, correos, matrículas, fechas, chips, encabezados pequeños.
- **JetBrains Mono** SOLO para: código (bloques e inline), valores de tiempo/memoria dentro de resultados del juez, y la entrada/salida de ejemplos.
- **Ligaduras desactivadas** en todo código (`font-variant-ligatures: none`): el alumno debe ver `!=` y `->` tal cual, no `≠` ni `→`.
- Cargar fuentes con `next/font` (nunca depender de fuentes del sistema). Prohibido que algo caiga en serif.
- Escala: h1 36/44, h2 24/32, h3 20/28, h4 16/24, body 16/26 (lectura) y 14/22 (UI), small 13/20 (mínimo permitido). Medida de lectura 60–75 caracteres (~680px) en teoría y enunciados. Tracking de h1/h2 ligeramente negativo.

## 4. Forma y profundidad
Radios: 8px (botones, inputs), 12px (tarjetas, editor), 6px (badges, chips). Superficies planas con borde de 1px; sin sombra en reposo; en hover de tarjeta clicable, sombra casi imperceptible. Iconos Lucide (trazo 1.5–2). Sin gradientes, sin glassmorphism, sin imágenes de stock. Ilustraciones solo como SVG/CSS simples.

## 5. Uso del guinda
SOLO: botón primario, enlaces, indicador de navegación activa (subrayado/línea, NO relleno), foco, checkbox/radio marcados, pequeños detalles. Prohibido en fondos grandes, cabeceras, tarjetas completas, y como relleno de pestañas.

## 6. Navegación y layout
- **Barra superior** (no sidebar): wordmark `UPIICSCode`, slots de logos, "Materias", "Tareas", selector de tema, avatar/usuario. Activo = subrayado guinda.
- Lector de teoría y pantalla de problema: la barra se reduce a "← Volver a <materia>" + título + acciones propias.
- Móvil: barra superior simple + barra inferior (Materias / Tareas / Perfil).
- Wordmark: icono `<>` en cuadrado guinda redondeado + "UPIICS" en foreground + "Code" en guinda. Se implementa como SVG/texto, NO como imagen raster. Tamaño mínimo visible 20px de alto del icono.
- Slots de logos oficiales IPN y UPIICSA: componentes placeholder con las proporciones de los logos; se sustituyen por los SVG oficiales cuando se obtengan. Prohibido dibujar el escudo.
- Contenido principal con ancho máx. ~1200px (Inicio/Materia) y ~680px de columna de lectura.
- Breakpoints: 360, 768, 1024, 1280.

## 7. Mapa de pantallas → rutas
| Pantalla | Mockup (`_2/stitch_upiicscode_learning_platform/`) | Ruta propuesta | Fase |
|---|---|---|---|
| Login | `iniciar_sesi_n_upiicscode` | `/login` | 1 |
| Inicio | `inicio_upiicscode`, `inicio_m_vil_upiicscode` | `/` (autenticado) | 1 |
| Materia (Tablón) | `estructuras_de_datos_upiicscode`, `materia_..._m_vil_upiicscode` | `/materias/[slug]` | 1–2 |
| Lector de teoría | `lector_de_teor_a_apuntadores_en_c`, `..._m_vil_...` | `/materias/[slug]/teoria/[tema]` | 1 |
| Problema | `problema_104_...`, `problema_104_m_vil_...` | `/materias/[slug]/practica/[problema]` | 3 |
| Tarea (alumno) | `tarea_alumno_upiicscode` | `/materias/[slug]/tareas/[id]` | 2 |
| Revisión (asesor) | `revisi_n_de_tarea_asesor_upiicscode` | `/materias/[slug]/tareas/[id]/entregas` | 2 |
| Estados vacío/carga/404 | `estados_del_sistema_upiicscode` (solo como idea) | componentes | 1 |
Modo oscuro: se deriva de los tokens de §2. Los mockups oscuros son solo referencia de ambiente.

### Pantallas adicionales (carpetas `docs/design/stitch_upiicscode_learning_platform/` y `..._1/`)
Solo sirven como referencia de **estructura/layout**. En color, tipografía, datos y contenido manda este documento.
| Pantalla | Qué se adopta | Ruta | Fase |
|---|---|---|---|
| Materia > Teoría | Lista agrupada por unidad, filas con título, tiempo de lectura y estado Leída/Pendiente | `/materias/[slug]` (pestaña teoría) | 1 |
| Materia > Práctica | Lista de problemas con dificultad y estado, filtro Todos/Pendientes/Resueltos | `/materias/[slug]` (pestaña práctica) | 3 |
| Materia > Tareas | Lista con fecha límite y estado | `/materias/[slug]` (pestaña tareas) | 2 |
| Tareas (global) | Agrupadas por materia, ordenadas por fecha | `/tareas` | 2 |
| Perfil y ajustes | Tarjeta de cuenta, selector de tema (3 opciones), cerrar sesión | `/perfil` | 1 |
| Problema: estados del juez | Barra de progreso de casos y chips por caso (OK / ... / pendiente) mientras evalúa | pantalla de problema | 3 |
| Revisión del asesor | Lista de entregas a la izquierda; código, veredicto, nota /100 y retroalimentación a la derecha | `/materias/[slug]/tareas/[id]/entregas` | 2 |
| Login | Tarjeta centrada, sin navegación (la barra "Vista: Inicial/Error/Código" es artefacto del mockup, no va) | `/login` | 1 |
Los mockups de "estados del sistema" son páginas de catálogo, no pantallas reales: ignorar su estructura y construir `EmptyState`, `SkeletonCard` y `not-found` como componentes.

## 8. Corregir respecto a los mockups
Al implementar, NO reproducir:
1. Datos de infraestructura: "Servidor GCC", "Latencia", "Compilador V20/Listo", "Juez C++20 Activo", "Memoria activa", "Entorno de compilación".
2. Métricas/progreso global: "Progreso global", "Promedio", "Asistencia", "N/M casos evaluados", "100%" de lectura, "Tablero de Honor", "Evaluaciones" como sección de navegación, "Métricas de Juez".
3. Referencias a SAES / Kardex y datos inventados (edificio, cubículo, matrícula visible, "Periodo escolar", "Semestre", licenciatura).
4. Micro-etiquetas en mono para metadatos no-código (correo, "Actualizado: hoy", "reactivos", "Calif. aut.", chips "2 pendientes").
5. Pestañas con relleno guinda (usar subrayado).
6. Bloqueos de contenido ("se desbloqueará…").
7. Leyenda de veredictos en inglés bajo los resultados del problema.
8. Cabecera con usuario/menú dentro del Login (el login es una pantalla sin navegación).
9. Sistema de comentarios de clase (fuera de alcance por ahora; se difiere).
10. Rúbrica por criterios en la revisión del asesor: por ahora solo calificación /100 y retroalimentación de texto.
11. Pink/guinda como texto sobre fondo oscuro (ver §2).
12. Códigos de materia tipo `ED-2NV40`, "UNIDADES DE APRENDIZAJE" (se llama "Materias").
13. Concepto de **secuencia/grupo** ("Secuencia 2NM31"): la unidad es solo la materia (ver ARCHITECTURE.md §4).
14. Paneles "Progreso curricular", "Problemas resueltos 2 de 6", "Entorno de evaluación" (límites de CPU, GCC, compiladores), "Compañeros (38)", horarios/edificio/cubículo del asesor, "Juez en línea", "v2.4.0", "Periodo escolar", "2024-2" en la barra.
15. Mención de otros lenguajes (Python, OpenJDK, Haskell, Java): la plataforma es solo C y C++.
16. "Ver solución" en problemas resueltos y "ID // INST-…", "SSO_0365_ACTIVE" u otros identificadores técnicos visibles al usuario.
17. Lienzo rosado (`#FCF8FB`) de varios mockups: el lienzo es siempre `#FBFBFA`.
18. Bloque de filtros/pestañas con fondo relleno tipo "segmented control" guinda; el relleno guinda solo es para el botón primario.

## 9. Pendiente de diseñar
Materia → pestañas Teoría, Práctica y Tareas (solo está diseñado Tablón); lista global "Tareas"; Perfil/ajustes; resultados WA, CE, TLE y "Evaluando" del problema; estados vacío/carga/404 como componentes reales; Login limpio.
