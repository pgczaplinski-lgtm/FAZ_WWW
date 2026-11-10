import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { StatsStrip } from "../../components/ui/StatsStrip.tsx";
import { ButtonLink, Container, Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { content } from "../../lib/content/index.ts";

const TOPICS = [
  { id: "all", label: "Wszystkie" },
  { id: "kim-jestesmy", label: "Kim jesteśmy" },
  { id: "zespol", label: "Zespół" },
  { id: "historia", label: "Historia" },
  { id: "statut-fundacji", label: "Statut" },
  { id: "sprawozdania", label: "Sprawozdania" },
  { id: "dolacz-do-nas", label: "Dołącz do nas" },
] as const;

type TopicId = (typeof TOPICS)[number]["id"];

function isTopicId(value: string): value is TopicId {
  return TOPICS.some((t) => t.id === value);
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toLocaleUpperCase("pl-PL");
}

const ways = [
  {
    title: "Wolontariat",
    text: "Wesprzyj giełdy pracy, warsztaty i działania terenowe. Szukamy osób, które chcą towarzyszyć uczestnikom i pomagać w organizacji wydarzeń.",
  },
  {
    title: "Praktyki i staże",
    text: "Oferujemy praktyki i staże w doradztwie, pośrednictwie pracy, komunikacji i administracji projektów — także osobom wchodzącym na rynek pracy.",
  },
  {
    title: "Współpraca",
    text: "Zapraszamy pracodawców, WTZ, instytucje i organizacje partnerskie do wspólnych projektów, szkoleń i rekrutacji włączających.",
  },
  {
    title: "Praca",
    text: "Gdy otwieramy rekrutację, szukamy osób do zespołu merytorycznego i administracyjnego. Napisz do nas — opowiemy, co jest aktualne.",
  },
];

export function ONas() {
  const navigate = useNavigate();
  const location = useLocation();
  const hash = location.hash.replace(/^#/, "");
  const topic: TopicId = isTopicId(hash) ? hash : "all";
  const show = (id: TopicId) => topic === "all" || topic === id;

  const stats = content.getStats();
  const team = content.getTeam();
  const org = content.getOrgInfo();
  const about = content.getAbout();
  const history = content.getHistory();
  const statute = content.getStatute();
  const reports = content.getReports();

  const selectTopic = (id: TopicId) => {
    navigate({ pathname: "/o-nas", hash: id === "all" ? "" : id }, { replace: true });
  };

  if (hash === "deklaracja-dostepnosci") return <Navigate to="/deklaracja-dostepnosci" replace />;

  return (
    <>
      <PageHeader
        title="O nas"
        intro="Wierzymy, że każdy zasługuje na szansę rozwoju zawodowego. Zapewniamy wsparcie, które pozwala na rozwój umiejętności i zdobycie wymarzonej pracy. Z nami każdy może osiągnąć sukces."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "O nas" }]}
      />

      <div className="border-b border-line bg-white">
        <Container className="py-4">
          <div role="group" aria-label="Tematy" className="grid grid-cols-8 gap-1.5 sm:gap-2">
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
            <Link
              to="/deklaracja-dostepnosci"
              className="flex min-h-[3.5rem] items-center justify-center rounded-lg border border-line bg-surface px-1.5 py-2 text-center text-[11px] font-semibold leading-tight text-ink underline sm:px-2 sm:text-sm"
            >
              Deklaracja dostępności
            </Link>
          </div>
        </Container>
      </div>

      {show("kim-jestesmy") && (
        <>
          <Section>
            <SectionTitle>Kim jesteśmy</SectionTitle>
            <img
              src="/images/home/kim-jestesmy.jpg"
              alt="Zespół Fundacji Aktywności Zawodowej"
              className="mt-8 aspect-[16/7] w-full rounded-xl object-cover"
            />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {about.map((text) => (
                <p key={text} className="rounded-xl border border-brand bg-surface p-6 leading-relaxed text-muted">
                  {text}
                </p>
              ))}
            </div>
          </Section>
          <Section muted>
            <SectionTitle>Nasze sukcesy</SectionTitle>
            <StatsStrip groups={stats} />
          </Section>
        </>
      )}

      {show("zespol") && (
        <Section>
          <SectionTitle>Zespół</SectionTitle>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <li key={member.name} className="flex items-center gap-4 rounded-xl border border-brand bg-white p-5">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-full object-cover object-top"
                  />
                ) : (
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand"
                    aria-hidden
                  >
                    {initials(member.name)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-ink">{member.name}</p>
                  <p className="text-sm text-muted">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {show("historia") && (
        <Section muted={topic === "all"}>
          <SectionTitle>Historia</SectionTitle>
          <div className="mt-6 max-w-3xl">
            <RichText blocks={[{ type: "paragraph", text: history.intro }]} />
          </div>
          <ol className="relative mt-12 space-y-8 border-l-2 border-brand pl-8">
            {history.events.map((item) => (
              <li key={`${item.date}-${item.title}`} className="relative">
                <span className="absolute -left-[2.45rem] top-1.5 h-4 w-4 rounded-full bg-brand" aria-hidden />
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">{item.date.slice(0, 4)}</p>
                <h3 className="mt-1 text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {show("statut-fundacji") && (
        <Section>
          <SectionTitle>Statut Fundacji</SectionTitle>
          <p className="mt-4 max-w-3xl text-muted">
            Poniższy opis jest autorskim, skróconym omówieniem typowych rozdziałów statutu fundacji zajmującej
            się aktywizacją zawodową osób z niepełnosprawnościami. Nie zastępuje pełnego dokumentu prawnego.
          </p>
          <div className="mt-8 max-w-3xl">
            <RichText
              headingLevel={3}
              blocks={statute.sections.flatMap((s) => [
                { type: "heading" as const, text: s.title },
                { type: "paragraph" as const, text: s.text },
              ])}
            />
          </div>
          <p className="mt-10">
            {statute.pdfUrl ? (
              <a
                href={statute.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border-2 border-brand px-6 py-3 text-sm font-semibold text-brand hover:bg-brand hover:text-white"
              >
                Pobierz pełny statut (PDF)
              </a>
            ) : (
              <a
                href="#"
                title="Dokument będzie dostępny wkrótce"
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center justify-center rounded-md border-2 border-brand px-6 py-3 text-sm font-semibold text-brand opacity-60"
                onClick={(e) => e.preventDefault()}
              >
                Pobierz pełny statut (PDF)
              </a>
            )}
          </p>
        </Section>
      )}

      {show("sprawozdania") && (
        <Section muted={topic === "all"}>
          <SectionTitle>Sprawozdania</SectionTitle>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            Fundacja Aktywności Zawodowej jest organizacją pożytku publicznego. Co roku składamy sprawozdania
            merytoryczne i finansowe z działalności — poniżej zestawienie ostatnich lat.
          </p>
          {reports.length === 0 ? (
            <p className="mt-8 rounded-xl border border-line bg-white p-6 text-muted">
              Sprawozdania zostaną opublikowane na tej stronie wkrótce.
            </p>
          ) : (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <li
                  key={`${report.year}-${report.title}`}
                  className="flex flex-col rounded-xl border border-brand bg-white p-6"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand">OPP · {report.year}</p>
                  <h3 className="mt-2 text-lg font-bold text-ink">{report.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">
                    Sprawozdanie merytoryczne i finansowe organizacji pożytku publicznego za rok {report.year}.
                  </p>
                  {report.pdfUrl ? (
                    <a
                      href={report.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-sm font-semibold text-brand underline"
                    >
                      Pobierz PDF
                    </a>
                  ) : (
                    <a
                      href="#"
                      title="Dokument będzie dostępny wkrótce"
                      aria-disabled="true"
                      className="mt-4 text-sm font-semibold text-brand"
                      onClick={(e) => e.preventDefault()}
                    >
                      Pobierz PDF
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}

      {show("dolacz-do-nas") && (
        <Section muted={topic === "all"}>
          <SectionTitle>Dołącz do nas</SectionTitle>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            Fundacja Aktywności Zawodowej rośnie razem z ludźmi, którzy wierzą, że każdy zasługuje na szansę
            rozwoju. Jeśli chcesz wspierać osoby z niepełnosprawnościami w drodze do pracy — dołącz jako
            wolontariusz, praktykant, partner lub członek zespołu.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {ways.map((way) => (
              <li key={way.title} className="rounded-xl border border-brand bg-surface p-6">
                <h3 className="text-lg font-bold text-ink">{way.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{way.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink to="/kontakt">Skontaktuj się z nami</ButtonLink>
            <ButtonLink to={`mailto:${org.email}`} external variant="outline">
              Napisz na {org.email}
            </ButtonLink>
          </div>
        </Section>
      )}
    </>
  );
}
