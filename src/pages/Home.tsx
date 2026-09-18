import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { content } from "../lib/content/index.ts";
import { ProjectCard } from "../components/ui/cards.tsx";
import { ButtonLink, Container, Section, SectionTitle } from "../components/ui/primitives.tsx";

const HERO_COUNT = 4;
const SLIDE_MS = 6000;

export function Home() {
  const slides = content.getNews().slice(0, HERO_COUNT);
  const statGroups = content.getStats();
  const projects = content.getProjects("active");
  const stories = content.getStories();

  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  const current = slides[index];
  const go = (delta: number) => {
    if (count === 0) return;
    setIndex((i) => (i + delta + count) % count);
  };

  return (
    <>
      <section aria-label="Aktualności">
        <Container className="pt-4">
          {current ? (
            <div className="relative overflow-hidden rounded-xl bg-brand-light">
              {current.image ? (
                <>
                  <img
                    src={current.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white from-15% via-white/80 via-45% to-transparent" />
                </>
              ) : null}
              <div className="relative flex min-h-[22rem] flex-col items-start justify-center px-14 py-16 sm:min-h-[28rem] sm:px-16 sm:py-24">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">Aktualności</p>
                <h1 className="mt-3 max-w-xl text-[1.3125rem] font-extrabold leading-snug tracking-tight text-ink sm:text-[2.1rem]">
                  {current.title}
                </h1>
                <div className="mt-8">
                  <ButtonLink to={`/aktualnosci/${current.slug}`} variant="solid">
                    Dowiedz się więcej
                  </ButtonLink>
                </div>
              </div>
              {count > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Poprzedni slajd"
                    onClick={() => go(-1)}
                    className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand shadow-sm hover:bg-white"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Następny slajd"
                    onClick={() => go(1)}
                    className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand shadow-sm hover:bg-white"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2" role="tablist" aria-label="Slajdy">
                    {slides.map((post, i) => (
                      <button
                        key={post.slug}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        aria-label={`Slajd ${i + 1}: ${post.title}`}
                        onClick={() => setIndex(i)}
                        className={`h-2.5 rounded-full transition-all ${
                          i === index ? "w-8 bg-brand" : "w-2.5 bg-brand/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : null}
          <Link
            to="/aktualnosci"
            className="mt-3 block rounded-xl bg-brand py-3 text-center text-sm font-bold tracking-widest text-white hover:bg-brand-dark"
          >
            POZOSTAŁE AKTUALNOŚCI
          </Link>
        </Container>
      </section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src="/images/home/kim-jestesmy.jpg"
            alt="Zespół Fundacji Aktywności Zawodowej"
            className="aspect-[4/3] w-full rounded-xl object-cover"
          />
          <div>
            <SectionTitle>Kim jesteśmy?</SectionTitle>
            <div className="mt-6 space-y-4 text-muted leading-relaxed">
              <p>
                Fundacja Aktywności Zawodowej wspiera przede wszystkim osoby z niepełnosprawnościami w
                rozwoju zawodowym, rehabilitacji oraz pełniejszym uczestnictwie w życiu społecznym.
              </p>
              <p>
                Organizujemy giełdy pracy, prowadzimy doradztwo zawodowe i prawne oraz szkolenia dla
                pracodawców i Warsztatów Terapii Zajęciowej. Angażujemy się także w działania dobroczynne i
                humanitarne.
              </p>
              <p>Jesteśmy organizacją pożytku publicznego. Działamy non profit i nie prowadzimy działalności gospodarczej.</p>
            </div>
            <div className="mt-8">
              <ButtonLink to="/historia" variant="outline">
                Poznaj naszą historię
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionTitle centered>Nasze sukcesy</SectionTitle>
        <div className="mt-12 space-y-12">
          {statGroups.map((group) => (
            <div key={group.period}>
              <h3 className="text-center text-lg font-semibold text-ink">{group.period}</h3>
              <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {group.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-4xl font-extrabold text-brand sm:text-5xl">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle centered>Jakie projekty obecnie prowadzimy?</SectionTitle>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink to="/projekty" variant="solid">
            Zobacz wszystkie projekty
          </ButtonLink>
        </div>
      </Section>

      <Section muted>
        <SectionTitle centered>Poznaj historie uczestników projektów</SectionTitle>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <img
            src="/images/home/historie-uczestnikow.jpg"
            alt=""
            className="w-full rounded-xl object-cover"
          />
          <div className="grid gap-6">
            {stories.map((story) => (
              <blockquote
                key={story.name}
                className="flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm"
              >
                {story.photo ? (
                  <img src={story.photo} alt="" className="mb-4 h-16 w-16 rounded-full object-cover" />
                ) : null}
                <p className="text-sm font-bold text-ink">{story.name}</p>
                <p className="mt-1 text-xs font-semibold text-brand">{story.tags}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">„{story.quote}”</p>
              </blockquote>
            ))}
          </div>
        </div>
      </Section>

      <section className="py-8 sm:py-10">
        <Container>
          <div className="flex flex-col items-center rounded-xl bg-brand px-6 py-14 text-center text-white sm:px-10 sm:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Wesprzyj naszą działalność
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink
                to="/przekaz-darowizne"
                variant="solid"
                className="bg-white text-brand hover:bg-brand-light hover:text-brand"
              >
                Przekaż darowiznę
              </ButtonLink>
              <ButtonLink
                to="/kontakt"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand"
              >
                Kontakt
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
