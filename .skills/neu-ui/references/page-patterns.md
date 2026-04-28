# NeuUI 页面模式

## 登录页

- 外层保持大面积 `var(--bg-color)` 背景，核心区域用 `NeuCard` 承载。
- 表单区优先使用 `NeuForm`、`NeuFormItem`、`NeuInput`、`NeuCheckbox`、`NeuButton`。
- 辅助反馈优先使用 `NeuAlert` 或按钮下方的弱提示文案。
- 行为按钮不要堆太多，主按钮保持一个高优先级 `variant="primary"`。

## 设置页

- 页面分区优先使用多个 `NeuCard`，每个卡片只承载一个清晰主题。
- 顶部导航优先使用 `NeuTabs`，布尔开关用 `NeuSwitch`，区间值用 `NeuSlider`。
- 枚举配置优先使用 `NeuSelect`，颜色相关优先使用 `NeuColorPicker`。
- 底部操作区用 `NeuButton` 做保存/重置，避免用普通文本链接承担关键动作。

## 数据列表页

- 工具栏优先由 `NeuInput`、`NeuSelect`、`NeuButton` 组成，放在同一张 `NeuCard` 内。
- 数据主体优先使用 `NeuTable`，状态字段用 `NeuBadge` 或 `NeuTag` 做视觉区分。
- 分页使用 `NeuPagination`，批量操作或危险动作可叠加 `NeuPopconfirm`。
- 空态、加载、错误反馈分别考虑 `NeuEmpty`、`NeuSpin`、`NeuAlert`。

## 组合原则

- 页面优先由卡片分区，不要把整个页面再包成一层超大浮卡。
- 同一区块尽量只突出一个主交互，避免每个按钮都做成高强调态。
- 阴影和圆角已经由主题变量统一控制，不要在页面层随意造新的视觉尺度。
- 若页面需要更强层次，先提升 `shadow-neu-flat` / `shadow-neu-pressed` 的使用密度，再考虑额外装饰。
