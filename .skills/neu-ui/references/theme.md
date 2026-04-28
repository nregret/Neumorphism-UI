# NeuUI 主题规则

## 核心变量

NeuUI 的颜色、阴影和圆角都围绕以下变量工作：

```css
:root {
  --bg-color: #e0e5ec;
  --text-color: #333333;
  --text-muted: #666666;
  --shadow-light: #ffffff;
  --shadow-dark: #a3b1c6;
  --accent: #4f46e5;

  --neu-scale: 1;
  --neu-d1: 3px;
  --neu-d1-n: -3px;
  --neu-b1: 7px;
  --neu-d2: 6px;
  --neu-d2-n: -6px;
  --neu-b2: 14px;
  --neu-d3: 12px;
  --neu-d3-n: -12px;
  --neu-b3: 26px;

  --neu-radius-scale: 1;
  --neu-radius-sm: 8px;
  --neu-radius-md: 16px;
  --neu-radius-lg: 24px;
}
```

## 使用原则

- `--bg-color` 决定页面基底色，也是大多数组件的背景来源。
- `--shadow-light` 和 `--shadow-dark` 必须与 `--bg-color` 同步，不能只改背景色不改阴影色。
- `--accent` 负责主按钮、活跃态、关键指标和可交互高亮。
- `--neu-scale` 控制整体阴影深度，适合做“更柔和”或“更强烈”的全局调整。
- `--neu-radius-*` 控制圆角梯度，页面级不要再随意引入第四套圆角尺度。

## 组件层视觉惯例

- 凸起元素：优先使用 `shadow-neu-flat` 系列。
- 凹陷元素：优先使用 `shadow-neu-pressed` 系列。
- 主体面板和抽屉：优先使用 `lg` 级深度或圆角。
- 输入框、按钮、表单项：优先使用 `md` 级深度和圆角。
- 标签、徽标、细部按钮：优先使用 `sm` 级圆角或更轻的阴影。

## 主题设计建议

- 想做浅色主题时，先调 `--bg-color` 和 `--accent`，再根据背景重新推导阴影色。
- 想做暗色主题时，不要只反转文本色，必须同步收紧 `--shadow-light` 与 `--shadow-dark` 的对比。
- 若用户说“更柔和”，优先减小 `--neu-scale`，不要直接去掉阴影。
- 若用户说“更圆润”，优先增大 `--neu-radius-scale`，不要逐个组件单独改圆角。

## 配套资源

- `assets/library/style.css`：完整基础变量和 Tailwind 工具类来源
- `assets/examples/pages/settings-page.vue`：展示如何在页面中消费主题变量
