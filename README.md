# DTCwise

The curated directory of tools that actually grow DTC (direct-to-consumer) and
independent-store brands. Built as a static, programmatically-generated directory
site: tool reviews, head-to-head comparisons, alternatives, category pages, a
monthly ranking, and a paid "list your tool" entry point.

Stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel**.
No database, no auth, no payments — pure SSG with a JSON data layer.

## Project structure

```
dtcwise/
  src/
    app/
      layout.tsx              # root layout, theme script, header/footer
      page.tsx                # home: search + categories + editor's picks + ranking
      tool/[slug]/page.tsx    # tool detail (review, pros/cons, JSON-LD)
      compare/[slug]/page.tsx # A vs B (slug = "a-vs-b", same-category pairs)
      alternatives/[slug]/page.tsx
      category/[cat]/page.tsx
      ranking/monthly/page.tsx
      lists/[slug]/page.tsx   # 2 editorial list pages
      submit/page.tsx         # paid submission form (mailto fallback)
      blog/page.tsx           # blog index
      blog/[slug]/page.tsx    # blog post (generateStaticParams)
      sitemap.ts / robots.ts
    components/               # Header, Footer, ToolCard, ThemeToggle, ToolSearch
    data/tools.json           # the data layer (104 tools, 13 categories)
    lib/tools.ts              # data access + derived pages
    lib/seo.ts                # metadata helper
```

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static export of all pages)
npm run start    # serve the build
```

> Requires Node 18+. Install affiliate links in `src/data/tools.json` before launch
> (the `affiliateUrl` fields use placeholder refs — replace with your approved links).

## Deploy to Vercel (Phase 6)

1. Push this folder to a GitHub repo.
2. In Vercel, **New Project → Import** the repo. Framework preset = Next.js (auto-detected).
3. Set environment variable: `NEXT_PUBLIC_SITE_URL=https://dtcwise.com`
4. Add the domain `dtcwise.com` (DNS: A/AAAA or CNAME to Vercel). SSL is automatic.
5. After first deploy, run the launch gates:
   - `seo-check-xiaoxiao` (blog/SEO self-check)
   - `vercel-fot-optimizer` (performance gate)
   - `update-one-line-intro` + `dafeixiang-launch-guide` (backlink push)

Vercel builds remotely, so no local `npm run build` is required to go live.

## Content model

Each tool in `src/data/tools.json` has: `id, name, category, pricing,
commission, cookie, rating, pros[], cons[], review, affiliateUrl, affiliate,
lastReviewed, featured?, tagline?` (tagline is optional — cards and detail pages
render it only when present). Comparison and alternative pages are generated at
build time from this data (same-category pairings only) — edit the JSON, not the pages.

## Notes / caveats

- Commission figures are editorial estimates from public program info and must be
  re-verified against each partner's affiliate terms before relying on them.
- Some tools (e.g. CJdropshipping) carry 2026 payout/clawback concerns and are
  marked as "also consider" rather than primary picks.
- The planning doc's 100-tool target is fully represented here: 104 tools across
  13 categories. The 10 original categories hold 10 tools each; 3 newer categories
  (content-ai, ad-spy, payments) carry the first monetizable picks (ElevenLabs,
  BigSpy, Airwallex, Chargeflow). The comparison/alternative matrix scales
  automatically as you add entries to `tools.json`.
