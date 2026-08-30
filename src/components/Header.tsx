import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        background: "var(--bg)",
        zIndex: 20,
      }}
    >
      <div
        className="container-page"
        style={{ display: "flex", alignItems: "center", gap: 16, height: 60 }}
      >
        <Link href="/" style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
          DTC<span style={{ color: "var(--brand)" }}>wise</span>
        </Link>
        <nav style={{ display: "flex", gap: 18, marginLeft: 12, flex: 1, flexWrap: "wrap" }}>
          <Link href="/category/dropshipping" className="muted" style={{ textDecoration: "none" }}>
            Categories
          </Link>
          <Link href="/ranking/monthly" className="muted" style={{ textDecoration: "none" }}>
            Rankings
          </Link>
          <Link href="/blog" className="muted" style={{ textDecoration: "none" }}>
            Blog
          </Link>
          <Link href="/submit" className="muted" style={{ textDecoration: "none" }}>
            List your tool
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
