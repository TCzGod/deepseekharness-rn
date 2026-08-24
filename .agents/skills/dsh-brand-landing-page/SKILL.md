---
name: dsh-brand-landing-page
description: 'Use when building, editing, restyling, or auditing the DeepSeek Harness brand / marketing landing page under apps/site — its 锐能科技-style theme, page modules (header, hero, stats, product center, application scenarios, news, footer), the hover / scroll-reveal / responsive interactions, or the app workspace wiring — or for requests like 做品牌形象页, 官网改版, 维护 apps/site, 改主题色.'
---

# DeepSeek Harness 品牌形象页

Maintain the DeepSeek Harness marketing landing page: a static React + Vite + TypeScript app at [`apps/site`](../../../apps/site) that projects the brand tone 专业 · 智能 · 可靠 · 创新 onto the 锐能科技 (myrntec.com) visual language. The app owns the implementation; this skill records the reusable spec and the repo wiring every change must respect.

## Sources of truth

- Theme tokens and all styling — [`apps/site/src/styles.css`](../../../apps/site/src/styles.css); its `:root` block owns colors, fonts, breakpoints, and the custom scrollbar.
- Section order and composition — [`apps/site/src/App.tsx`](../../../apps/site/src/App.tsx).
- Inline SVG icons and the brand logo mark — [`apps/site/src/icons.tsx`](../../../apps/site/src/icons.tsx).
- Scroll-reveal helper (AOS-style, IntersectionObserver) — [`apps/site/src/components/Reveal.tsx`](../../../apps/site/src/components/Reveal.tsx).

When a value below disagrees with the file, the file wins: fix the file, then align only the constants this summary spells out.

## Brand tokens

| Token | Value | Used for |
| --- | --- | --- |
| `--main_color` | `#3793DB` | 主色：链接 hover、按钮、图标、强调 |
| `--sub_color` | `#34A1DC` | 副色：渐变、数值单位、footer 点缀 |
| `--bg_color` | `#EFF0F4` | 浅灰背景（隔段区） |
| `--ink` / `--ink_muted` | `#1c2b3a` / `#5b6b7c` | 正文 / 次要文字 |
| `--line` / `--navy` | `#e3e8ef` / `#0a2038` | 边框 / hero 底部与 footer |
| 字体 | `"Microsoft YaHei", Arial, sans-serif` | 全站 |
| 正文字号 / 主体宽 / 最大宽 | `14px` / `88%` / `1500px` | 排版与容器 |
| 断点 | `767px`（主）、`1180px`（中间档） | 响应式 |

## Required modules

Page order is fixed; each module maps to one component under `apps/site/src/components/`:

1. Header（`Header.tsx`）— 固定顶部 + 微阴影；左 logo、右七项菜单；桌面悬停下拉子菜单（子项 hover 左侧主色竖条）；< 768px 汉堡折叠面板。
2. Hero（`Hero.tsx`）— 深蓝→浅蓝渐变 + 淡网格；主/副标题、价值要点、双 CTA。
3. Stats（`Stats.tsx`）— 100万+ 训练任务 / 50+ 模型 / 99.9% 可用 / 1000+ 客户，白色卡片压在 Hero 底部。
4. Products（`Products.tsx`）— 六卡网格：模型训练/微调/部署/评估/数据管理/提示词工程，图标 + 标题 + 描述 + 两个特性标签。
5. Scenarios（`Scenarios.tsx`）— 四大场景卡（LLM Training / Domain Fine-tuning / Private Deployment / Agent Development），隔段灰底，EN 副标 + 序号水印。
6. News（`News.tsx`）— 三卡资讯（版本更新/技术博客/公司动态）。
7. Footer（`Footer.tsx`）— 深蓝 footer：品牌 + 产品/资源链接 + 联系方式与服务热线。

## Interaction requirements

- 导航：悬停显示下拉；子菜单项悬停左侧出现主色竖条；移动端点击展开子菜单。
- 卡片：产品卡 hover `scale(1.05)`，其余卡 `translateY(-6px)`；统一阴影加深、边框转主色。
- 滚动：内容首次进入视口淡入上移（`Reveal`，threshold 0.15，支持按列错峰 delay）。
- 按钮：hover 背景过渡主色、文字变白；hero 次按钮为反白态。
- 锚点 `scroll-margin-top` 让开固定头部；`prefers-reduced-motion` 关闭动效。

## Repo wiring (keep gates green)

`apps/site` 是 pnpm workspace 成员 + npm release member，改它必须守住：

1. [`package.json`](../../../apps/site/package.json) 保持 public release member：`publishConfig.access` = `public`，`repository.type` = `git`、`repository.url` = `git+https://github.com/deepseek-ai/deepseek-harness.git`、`repository.directory` = `apps/site`，`files` = `["dist", "!dist/**/*.map"]`。
2. [`scripts/check-workspace-constraints.ts`](../../../scripts/check-workspace-constraints.ts) 的 `appPackageFiles` 保留 `'@deepseek-ai/dsh-site': ['dist', '!dist/**/*.map']`；改包名或产物目录时同步这里。
3. [`tsconfig.client.json`](../../../tsconfig.client.json) 引用 `./apps/site`，使 `pnpm run typecheck` 覆盖到它。
4. [`.gitignore`](../../../.gitignore) 忽略 `apps/site/dist/`（与 `apps/web/dist/` 对称）。
5. 保持零重量依赖：仅 react/react-dom + vite + @vitejs/plugin-react + typescript；图标内联 SVG、渐显用 IntersectionObserver，不引入 AOS/Framer/Tailwind/FontAwesome 或 SSR 框架。

## Verify

```sh
pnpm --filter @deepseek-ai/dsh-site run build          # 产出 apps/site/dist/
pnpm exec tsc -b apps/site                              # 严格模式类型检查
pnpm exec tsx scripts/check-workspace-constraints.ts    # workspace 约束
pnpm run verify-md-links                                 # 本 skill 的链接可解析
```

受限沙箱里 esbuild（Vite / tsx）以管道 stdio 拉起服务进程会得到 `spawn EPERM`，这是沙箱边界而非页面缺陷；必要时在更宽模式下重跑一次即可。