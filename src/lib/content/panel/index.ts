import type {
  ContentSource,
  History,
  NewsPost,
  OfficeLocation,
  Project,
  ProjectStatus,
  Report,
  RichBlock,
  Statute,
  TeamMember,
} from "../types.ts";
import { localContentSource } from "../local/index.ts";

/** Body of GET /api/public/website/content — mirrors `PublicWebsiteContent` in PanelORG `src/websiteContent.ts`. */
interface PublicWebsiteContent {
  about: string[];
  team: TeamMember[];
  history: History;
  statute: Statute;
  reports: Report[];
  accessibility: RichBlock[];
  projects: Project[];
  news: NewsPost[];
  articles: NewsPost[];
  offices: OfficeLocation[];
}

export const PANEL_URL = import.meta.env.VITE_PANELORG_URL ?? "https://panelorg.pl";
const TIMEOUT_MS = 5000;

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

function assertShape(data: unknown): asserts data is PublicWebsiteContent {
  const d = data as Record<string, unknown> | null;
  const arrays = ["about", "team", "reports", "accessibility", "projects", "news", "articles", "offices"];
  const ok =
    typeof d === "object" &&
    d !== null &&
    arrays.every((key) => Array.isArray(d[key])) &&
    Array.isArray((d.history as History | undefined)?.events) &&
    Array.isArray((d.statute as Statute | undefined)?.sections);
  if (!ok) throw new Error("PanelORG content has an unexpected shape");
}

function panelContentSource(data: PublicWebsiteContent): ContentSource {
  const posts = [...data.news, ...data.articles].sort(byDateDesc);
  const articles = [...data.articles].sort(byDateDesc);
  const orgInfo = { ...localContentSource.getOrgInfo(), offices: data.offices };
  return {
    ...localContentSource,
    getOrgInfo: () => orgInfo,
    getProjects: (status?: ProjectStatus) =>
      status ? data.projects.filter((p) => p.status === status) : data.projects,
    getProject: (slug) => data.projects.find((p) => p.slug === slug),
    getNews: () => posts,
    getNewsPost: (slug) => posts.find((n) => n.slug === slug),
    getArticles: () => articles,
    getTeam: () => data.team,
    getAbout: () => data.about,
    getHistory: () => data.history,
    getStatute: () => data.statute,
    getReports: () => data.reports,
    getAccessibility: () => data.accessibility,
  };
}

/**
 * Loads content published in PanelORG (Promocja → WWW). FAQ, links, stats,
 * participant stories and org details other than offices stay local.
 * Rejects on network errors, non-200 responses, timeouts and malformed bodies.
 */
export async function loadPanelContentSource(): Promise<ContentSource> {
  const res = await fetch(`${PANEL_URL}/api/public/website/content`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`PanelORG content: HTTP ${res.status}`);
  const data: unknown = await res.json();
  assertShape(data);
  return panelContentSource(data);
}
