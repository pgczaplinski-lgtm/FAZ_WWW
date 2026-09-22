import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { StatsStrip } from "../../components/ui/StatsStrip.tsx";
import { ButtonLink, Container, Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { content } from "../../lib/content/index.ts";

const mission = [
  "Fundacja Aktywności Zawodowej wspiera przede wszystkim osoby z\u00a0niepełnosprawnościami w\u00a0rozwoju zawodowym, rehabilitacji oraz\u00a0pełniejszym uczestnictwie w\u00a0życiu społecznym.",
  "Organizujemy giełdy pracy, prowadzimy doradztwo zawodowe i\u00a0prawne oraz\u00a0szkolenia dla pracodawców i\u00a0Warsztatów Terapii Zajęciowej.",
  "Jesteśmy organizacją pożytku publicznego. Działamy non profit i\u00a0nie\u00a0prowadzimy działalności gospodarczej.",
];

const TOPICS = [
  { id: "all", label: "Wszystkie" },
  { id: "kim-jestesmy", label: "Kim jesteśmy" },
  { id: "zespol", label: "Zespół" },
  { id: "historia", label: "Historia" },
  { id: "statut-fundacji", label: "Statut" },
  { id: "sprawozdania", label: "Sprawozdania" },
  { id: "deklaracja-roznorodnosci", label: "Deklaracja różnorodności" },
  { id: "deklaracja-dostepnosci", label: "Deklaracja dostępności" },
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

const statuteBlocks = [
  { type: "heading" as const, text: "Postanowienia ogólne" },
  {
    type: "paragraph" as const,
    text: "Statut określa nazwę, siedzibę i charakter Fundacji Aktywności Zawodowej jako niezależnej organizacji non profit, działającej na rzecz osób zagrożonych wykluczeniem na rynku pracy. Fundacja nie prowadzi działalności gospodarczej i działa jako organizacja pożytku publicznego.",
  },
  { type: "heading" as const, text: "Cele Fundacji" },
  {
    type: "paragraph" as const,
    text: "Celem jest aktywizacja zawodowa i społeczna osób z niepełnosprawnościami oraz innych osób w trudnej sytuacji na rynku pracy. Fundacja dąży do zwiększenia ich samodzielności, udziału w życiu społecznym i szans na godne zatrudnienie.",
  },
  { type: "heading" as const, text: "Sposoby realizacji celów" },
  {
    type: "paragraph" as const,
    text: "Cele realizowane są przez doradztwo zawodowe i prawne, szkolenia, staże, giełdy pracy, współpracę z pracodawcami i Warsztatami Terapii Zajęciowej oraz projekty finansowane ze środków publicznych i prywatnych. Działania prowadzone są z poszanowaniem godności uczestników i zasady równego traktowania.",
  },
  { type: "heading" as const, text: "Organy Fundacji" },
  {
    type: "paragraph" as const,
    text: "Statut przewiduje Zarząd, który prowadzi sprawy Fundacji i reprezentuje ją na zewnątrz, oraz Radę Fundacji, która sprawuje nadzór i wspiera strategię. Skład organów i zasady ich powoływania określa pełny tekst statutu.",
  },
  { type: "heading" as const, text: "Majątek Fundacji" },
  {
    type: "paragraph" as const,
    text: "Majątek tworzą środki przekazane przez fundatorów, darowizny, dotacje, 1,5% podatku oraz inne wpływy zgodne z prawem. Środki przeznaczane są wyłącznie na cele statutowe. Zasady gospodarki finansowej i sprawozdawczości wynikają z przepisów o organizacjach pożytku publicznego.",
  },
];

const reports = [
  { year: "2023", title: "Sprawozdanie za 2023" },
  { year: "2022", title: "Sprawozdanie za 2022" },
  { year: "2021", title: "Sprawozdanie za 2021" },
];

const diversityBlocks = [
  {
    type: "paragraph" as const,
    text: "Fundacja Aktywności Zawodowej stoi po stronie różnorodności, równych szans i niedyskryminacji — zarówno w projektach dla uczestników, jak i wewnątrz własnego zespołu. Włączanie osób z niepełnosprawnościami jest częścią naszej misji, a nie dodatkiem do niej.",
  },
  {
    type: "paragraph" as const,
    text: "Odrzucamy dyskryminację ze względu na niepełnosprawność, stan zdrowia, wiek, płeć, pochodzenie, religię, orientację seksualną, sytuację rodzinną czy status na rynku pracy. Każda osoba ma prawo do szacunku, rzetelnej informacji i realnej szansy na rozwój zawodowy.",
  },
  { type: "heading" as const, text: "Nasze zobowiązania" },
  {
    type: "list" as const,
    items: [
      "Tworzymy zespół i programy otwarte na osoby z różnymi rodzajami niepełnosprawności i doświadczeniem życiowym.",
      "Dbamy o równy dostęp do rekrutacji, szkoleń, staży i ofert pracy — bez barier formalnych, które nie wynikają z wymagań stanowiska.",
      "Przeciwdziałamy dyskryminacji i mobbingowi; zgłoszenia traktujemy poważnie i poufnie.",
      "Współpracujemy z pracodawcami tak, by miejsca pracy były dostępne i przyjazne.",
      "Uczymy się i poprawiamy praktyki, gdy ktoś wskaże nam lukę lub barierę.",
    ],
  },
];

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
  const phone = org.phones[0];

  const currentYear = stats.find((g) => /bieżącym/i.test(g.period));
  const since2008 = stats.find((g) => /2008/.test(g.period));
  const employed2024 = currentYear?.stats.find((s) => /zatrudn/i.test(s.label))?.value ?? "127";
  const participants2024 = currentYear?.stats.find((s) => /uczestnik/i.test(s.label))?.value ?? "240";
  const employedTotal = since2008?.stats.find((s) => /zatrudn/i.test(s.label))?.value ?? "435";
  const participantsTotal = since2008?.stats.find((s) => /uczestnik/i.test(s.label))?.value ?? "643";

  const milestones = [
    {
      year: "2008",
      title: "Powstanie Fundacji",
      text: "Fundacja Aktywności Zawodowej rozpoczyna działalność. Od początku stawiamy na indywidualne podejście do osób w trudnej sytuacji na rynku pracy, zwłaszcza osób z niepełnosprawnościami.",
    },
    {
      year: "2015",
      title: "Rozwój programów aktywizacji",
      text: "Rozwijamy programy i projekty, które pomagają uczestnikom odnaleźć swoją drogę zawodową — doradztwo, szkolenia, staże i współpracę z pracodawcami.",
    },
    {
      year: currentYear?.period ?? "W bieżącym roku",
      title: "Rok pełen rezultatów",
      text: `W jednym roku ${employed2024} osób znalazło zatrudnienie, a ${participants2024} uczestniczyło w naszych działaniach.`,
    },
    {
      year: since2008?.period ?? "od 2008",
      title: "Łączny bilans",
      text: `Od początku działalności łącznie ${employedTotal} zatrudnionych i ${participantsTotal} uczestników programów Fundacji.`,
    },
  ];

  const accessibilityBlocks = [
    {
      type: "paragraph" as const,
      text: `Serwis internetowy ${org.name} stara się spełniać wymagania WCAG 2.1 na poziomie AA. Strona jest zbudowana semantycznie, działa z klawiatury i nie opiera komunikacji wyłącznie na kolorze.`,
    },
    { type: "heading" as const, text: "Ułatwienia na tej stronie" },
    {
      type: "list" as const,
      items: [
        "Pasek dostępności: zmiana kontrastu, powiększenie czcionki i podkreślenie odnośników.",
        "Nawigacja z klawiatury — logiczna kolejność fokusu i widoczny stan focus.",
        "Nagłówki, listy i etykiety formularzy zgodne z rolą treści.",
        "Teksty alternatywne przy treściach graficznych, gdy obraz niesie informację.",
      ],
    },
    { type: "heading" as const, text: "Zgłoś problem z dostępnością" },
    {
      type: "paragraph" as const,
      text: `Jeśli natrafisz na barierę, napisz na ${org.email}${phone ? ` lub zadzwoń pod ${phone}` : ""}. Opisz stronę, urządzenie i to, co utrudnia korzystanie — odpowiemy i poprawimy serwis, gdy to możliwe.`,
    },
  ];

  const selectTopic = (id: TopicId) => {
    navigate({ pathname: "/o-nas", hash: id === "all" ? "" : id }, { replace: true });
  };

  return (
    <>
      <PageHeader
        title="O nas"
        intro="Wierzymy, że każdy zasługuje na szansę rozwoju zawodowego. Zapewniamy wsparcie, które pozwala na rozwój umiejętności i zdobycie wymarzonej pracy. Z nami każdy może osiągnąć sukces."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "O nas" }]}
      />

      <div className="border-b border-line bg-white">
        <Container className="flex flex-wrap gap-2 py-4">
          <div role="group" aria-label="Tematy" className="flex flex-wrap gap-2">
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
                      ? "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white"
                      : "rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink"
                  }
                >
                  {opt.label}
                </button>
              );
            })}
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
              {mission.map((text) => (
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
            <RichText
              blocks={[
                {
                  type: "paragraph",
                  text: "Działamy od 2008 roku, wspierając osoby w trudnej sytuacji na rynku pracy, zwłaszcza osoby z niepełnosprawnościami. Od początku stawiamy na indywidualne podejście, rozwijając programy i projekty, które pomagają uczestnikom odnaleźć swoją drogę zawodową. Po ponad 15 latach działalności nadal realizujemy naszą misję, wspierając aktywizację zawodową i społeczną.",
                },
              ]}
            />
          </div>
          <ol className="relative mt-12 space-y-8 border-l-2 border-brand pl-8">
            {milestones.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[2.45rem] top-1.5 h-4 w-4 rounded-full bg-brand" aria-hidden />
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">{item.year}</p>
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
            <RichText blocks={statuteBlocks} />
          </div>
          <p className="mt-10">
            <a
              href="#"
              title="Dokument będzie dostępny wkrótce"
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center justify-center rounded-md border-2 border-brand px-6 py-3 text-sm font-semibold text-brand opacity-60"
              onClick={(e) => e.preventDefault()}
            >
              Pobierz pełny statut (PDF)
            </a>
          </p>
        </Section>
      )}

      {show("sprawozdania") && (
        <Section muted={topic === "all"}>
          <SectionTitle>Sprawozdania</SectionTitle>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            Fundacja Aktywności Zawodowej jest organizacją pożytku publicznego. Co roku składamy sprawozdania
            merytoryczne i finansowe z działalności — poniżej zestawienie ostatnich lat. Pliki PDF zostaną
            uzupełnione, gdy będą dostępne na tej stronie.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <li key={report.year} className="flex flex-col rounded-xl border border-brand bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">OPP · {report.year}</p>
                <h3 className="mt-2 text-lg font-bold text-ink">{report.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">
                  Sprawozdanie merytoryczne i finansowe organizacji pożytku publicznego za rok {report.year}.
                </p>
                <a
                  href="#"
                  title="Dokument będzie dostępny wkrótce"
                  aria-disabled="true"
                  className="mt-4 text-sm font-semibold text-brand"
                  onClick={(e) => e.preventDefault()}
                >
                  Pobierz PDF
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {show("deklaracja-roznorodnosci") && (
        <Section>
          <SectionTitle>Deklaracja różnorodności</SectionTitle>
          <div className="mt-6 max-w-3xl">
            <RichText blocks={diversityBlocks} />
          </div>
        </Section>
      )}

      {show("deklaracja-dostepnosci") && (
        <Section muted={topic === "all"}>
          <SectionTitle>Deklaracja dostępności</SectionTitle>
          <div className="mt-6 max-w-3xl">
            <RichText blocks={accessibilityBlocks} />
            <p className="mt-6 text-muted">
              E-mail:{" "}
              <a className="font-semibold text-brand underline" href={`mailto:${org.email}`}>
                {org.email}
              </a>
              {phone ? (
                <>
                  {" "}
                  · telefon:{" "}
                  <a className="font-semibold text-brand underline" href={`tel:${phone.replace(/\s+/g, "")}`}>
                    {phone}
                  </a>
                </>
              ) : null}
            </p>
          </div>
        </Section>
      )}

      {show("dolacz-do-nas") && (
        <Section>
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
