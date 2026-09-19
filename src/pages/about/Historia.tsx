import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { content } from "../../lib/content/index.ts";

export function Historia() {
  const stats = content.getStats();
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

  return (
    <>
      <PageHeader
        title="Historia"
        intro="Kalendarium Fundacji Aktywności Zawodowej — od powstania w 2008 roku po dzisiejsze programy aktywizacji zawodowej i społecznej."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "Historia" }]}
      />

      <Section>
        <SectionTitle>Nasza droga</SectionTitle>
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
              <span
                className="absolute -left-[2.45rem] top-1.5 h-4 w-4 rounded-full bg-brand"
                aria-hidden
              />
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">{item.year}</p>
              <h3 className="mt-1 text-xl font-bold text-ink">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
