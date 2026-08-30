import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Practical guides for independent and DTC store operators.",
  path: "/blog",
});

export default function BlogIndex() {
  return (
    <div className="container-page" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 style={{ fontSize: 34, margin: 0 }}>DTCwise Blog</h1>
      <p className="muted" style={{ marginTop: 10, maxWidth: 620 }}>
        Practical, no-fluff guides for picking and running the tools behind a real DTC brand.
      </p>
      <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 18 }}>
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="card"
            style={{ padding: 22, textDecoration: "none", display: "block" }}
          >
            <div className="muted" style={{ fontSize: 13 }}>{p.category} · {p.date}</div>
            <div style={{ fontWeight: 700, fontSize: 19, marginTop: 6 }}>{p.title}</div>
            <div className="muted" style={{ fontSize: 15, marginTop: 8 }}>{p.excerpt}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
