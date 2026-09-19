import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { content } from "../../lib/content/index.ts";

const mission = [
  "Fundacja Aktywności Zawodowej wspiera przede wszystkim osoby z niepełnosprawnościami w rozwoju zawodowym, rehabilitacji oraz pełniejszym uczestnictwie w życiu społecznym.",
  "Organizujemy giełdy pracy, prowadzimy doradztwo zawodowe i prawne oraz szkolenia dla pracodawców i Warsztatów Terapii Zajęciowej.",
  "Jesteśmy organizacją pożytku publicznego. Działamy non profit i nie prowadzimy działalności gospodarczej.",
];

const subpages = [
  { to: "/zespol", title: "Zespół", intro: "Poznaj osoby, które codziennie wspierają uczestników i pracodawców." },
  { to: "/historia", title: "Historia", intro: "Ponad 15 lat działalności na rzecz aktywizacji zawodowej." },
  { to: "/statut-fundacji", title: "Statut", intro: "Cele, organy i zasady działania Fundacji." },
  { to: "/sprawozdania", title: "Sprawozdania", intro: "Sprawozdania merytoryczne i finansowe organizacji pożytku publicznego." },
  {
    to: "/deklaracja-roznorodnosci",
    title: "Deklaracja różnorodności",
    intro: "Równe szanse, niedyskryminacja i włączanie w zespole i w projektach.",
  },
  {
    to: "/deklaracja-dostepnosci",
    title: "Deklaracja dostępności",
    intro: "Jak dbamy o dostępność tej strony i jak zgłosić utrudnienia.",
  },
  { to: "/dolacz-do-nas", title: "Dołącz do nas", intro: "Wolontariat, praktyki, współpraca i praca w Fundacji." },
];

export function ONas() {
  const stats = content.getStats();

  return (
    <>
      <PageHeader
        title="O nas"
        intro="Wierzymy, że każdy zasługuje na szansę rozwoju zawodowego. Zapewniamy wsparcie, które pozwala na rozwój umiejętności i zdobycie wymarzonej pracy. Z nami każdy może osiągnąć sukces."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "O nas" }]}
      />

      <Section>
        <SectionTitle>Kim jesteśmy</SectionTitle>
        <img
          src="/images/home/kim-jestesmy.jpg"
          alt="Zespół Fundacji Aktywności Zawodowej"
          className="mt-8 aspect-[16/7] w-full rounded-xl object-cover"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {mission.map((text) => (
            <p key={text} className="rounded-xl border border-brand bg-surface p-6 leading-relaxed text-muted">
              {text}
            </p>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionTitle>Nasze sukcesy</SectionTitle>
        <div className="mt-10 grid gap-10">
          {stats.map((group) => (
            <div key={group.period}>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">{group.period}</p>
              <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {group.stats.map((stat) => (
                  <li key={stat.label} className="rounded-xl bg-white p-5 text-center">
                    <p className="text-3xl font-extrabold text-brand">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted">{stat.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Poznaj nas bliżej</SectionTitle>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subpages.map((page) => (
            <li key={page.to}>
              <Link
                to={page.to}
                className="flex h-full flex-col rounded-xl border border-brand bg-white p-6 transition-colors hover:bg-brand-light"
              >
                <h3 className="text-lg font-bold text-ink">{page.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{page.intro}</p>
                <span className="mt-4 text-sm font-semibold text-brand">Czytaj dalej →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
