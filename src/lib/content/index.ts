import type { ContentSource } from "./types.ts";
import { localContentSource } from "./local/index.ts";

/**
 * The active content source for the whole site — a live binding, so pages
 * always read whichever source `setContentSource` installed before the first
 * render (PanelORG content, or the local seed data as fallback).
 */
export let content: ContentSource = localContentSource;

export function setContentSource(source: ContentSource) {
  content = source;
}

export type * from "./types.ts";
