import { content } from "../../lib/content/index.ts";
import { useA11y } from "../a11y/useA11y.ts";
import {
  ContrastIcon,
  FacebookIcon,
  FontDownIcon,
  FontUpIcon,
  InstagramIcon,
  LinkedinIcon,
  ResetIcon,
  UnderlineIcon,
} from "../ui/icons.tsx";
import { Container } from "../ui/primitives.tsx";

export function TopBar() {
  const org = content.getOrgInfo();
  const a11y = useA11y();

  const iconBtn =
    "flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30";

  return (
    <div className="bg-brand text-white">
      <Container className="flex flex-wrap items-center justify-between gap-3 py-2">
        <p className="text-sm font-semibold">{org.tagline}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {org.social.instagram && (
              <a href={org.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={iconBtn}>
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
            {org.social.facebook && (
              <a href={org.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className={iconBtn}>
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}
            {org.social.linkedin && (
              <a href={org.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}>
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
          </div>
          <div className="mx-1 h-5 w-px bg-white/30" aria-hidden />
          <div className="flex items-center gap-1.5" role="group" aria-label="Narzędzia dostępności">
            <button onClick={a11y.toggleContrast} aria-pressed={a11y.state.contrast} aria-label="Wysoki kontrast" className={iconBtn}>
              <ContrastIcon className="h-4 w-4" />
            </button>
            <button onClick={a11y.increaseFont} aria-label="Zwiększ czcionkę" className={iconBtn}>
              <FontUpIcon className="h-4 w-4" />
            </button>
            <button onClick={a11y.decreaseFont} aria-label="Zmniejsz czcionkę" className={iconBtn}>
              <FontDownIcon className="h-4 w-4" />
            </button>
            <button onClick={a11y.toggleUnderline} aria-pressed={a11y.state.underline} aria-label="Podkreśl odnośniki" className={iconBtn}>
              <UnderlineIcon className="h-4 w-4" />
            </button>
            <button onClick={a11y.reset} aria-label="Zresetuj ustawienia dostępności" className={iconBtn}>
              <ResetIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
