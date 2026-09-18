import type { ReactNode } from "react";
import { Container } from "./primitives.tsx";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs.tsx";

export function PageHeader({
  title,
  intro,
  crumbs,
  children,
}: {
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="bg-brand text-white">
      <Container className="py-12 sm:py-16">
        {crumbs && crumbs.length > 0 && (
          <div className="mb-4 text-sm text-white/80">
            <Breadcrumbs crumbs={crumbs} light />
          </div>
        )}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/90">{intro}</p>}
        {children}
      </Container>
    </header>
  );
}
