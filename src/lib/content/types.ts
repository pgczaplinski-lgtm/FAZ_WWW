/**
 * Content model for the FAZ website.
 *
 * Every piece of variable content (news, projects, articles, FAQ, team,
 * participant stories, external links) is described here once. Pages read it
 * through the `ContentSource` interface, never from a hard-coded array, so the
 * backend can be swapped behind `ContentSource` with no change to the pages.
 */

export type ProjectStatus = "active" | "finished";

export interface RichBlock {
  /** A paragraph of body text. */
  type: "paragraph" | "heading" | "list";
  text?: string;
  items?: string[];
}

export interface ProjectFact {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  /** Short summary shown on cards / list pages. */
  excerpt: string;
  /** Funder / region badge, e.g. "PFRON", "Województwo pomorskie". */
  region?: string;
  funder?: string;
  period?: string;
  image?: string;
  /** Key/value facts (budget, funding, results) shown in a sidebar. */
  facts: ProjectFact[];
  /** Long-form body of the project page. */
  body: RichBlock[];
}

export type NewsCategory = "Aktualności" | "Artykuły" | "Rynek pracy";

export interface NewsPost {
  slug: string;
  title: string;
  date: string; // ISO date
  excerpt: string;
  image?: string;
  categories: NewsCategory[];
  /** True for evergreen advice articles surfaced under "Baza wiedzy / Artykuły". */
  isArticle: boolean;
  body: RichBlock[];
  /** Absolute image URLs shown as a gallery under the body, in display order. */
  gallery?: string[];
}

export interface Faq {
  question: string;
  answer: RichBlock[];
}

export interface ExternalLink {
  title: string;
  url: string;
  host: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
}

export interface ParticipantStory {
  name: string;
  tags: string;
  quote: string;
  photo?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface OfficeLocation {
  city: string;
  address: string;
  phones: string[];
  email: string;
  hours?: string;
  kind: "main" | "branch";
}

export interface OrgInfo {
  name: string;
  shortName: string;
  tagline: string;
  krs: string;
  regon: string;
  nip: string;
  bankName: string;
  bankAccount: string;
  email: string;
  phones: string[];
  offices: OfficeLocation[];
  social: { instagram?: string; facebook?: string; linkedin?: string };
}

export interface HistoryEvent {
  /** YYYY-MM-DD; the year is shown as the label. */
  date: string;
  title: string;
  text: string;
}

export interface History {
  intro: string;
  /** Ascending by date. */
  events: HistoryEvent[];
}

export interface Statute {
  sections: { title: string; text: string }[];
  pdfUrl: string | null;
}

export interface Report {
  year: string;
  title: string;
  pdfUrl: string | null;
}

/**
 * The single seam between the website and its content backend.
 * The panel adapter serves content published in PanelORG (Promocja → WWW);
 * the local adapter serves seed data and is the fallback when PanelORG is unreachable.
 */
export interface ContentSource {
  getOrgInfo(): OrgInfo;
  getProjects(status?: ProjectStatus): Project[];
  getProject(slug: string): Project | undefined;
  getNews(): NewsPost[];
  getNewsPost(slug: string): NewsPost | undefined;
  getArticles(): NewsPost[];
  getFaqs(): Faq[];
  getLinks(): ExternalLink[];
  getTeam(): TeamMember[];
  getStories(): ParticipantStory[];
  getStats(): { period: string; stats: Stat[] }[];
  getAbout(): string[];
  getHistory(): History;
  getStatute(): Statute;
  /** Descending by year. */
  getReports(): Report[];
  getAccessibility(): RichBlock[];
}
