# NeuUI 组件索引

共 42 个组件/入口，内容由 `npm run skill:sync` 生成。

## NeuAccordion

- `name`: `NeuAccordion`
- `sourcePath`: `assets/library/components/neu/NeuAccordion.vue`
- `description`: 新拟态风格的手风琴/折叠面板组件，通过 CSS Grid 实现高度自适应的丝滑展开动画，内容区采用内阴影承载。
- `props`: `items: AccordionItem[] modelValue?: (string | number)[] multiple?: boolean`
- `defaults`: `modelValue = () => []`、`multiple = false`
- `events`: 无
- `slots`: ``content-${item.id}``
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuAccordion-usage.vue`

## NeuAlert

- `name`: `NeuAlert`
- `sourcePath`: `assets/library/components/neu/NeuAlert.vue`
- `description`: 在页面上展示重要的全局或局部提示信息，采用内凹阴影 (`pressed`) 作为容器背景，并使用悬浮图标传达状态。
- `props`: `variant?: 'info' | 'success' | 'warning' | 'error' | 'default' title?: string description?: string closable?: boolean`
- `defaults`: `variant = 'default'`、`closable = false`
- `events`: `close`
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuAlert-usage.vue`

## NeuAvatar

- `name`: `NeuAvatar`
- `sourcePath`: `assets/library/components/neu/NeuAvatar.vue`
- `description`: 新拟态风格的头像组件，支持图片加载、文本缩写兜底，并提供在线状态指示器。
- `props`: `src?: string alt?: string size?: 'sm' | 'md' | 'lg' | 'xl' shape?: 'circle' | 'rounded' | 'square' bordered?: boolean status?: 'online' | 'offline' | 'away' | 'busy' | 'none'`
- `defaults`: `size = 'md'`、`shape = 'circle'`、`bordered = true`、`status = 'none'`
- `events`: 无
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuAvatar-usage.vue`

## NeuBadge

- `name`: `NeuBadge`
- `sourcePath`: `assets/library/components/neu/NeuBadge.vue`
- `description`: 新拟态风格的徽标组件，用于状态标记、数字提示或分类标签。支持外凸、内凹及幽灵样式。
- `props`: `variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' type?: 'flat' | 'pressed' | 'ghost' size?: 'sm' | 'md' | 'lg' rounded?: 'full' | 'default' dot?: boolean`
- `defaults`: `variant = 'default'`、`type = 'flat'`、`size = 'md'`、`rounded = 'full'`、`dot = false`
- `events`: 无
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuBadge-usage.vue`

## NeuBreadcrumb

- `name`: `NeuBreadcrumb`
- `sourcePath`: `assets/library/components/neu/NeuBreadcrumb.vue`
- `description`: 显示当前页面在系统层级结构中的位置，带有新拟态特有的浮雕容器。
- `props`: `items: BreadcrumbItem[] separator?: string variant?: 'flat' | 'pressed'`
- `defaults`: `variant = 'flat'`
- `events`: `navigate(item: BreadcrumbItem)`
- `slots`: `separator`、``icon-${index}``
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuBreadcrumb-usage.vue`

## NeuButton

- `name`: `NeuButton`
- `sourcePath`: `assets/library/components/neu/NeuButton.vue`
- `description`: 新拟态风格的按钮组件，通过内外阴影的切换表现凸起（Default）与凹陷（Pressed/Active）的物理状态。
- `props`: `variant?: 'default' | 'primary' | 'icon' size?: 'sm' | 'md' | 'lg' shape?: 'rounded' | 'circle' active?: boolean disabled?: boolean type?: 'button' | 'submit' | 'reset'`
- `defaults`: `variant = 'default'`、`size = 'md'`、`shape = 'rounded'`、`active = false`、`disabled = false`、`type = 'button'`
- `events`: 无
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuButton-usage.vue`、`assets/examples/components/NeuButton-size.vue`、`assets/examples/components/NeuButton-shape.vue`

## NeuCard

- `name`: `NeuCard`
- `sourcePath`: `assets/library/components/neu/NeuCard.vue`
- `description`: 卡片是新拟态UI中最基础的容器组件。通过不同的阴影方向（外阴影或内阴影）区分层级关系。
- `props`: `pressed?: boolean padding?: 'none' | 'sm' | 'md' | 'lg' rounded?: 'sm' | 'md' | 'lg' | 'full'`
- `defaults`: `pressed = false`、`padding = 'md'`、`rounded = 'md'`
- `events`: 无
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuCard-usage.vue`

