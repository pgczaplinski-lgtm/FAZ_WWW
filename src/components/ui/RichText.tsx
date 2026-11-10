import type { ReactNode } from "react";
import type { RichBlock } from "../../lib/content/types.ts";

const LINK_RE = /(https?:\/\/[^\s<>"]+|www\.[^\s<>"]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
const TRAILING_PUNCT = /[.,;:!?)\]]+$/;

function hrefFor(token: string): string | null {
  if (token.includes("@") && !token.includes("/")) return `mailto:${token}`;
  try {
    const url = new URL(token.startsWith("www.") ? `https://${token}` : token);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

/** Renders plain text with bare URLs and e-mail addresses as React-built links; never parses HTML. */
function Linkified({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const start = m.index;
    const token = m[0].replace(TRAILING_PUNCT, "");
    const href = hrefFor(token);
    if (!href) continue;
    if (start > last) out.push(text.slice(last, start));
    const external = !href.startsWith("mailto:");
    out.push(
      <a
        key={start}
        href={href}
        className="break-words font-semibold text-brand underline"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {token}
      </a>,
    );
    last = start + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/**
 * Renders panel content blocks. `headingLevel` is the level of `heading` blocks:
 * 2 when the content sits directly under the page `h1`, 3 when under a section `h2`.
 */
export function RichText({ blocks, headingLevel = 2 }: { blocks: RichBlock[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        if (b.type === "heading") {
          return (
            <Heading key={i} className="pt-2 text-xl font-bold text-ink">
              {b.text}
            </Heading>
          );
        }
        if (b.type === "list") {
          const List = b.ordered ? "ol" : "ul";
          return (
            <List key={i} className={`${b.ordered ? "list-decimal" : "list-disc"} space-y-1 pl-6 text-muted`}>
              {b.items?.map((it, j) => (
                <li key={j}>
                  <Linkified text={it} />
                </li>
              ))}
            </List>
          );
        }
        return (
          <p key={i} className="break-words leading-relaxed text-muted">
            <Linkified text={b.text ?? ""} />
          </p>
        );
      })}
    </div>
  );
}
