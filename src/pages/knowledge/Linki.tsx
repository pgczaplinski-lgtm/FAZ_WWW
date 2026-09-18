import { content } from "../../lib/content/index.ts";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { Section } from "../../components/ui/primitives.tsx";

export function Linki() {
  const links = content.getLinks();

  return (
    <>
      <PageHeader
        title="Linki"
        intro="Przydatne zasoby zewnętrzne."
        crumbs={[
          { label: "Strona główna", to: "/" },
          { label: "Baza wiedzy", to: "/baza-wiedzy" },
          { label: "Linki" },
        ]}
      />
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li
              key={link.url}
              className="rounded-xl border border-line bg-surface p-5 shadow-sm"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-start gap-2 font-semibold text-brand hover:underline"
              >
                <span>{link.title}</span>
                <span aria-hidden className="mt-0.5 text-sm">
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
