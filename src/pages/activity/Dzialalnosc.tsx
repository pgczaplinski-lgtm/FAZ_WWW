import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { content } from "../../lib/content/index.ts";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { Container, Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { NewsCard, ProjectCard } from "../../components/ui/cards.tsx";

const TOPICS = [
  { id: "all", label: "Wszystkie informacje" },
  { id: "projekty-aktualne", label: "Projekty aktualne" },
  { id: "projekty-zrealizowane", label: "Projekty zrealizowane" },
  { id: "aktualnosci", label: "Aktualności" },
] as const;

type TopicId = (typeof TOPICS)[number]["id"];

function isTopicId(value: string): value is TopicId {
  return TOPICS.some((t) => t.id === value);
}

const NEWS_PAGE_SIZE = 9;

export function Dzialalnosc() {
  const navigate = useNavigate();
  const location = useLocation();
  const hash = location.hash.replace(/^#/, "");
  const topic: TopicId = isTopicId(hash) ? hash : "all";
  const show = (id: TopicId) => topic === "all" || topic === id;

  const active = content.getProjects("active");
  const finished = content.getProjects("finished");
  const news = content.getNews();

  const [visibleNews, setVisibleNews] = useState(NEWS_PAGE_SIZE);
  const shownNews = news.slice(0, visibleNews);
  const hasMoreNews = visibleNews < news.length;

  const selectTopic = (id: TopicId) => {
    navigate({ pathname: "/dzialalnosc", hash: id === "all" ? "" : id }, { replace: true });
  };

  return (
    <>
      <PageHeader
        title="Działalność"
        intro="Poznaj projekty, które realizujemy i te już zakończone, oraz śledź nasze bieżące aktualności."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "Działalność" }]}
      />

      <div className="border-b border-line bg-white">
        <Container className="py-4">
          <div role="group" aria-label="Tematy" className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
            {TOPICS.map((opt) => {
              const selected = topic === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectTopic(opt.id)}
                  className={
                    selected
                      ? "flex min-h-[3.5rem] items-center justify-center rounded-lg bg-brand px-1.5 py-2 text-center text-[11px] font-semibold leading-tight text-white sm:px-2 sm:text-sm"
                      : "flex min-h-[3.5rem] items-center justify-center rounded-lg border border-line bg-surface px-1.5 py-2 text-center text-[11px] font-semibold leading-tight text-ink sm:px-2 sm:text-sm"
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {show("projekty-aktualne") && (
        <Section>
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
        </Section>
      )}

      {show("projekty-zrealizowane") && (
        <Section muted={topic === "all"}>
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
        </Section>
      )}

      {show("aktualnosci") && (
        <Section>
          <SectionTitle className="mb-8">Aktualności</SectionTitle>
          {shownNews.length === 0 ? (
            <p className="text-muted">Brak aktualności.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shownNews.map((post) => (
                <NewsCard key={post.slug} post={post} />
              ))}
            </div>
          )}
          {hasMoreNews && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleNews((n) => n + NEWS_PAGE_SIZE)}
                className="rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Pokaż więcej
              </button>
            </div>
          )}
        </Section>
      )}
    </>
  );
}
