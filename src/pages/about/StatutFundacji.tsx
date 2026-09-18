import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";

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

export function StatutFundacji() {
  return (
    <>
      <PageHeader
        title="Statut Fundacji"
        intro="Skrót najważniejszych postanowień statutu Fundacji Aktywności Zawodowej — cele, organy i majątek organizacji."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "Statut Fundacji" }]}
      />

      <Section>
        <SectionTitle>Zarys statutu</SectionTitle>
        <p className="mt-4 max-w-3xl text-muted">
          Poniższy opis jest autorskim, skróconym omówieniem typowych rozdziałów statutu fundacji
          zajmującej się aktywizacją zawodową osób z niepełnosprawnościami. Nie zastępuje pełnego
          dokumentu prawnego.
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
    </>
  );
}
