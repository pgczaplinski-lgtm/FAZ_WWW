import type { RichBlock } from "../../lib/content/types.ts";

export function RichText({ blocks }: { blocks: RichBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        if (b.type === "heading") {
          return (
            <h3 key={i} className="pt-2 text-xl font-bold text-ink">
              {b.text}
            </h3>
          );
        }
        if (b.type === "list") {
          return (
            <ul key={i} className="list-disc space-y-1 pl-6 text-muted">
              {b.items?.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-muted">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}
