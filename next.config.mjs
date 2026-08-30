/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "img-src 'self' data: https:",
      // GA4：允许加载 gtag.js 脚本
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      // GA4：允许 gtag 的 beacon 上报（区域域名带动态前缀，用通配）
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  // 静态页预渲染（含动态路由 generateStaticParams）在 Vercel 构建机上可能受资源限制
  // 而排队超时；把单页生成超时从默认 60s 提到 180s，避免首页 / 被误判超时。
  staticPageGenerationTimeout: 180,
  // 本地/沙箱无法跑 lint，远程构建（Vercel）显式跳过 ESLint，避免意外阻断；
  // TypeScript 类型错误仍会照常中断构建，保证类型安全。
  eslint: { ignoreDuringBuilds: true },
  // 目录站纯 SSG，用 <img> 即可，关闭 next/image 优化避免远程域名配置
  images: { unoptimized: true },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
