import { content } from "../lib/content/index.ts";
import { PageHeader } from "../components/ui/PageHeader.tsx";
import { Section } from "../components/ui/primitives.tsx";

export function Darowizna() {
  const org = content.getOrgInfo();

  return (
    <>
      <PageHeader
        title="Przekaż darowiznę"
        intro="Twoje wsparcie pomaga nam działać."
        crumbs={[
          { label: "Strona główna", to: "/" },
          { label: "Przekaż darowiznę" },
        ]}
      />
      <Section>
        <div className="max-w-2xl space-y-6">
          <p className="leading-relaxed text-muted">
            Darowizny wspierają aktywizację zawodową osób z niepełnosprawnościami — doradztwo,
            szkolenia i towarzyszenie na rynku pracy. Każda wpłata pomaga nam prowadzić programy
            statutowe Fundacji Aktywności Zawodowej.
          </p>

          <dl className="space-y-3 rounded-xl border border-line bg-surface p-6">
            <div>
              <dt className="text-sm font-semibold text-muted">Odbiorca</dt>
              <dd className="text-ink">{org.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Bank</dt>
              <dd className="text-ink">{org.bankName}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Numer konta</dt>
              <dd className="font-semibold text-ink">{org.bankAccount}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">Tytuł przelewu</dt>
              <dd className="text-ink">Darowizna na cele statutowe</dd>
            </div>
          </dl>

          <p className="text-muted">
            FAZ jest organizacją pożytku publicznego. Możesz też przekazać 1,5% podatku, wpisując
            numer KRS {org.krs}.
          </p>

          <a
            href="#"
            title="Płatności online dostępne wkrótce"
            className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white opacity-60"
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
          >
            Przekaż online
          </a>
        </div>
      </Section>
    </>
  );
}
