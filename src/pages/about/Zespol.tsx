import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { content } from "../../lib/content/index.ts";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toLocaleUpperCase("pl-PL");
}

export function Zespol() {
  const team = content.getTeam();

  return (
    <>
      <PageHeader
        title="Zespół"
        intro="Poznaj zespół Fundacji Aktywności Zawodowej."
        crumbs={[{ label: "Strona główna", to: "/" }, { label: "Zespół" }]}
      />

      <Section>
        <SectionTitle>Ludzie Fundacji</SectionTitle>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <li
              key={member.name}
              className="flex items-center gap-4 rounded-xl border border-brand bg-white p-5"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-full object-cover object-top"
                />
              ) : (
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand"
                  aria-hidden
                >
                  {initials(member.name)}
                </div>
              )}
              <div>
                <p className="font-bold text-ink">{member.name}</p>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
