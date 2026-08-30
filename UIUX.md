# DTCwise — UI/UX（Phase 1）

## 1. 对标品牌
- **信息密度**：Toolify（分类清晰、列表信息量足）
- **信任感**：Wirecutter / 专业评测站（真实截图、编辑评分）
- **导航简洁**：Clean CSS 网格，避免 AMZ123 的信息过载

## 2. 设计语言（反模式检查）
- ✗ 无紫色渐变 ✗ 无 emoji 图标 ✗ 无千篇一律 Hero 大图
- ✓ 亮黑双主题（Default Light，提供 Dark Toggle）
- ✓ 工具卡片：截图 + 评分 + 一句话定位 + affiliate CTA
- ✓ 编辑语感，专业、克制

## 3. 设计 Token
```css
:root {
  --bg: #ffffff; --surface: #f7f8fa; --text: #0f1115; --muted: #6b7280;
  --brand: #1a73e8; --brand-ink: #0b3d91; --border: #e5e7eb;
  --radius: 12px; --shadow: 0 1px 3px rgba(0,0,0,.08);
}
[data-theme="dark"] {
  --bg:#0f1115; --surface:#171a21; --text:#e8eaed; --muted:#9aa0a6;
  --brand:#4f9bff; --border:#2a2f3a;
}
```
- 字体：Inter（界面）+ 等宽用于数据（rating / price）
- 间距：8pt 栅格

## 4. 页面级设计提示词
- **首页**：搜索框（首屏）+ 分类网格（10 类）+ 编辑推荐 Top 10 + 月度榜入口
- **品类页**：左侧筛选（定价 / 佣金 / 评分）+ 右侧工具列表卡片
- **工具详情**：Hero（logo + 评分 + 定位）+ 截图 + Pros/Cons + 编辑评测（真人写）+ affiliate CTA（"Try [Tool]"）+ 替代推荐
- **对比页**：双栏表格（功能 / 定价 / 佣金 / 评分逐行对比）+ 结论 + 双 CTA
- **替代页**："[Tool] 的 5 个替代"列表 + 各一句话
- **榜单页**：月度 Top 20 排行 + 编辑点评
- **Blog**：长文测评 / 指南

## 5. 移动端（mobile-first）
- 375px 无横向溢出，tap 目标 ≥ 44px
- 品类页筛选在移动端折叠为抽屉
- 对比页双栏在移动端转上下堆叠

*文档版本 v1.0 | 2026-08-30*
