import data from "@/data/blog.json";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  body: string[];
}

export const posts = data as Post[];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getLatest(limit = 3): Post[] {
  return [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}
