import { useState } from "react";
import { content } from "../../lib/content/index.ts";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { NewsCard } from "../../components/ui/cards.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";

export function BazaWiedzy() {
  const articles = content.getArticles();
  const faqs = content.getFaqs();
  const links = content.getLinks();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        title="Baza wiedzy"
        intro="Poznaj rynek pracy, rozwijaj swoje kompetencje zawodowe i bądź na bieżąco z przepisami"
        introClassName="max-w-none"
        crumbs={[
          { label: "Strona główna", to: "/" },
          { label: "Baza wiedzy" },
        ]}
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionTitle>Pytania i odpowiedzi</SectionTitle>
        <ul className="mt-8 divide-y divide-line rounded-xl border border-line bg-surface">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            const panelId = `baza-faq-panel-${i}`;
            const buttonId = `baza-faq-button-${i}`;
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
                  <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5">
                    <RichText blocks={faq.answer} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section>
        <SectionTitle>Przydatne linki</SectionTitle>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {links.map((link) => (
            <li key={link.url} className="rounded-xl border border-line bg-surface p-5 shadow-sm">
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-brand hover:underline"
              >
                {link.title}
                <span aria-hidden className="ml-1">
                  ↗
                </span>
              </a>
              <p className="mt-1 text-sm text-muted">{link.host}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