## NeuCarousel

- `name`: `NeuCarousel`
- `sourcePath`: `assets/library/components/neu/NeuCarousel.vue`
- `description`: 具有极强物理质感的轮播组件。凹陷外框、毛玻璃导航按钮、动态胶囊指示器， 支持 slide 与 fade 两种切换效果。
- `props`: `items: T[] autoPlay?: boolean interval?: number showArrows?: boolean showDots?: boolean /** 切换效果：slide（滑动）| fade（淡入淡出） */ effect?: 'slide' | 'fade' /** 是否显示进度条（在 dots 下方） */ showProgress?: boolean`
- `defaults`: `autoPlay = true`、`interval = 3000`、`showArrows = true`、`showDots = true`、`effect = 'slide'`、`showProgress = false`
- `events`: 无
- `slots`: `default`
- `relatedComponents`: `NeuButton`
- `exampleFiles`: `assets/examples/components/NeuCarousel-basic-usage.vue`、`assets/examples/components/NeuCarousel-fade-usage.vue`、`assets/examples/components/NeuCarousel-manual-usage.vue`

## NeuCheckbox

- `name`: `NeuCheckbox`
- `sourcePath`: `assets/library/components/neu/NeuCheckbox.vue`
- `description`: 新拟态风格的多选框组件，未选中时呈凸起状态，选中时呈现凹陷与勾选图标。
- `props`: `modelValue: any[] | boolean value?: any label?: string disabled?: boolean`
- `defaults`: `disabled = false`
- `events`: `update:modelValue(value: any[] | boolean)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuCheckbox-usage.vue`

## NeuColorPicker

- `name`: `NeuColorPicker`
- `sourcePath`: `assets/library/components/neu/NeuColorPicker.vue`
- `description`: 用于颜色选择的组件。提供预设颜色和 RGB 滑块，完全采用新拟态风格，具有极强的物理质感。
- `props`: `modelValue?: string // HEX string e.g. "#FF0000" disabled?: boolean`
- `defaults`: `modelValue = '#4f46e5'`、`disabled = false`
- `events`: `update:modelValue(value: string)`、`change(value: string)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuColorPicker-basic-usage.vue`、`assets/examples/components/NeuColorPicker-disabled-usage.vue`

## NeuDatePicker

- `name`: `NeuDatePicker`
- `sourcePath`: `assets/library/components/neu/NeuDatePicker.vue`
- `description`: 新拟态风格的日期选择组件，基于原生 date input 封装。
- `props`: `modelValue: string // Format: YYYY-MM-DD placeholder?: string disabled?: boolean error?: boolean min?: string max?: string`
- `defaults`: `placeholder = '请选择日期'`、`disabled = false`、`error = false`
- `events`: `update:modelValue(value: string)`、`change(value: string)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuDatePicker-usage.vue`

## NeuDivider

- `name`: `NeuDivider`
- `sourcePath`: `assets/library/components/neu/NeuDivider.vue`
- `description`: 区隔内容的分割线，支持内凹（沟槽）和外凸（脊线）两种立体质感。
- `props`: `type?: 'horizontal' | 'vertical' variant?: 'groove' | 'ridge'`
- `defaults`: `type = 'horizontal'`、`variant = 'groove'`
- `events`: 无
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuDivider-horizontal-groove.vue`、`assets/examples/components/NeuDivider-horizontal-ridge.vue`、`assets/examples/components/NeuDivider-vertical-groove.vue`

## NeuDrawer

- `name`: `NeuDrawer`
- `sourcePath`: `assets/library/components/neu/NeuDrawer.vue`
- `description`: 这里是抽屉的内容区域...
- `props`: `modelValue: boolean title?: string placement?: 'left' | 'right' | 'top' | 'bottom' size?: string // css width/height value, e.g., '300px', '50vw' closeOnEsc?: boolean closeOnClickOutside?: boolean showCloseIcon?: boolean`
- `defaults`: `modelValue = false`、`title = ''`、`placement = 'right'`、`size = '400px'`、`closeOnEsc = true`、`closeOnClickOutside = true`、`showCloseIcon = true`
- `events`: `update:modelValue(value: boolean)`、`close`、`open`
- `slots`: `default`、`footer`
- `relatedComponents`: `NeuButton`
- `exampleFiles`: `assets/examples/components/NeuDrawer-usage.vue`

