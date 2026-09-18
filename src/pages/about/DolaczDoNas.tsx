import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { ButtonLink, Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { content } from "../../lib/content/index.ts";

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

export function DolaczDoNas() {
  const org = content.getOrgInfo();

  return (
    <>
      <PageHeader
        title="Dołącz do nas"
        intro="Chcesz dołączyć do naszego zespołu lub zostać wolontariuszem?"
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "Dołącz do nas" }]}
      />

      <Section>
        <SectionTitle>Zaproszenie</SectionTitle>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          Fundacja Aktywności Zawodowej rośnie razem z ludźmi, którzy wierzą, że każdy zasługuje na
          szansę rozwoju. Jeśli chcesz wspierać osoby z niepełnosprawnościami w drodze do pracy —
          dołącz jako wolontariusz, praktykant, partner lub członek zespołu.
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
    </>
  );
}
