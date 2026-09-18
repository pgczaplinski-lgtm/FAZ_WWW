import { useState } from "react";
import { content } from "../../lib/content/index.ts";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { Section } from "../../components/ui/primitives.tsx";

export function PytaniaOdpowiedzi() {
  const faqs = content.getFaqs();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        title="Pytania i odpowiedzi"
        intro="Odpowiedzi na najczęściej zadawane pytania o nasze działania, rekrutację i wsparcie."
        crumbs={[
          { label: "Strona główna", to: "/" },
          { label: "Baza wiedzy", to: "/baza-wiedzy" },
          { label: "Pytania i odpowiedzi" },
        ]}
      />
      <Section>
        <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li key={faq.question}>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink hover:bg-brand-light"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span>{faq.question}</span>
                  <span aria-hidden className="text-brand">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-5 pb-5"
                  >
                    <RichText blocks={faq.answer} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