## NeuDropdown

- `name`: `NeuDropdown`
- `sourcePath`: `assets/library/components/neu/NeuDropdown.vue`
- `description`: 带有强烈物理层级感的悬浮下拉菜单，支持点击和悬停触发。
- `props`: `items: DropdownItem[] placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' trigger?: 'click' | 'hover'`
- `defaults`: `placement = 'bottom-start'`、`trigger = 'click'`
- `events`: `select(item: DropdownItem)`
- `slots`: `trigger`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuDropdown-usage.vue`

## NeuEmpty

- `name`: `NeuEmpty`
- `sourcePath`: `assets/library/components/neu/NeuEmpty.vue`
- `description`: 当目前没有数据时，用于占位的提示组件，采用新拟态独有的内凹式设计。
- `props`: `description?: string image?: string`
- `defaults`: `description = '暂无数据'`
- `events`: 无
- `slots`: `image`、`default`、`extra`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuEmpty-basic-usage.vue`、`assets/examples/components/NeuEmpty-custom-desc.vue`、`assets/examples/components/NeuEmpty-custom-icon.vue`、`assets/examples/components/NeuEmpty-with-extra.vue`

## NeuForm

- `name`: `NeuForm`
- `sourcePath`: `assets/library/components/neu/NeuForm.vue`
- `description`: 具有数据收集、校验和提交功能的表单，包含输入、选择等控件。
- `props`: `model?: any rules?: any layout?: 'horizontal' | 'vertical' | 'inline' labelWidth?: string`
- `defaults`: `model = () => ({})`、`rules = () => ({})`、`layout = 'vertical'`、`labelWidth = '100px'`
- `events`: `submit(event: Event)`
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuForm-usage.vue`

## NeuFormItem

- `name`: `NeuFormItem`
- `sourcePath`: `assets/library/components/neu/NeuFormItem.vue`
- `description`: NeuForm 的表单项容器组件，负责标签、错误信息和布局编排。
- `props`: `label?: string prop?: string required?: boolean error?: string`
- `defaults`: 无
- `events`: 无
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuForm-usage.vue`

## NeuInput

- `name`: `NeuInput`
- `sourcePath`: `assets/library/components/neu/NeuInput.vue`
- `description`: 带有内凹阴影效果的新拟态输入框。
- `props`: `modelValue: string placeholder?: string type?: string disabled?: boolean error?: boolean`
- `defaults`: `type = 'text'`、`placeholder = ''`、`disabled = false`、`error = false`
- `events`: `update:modelValue(value: string)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuInput-usage.vue`

## NeuMenu

- `name`: `NeuMenu`
- `sourcePath`: `assets/library/components/neu/NeuMenu.vue`
- `description`: 为网站提供导航功能的菜单，支持垂直和水平两种模式。
- `props`: `items: MenuItem[] modelValue?: string mode?: 'vertical' | 'horizontal'`
- `defaults`: `modelValue = ''`、`mode = 'vertical'`
- `events`: `update:modelValue(key: string)`、`select(item: MenuItem)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuMenu-usage.vue`

## NeuModal

- `name`: `NeuModal`
- `sourcePath`: `assets/library/components/neu/NeuModal.vue`
- `description`: 这是一个基于新拟态风格设计的模态对话框。 它包含背景高斯模糊、内凹的滚动条以及丝滑的弹出动画。
- `props`: `modelValue: boolean title?: string width?: 'sm' | 'md' | 'lg' | 'xl' | 'full' closeOnEsc?: boolean closeOnClickOutside?: boolean showCloseIcon?: boolean`
- `defaults`: `modelValue = false`、`title = ''`、`width = 'md'`、`closeOnEsc = true`、`closeOnClickOutside = true`、`showCloseIcon = true`
- `events`: `update:modelValue(value: boolean)`、`close`、`open`
- `slots`: `default`、`footer`
- `relatedComponents`: `NeuButton`、`NeuCard`
- `exampleFiles`: `assets/examples/components/NeuModal-usage.vue`

## NeuPagination

