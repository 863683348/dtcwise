import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, getPost } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

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

  return (
    <article className="container-page" style={{ paddingTop: 40, paddingBottom: 40, maxWidth: 760 }}>
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
    </article>
  );
}
