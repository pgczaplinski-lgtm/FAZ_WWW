import { Link } from "react-router-dom";
import { content } from "../../lib/content/index.ts";
import { Container } from "../ui/primitives.tsx";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "../ui/icons.tsx";

export function Footer() {
  const org = content.getOrgInfo();
  const main = org.offices.find((o) => o.kind === "main");

  return (
    <footer className="mt-auto bg-ink text-white/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/logo-white.svg" alt="Fundacja Aktywności Zawodowej" className="h-14 w-auto" />
          <p className="mt-4 text-sm">{org.tagline}</p>
          <img
            src="/images/org/1-5-procent.png"
            alt="Przekaż 1,5% podatku na rzecz Fundacji"
            className="mt-4 h-14 w-auto"
          />
          <div className="mt-4 flex gap-2">
            {org.social.instagram && (
              <a href={org.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand">
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
            {org.social.facebook && (
              <a href={org.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand">
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}
            {org.social.linkedin && (
              <a href={org.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand">
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Menu</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/o-nas" className="hover:text-white">O nas</Link></li>
            <li><Link to="/projekty" className="hover:text-white">Projekty</Link></li>
            <li><Link to="/aktualnosci" className="hover:text-white">Aktualności</Link></li>
            <li><Link to="/baza-wiedzy" className="hover:text-white">Baza wiedzy</Link></li>
            <li><Link to="/kontakt" className="hover:text-white">Kontakt</Link></li>
            <li><Link to="/przekaz-darowizne" className="hover:text-white">Przekaż darowiznę</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Kontakt</h2>
          {main && (
            <address className="space-y-2 text-sm not-italic">
              <p>{main.address}</p>
              <p><a href={`mailto:${org.email}`} className="hover:text-white">{org.email}</a></p>
              {org.phones.map((ph) => (
                <p key={ph}><a href={`tel:${ph.replace(/\s/g, "")}`} className="hover:text-white">{ph}</a></p>
              ))}
              {main.hours && <p className="text-white/60">{main.hours}</p>}
            </address>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">Dane organizacji</h2>
          <ul className="space-y-2 text-sm">
            <li>KRS: {org.krs}</li>
            <li>REGON: {org.regon}</li>
            <li>NIP: {org.nip}</li>
            <li className="pt-2 text-white/60">{org.bankName}</li>
            <li className="text-white/60">{org.bankAccount}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Fundacja Aktywności Zawodowej. Organizacja pożytku publicznego.</p>
          <p>Działamy non profit i nie prowadzimy działalności gospodarczej.</p>
        </Container>
      </div>
    </footer>
  );
}
