import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        marginTop: 64,
        padding: "32px 0",
        background: "var(--surface)",
      }}
    >
      <div className="container-page" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <Link href="/" className="muted" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link href="/ranking/monthly" className="muted" style={{ textDecoration: "none" }}>
            Monthly Rankings
          </Link>
          <Link href="/blog" className="muted" style={{ textDecoration: "none" }}>
            Blog
          </Link>
          <Link href="/submit" className="muted" style={{ textDecoration: "none" }}>
            List your tool
          </Link>
        </div>
        <p className="muted" style={{ fontSize: 13, maxWidth: 720 }}>
          DTCwise is a curated directory. Some links are affiliate links; we may earn a
          commission if you sign up, at no extra cost to you. Ratings and reviews are
          editorial and independently assessed.
        </p>
        <p className="muted" style={{ fontSize: 13 }}>
          &copy; {new Date().getFullYear()} DTCwise. The curated directory of tools that
          actually grow DTC brands.
        </p>
      </div>
    </footer>
  );
}
