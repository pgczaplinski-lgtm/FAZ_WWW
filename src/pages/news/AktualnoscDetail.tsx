import { Link, useParams } from "react-router-dom";
import { content } from "../../lib/content/index.ts";
import { PageHeader } from "../../components/ui/PageHeader.tsx";
import { RichText } from "../../components/ui/RichText.tsx";
import { Section, SectionTitle } from "../../components/ui/primitives.tsx";
import { NewsCard } from "../../components/ui/cards.tsx";

const dateFmt = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function AktualnoscDetail() {
  const { slug } = useParams();
  const post = slug ? content.getNewsPost(slug) : undefined;

  if (!post) {
    return (
      <Section>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Nie znaleziono aktualności</h1>
        <p className="mt-4 text-muted">
          Nie udało się odnaleźć wpisu o podanym adresie.
        </p>
        <p className="mt-6">
          <Link to="/aktualnosci" className="font-semibold text-brand">
            Wróć do aktualności
          </Link>
        </p>
      </Section>
    );
  }

  const others = content
    .getNews()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        title={post.title}
        crumbs={[
          { label: "Strona główna", to: "/" },
          { label: "Aktualności", to: "/aktualnosci" },
          { label: post.title },
        ]}
      />
      <Section>
        <time className="text-sm font-semibold uppercase tracking-wide text-brand" dateTime={post.date}>
          {dateFmt.format(new Date(post.date))}
        </time>
        {post.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-brand-light px-3 py-0.5 text-xs font-semibold text-brand"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        {post.image ? (
          <img
            src={post.image}
            alt=""
            className="mt-8 w-full max-h-[28rem] rounded-xl object-cover"
          />
        ) : null}
        <div className="mt-8">
          <RichText blocks={post.body} />
        </div>
      </Section>
      {others.length > 0 && (
        <Section muted>
          <SectionTitle className="mb-8">Zobacz również</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
