# Add Missing Components Spec

## Why
在前面的大厂 UI 库调研中，我们发现了当前 NeuUI 组件库在复杂中后台管理系统和重度数据录入场景中缺少 9 个关键组件：Form, DatePicker, Upload, Tree, Tag, Menu, Steps, Popconfirm, Spin。为了使组件库能达到大厂开源组件库的标准，我们需要将这些核心组件补齐，继续打造我们独有的新拟态风格。

## What Changes
- 新增 `NeuForm` 组件，支持表单布局与基本校验。
- 新增 `NeuDatePicker` 日期选择组件。
- 新增 `NeuUpload` 文件上传组件。
- 新增 `NeuTree` 树形控件组件。
- 新增 `NeuTag` 标签组件。
- 新增 `NeuMenu` 导航菜单组件。
- 新增 `NeuSteps` 步骤条组件。
- 新增 `NeuPopconfirm` 气泡确认框组件。
- 新增 `NeuSpin` 加载指示器组件。
- 更新官网文档，包含新组件的文档和路由配置。
- 保证新组件的风格符合 NeuUI 的新拟态 (Neumorphism) 设计语言。

## Impact
- Affected specs: NeuUI Component Library
- Affected code: `src/components/neu/*`, `src/views/docs/*`, `src/router/index.ts`, `src/layouts/DocsLayout.vue`, `src/views/Home.vue`

## ADDED Requirements
### Requirement: Data Input Components
The system SHALL provide `NeuForm`, `NeuDatePicker`, and `NeuUpload` components.
- **WHEN** user needs to input complex data or validate inputs
- **THEN** they can use NeuForm with validation rules.

### Requirement: Data Display Components
The system SHALL provide `NeuTree` and `NeuTag` components.
- **WHEN** user needs to display hierarchical data or statuses
- **THEN** they can use NeuTree and NeuTag.

### Requirement: Navigation Components
The system SHALL provide `NeuMenu` and `NeuSteps` components.
- **WHEN** user needs to navigate the app or follow a multi-step process
- **THEN** they can use NeuMenu and NeuSteps.

### Requirement: Feedback Components
The system SHALL provide `NeuPopconfirm` and `NeuSpin` components.
- **WHEN** user performs a destructive action or waits for async operations
- **THEN** they can see NeuPopconfirm and NeuSpin.
