import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">
            UPIICSCode
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base sm:text-lg">
            Plataforma educativa para la comunidad de informática de la UPIICSA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 text-sm sm:text-base">
            Aprende teoría por materia, gestiona tus clases virtuales y practica
            programación con retroalimentación automática en tiempo real.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button disabled size="lg" className="w-full sm:w-auto">
            Próximamente
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
