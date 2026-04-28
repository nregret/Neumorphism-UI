---
name: neu-ui
description: 通用 NeuUI / 新拟态 Vue 组件技能包，包含真实组件源码镜像、组件示例、页面模板、主题变量和调用规则。用于生成 NeuUI 页面、把现有 Vue 页面改成新拟态风格、解释 NeuButton/NeuCard/NeuModal 等组件、设计或应用主题变量、规划组件组合。触发词包括 NeuUI、新拟态组件、Neumorphism、NeuButton、NeuCard、NeuModal、主题变量、把页面改成新拟态。
---

# NeuUI 通用 Skill

把这份 skill 当成 NeuUI 的参考手册和案例包使用，不把它当成目标项目的直接依赖。

## 核心规则

- 先读 `references/components.md`，确定应该用哪些组件、props、events 和 slots。
- 涉及整页布局时，再读 `references/page-patterns.md` 和 `assets/examples/pages/` 里的页面案例。
- 只在组件 API、交互细节或主题实现不确定时，继续读取 `assets/library/` 下的真实源码镜像。
- 默认不要输出对 `.skills/neu-ui/...` 的直接 import。
- 只有目标项目本身已经包含 NeuUI 组件，或用户明确要求“复制组件”“移植组件”“把 NeuUI 带进项目”时，才引用 `assets/library/` 中的真实源码路径。
- 默认遵循 `Vue 3 + <script setup> + Tailwind`，并复用 NeuUI 现有的阴影、圆角和主题变量体系。

## 推荐工作流

1. 判断用户是在问组件用法、页面生成、现有页面改造，还是主题变量设计。
2. 先查 `references/components.md` 中对应组件章节。
3. 若是页面任务，优先参考 `assets/examples/pages/login-page.vue`、`settings-page.vue`、`data-list-page.vue`。
4. 若是组件级任务，优先参考 `assets/examples/components/` 中与组件同名前缀的示例。
5. 若 props、事件、slots 或内部联动不清楚，再读 `assets/library/components/neu/` 对应源码。
6. 输出结果时优先给出面向目标项目的可用代码，不把 skill 内部路径当成最终 import。

## 输出约束

- 优先复用已有 NeuUI 心智模型，不重新发明一套新的新拟态命名规则。
- 优先使用主题变量：`--bg-color`、`--text-color`、`--accent`、`--shadow-light`、`--shadow-dark`、`--neu-*`。
- 页面结构保持安静、工具化、可扫描，避免营销站式大 Hero。
- 给出现有页面改造建议时，优先说明“当前元素可替换成哪个 NeuUI 组件”以及“需要补哪些主题变量”。
- 若目标项目并没有 NeuUI 组件，默认把这份 skill 当成设计和实现参考，不假装这些组件已经存在。

## 常用资源

- `references/components.md`：组件总索引
- `references/catalog.json`：结构化组件索引
- `references/integration.md`：如何在已有项目或普通项目中使用这份 skill
- `references/page-patterns.md`：登录页、设置页、数据列表页的组合套路
- `references/theme.md`：主题变量与新拟态视觉规则
- `assets/library/`：真实源码镜像
- `assets/examples/components/`：组件级示例
- `assets/examples/pages/`：页面级模板

## 调用示例

- `用 NeuUI 做一个登录页，保留记住我和忘记密码入口`
- `把这个设置页改成新拟态风格，优先用 NeuCard、NeuTabs、NeuSwitch`
- `解释 NeuModal 应该怎么用，重点说 footer slot 和关闭行为`
- `给数据列表页配一套 NeuUI 主题变量，风格偏浅灰蓝`
- `用 NeuUI 的思路重写一个表单区块，不要直接引用 skill 路径`
- `看看这个页面适合替换成哪些 NeuUI 组件`
- `如果要把按钮、输入框和卡片迁移进项目，告诉我最小迁移集合`
