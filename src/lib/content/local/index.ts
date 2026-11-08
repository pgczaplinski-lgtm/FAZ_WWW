import type { ContentSource, ProjectStatus } from "../types.ts";
import { orgInfo } from "./org.ts";
import { projects } from "./projects.ts";
import { news } from "./news.ts";
import { faqs } from "./faqs.ts";
import { links } from "./links.ts";
import { team } from "./team.ts";
import { stories } from "./stories.ts";
import { statGroups } from "./stats.ts";
import { about, accessibility, history, reports, statute } from "./about.ts";

const byDateDesc = <T extends { date: string }>(a: T, b: T) =>
  b.date.localeCompare(a.date);

/**
 * Local content adapter — serves seed data extracted from the live faz.org.pl.
 * Used when PanelORG content cannot be loaded.
 */
export const localContentSource: ContentSource = {
  getOrgInfo: () => orgInfo,
  getProjects: (status?: ProjectStatus) =>
    status ? projects.filter((p) => p.status === status) : projects,
  getProject: (slug) => projects.find((p) => p.slug === slug),
  getNews: () => [...news].sort(byDateDesc),
  getNewsPost: (slug) => news.find((n) => n.slug === slug),
  getArticles: () => news.filter((n) => n.isArticle).sort(byDateDesc),
  getFaqs: () => faqs,
  getLinks: () => links,
  getTeam: () => team,
  getStories: () => stories,
  getStats: () => statGroups,
  getAbout: () => about,
  getHistory: () => history,
  getStatute: () => statute,
  getReports: () => reports,
  getAccessibility: () => accessibility,
};
