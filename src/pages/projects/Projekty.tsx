import { useState } from "react";
import { content } from "../../lib/content/index.ts";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { ProjectCard } from "../../components/ui/cards.tsx";

type Filter = "all" | "active" | "finished";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "active", label: "Aktywne" },
  { id: "finished", label: "Zakończone" },
];

export function Projekty() {
  const [filter, setFilter] = useState<Filter>("all");
  const active = content.getProjects("active");
  const finished = content.getProjects("finished");
  const showActive = filter === "all" || filter === "active";
  const showFinished = filter === "all" || filter === "finished";

  return (
    <>
      <PageHeader
        title="Działalność"
        intro="Poznaj projekty, które realizujemy oraz te, które już zakończyliśmy."
      />
      <Section>
        <div
          role="group"
          aria-label="Filtruj projekty"
          className="mb-10 flex flex-wrap gap-2"
        >
          {FILTERS.map((opt) => {
            const selected = filter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(opt.id)}
                className={
                  selected
                    ? "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
                    : "rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink"
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {showActive && (
          <div className={showFinished ? "mb-16" : ""}>
            <SectionTitle className="mb-8">Aktualne projekty</SectionTitle>
            {active.length === 0 ? (
              <p className="text-muted">Brak aktualnych projektów.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {active.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )}
          </div>
        )}

        {showFinished && (
          <div>
            <SectionTitle className="mb-8">Zrealizowane projekty</SectionTitle>
            {finished.length === 0 ? (
              <p className="text-muted">Brak zrealizowanych projektów.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {finished.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
}
