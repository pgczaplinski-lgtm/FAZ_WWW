import { Link } from "react-router-dom";
import type { NewsPost, Project } from "../../lib/content/types.ts";

function Placeholder({ label }: { label: string }) {
  return (
    <div
      className="flex aspect-[16/10] w-full items-center justify-center bg-brand-light text-brand"
      aria-hidden
    >
      <span className="px-4 text-center text-sm font-semibold opacity-70">{label}</span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projekt/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {project.image ? (
        <img src={project.image} alt="" className="aspect-[16/10] w-full object-cover" />
      ) : (
        <Placeholder label={project.title} />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex flex-wrap gap-2">
          {project.funder && (
            <span className="rounded-full bg-brand-light px-3 py-0.5 text-xs font-semibold text-brand">
              {project.funder}
            </span>
          )}
          {project.region && (
            <span className="rounded-full bg-surface px-3 py-0.5 text-xs font-medium text-muted">
              {project.region}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-ink group-hover:text-brand">{project.title}</h3>
        <p className="mt-2 line-clamp-4 flex-1 text-sm text-muted">{project.excerpt}</p>
        <span className="mt-4 text-sm font-semibold text-brand">Dowiedz się więcej →</span>
      </div>
    </Link>
  );
}

const dateFmt = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      to={`/aktualnosci/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {post.image ? (
        <img src={post.image} alt="" className="aspect-[16/10] w-full object-cover" />
      ) : (
        <Placeholder label="Aktualności FAZ" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <time className="text-xs font-semibold uppercase tracking-wide text-brand" dateTime={post.date}>
          {dateFmt.format(new Date(post.date))}
        </time>
        <h3 className="mt-2 text-lg font-bold text-ink group-hover:text-brand">{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{post.excerpt}</p>
        <span className="mt-4 text-sm font-semibold text-brand">Dowiedz się więcej →</span>
      </div>
    </Link>
  );
}
