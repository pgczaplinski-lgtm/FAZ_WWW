import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ crumbs, light = false }: { crumbs: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Ścieżka nawigacji">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.to && i < crumbs.length - 1 ? (
              <Link to={c.to} className={light ? "hover:underline" : "text-brand hover:underline"}>
                {c.label}
              </Link>
            ) : (
              <span className={light ? "text-white" : "text-muted"}>{c.label}</span>
            )}
            {i < crumbs.length - 1 && <span aria-hidden>›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