- `name`: `NeuPagination`
- `sourcePath`: `assets/library/components/neu/NeuPagination.vue`
- `description`: 带有新拟态物理质感的分页组件，当前激活的页码呈现内凹的按压状态。
- `props`: `modelValue: number total: number pageSize?: number disabled?: boolean siblingCount?: number`
- `defaults`: `pageSize = 10`、`disabled = false`、`siblingCount = 1`
- `events`: `update:modelValue(page: number)`、`change(page: number)`
- `slots`: 无
- `relatedComponents`: `NeuButton`
- `exampleFiles`: `assets/examples/components/NeuPagination-usage.vue`

## NeuPopconfirm

- `name`: `NeuPopconfirm`
- `sourcePath`: `assets/library/components/neu/NeuPopconfirm.vue`
- `description`: 新拟态风格的气泡确认框，点击元素，弹出气泡式的确认框。
- `props`: `title: string content?: string confirmText?: string cancelText?: string position?: 'top' | 'bottom' | 'left' | 'right'`
- `defaults`: `confirmText = '确定'`、`cancelText = '取消'`、`position = 'top'`
- `events`: `confirm`、`cancel`
- `slots`: `default`
- `relatedComponents`: `NeuButton`
- `exampleFiles`: `assets/examples/components/NeuPopconfirm-usage.vue`、`assets/examples/components/NeuPopconfirm-position.vue`

## NeuProgress

- `name`: `NeuProgress`
- `sourcePath`: `assets/library/components/neu/NeuProgress.vue`
- `description`: 带有内阴影凹槽和填充色的进度条组件，支持多种尺寸、颜色及条纹动画效果。
- `props`: `modelValue: number max?: number height?: 'sm' | 'md' | 'lg' color?: 'accent' | 'success' | 'warning' | 'error' showLabel?: boolean striped?: boolean animated?: boolean`
- `defaults`: `max = 100`、`height = 'md'`、`color = 'accent'`、`showLabel = false`、`striped = false`、`animated = false`
- `events`: 无
- `slots`: `label`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuProgress-usage.vue`

## NeuRadio

- `name`: `NeuRadio`
- `sourcePath`: `assets/library/components/neu/NeuRadio.vue`
- `description`: 新拟态风格的单选框组件，未选中时呈凸起状态，选中时凹陷并展示点缀色指示器。
- `props`: `modelValue: any value: any label?: string disabled?: boolean`
- `defaults`: `disabled = false`
- `events`: `update:modelValue(value: any)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuRadio-usage.vue`

## NeuRate

- `name`: `NeuRate`
- `sourcePath`: `assets/library/components/neu/NeuRate.vue`
- `description`: 星级评分组件。未选中的星星内凹刻印，选中的星星外凸并带有强调色发光效果。
- `props`: `modelValue?: number max?: number disabled?: boolean readonly?: boolean`
- `defaults`: `modelValue = 0`、`max = 5`、`disabled = false`、`readonly = false`
- `events`: `update:modelValue(value: number)`、`change(value: number)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuRate-basic-usage.vue`、`assets/examples/components/NeuRate-readonly-usage.vue`

## NeuScrollbar

- `name`: `NeuScrollbar`
- `sourcePath`: `assets/library/components/neu/NeuScrollbar.vue`
- `description`: 将原生滚动条替换为精心设计的新拟态风格滚动条。轨道呈内凹质感，滑块具备真实的凸起立体感， 鼠标悬停时以主题色高亮，拖拽时配合发光效果。
- `props`: `height?: string maxHeight?: string autoHide?: boolean /** 填满父容器剩余高度（flex-1），用于侧边栏等场景 */ fill?: boolean /** * 滚动条轨道距容器顶部和底部的像素间距。 * 当父容器有圆角时（如侧边栏 rounded-r-[2rem] = 32px）， * 需设置足够大的值避免轨道伸入圆角区域。默认 8px。 */ trackInset?: number`
- `defaults`: `height = 'auto'`、`maxHeight = undefined`、`autoHide = false`、`fill = false`、`trackInset = 8`
- `events`: 无
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuScrollbar-basic-usage.vue`、`assets/examples/components/NeuScrollbar-fixed-height-usage.vue`、`assets/examples/components/NeuScrollbar-auto-hide-usage.vue`

## NeuSelect

