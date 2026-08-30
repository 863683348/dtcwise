# DTCwise — PRD（Phase 1）

## 1. 产品概述
- **产品名**：DTCwise
- **域名**：DTCwise.com（待注册商确认并注册）
- **定位**：面向独立站 / DTC 卖家的「工具选型 + 真实测评 + 月度榜单 + affiliate」垂直导航站。英文为主、中文为辅。
- **一句话**：The curated directory of tools that actually grow DTC brands.

## 2. 目标用户与痛点
- **用户**：Shopify / WooCommerce / 自建站 DTC 卖家、dropshipping 从业者、刚起步的品牌主理人。
- **痛点**：
  1. 工具太多（建站/代发货/POD/邮件/SEO/客服…），选型无头绪；
  2. 现有导航站（M123/AMZ123）大而全、无独立站深度测评；
  3. 担心 AI 堆砌内容不真实、不权威，被 Google 判 scaled content。

## 3. 竞品分析
| 站 | 形态 | 体量 | 弱点 |
|---|---|---|---|
| dropshipping.tools | 垂直 dropshipping 目录 | 月访 <20K，无全球排名 | 极小，内容浅 |
| affyhub.com | 电商工具对比 | 全球 #8.4M，Pages/Visit 1.12 | 内链/深度差 |
| Toolify | AI 工具导航（全球） | DR64，3万+工具 | 不专 DTC，泛 |
| M123 / AMZ123 | 中文综合跨境导航 | 百万级月访 | 红海，无独立站深度 |

→ 英文「独立站 / DTC 工具」垂直是实打实的空位。

## 4. 核心功能范围
- **7 类页面**：首页 / 品类页 / 工具详情页 / 替代页 / 对比页 / 编辑精选 / 月度榜单 + Blog
- **数据层**：`tools.json`（name, category, pricing, commission, cookie, rating, screenshot, lastReviewed, affiliateUrl, pros, cons）
- **程序化派生**：对比页（[A] vs [B]）、替代页（[工具] alternatives）、榜单页 —— build 时从数据层计算，不手改

## 5. MVP 功能表
**做（Phase 3 交付）：**
- [x] 数据层 `tools.json`（首批 100 工具，10 品类 × 10）
- [x] 首页（Hero 搜索 + 品类网格 + 热门工具 + 月度榜入口）
- [x] 品类页（筛选 + 列表）
- [x] 工具详情页（真人评测 + affiliate CTA + 替代推荐）
- [x] 首批 6–8 对比页（Spocket / Zendrop / AutoDS / DSers / Printful）
- [x] 2 个清单页（best dropshipping suppliers usa / best shopify dropshipping tools）
- [x] sitemap / robots / JSON-LD / hreflang
- [x] 付费提交入口（表单，Day1 现金通道）

**不做（MVP 明确排除，防范围蔓延）：**
- [ ] 用户登录 / 账号系统
- [ ] 订阅支付 / PayPal / Stripe 会员
- [ ] UGC 工具提交审核后端（仅表单收集线索，人工录入）
- [ ] 实时数据 / API（纯静态 SSG + 定期 rebuild）
- [ ] 多语言全量（中文仅辅助，不做 6 locale）

## 6. RICE 优先级
| 功能 | Reach | Impact | Confidence | Effort | RICE |
|---|---|---|---|---|---|
| 首批 6–8 对比页 | 高 | 高 | 中 | 低 | 最高 |
| 100 工具数据层 | 高 | 高 | 高 | 中 | 高 |
| 付费提交入口 | 中 | 中 | 高 | 低 | 高 |
| 品类页 | 高 | 中 | 高 | 中 | 中 |
| 月度榜单 | 中 | 高 | 中 | 低 | 中 |
| Blog | 低 | 中 | 中 | 中 | 低 |

## 7. 变现策略
- **Day1**：付费提交 $49–497（工具厂商上架费）+ Newsletter 赞助
- **第 3–4 月**：affiliate 起量（Spocket 20–30% lifetime / Zendrop 30% / AutoDS 20% / DSers $10–50 + 10–30% rec）
- **中文站（辅助）**：国内工具 affiliate 补充

## 8. 成功指标
| 指标 | 3月 | 6月 | 12月 |
|---|---|---|---|
| 自然 UV/月 | 500 | 3,000 | 10,000 |
| 付费提交 | 2 单 | 10 单 | 30 单 |
| affiliate 月收入 | $0 | $500 | $2,000+ |

## 9. 风险与应对
- **Google 判 AI 堆页面** → 真实截图 + 编辑校准评分 + 人工月度榜 + 工具页真人撰写
- **联盟审批慢** → 用现有站 URL 先申，子域上线补
- **冷启动无流量** → 13 站互链 + Newsletter + Reddit / IndieHackers

*文档版本 v1.0 | 2026-08-30*
