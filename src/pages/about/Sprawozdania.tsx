import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";

const reports = [
  { year: "2023", title: "Sprawozdanie za 2023" },
  { year: "2022", title: "Sprawozdanie za 2022" },
  { year: "2021", title: "Sprawozdanie za 2021" },
];

export function Sprawozdania() {
  return (
    <>
      <PageHeader
        title="Sprawozdania"
        intro="Nasze sprawozdania merytoryczne i finansowe."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "Sprawozdania" }]}
      />

      <Section>
        <SectionTitle>Dokumenty OPP</SectionTitle>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          Fundacja Aktywności Zawodowej jest organizacją pożytku publicznego. Co roku składamy
          sprawozdania merytoryczne i finansowe z działalności — poniżej zestawienie ostatnich lat.
          Pliki PDF zostaną uzupełnione, gdy będą dostępne na tej stronie.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <li key={report.year} className="flex flex-col rounded-xl border border-brand bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">OPP · {report.year}</p>
              <h3 className="mt-2 text-lg font-bold text-ink">{report.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">
                Sprawozdanie merytoryczne i finansowe organizacji pożytku publicznego za rok {report.year}.
              </p>
              <a
                href="#"
                title="Dokument będzie dostępny wkrótce"
                aria-disabled="true"
                className="mt-4 text-sm font-semibold text-brand"
                onClick={(e) => e.preventDefault()}
              >
                Pobierz PDF
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