- `name`: `NeuSelect`
- `sourcePath`: `assets/library/components/neu/NeuSelect.vue`
- `description`: 新拟态风格的下拉选择组件，点击时容器呈现物理凹陷感，弹出层带有大尺寸浮雕阴影和定制滚动条。
- `props`: `modelValue: string | number | (string | number)[] options: SelectOption[] placeholder?: string disabled?: boolean multiple?: boolean error?: boolean`
- `defaults`: `placeholder = '请选择'`、`disabled = false`、`multiple = false`、`error = false`
- `events`: 无
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuSelect-usage.vue`

## NeuSkeleton

- `name`: `NeuSkeleton`
- `sourcePath`: `assets/library/components/neu/NeuSkeleton.vue`
- `description`: 在内容加载时展示的占位图形。基于新拟态的内凹阴影 (`shadow-neu-pressed`) 设计，辅以高光扫过的动画效果。
- `props`: `type?: 'text' | 'circle' | 'rect' | 'card' width?: string height?: string animated?: boolean rows?: number`
- `defaults`: `type = 'text'`、`animated = true`、`rows = 3`
- `events`: 无
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuSkeleton-usage.vue`

## NeuSlider

- `name`: `NeuSlider`
- `sourcePath`: `assets/library/components/neu/NeuSlider.vue`
- `description`: 新拟态风格的滑动条组件，包含一个凹陷的轨道和一个凸起的滑动按钮，并支持拖拽改变数值。
- `props`: `modelValue: number min?: number max?: number step?: number disabled?: boolean`
- `defaults`: `min = 0`、`max = 100`、`step = 1`、`disabled = false`
- `events`: `update:modelValue(value: number)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuSlider-usage.vue`

## NeuSpin

- `name`: `NeuSpin`
- `sourcePath`: `assets/library/components/neu/NeuSpin.vue`
- `description`: 新拟态风格的加载动画，用于页面和区块的加载中状态。
- `props`: `size?: 'sm' | 'md' | 'lg' color?: 'primary' | 'default' tip?: string`
- `defaults`: `size = 'md'`、`color = 'primary'`
- `events`: 无
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuSpin-usage.vue`、`assets/examples/components/NeuSpin-size.vue`、`assets/examples/components/NeuSpin-tip.vue`

## NeuSteps

- `name`: `NeuSteps`
- `sourcePath`: `assets/library/components/neu/NeuSteps.vue`
- `description`: 新拟态风格的步骤条，用于引导用户按照流程完成任务。
- `props`: `items: StepItem[] modelValue?: number direction?: 'horizontal' | 'vertical' clickable?: boolean`
- `defaults`: `modelValue = 0`、`direction = 'horizontal'`、`clickable = false`
- `events`: `update:modelValue(value: number)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuSteps-usage.vue`

## NeuSwitch

- `name`: `NeuSwitch`
- `sourcePath`: `assets/library/components/neu/NeuSwitch.vue`
- `description`: 带有立体质感的切换开关组件。
- `props`: `modelValue: boolean disabled?: boolean`
- `defaults`: `modelValue = false`、`disabled = false`
- `events`: `update:modelValue(value: boolean)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuSwitch-usage.vue`

## NeuTable

- `name`: `NeuTable`
- `sourcePath`: `assets/library/components/neu/NeuTable.vue`
- `description`: 带有新拟态凹陷阴影 (`shadow-neu-pressed`) 的响应式数据表格，支持自定义列渲染、排序与加载状态。
- `props`: `columns: TableColumn[] data: any[] sort?: TableSort | null loading?: boolean striped?: boolean hoverable?: boolean`
- `defaults`: `sort = null`、`loading = false`、`striped = false`、`hoverable = true`
- `events`: `sort(sort: TableSort)`、`row-click(row: any, index: number)`
- `slots`: ``cell-${col.key}``
- `relatedComponents`: `NeuSpin`
- `exampleFiles`: `assets/examples/components/NeuTable-usage.vue`

## NeuTabs

- `name`: `NeuTabs`
- `sourcePath`: `assets/library/components/neu/NeuTabs.vue`
- `description`: 新拟态风格的标签页和分段控制器，常用于对内容进行分组和层级划分。
- `props`: `modelValue: string items: TabItem[] variant?: 'default' | 'pills' fullWidth?: boolean`
- `defaults`: `variant = 'default'`、`fullWidth = false`
- `events`: `update:modelValue(value: string)`
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuTabs-usage.vue`

