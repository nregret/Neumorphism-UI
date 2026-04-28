# NeuUI Skill 集成说明

## 默认模式

这份 skill 默认是“参考模式”，不是“自动安装模式”。

- 默认把 `assets/library/`、`assets/examples/` 和各类 reference 文件当成设计与实现参考。
- 默认不要把 `.skills/neu-ui/...` 里的路径原样输出为最终业务代码 import。
- 只有目标项目已经有 NeuUI 组件，或者用户明确要求复制/移植组件时，才进入“源码迁移模式”。

## 在已有 NeuUI 项目中使用

- 直接根据 `references/components.md` 找到组件名和关键 props。
- 若目标项目的组件 API 与镜像源码一致，可直接输出真实组件调用方式。
- 需要核对交互细节时，再读 `assets/library/components/neu/` 下的源码。

## 在普通 Vue 项目中使用

- 优先把 NeuUI 当作界面结构和视觉规范参考，而不是现成依赖。
- 输出时说明：哪些现有元素适合被 NeuUI 组件替换，哪些交互需要迁移，哪些主题变量要补齐。
- 如果用户没有要求移植组件，就不要假设 `NeuButton`、`NeuCard`、`NeuModal` 已经存在于目标项目。

## 进入源码迁移模式的条件

出现以下任一情况时，可以引用 `assets/library/` 的真实文件作为迁移来源：

- 用户明确说“复制组件”
- 用户明确说“移植组件”
- 用户明确说“把这套 NeuUI 带进项目里”
- 当前仓库本身就是 NeuUI 组件库或其下游项目

## 阅读优先级

1. `references/components.md`
2. `references/page-patterns.md`
3. `assets/examples/pages/`
4. `assets/examples/components/`
5. `assets/library/`

## 输出建议

- 先给目标项目可落地的代码或改造建议。
- 再说明这个建议对应了哪些 NeuUI 组件心智模型。
- 若需要迁移源码，最后再指出应从 `assets/library/` 复制哪些文件。
