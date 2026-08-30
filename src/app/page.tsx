import Link from "next/link";
import ToolSearch from "@/components/ToolSearch";
import ToolCard from "@/components/ToolCard";
import SpotlightLink from "@/components/SpotlightLink";
import NewsletterSignup from "@/components/NewsletterSignup";
import { categories, getFeatured, getMonthlyRanking } from "@/lib/tools";
import { getLatest } from "@/lib/blog";

export default function Home() {
  const featured = getFeatured();
  const ranking = getMonthlyRanking(10);
  const latestPosts = getLatest(3);

  return (
    <div className="container-page" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <section style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 36px" }}>
        <h1 style={{ fontSize: 40, lineHeight: 1.15, margin: 0, fontWeight: 800, letterSpacing: "-1px" }}>
          The curated directory of tools that actually grow DTC brands
        </h1>
        <p className="muted" style={{ fontSize: 18, marginTop: 14 }}>
          Real, editor-assessed reviews and comparisons for independent store and
          direct-to-consumer sellers. No fluff, no paid rankings.
        </p>
      </section>

      <ToolSearch />

      <section style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Browse by category</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 14,
          }}
        >
          {categories.map((c) => (
            <SpotlightLink
              key={c.id}
              href={`/category/${c.id}`}
              className="card card-interactive card-spotlight"
              style={{ padding: 16, textDecoration: "none", display: "block" }}
            >
              <div className="card-title" style={{ fontWeight: 700, fontSize: 16 }}>{c.label}</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>{c.blurb}</div>
            </SpotlightLink>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section style={{ marginTop: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <h2 style={{ fontSize: 22, margin: 0 }}>Editor&apos;s picks</h2>
            <Link href="/ranking/monthly" className="muted" style={{ textDecoration: "none", fontSize: 14 }}>
              Full ranking &rarr;
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {featured.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 56 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Top 10 this month</h2>
        <ol style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {ranking.map((t, i) => (
            <li
              key={t.id}
              className="card row-interactive"
              style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}
            >
              <span style={{ fontWeight: 800, color: "var(--brand)", minWidth: 24 }}>{i + 1}</span>
              <Link
                href={`/tool/${t.id}`}
                className="card-title"
                style={{ fontWeight: 600, textDecoration: "none", flex: 1 }}
              >
                {t.name}
              </Link>
              <span className="muted" style={{ fontSize: 13 }}>{t.category}</span>
              <span className="stars" style={{ fontSize: 13 }}>{"\u2605"} {t.rating.toFixed(1)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ marginTop: 56 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <h2 style={{ fontSize: 22, margin: 0 }}>From the blog</h2>
          <Link href="/blog" className="muted" style={{ textDecoration: "none", fontSize: 14 }}>
            All posts &rarr;
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {latestPosts.map((p) => (
            <SpotlightLink
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card card-interactive card-lift-lg card-spotlight"
              style={{ padding: 18, textDecoration: "none", display: "block" }}
            >
              <div className="muted" style={{ fontSize: 12 }}>{p.category} · {p.date}</div>
              <div className="card-title" style={{ fontWeight: 700, fontSize: 15, marginTop: 6, lineHeight: 1.35 }}>{p.title}</div>
              <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>{p.excerpt}</div>
            </SpotlightLink>
          ))}
        </div>
      </section>

      <NewsletterSignup />

      <section
        className="card"
        style={{ marginTop: 56, padding: 28, textAlign: "center", background: "var(--surface)" }}
      >
        <h2 style={{ marginTop: 0 }}>Build a tool for DTC sellers?</h2>
        <p className="muted" style={{ maxWidth: 560, margin: "8px auto 18px" }}>
          Get in front of motivated, high-intent DTC operators. List your tool in the
          DTCwise directory from $49.
        </p>
        <Link href="/submit" className="btn-brand">List your tool</Link>
      </section>
    </div>
  );
}