## NeuTag

- `name`: `NeuTag`
- `sourcePath`: `assets/library/components/neu/NeuTag.vue`
- `description`: 新拟态风格的标签组件，用于进行标记和分类。支持可关闭功能。
- `props`: `variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' type?: 'flat' | 'pressed' size?: 'sm' | 'md' | 'lg' closable?: boolean disabled?: boolean`
- `defaults`: `variant = 'default'`、`type = 'flat'`、`size = 'md'`、`closable = false`、`disabled = false`
- `events`: `close(event: MouseEvent)`
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuTag-usage.vue`

## NeuTimePicker

- `name`: `NeuTimePicker`
- `sourcePath`: `assets/library/components/neu/NeuTimePicker.vue`
- `description`: 带有强烈实体质感的时间选择器。下拉面板采用了类似实体滚轮的交互方式，并在选中区域覆盖了凹陷阴影视窗。
- `props`: `modelValue?: string // Format: "HH:mm" placeholder?: string disabled?: boolean`
- `defaults`: `placeholder = '请选择时间'`、`disabled = false`
- `events`: `update:modelValue(value: string)`、`change(value: string)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuTimePicker-basic-usage.vue`、`assets/examples/components/NeuTimePicker-disabled-usage.vue`

## NeuToast

- `name`: `NeuToast`
- `sourcePath`: `assets/library/components/neu/toast.ts`
- `description`: 命令式轻提示工具，适合在表单提交、操作反馈和状态通知场景中使用。
- `props`: 无
- `defaults`: 无
- `events`: 无
- `slots`: 无
- `relatedComponents`: `NeuToastComponent`
- `exampleFiles`: `assets/examples/components/NeuToast-usage.vue`

## NeuToastComponent

- `name`: `NeuToastComponent`
- `sourcePath`: `assets/library/components/neu/NeuToastComponent.vue`
- `description`: NeuToast 的内部渲染组件，负责提示消息的样式、动画和关闭交互。
- `props`: 无
- `defaults`: 无
- `events`: `close`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuToast-usage.vue`

## NeuTooltip

- `name`: `NeuTooltip`
- `sourcePath`: `assets/library/components/neu/NeuTooltip.vue`
- `description`: 新拟态风格的气泡提示框，用于在鼠标悬停时显示附加信息。带有指向箭头和丝滑的弹出动画。
- `props`: `content: string position?: 'top' | 'bottom' | 'left' | 'right' delay?: number`
- `defaults`: `position = 'top'`、`delay = 200`
- `events`: 无
- `slots`: `default`
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuTooltip-usage.vue`

## NeuTree

- `name`: `NeuTree`
- `sourcePath`: `assets/library/components/neu/NeuTree.vue`
- `description`: 新拟态风格的树形控件，用于清晰地展现层级关系，支持单选、多选和节点展开/收起。
- `props`: 无
- `defaults`: `data = () => []`、`selectedKeys = () => []`、`multiple = false`
- `events`: `select(node: TreeNode)`、`expand(node: TreeNode)`
- `slots`: 无
- `relatedComponents`: `NeuTreeNode`
- `exampleFiles`: `assets/examples/components/NeuTree-usage.vue`

## NeuTreeNode

- `name`: `NeuTreeNode`
- `sourcePath`: `assets/library/components/neu/NeuTreeNode.vue`
- `description`: NeuTree 的递归节点组件，负责层级节点的展开、选中和结构渲染。
- `props`: `node: TreeNode level?: number selectedKeys?: (string | number)[]`
- `defaults`: `level = 0`、`selectedKeys = () => []`
- `events`: `toggle(node: TreeNode)`、`select(node: TreeNode)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuTree-usage.vue`

## NeuUpload

- `name`: `NeuUpload`
- `sourcePath`: `assets/library/components/neu/NeuUpload.vue`
- `description`: 文件选择框和拖拽上传组件。
- `props`: `accept?: string multiple?: boolean disabled?: boolean maxSize?: number // in bytes`
- `defaults`: `accept = '*'`、`multiple = false`、`disabled = false`
- `events`: `change(files: File[])`、`error(error: string)`
- `slots`: 无
- `relatedComponents`: 无
- `exampleFiles`: `assets/examples/components/NeuUpload-usage.vue`
