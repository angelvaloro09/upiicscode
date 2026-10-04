import { notFound } from 'next/navigation';
import { Wordmark } from '@/components/wordmark';
import { LogoSlot } from '@/components/logo-slot';
import { ThemeToggle } from '@/components/theme-toggle';
import { TopNav } from '@/components/top-nav';
import { BottomNav } from '@/components/bottom-nav';
import { VerdictBadge } from '@/components/verdict-badge';
import { CodeBlock } from '@/components/code-block';
import { Callout } from '@/components/callout';
import { MateriaCard } from '@/components/materia-card';
import { EmptyState } from '@/components/empty-state';
import { SkeletonCard } from '@/components/skeleton-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { FolderPlus } from 'lucide-react';

export const metadata = {
  title: 'Guía de Diseño y Componentes | UPIICSCode',
};

export default function DesignPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const sampleCppCode = `#include <iostream>

struct Nodo {
    int valor;
    Nodo* siguiente;
};

// Verificación de ligaduras: != debe verse como != y -> como ->
bool esVacia(Nodo* cabeza) {
    if (cabeza != nullptr && cabeza->siguiente != nullptr) {
        return false;
    }
    return true;
}`;

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* TopNav Demonstration */}
      <TopNav currentPath="/materias" />

      <main className="mx-auto max-w-[1200px] space-y-12 px-4 py-8 md:px-10">
        {/* Header */}
        <div className="border-border flex flex-col gap-2 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Sistema de Diseño UPIICSCode
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Auditoría visual de tokens, tipografía, componentes y variantes
              (Fase 0.5)
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2 sm:pt-0">
            <span className="text-muted-foreground text-xs font-medium">
              Tema:
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* 1. Wordmark & LogoSlots */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              1. Identidad Visual (Wordmark y Logos)
            </h2>
            <Badge variant="outline" className="text-xs">
              Vectorial / SVG
            </Badge>
          </div>
          <Card className="border-border bg-card rounded-[12px]">
            <CardContent className="space-y-6 pt-6">
              <div>
                <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                  Wordmark (sm / md)
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="border-border bg-surface-subtle/40 rounded-lg border p-3">
                    <Wordmark size="sm" />
                    <span className="text-muted-foreground mt-2 block font-mono text-[10px]">
                      {'size="sm" (20px)'}
                    </span>
                  </div>
                  <div className="border-border bg-surface-subtle/40 rounded-lg border p-3">
                    <Wordmark size="md" />
                    <span className="text-muted-foreground mt-2 block font-mono text-[10px]">
                      {'size="md" (26px)'}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                  LogoSlot Placeholders
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <LogoSlot variant="ipn" />
                  <LogoSlot variant="upiicsa" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. Veredictos del Juez */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              2. Veredictos del Juez (VerdictBadge)
            </h2>
            <Badge variant="outline" className="text-xs">
              Español · Altura 26px · Radio 6px
            </Badge>
          </div>
          <Card className="border-border bg-card rounded-[12px]">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-surface-subtle/30 border-border/50 flex flex-col gap-1 rounded-md border p-2">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    ac (Aceptado)
                  </span>
                  <div>
                    <VerdictBadge verdict="ac" />
                  </div>
                </div>
                <div className="bg-surface-subtle/30 border-border/50 flex flex-col gap-1 rounded-md border p-2">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    wa (Respuesta incorrecta)
                  </span>
                  <div>
                    <VerdictBadge verdict="wa" />
                  </div>
                </div>
                <div className="bg-surface-subtle/30 border-border/50 flex flex-col gap-1 rounded-md border p-2">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    tle (Tiempo excedido)
                  </span>
                  <div>
                    <VerdictBadge verdict="tle" />
                  </div>
                </div>
                <div className="bg-surface-subtle/30 border-border/50 flex flex-col gap-1 rounded-md border p-2">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    mle (Memoria excedida)
                  </span>
                  <div>
                    <VerdictBadge verdict="mle" />
                  </div>
                </div>
                <div className="bg-surface-subtle/30 border-border/50 flex flex-col gap-1 rounded-md border p-2">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    re (Error de ejecución)
                  </span>
                  <div>
                    <VerdictBadge verdict="re" />
                  </div>
                </div>
                <div className="bg-surface-subtle/30 border-border/50 flex flex-col gap-1 rounded-md border p-2">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    ce (Error de compilación)
                  </span>
                  <div>
                    <VerdictBadge verdict="ce" />
                  </div>
                </div>
                <div className="bg-surface-subtle/30 border-border/50 flex flex-col gap-1 rounded-md border p-2">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    running (Evaluando…)
                  </span>
                  <div>
                    <VerdictBadge verdict="running" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. Bloques de Código y Ligaduras */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              3. Bloque de Código (CodeBlock)
            </h2>
            <Badge variant="outline" className="text-xs">
              JetBrains Mono · Ligaduras desactivadas
            </Badge>
          </div>
          <Card className="border-border bg-card rounded-[12px]">
            <CardContent className="space-y-4 pt-6">
              <CodeBlock
                filename="solucion.cpp"
                language="cpp"
                code={sampleCppCode}
              />
              <p className="text-muted-foreground text-xs">
                Nota: verifica visualmente que los operadores{' '}
                <code className="bg-code-inline-bg text-foreground rounded px-1.5 py-0.5 font-mono">
                  !=
                </code>{' '}
                y{' '}
                <code className="bg-code-inline-bg text-foreground rounded px-1.5 py-0.5 font-mono">
                  -&gt;
                </code>{' '}
                se muestren como caracteres individuales y no como glifos
                compuestos (≠ o →).
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 4. Callouts Editoriales */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              4. Callouts Editoriales
            </h2>
            <Badge variant="outline" className="text-xs">
              Definición · Ejemplo · Ojo
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Callout variant="definicion">
              Un <strong>apuntador</strong> es una variable que almacena la
              dirección de memoria de otra variable en el sistema.
            </Callout>
            <Callout variant="ejemplo">
              Declaración en C:{' '}
              <code className="bg-code-inline-bg rounded px-1 font-mono">
                int* ptr = &amp;x;
              </code>{' '}
              almacena la dirección de <code className="font-mono">x</code>.
            </Callout>
            <Callout variant="ojo">
              Acceder a un apuntador nulo (
              <code className="font-mono">nullptr</code>) provocará un error de
              ejecución inmediato (Segmentation Fault).
            </Callout>
          </div>
        </section>

        {/* 5. Tarjetas de Materia */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              5. Tarjetas de Materia (MateriaCard)
            </h2>
            <Badge variant="outline" className="text-xs">
              Un solo Link · Indicador de Estado
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <MateriaCard
              href="/materias/estructuras-de-datos"
              title="Estructuras de Datos"
              advisor="Prof. Nombre Apellido"
              statusText="1 tarea por entregar"
              statusVariant="pending"
            />
            <MateriaCard
              href="/materias/programacion-orientada-a-objetos"
              title="Programación Orientada a Objetos"
              advisor="Prof. Nombre Apellido"
              statusText="Al corriente"
              statusVariant="ok"
            />
          </div>
        </section>

        {/* 6. Estados Vacío y Carga */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              6. Estados Vacío y Carga
            </h2>
            <Badge variant="outline" className="text-xs">
              EmptyState &amp; SkeletonCard
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <EmptyState
              icon={FolderPlus}
              title="Sin materias asignadas"
              description="Aún no te has inscrito a ninguna materia. Introduce un código o consulta a tu asesor."
              action={<Button size="sm">Inscribir materia</Button>}
            />
            <div className="space-y-4">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </section>

        {/* 7. Navegación Compacta */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              7. Variante de Navegación Compacta (Lector / Problema)
            </h2>
            <Badge variant="outline" className="text-xs">
              {'TopNav variant="compact"'}
            </Badge>
          </div>
          <Card className="border-border bg-card overflow-hidden rounded-[12px]">
            <TopNav
              variant="compact"
              title="Problema 104 — Inversión de lista enlazada"
              backHref="/materias"
              backLabel="Volver a Materia"
              actions={<Button size="sm">Enviar solución</Button>}
            />
          </Card>
        </section>

        {/* 8. Botones y Controles de Formulario */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              8. Botones y Controles de Formulario
            </h2>
            <Badge variant="outline" className="text-xs">
              Texto blanco sobre botón primario en ambos temas
            </Badge>
          </div>
          <Card className="border-border bg-card rounded-[12px]">
            <CardContent className="space-y-6 pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default">Botón Primario</Button>
                <Button variant="secondary">Secundario</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructivo</Button>
                <Button variant="link">Enlace de acción</Button>
                <Button disabled>Deshabilitado</Button>
              </div>

              <Separator />

              <div className="grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-input">Entrada de texto</Label>
                  <Input id="demo-input" placeholder="alumno@alumno.ipn.mx" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="demo-disabled">Entrada deshabilitada</Label>
                  <Input id="demo-disabled" disabled value="Solo lectura" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 9. Muestra de Tokens de Color */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-xl font-bold tracking-tight">
              9. Paleta y Muestra de Tokens
            </h2>
            <Badge variant="outline" className="text-xs">
              Variables CSS
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3 md:grid-cols-6">
            <div className="border-border bg-background rounded-lg border p-3">
              <div className="font-semibold">background</div>
              <div className="text-muted-foreground text-[10px]">
                Lienzo principal
              </div>
            </div>
            <div className="border-border bg-card rounded-lg border p-3">
              <div className="font-semibold">card</div>
              <div className="text-muted-foreground text-[10px]">
                Superficie blanca / 1C1C1F
              </div>
            </div>
            <div className="border-border bg-surface-subtle rounded-lg border p-3">
              <div className="font-semibold">surface-subtle</div>
              <div className="text-muted-foreground text-[10px]">
                Fondo atenuado
              </div>
            </div>
            <div className="border-border bg-primary text-primary-foreground rounded-lg border p-3">
              <div className="font-semibold">primary</div>
              <div className="text-xs">Texto blanco</div>
            </div>
            <div className="border-border bg-card text-primary dark:text-primary-text rounded-lg border p-3">
              <div className="font-semibold">primary-text</div>
              <div className="text-[10px]">Guinda / E08AB0</div>
            </div>
            <div className="border-border bg-code-block-bg rounded-lg border p-3 font-mono">
              <div className="font-semibold">code-bg</div>
              <div className="text-muted-foreground text-[10px]">
                Fondo de código
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNav preview for mobile viewport */}
      <BottomNav currentPath="/materias" />
    </div>
  );
}
