import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { content } from "../../lib/content/index.ts";

export function DeklaracjaDostepnosci() {
  const org = content.getOrgInfo();
  const phone = org.phones[0];

  const blocks = [
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

  return (
    <>
      <PageHeader
        title="Deklaracja dostępności"
        intro="Jak dbamy o dostępność serwisu Fundacji Aktywności Zawodowej i jak zgłosić utrudnienia."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "Deklaracja dostępności" }]}
      />

      <Section>
        <SectionTitle>Dostępność cyfrowa</SectionTitle>
        <div className="mt-6 max-w-3xl">
          <RichText blocks={blocks} />
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
    </>
  );
}
