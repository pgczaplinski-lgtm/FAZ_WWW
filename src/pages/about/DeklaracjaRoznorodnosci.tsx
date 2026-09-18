import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";

const blocks = [
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

export function DeklaracjaRoznorodnosci() {
  return (
    <>
      <PageHeader
        title="Deklaracja różnorodności"
        intro="Równe szanse, niedyskryminacja i włączanie osób z niepełnosprawnościami w zespole Fundacji i w naszych działaniach."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "Deklaracja różnorodności" }]}
      />

      <Section>
        <SectionTitle>Nasze stanowisko</SectionTitle>
        <div className="mt-6 max-w-3xl">
          <RichText blocks={blocks} />
        </div>
      </Section>
    </>
  );
}
