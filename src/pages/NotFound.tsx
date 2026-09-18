import { ButtonLink, Container } from "../components/ui/primitives.tsx";

export function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl font-extrabold tracking-tight text-brand sm:text-8xl">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-ink">Nie znaleziono strony</h1>
      <p className="mt-3 max-w-md text-muted">
        Adres, którego szukasz, nie istnieje albo został przeniesiony. Wróć na stronę główną i
        spróbuj ponownie.
      </p>
      <div className="mt-8">
        <ButtonLink to="/">Wróć na stronę główną</ButtonLink>
      </div>
    </Container>
  );
}
