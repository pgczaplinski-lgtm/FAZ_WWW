/**
 * Content model for the FAZ website.
 *
 * Every piece of variable content (news, projects, articles, FAQ, team,
 * participant stories, external links) is described here once. Pages read it
 * through the `ContentSource` interface, never from a hard-coded array, so the
 * data can later come from the FundacjaERP system by swapping the adapter
 * behind `ContentSource` — with no change to the pages.
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

/**
 * The single seam between the website and its content backend.
 * Today: a local adapter with seed data extracted from the live site.
 * Later: a FundacjaERP adapter implementing this same interface.
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
}
