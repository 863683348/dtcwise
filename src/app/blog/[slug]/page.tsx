import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, getPost, getRelated } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/tools";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = getRelated(post.slug, 3);
  const canonical = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "DTCwise" },
    publisher: { "@type": "Organization", name: "DTCwise" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    keywords: post.category,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <article className="container-page" style={{ paddingTop: 40, paddingBottom: 40, maxWidth: 760 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Link href="/blog" className="muted" style={{ textDecoration: "none", fontSize: 14 }}>
        &larr; All posts
      </Link>
      <div className="muted" style={{ fontSize: 13, marginTop: 18 }}>{post.category} · {post.date}</div>
      <h1 style={{ fontSize: 32, marginTop: 8, lineHeight: 1.2 }}>{post.title}</h1>
      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
        {post.body.map((para, i) => (
          <p key={i} style={{ fontSize: 17, lineHeight: 1.7, margin: 0 }}>{para}</p>
        ))}
      </div>

      {related.length > 0 && (
        <section style={{ marginTop: 48, borderTop: "1px solid var(--border)", paddingTop: 28 }}>
          <h2 style={{ fontSize: 20, margin: "0 0 16px" }}>Related posts</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 4 }}
              >
                <span className="muted" style={{ fontSize: 12 }}>{r.category} · {r.date}</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{r.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
