# DTCwise — 架构（Phase 1）

## 1. 技术栈选型
| 选项 | 决策 | 理由 |
|---|---|---|
| Next.js (App Router) + Vercel | ✅ 选 | 程序化 SEO 页（generateStaticParams）+ ISR + 你栈熟悉；Vercel 部署零运维 |
| Cloudflare Pages | ❌ | 纯 SSG 也可，但程序化派生 + 动态 sitemap 不如 Vercel 顺手 |
| 数据库（Supabase / Postgres） | ❌ | 目录站用 JSON 数据层即可，无需 DB |
| 登录 / 支付 | ❌ | 纯目录站，剔除技能 SaaS 铁律 |

## 2. 目录站对技能 SaaS 铁律的适配
| 技能铁律 | 对 DTCwise | 处置 |
|---|---|---|
| 支付 webhook 验签（HMAC） | 无支付 | **不适用** |
| 谷歌登录 | 无用户账号 | **不适用** |
| 配额服务端强制 | 无配额 | **不适用** |
| 数据路由 Bearer 鉴权 | 无用户数据路由 | **不适用** |
| 废弃集成 501 禁用 | — | 保留（未来加 API 直接 501） |
| 安全头 CSP / HSTS | 适用 | **保留** |
| 上线前 SEO 体检 | 适用 | **保留**（seo-check-xiaoxiao） |
| 上线前性能闸门（FOT） | 适用 | **保留**（vercel-fot-optimizer） |

→ 目录站最小攻击面：仅公开内容 + 付费提交表单（服务端校验）+ 外链。

## 3. 数据层设计
文件：`src/data/tools.json`
```json
{
  "id": "spocket",
  "name": "Spocket",
  "category": "dropshipping",
  "pricing": "Free–$299/mo",
  "commission": "20-30% lifetime",
  "cookie": "180 days",
  "rating": 4.5,
  "pros": ["US/EU suppliers", "1-click import"],
  "cons": ["higher prices"],
  "affiliateUrl": "https://spocket.grsm.io/xxx",
  "screenshot": "/tools/spocket/preview.webp",
  "lastReviewed": "2026-08-30",
  "featured": true
}
```
- 100 工具 → 670+ 静态页（对比 / 替代 / 品类 / 详情）
- 程序化派生在 `generateStaticParams` 内计算（同品类配对，避免无意义对比）

## 4. 程序化页面生成
- `app/tool/[slug]/page.tsx` → generateStaticParams 遍历 tools
- `app/compare/[a]-vs-[b]/page.tsx` → 同品类配对
- `app/alternatives/[slug]/page.tsx` → 同品类其余工具
- `app/category/[cat]/page.tsx` → 10 品类
- `app/ranking/monthly/page.tsx` → 读取 featured + rating 排序
- 所有页 build 时静态化（ISR revalidate 缓存），规避 FOT

## 5. SEO 架构
- metadata 模板（title / description / canonical / OG / Twitter 按页类型生成）
- sitemap 拆分 `sitemap-tools.xml` / `sitemap-compare.xml` / `sitemap-index.xml`，route.ts 手动 setHeader 缓存
- JSON-LD：Tool + Review（ratingValue）结构化
- hreflang：en 主 / zh 辅助

## 6. 性能架构（规避 FOT，目录站高频爬虫）
- 根 `layout.tsx` 禁 `cookies()` / `headers()`（主题用内联 script + client Provider）
- 公开路由 `headers()` 加 `public, s-maxage=86400, stale-while-revalidate=604800`
- 大 sitemap route.ts `setHeader` Cache-Control
- 翻译命名空间 en 基准校验，缺键兜底防 500
- 静态资源版本化 `immutable`

## 7. 安全（目录站最小面）
- next.config 安全头（CSP / X-Frame-Options / HSTS / X-Content-Type-Options / Referrer-Policy）
- 外链 `rel="nofollow sponsored noopener"`（affiliate 合规）
- 付费提交表单：服务端校验字段长度 / 格式，防注入；接收方式（邮件 / 表单存储）Phase 3 定
- 无认证、无支付、无 DB → 无 RLS / 配额需求

## 8. 部署（Vercel）
- git push 自动部署
- 环境变量：`NEXT_PUBLIC_SITE_URL`、`CONTACT_EMAIL`、`NEWSLETTER_PROVIDER`（Phase 3 定）
- 域名：DTCwise.com → Vercel（A/AAAA 或 CNAME），SSL 自动
- 上线后：`seo-check-xiaoxiao` 体检 → `vercel-fot-optimizer` 性能闸门 → `update-one-line-intro` → `dafeixiang-launch-guide` 外链

## 9. 项目结构
```
dtcwise/
  src/
    app/
      layout.tsx
      page.tsx                      # 首页
      tool/[slug]/page.tsx
      compare/[a]-vs-[b]/page.tsx
      alternatives/[slug]/page.tsx
      category/[cat]/page.tsx
      ranking/monthly/page.tsx
      blog/[slug]/page.tsx
      submit/page.tsx               # 付费提交入口
      sitemap.ts / robots.ts
    data/tools.json
    components/
    lib/seo.ts
  scripts/build-pages.mjs
  next.config.mjs
  tailwind.config.ts
```

*文档版本 v1.0 | 2026-08-30*
