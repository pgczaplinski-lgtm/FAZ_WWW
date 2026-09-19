import { Link, useParams } from "react-router-dom";
import { content } from "../../lib/content/index.ts";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { Section, SectionTitle, ButtonLink } from "../../components/ui/primitives.tsx";
import { ProjectCard } from "../../components/ui/cards.tsx";

export function ProjektDetail() {
  const { slug } = useParams();
  const project = slug ? content.getProject(slug) : undefined;

  if (!project) {
    return (
      <Section>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Nie znaleziono projektu</h1>
        <p className="mt-4 text-muted">
          Nie udało się odnaleźć projektu o podanym adresie.
        </p>
        <p className="mt-6">
          <Link to="/projekty" className="font-semibold text-brand">
            Wróć do listy projektów
          </Link>
        </p>
      </Section>
    );
  }

  const others = content
    .getProjects()
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  const badges = [project.funder, project.region, project.period].filter(Boolean);

  return (
    <>
      <PageHeader
        title={project.title}
        intro={project.excerpt}
        crumbs={[
          { label: "Strona główna", to: "/" },
          { label: "Projekty", to: "/projekty" },
          { label: project.title },
        ]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {project.image ? (
              <img
                src={project.image}
                alt=""
                className="mb-8 w-full max-h-[28rem] rounded-xl object-cover"
              />
            ) : null}
            <RichText blocks={project.body} />
          </div>
          <aside className="space-y-6">
            <div className="rounded-xl border border-line bg-surface p-6">
              <h2 className="text-lg font-bold text-ink">Założenia projektu</h2>
              {badges.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.funder && (
                    <span className="rounded-full bg-brand-light px-3 py-0.5 text-xs font-semibold text-brand">
                      {project.funder}
                    </span>
                  )}
                  {project.region && (
                    <span className="rounded-full border border-line bg-white px-3 py-0.5 text-xs font-medium text-muted">
                      {project.region}
                    </span>
                  )}
                  {project.period && (
                    <span className="rounded-full border border-line bg-white px-3 py-0.5 text-xs font-medium text-muted">
                      {project.period}
                    </span>
                  )}
                </div>
              )}
              {project.facts.length > 0 && (
                <dl className="mt-4 divide-y divide-line">
                  {project.facts.map((fact) => (
                    <div key={fact.label} className="flex flex-col gap-1 py-3">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                        {fact.label}
                      </dt>
                      <dd className="text-sm font-medium text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <div className="rounded-xl bg-brand-light p-6">
              <h2 className="text-lg font-bold text-ink">Chcesz wziąć udział w projekcie?</h2>
              <p className="mt-2 text-sm text-muted">
                Napisz do nas — chętnie opowiemy o rekrutacji i warunkach udziału.
              </p>
              <div className="mt-4">
                <ButtonLink to="/kontakt">Skontaktuj się z nami</ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>
      {others.length > 0 && (
        <Section muted>
          <SectionTitle className="mb-8">Zobacz inne projekty</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
