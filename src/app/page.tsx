import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wordmark } from '@/components/wordmark';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-lg rounded-[12px] border border-border bg-card text-center shadow-none">
        <CardHeader className="space-y-2">
          <div className="flex justify-center pb-2">
            <Wordmark size="md" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            UPIICSCode
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground sm:text-lg">
            Plataforma educativa para la comunidad de informática de la UPIICSA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
            Aprende teoría por materia, gestiona tus clases virtuales y practica
            programación con retroalimentación automática en tiempo real.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pt-2">
          <Button disabled size="lg" className="w-full sm:w-auto">
            Próximamente
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
