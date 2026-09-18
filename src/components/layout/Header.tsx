import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Container } from "../ui/primitives.tsx";
import { navItems } from "./nav.ts";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Fundacja Aktywności Zawodowej – strona główna">
          <img src="/logo.svg" alt="Fundacja Aktywności Zawodowej" className="h-12 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu główne">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-brand ${
                      isActive ? "text-brand" : "text-ink"
                    }`
                  }
                >
                  {item.label}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                    <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </NavLink>
                {openGroup === item.label && (
                  <div className="absolute left-0 top-full min-w-56 rounded-lg border border-line bg-white py-2 shadow-lg">
                    {item.children.map((c) => (
                      <NavLink
                        key={c.to}
                        to={c.to}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm transition-colors hover:bg-brand-light hover:text-brand ${
                            isActive ? "text-brand" : "text-ink"
                          }`
                        }
                      >
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : item.external ? (
              <a
                key={item.label}
                href={item.to}
                target="_blank"
                rel="noreferrer"
                className="rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-brand ${
                    isActive ? "text-brand" : "text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
          <Link
            to="/przekaz-darowizne"
            className="ml-2 inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Przekaż darowiznę
          </Link>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-ink lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Przełącz menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="py-3">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a href={item.to} target="_blank" rel="noreferrer" className="block rounded-md px-3 py-2 text-sm font-semibold text-ink">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.to} className="block rounded-md px-3 py-2 text-sm font-semibold text-ink">
                      {item.label}
                    </Link>
                  )}
                  {item.children && (
                    <ul className="ml-3 border-l border-line pl-3">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link to={c.to} className="block rounded-md px-3 py-1.5 text-sm text-muted">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li>
                <Link
                  to="/przekaz-darowizne"
                  className="mt-2 block rounded-md bg-brand px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  Przekaż darowiznę
                </Link>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
