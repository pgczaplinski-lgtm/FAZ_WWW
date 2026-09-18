import { useState } from "react";
import { content } from "../../lib/content/index.ts";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { Section } from "../../components/ui/primitives.tsx";
import { NewsCard } from "../../components/ui/cards.tsx";

const PAGE_SIZE = 9;

export function Aktualnosci() {
  const posts = content.getNews();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <>
      <PageHeader
        title="Aktualności"
        intro="Śledź nasze wydarzenia, sukcesy i bieżące działania."
      />
      <Section>
        {shown.length === 0 ? (
          <p className="text-muted">Brak aktualności.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        )}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((n) => n + PAGE_SIZE)}
              className="rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Pokaż więcej
            </button>
          </div>
        )}
      </Section>
    </>
  );
}
