import { PageHeader } from "../components/ui/PageHeader.tsx";
import { RichText } from "../components/ui/RichText.tsx";
import { Section } from "../components/ui/primitives.tsx";
import { content } from "../lib/content/index.ts";
import { DeklaracjaSzkic } from "./DeklaracjaSzkic.tsx";

/**
 * Flip to `true` only once the Foundation has supplied every value marked
 * "DO UZUPEŁNIENIA" in `DeklaracjaSzkic` and those markers are gone.
 */
const PUBLISH_DRAFT_DECLARATION = false;
const SHOW_DRAFT = import.meta.env.DEV || PUBLISH_DRAFT_DECLARATION;

export function Deklaracja() {
  const org = content.getOrgInfo();
  const phone = org.phones[0];

  return (
    <>
      <PageHeader
        title="Deklaracja dostępności"
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "Deklaracja dostępności" }]}
      />
      <Section>
        <div className="max-w-3xl">
          {SHOW_DRAFT ? (
            <DeklaracjaSzkic />
          ) : (
            <>
              <RichText blocks={content.getAccessibility()} headingLevel={2} />
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
            </>
          )}
        </div>
      </Section>
    </>
  );
}
