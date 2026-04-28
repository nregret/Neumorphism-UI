# 为 Neu UI 站点接入国际化（vue-i18n）实施计划

## Summary
- 在现有 **Vue 3 + Vite + TS** 代码基线上接入 `vue-i18n@9`，首批支持 `zh-CN` 与 `en-US`。
- 默认按浏览器语言自动选择（支持 `localStorage` 覆盖），不改变现有路由结构（不加 `/en` 前缀）。
- 在 **首页 Home** 与 **组件库 DocsLayout** 顶部栏新增“语言切换”下拉（必须使用现有 [NeuSelect.vue](file:///workspace/src/components/neu/NeuSelect.vue)），并按你指定的位置放置：
  - 首页：放在右上角“主题按钮（Palette）”左边（见 [Home.vue](file:///workspace/src/views/Home.vue#L73-L90)）。
  - 组件库：放在“主题按钮（Palette）”左边，移动端与桌面端头部都要有（见 [DocsLayout.vue](file:///workspace/src/layouts/DocsLayout.vue#L152-L168) 与 [DocsLayout.vue](file:///workspace/src/layouts/DocsLayout.vue#L181-L194)）。
- 国际化范围：**全站优先**（`src/` 下的页面与组件都要按语言切换）。`.skills/` 目录不做任何翻译与改动。
- Docs 文档页：除标题/说明外，**示例区文案与 CodeBlock 代码字符串也需要随语言切换**（依据你的确认）。

## Current State Analysis（基于仓库实际扫描）
- 入口： [main.ts](file:///workspace/src/main.ts#L1-L11) 仅创建 app + router，无 i18n 注入。
- 路由： [router/index.ts](file:///workspace/src/router/index.ts#L1-L219)，`/` → `views/Home.vue`，`/components/*` → `layouts/DocsLayout.vue` + 多个 `views/docs/*Doc.vue`。
- 顶部 Theme 按钮位置：
  - 首页导航右侧区域： [Home.vue](file:///workspace/src/views/Home.vue#L81-L89)。
  - DocsLayout：移动端 Header [DocsLayout.vue](file:///workspace/src/layouts/DocsLayout.vue#L159-L167)；桌面端 Logo 区 [DocsLayout.vue](file:///workspace/src/layouts/DocsLayout.vue#L191-L193)。
- 现有下拉组件： [NeuSelect.vue](file:///workspace/src/components/neu/NeuSelect.vue)（`options` + `v-model`，默认 placeholder 为中文）。
- 仓库当前未安装 i18n 相关依赖（[package.json](file:///workspace/package.json#L16-L43)）。
- `src/` 下中文文案分布广（尤其 `views/docs/*`、[DocsLayout.vue](file:///workspace/src/layouts/DocsLayout.vue)、[ThemeConfigurator.vue](file:///workspace/src/components/ThemeConfigurator.vue)、[CodeBlock.vue](file:///workspace/src/components/CodeBlock.vue)）。

## Assumptions & Decisions（已确定）
- **语言包**：`zh-CN`（默认与 fallback）+ `en-US`（首批）。
- **切换策略**：首次跟随浏览器语言；用户手动切换后写入 `localStorage` 并优先生效。
- **URL 结构**：不做 `/en/...` 前缀；不改现有路由。
- **下拉显示名**：语言选项 label 使用“中文简体 / English”。
- **翻译范围**：仅覆盖 `src/`；`.skills/` 不动。

## Proposed Changes（具体到文件、做什么、为什么、怎么做）

### 1) 安装依赖
- 修改：[package.json](file:///workspace/package.json)
  - `dependencies` 新增：`vue-i18n`（v9，与 Vue3 匹配）
- 同步 lockfile：`package-lock.json`

### 2) 新增 i18n 基础设施（集中化、可回滚）
- 新增：`src/i18n/index.ts`
  - `createI18n` 创建实例
  - 配置：
    - `legacy: false`
    - `globalInjection: true`（模板可直接用 `$t`）
    - `locale`：由“语言选择逻辑”决定
    - `fallbackLocale: 'zh-CN'`
    - `messages`：引入 `zh-CN`、`en-US`
- 新增：`src/i18n/messages/zh-CN.ts`、`src/i18n/messages/en-US.ts`
  - 放置全站通用 key（导航、DocsLayout、ThemeConfigurator、CodeBlock 等）
  - 约定 key 命名（建议）：
    - `nav.*`：顶部导航
    - `docsLayout.*`：组件库壳层（侧边栏分组名/搜索/空态/按钮 title）
    - `theme.*`：主题抽屉
    - `codeBlock.*`：复制按钮 title 等
    - `common.*`：通用
- 修改：[main.ts](file:///workspace/src/main.ts#L1-L11)
  - `app.use(i18n)` 注入（在 `app.use(router)` 之前或之后均可，但固定一致）

### 3) locale 选择逻辑（浏览器检测 + 持久化 + 映射）
- 新增：`src/i18n/locale.ts`（或 `src/composables/useLocale.ts`，二选一，建议放在 `src/i18n/`）
  - 常量：
    - `SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const`
    - `DEFAULT_LOCALE = 'zh-CN'`
    - `LOCALE_STORAGE_KEY = 'neu-ui-locale'`
  - 方法：
    - `normalizeBrowserLocale(lang: string): 'zh-CN' | 'en-US'`：将 `en`/`en-*` 归一到 `en-US`，其他归一到 `zh-CN`
    - `getInitialLocale(): SupportedLocale`：
      1) 读 `localStorage`（若合法则返回）
      2) 使用 `navigator.languages` / `navigator.language` 检测
      3) fallback 到 `DEFAULT_LOCALE`
    - `setLocale(next: SupportedLocale)`：
      - 更新 `i18n.global.locale.value`
      - 写入 `localStorage`
      - 可选：同步 `<html lang="...">`

### 4) 新增“语言切换下拉”组件（强制复用 NeuSelect，并保证导航不被撑爆）
- 新增：`src/components/LanguageSelect.vue`
  - 内部使用 [NeuSelect.vue](file:///workspace/src/components/neu/NeuSelect.vue)
  - `options` 固定为：
    - `{ label: '中文简体', value: 'zh-CN' }`
    - `{ label: 'English', value: 'en-US' }`
  - 绑定：
    - `v-model` 直接绑定到 `i18n.global.locale`（或通过第 3 步的 `setLocale`）
  - 外观适配导航栏（不修改 NeuSelect 本体，降低“破坏组件库”的风险）：
    - 通过 LanguageSelect 自身根容器控制宽度（例如 `w-32/w-36`）
    - 通过根容器添加 `scale-*`（如 `scale-75 origin-right`）让整体在导航中更“像按钮”
    - 下拉弹层保持可用（缩放会一并影响弹层尺寸，视觉一致）

### 5) 首页：接入语言切换、并把文案迁移到 i18n
- 修改：[Home.vue](file:///workspace/src/views/Home.vue)
  - 顶部导航右侧区域（[Home.vue](file:///workspace/src/views/Home.vue#L81-L89)）插入 `<LanguageSelect />`：
    - 位置：放在 Palette 主题按钮左侧
    - 维持现有 `space-x-6`，必要时对 LanguageSelect 单独设置宽度/缩放
  - 将首页所有可见文案切换为 i18n：
    - 导航链接“组件库”
    - Hero 标题、副标题、描述
    - CTA 按钮“快速开始”等
    - 播放器 demo 区标题、按钮 title（例如 “后退 10 秒/前进 10 秒/暂停/播放”）
  - 技术实现：
    - 模板内使用 `$t('...')`
    - 条件 title 直接在模板使用 `$t`（避免脚本层额外翻译代码）

### 6) 组件库壳层：接入语言切换、侧边栏/搜索/空态全部 i18n
- 修改：[DocsLayout.vue](file:///workspace/src/layouts/DocsLayout.vue)
  - 顶部按钮区新增 `<LanguageSelect />`：
    - 移动端 Header：放在主题按钮左侧（[DocsLayout.vue](file:///workspace/src/layouts/DocsLayout.vue#L159-L167) 这一排）
    - 桌面端 Logo 区：放在主题按钮左侧（[DocsLayout.vue](file:///workspace/src/layouts/DocsLayout.vue#L191-L193) 同一容器内）
  - 将以下文案 i18n 化：
    - `componentGroups` 分组标题与链接名（目前写死在脚本常量，[DocsLayout.vue](file:///workspace/src/layouts/DocsLayout.vue#L17-L82)）
    - 搜索 placeholder / aria-label / 空态提示 / “清除搜索”
    - “Theme Config” 等 title
  - 技术实现：
    - 脚本区引入 `useI18n()`，将 `componentGroups` 改为 `computed(() => [...])`，其中 `title/name` 使用 `t(...)`
    - 其他模板字符串用 `$t(...)`

### 7) ThemeConfigurator：全量 i18n（抽屉标题、说明、字段名、预设名等）
- 修改：[ThemeConfigurator.vue](file:///workspace/src/components/ThemeConfigurator.vue)
  - 模板字符串全部替换为 `$t(...)`
  - 脚本内的 `presets`（预设数组）名称要随语言切换：
    - 把 `presets` 改为 `computed(() => [...])`，name 从 `t(...)` 读取
  - `NeuDrawer` 的 `title` 改为 i18n（当前为硬编码）

### 8) CodeBlock：复制按钮 title i18n（影响所有 docs 页）
- 修改：[CodeBlock.vue](file:///workspace/src/components/CodeBlock.vue#L48-L58)
  - 将 `title="Copy code"` 替换为 `$t('codeBlock.copy')`
  - 可选增强：复制成功时切换为 `$t('codeBlock.copied')`（仅 title，不改变现有 icon 交互）

### 9) Docs 内容页：示例区 + CodeBlock 字符串也双语
- 修改范围：`src/views/docs/*.vue`（见 [router/index.ts](file:///workspace/src/router/index.ts#L14-L210) 列表）
- 每个 Doc 页按统一模式改造（确保可批量维护）：
  - 脚本：
    - `import { computed } from 'vue'`（如果已有则复用）
    - `import { useI18n } from 'vue-i18n'`
    - `const { locale } = useI18n()`
    - `const isEn = computed(() => locale.value === 'en-US')`
    - 为每段文案与每段 code block 提供 `Zh/En` 两份字符串，并用 `computed` 选择：
      - 例：`const title = computed(() => isEn.value ? 'Button' : 'Button 按钮')`
      - 例：`const usageCode = computed(() => isEn.value ? usageCodeEn : usageCodeZh)`
  - 模板：
    - 所有 heading/段落/section 标题/示例按钮文字等均改为绑定上述 `computed` 字符串
    - 所有 `<CodeBlock :code="...">` 传入 computed 的 code 字符串
- 约束：
  - 仅改 `src/views/docs/*`，不涉及 `.skills` 内的示例文件

## Rollout / Safety（降低破坏风险的落地顺序）
1. 先落 i18n 基建（新增文件 + main.ts 注入），不改 UI 文案，确保构建通过。
2. 引入 locale 逻辑 + LanguageSelect 组件，但先只在 Home 顶部接入，观察布局。
3. 接入 DocsLayout（移动端/桌面端各一处）并完成侧边栏与搜索 i18n。
4. 处理 ThemeConfigurator 与 CodeBlock 的 i18n。
5. 最后批量处理 `views/docs/*`，每次改完一批就跑验证，避免大爆炸式 diff 难回滚。

## Verification（必须可重复执行的验证步骤）
- 依赖安装：`npm ci`
- 静态检查：`npm run lint`、`npm run check`
- 构建：`npm run build`
- 本地人工验证（重点场景）：
  - 首次进入：浏览器语言为英文时默认显示英文；中文时默认中文
  - 切换语言后刷新：仍保持上次选择（localStorage 生效）
  - 首页导航：语言下拉位于主题按钮左侧，且不挤压/换行到下一行
  - DocsLayout：移动端与桌面端语言下拉均位于主题按钮左侧
  - Docs 页：示例区文案与 CodeBlock 字符串随语言切换

