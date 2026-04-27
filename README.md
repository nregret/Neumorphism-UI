# NeuUI

<p align="center">
  <strong>一套完整、高度可定制的 Neumorphism（新拟态）风格 Vue 3 组件库</strong>
</p>

---

## 特性

- **32+ 组件** — 涵盖基础、导航、表单、数据展示、反馈五大类别
- **新拟态阴影系统** — 基于 CSS 自定义属性的三层深度体系，支持凸起/凹陷双态
- **暗色模式** — 内置 light/dark 切换，自动跟随系统偏好
- **主题引擎** — 可视化配置背景色、强调色、阴影深度，支持 5 种预设主题
- **TypeScript** — 全面类型支持，基于 Vue 3 Composition API (`<script setup>`)
- **按需定制** — 全局 `--neu-scale` 乘数一键调节整体阴影强度

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 类型检查
npm run check

# 代码检查
npm run lint
```

## 组件

### 基础
| 组件 | 路径 | 说明 |
|------|------|------|
| Button | `/components/button` | 新拟态按钮，支持 primary/icon 变体和圆形/圆角形状 |
| Card | `/components/card` | 新拟态卡片容器，支持凸起/凹陷及圆角调节 |
| Divider | `/components/divider` | 新拟态分割线 |

### 导航
| 组件 | 路径 | 说明 |
|------|------|------|
| Breadcrumb | `/components/breadcrumb` | 面包屑导航 |
| Dropdown | `/components/dropdown` | 下拉菜单 |
| Menu | `/components/menu` | 垂直菜单 |
| Pagination | `/components/pagination` | 分页器 |
| Steps | `/components/steps` | 步骤条 |
| Tabs | `/components/tabs` | 标签页切换 |

### 表单 & 交互
| 组件 | 路径 | 说明 |
|------|------|------|
| Input | `/components/input` | 输入框 |
| Select | `/components/select` | 选择器 |
| Switch | `/components/switch` | 开关 |
| Radio | `/components/radio` | 单选 |
| Checkbox | `/components/checkbox` | 复选 |
| Slider | `/components/slider` | 滑块 |
| Rate | `/components/rate` | 评分 |
| DatePicker | `/components/datepicker` | 日期选择 |
| TimePicker | `/components/timepicker` | 时间选择 |
| ColorPicker | `/components/colorpicker` | 颜色选择 |
| Upload | `/components/upload` | 文件上传 |
| Form | `/components/form` | 表单容器与校验 |

### 数据展示
| 组件 | 路径 | 说明 |
|------|------|------|
| Table | `/components/table` | 表格（排序、筛选） |
| Avatar | `/components/avatar` | 头像 |
| Badge | `/components/badge` | 徽标 |
| Tag | `/components/tag` | 标签 |
| Progress | `/components/progress` | 进度条 |
| Accordion | `/components/accordion` | 手风琴折叠面板 |
| Carousel | `/components/carousel` | 轮播图 |
| Tree | `/components/tree` | 树形控件 |
| Skeleton | `/components/skeleton` | 骨架屏 |
| Scrollbar | `/components/scrollbar` | 新拟态滚动条 |
| Empty | `/components/empty` | 空状态 |

### 反馈 & 浮层
| 组件 | 路径 | 说明 |
|------|------|------|
| Modal | `/components/modal` | 模态框 |
| Drawer | `/components/drawer` | 抽屉面板（四方向） |
| Toast | `/components/toast` | 轻提示（支持命令式调用） |
| Tooltip | `/components/tooltip` | 工具提示 |
| Popconfirm | `/components/popconfirm` | 气泡确认框 |
| Alert | `/components/alert` | 警告提示 |
| Spin | `/components/spin` | 加载中 |

## 主题定制

主题通过 CSS 自定义属性实现，所有组件颜色均引用以下变量：

```css
:root {
  --bg-color: #e0e5ec;        /* 背景色 */
  --text-color: #333333;      /* 文本色 */
  --text-muted: #666666;      /* 次要文本 */
  --shadow-light: #ffffff;    /* 亮阴影 */
  --shadow-dark: #a3b1c6;     /* 暗阴影 */
  --accent: #4f46e5;          /* 强调色 */
  --neu-scale: 1;             /* 阴影深度乘数 (0.4 ~ 1.6) */
}
```

暗色模式通过 `.dark` 类覆盖变量：

```css
.dark {
  --bg-color: #292d32;
  --text-color: #e0e5ec;
  ...
}
```

项目中内置了 **主题配置器**（点击文档站右上角调色板图标），支持：
- 5 种预设主题一键切换
- 自定义背景 / 强调 / 文本色
- 三层阴影深度独立调节
- 实时预览并一键复制 CSS 变量

## 技术栈

- **框架**: Vue 3（Composition API + `<script setup>`）
- **语言**: TypeScript
- **构建**: Vite 5
- **样式**: Tailwind CSS 3 + CSS 自定义属性
- **路由**: Vue Router 4
- **图标**: Lucide Vue Next
- **工具库**: @vueuse/core, clsx, tailwind-merge

## 项目结构

```
src/
├── components/
│   ├── neu/              # 所有 NeuUI 组件（NeuButton, NeuModal...）
│   ├── CodeBlock.vue     # 文档代码展示
│   ├── ThemeConfigurator.vue  # 主题配置抽屉
│   └── Empty.vue
├── composables/
│   ├── useTheme.ts       # 亮/暗主题切换
│   ├── useThemePalette.ts # 主题调色板系统
│   └── useOverlay.ts     # 浮层通用逻辑（滚动锁定/ESC/点击外部）
├── layouts/
│   └── DocsLayout.vue    # 文档站侧边栏布局
├── views/
│   ├── Home.vue          # 首页
│   └── docs/             # 各组件文档页面
├── router/
│   └── index.ts          # 路由配置
├── lib/
│   └── utils.ts          # cn() 工具函数
└── style.css             # 全局样式 + CSS 变量 + 滚动条工具类
```

## License

MIT
