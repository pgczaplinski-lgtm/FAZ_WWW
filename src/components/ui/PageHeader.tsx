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
    <header>
      <Container className="pt-6 sm:pt-8">
        <div className="rounded-xl bg-brand px-6 py-12 text-white sm:px-10 sm:py-16">
          {crumbs && crumbs.length > 0 && (
            <div className="mb-4 text-sm text-white/80">
              <Breadcrumbs crumbs={crumbs} light />
            </div>
          )}
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg text-white/90">{intro}</p>}
          {children}
        </div>
      </Container>
    </header>
  );
}
