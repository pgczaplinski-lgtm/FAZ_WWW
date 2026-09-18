import type { ContentSource } from "./types.ts";
import { localContentSource } from "./local/index.ts";

/**
 * The active content source for the whole site.
 *
 * Swap this single binding to point the site at FundacjaERP once its adapter
 * exists (e.g. `export const content = erpContentSource;`). Nothing else in the
 * app imports a concrete adapter — pages depend only on `ContentSource`.
 */
export const content: ContentSource = localContentSource;

export type * from "./types.ts";
