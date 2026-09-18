import { content } from "../../lib/content/index.ts";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { NewsCard } from "../../components/ui/cards.tsx";
import { Section } from "../../components/ui/primitives.tsx";

export function Artykuly() {
  const articles = content.getArticles();

  return (
    <>
      <PageHeader
        title="Artykuły"
        crumbs={[
          { label: "Strona główna", to: "/" },
          { label: "Baza wiedzy", to: "/baza-wiedzy" },
          { label: "Artykuły" },
        ]}
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  );
}
