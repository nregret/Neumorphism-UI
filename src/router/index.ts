import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/components',
    component: () => import('../layouts/DocsLayout.vue'),
    redirect: '/components/button',
    children: [
      {
        path: 'button',
        name: 'DocsButton',
        component: () => import('../views/docs/ButtonDoc.vue'),
      },
      {
        path: 'card',
        name: 'DocsCard',
        component: () => import('../views/docs/CardDoc.vue'),
      },
      {
        path: 'input',
        name: 'DocsInput',
        component: () => import('../views/docs/InputDoc.vue'),
      },
      {
        path: 'switch',
        name: 'DocsSwitch',
        component: () => import('../views/docs/SwitchDoc.vue'),
      },
      {
        path: 'radio',
        name: 'DocsRadio',
        component: () => import('../views/docs/RadioDoc.vue'),
      },
      {
        path: 'checkbox',
        name: 'DocsCheckbox',
        component: () => import('../views/docs/CheckboxDoc.vue'),
      },
      {
        path: 'slider',
        name: 'DocsSlider',
        component: () => import('../views/docs/SliderDoc.vue'),
      },
      {
        path: 'progress',
        name: 'DocsProgress',
        component: () => import('../views/docs/ProgressDoc.vue'),
      },
      {
        path: 'avatar',
        name: 'DocsAvatar',
        component: () => import('../views/docs/AvatarDoc.vue'),
      },
      {
        path: 'badge',
        name: 'DocsBadge',
        component: () => import('../views/docs/BadgeDoc.vue'),
      },
      {
        path: 'modal',
        name: 'DocsModal',
        component: () => import('../views/docs/ModalDoc.vue'),
      },
      {
        path: 'tabs',
        name: 'DocsTabs',
        component: () => import('../views/docs/TabsDoc.vue'),
      },
      {
        path: 'accordion',
        name: 'DocsAccordion',
        component: () => import('../views/docs/AccordionDoc.vue'),
      },
      {
        path: 'tooltip',
        name: 'DocsTooltip',
        component: () => import('../views/docs/TooltipDoc.vue'),
      },
      {
        path: 'breadcrumb',
        name: 'DocsBreadcrumb',
        component: () => import('../views/docs/BreadcrumbDoc.vue'),
      },
      {
        path: 'pagination',
        name: 'DocsPagination',
        component: () => import('../views/docs/PaginationDoc.vue'),
      },
      {
        path: 'dropdown',
        name: 'DocsDropdown',
        component: () => import('../views/docs/DropdownDoc.vue'),
      },
      {
        path: 'alert',
        name: 'DocsAlert',
        component: () => import('../views/docs/AlertDoc.vue'),
      },
      {
        path: 'skeleton',
        name: 'DocsSkeleton',
        component: () => import('../views/docs/SkeletonDoc.vue'),
      },
      {
        path: 'table',
        name: 'DocsTable',
        component: () => import('../views/docs/TableDoc.vue'),
      },
      {
        path: 'drawer',
        name: 'DocsDrawer',
        component: () => import('../views/docs/DrawerDoc.vue'),
      },
      {
        path: 'toast',
        name: 'DocsToast',
        component: () => import('../views/docs/ToastDoc.vue'),
      },
      {
        path: 'spin',
        name: 'DocsSpin',
        component: () => import('../views/docs/SpinDoc.vue'),
      },
      {
        path: 'popconfirm',
        name: 'DocsPopconfirm',
        component: () => import('../views/docs/PopconfirmDoc.vue'),
      },
      {
        path: 'steps',
        name: 'DocsSteps',
        component: () => import('../views/docs/StepsDoc.vue'),
      },
      {
        path: 'menu',
        name: 'DocsMenu',
        component: () => import('../views/docs/MenuDoc.vue'),
      },
      {
        path: 'select',
        name: 'DocsSelect',
        component: () => import('../views/docs/SelectDoc.vue'),
      },
      {
        path: 'form',
        name: 'DocsForm',
        component: () => import('../views/docs/FormDoc.vue'),
      },
      {
        path: 'datepicker',
        name: 'DocsDatePicker',
        component: () => import('../views/docs/DatePickerDoc.vue'),
      },
      {
        path: 'upload',
        name: 'DocsUpload',
        component: () => import('../views/docs/UploadDoc.vue'),
      },
      {
        path: 'tag',
        name: 'DocsTag',
        component: () => import('../views/docs/TagDoc.vue'),
      },
      {
        path: 'tree',
        name: 'DocsTree',
        component: () => import('../views/docs/TreeDoc.vue'),
      },
      {
        path: 'timepicker',
        name: 'DocsTimePicker',
        component: () => import('../views/docs/TimePickerDoc.vue'),
      },
      {
        path: 'carousel',
        name: 'DocsCarousel',
        component: () => import('../views/docs/CarouselDoc.vue'),
      },
      {
        path: 'rate',
        name: 'DocsRate',
        component: () => import('../views/docs/RateDoc.vue'),
      },
      {
        path: 'colorpicker',
        name: 'DocsColorPicker',
        component: () => import('../views/docs/ColorPickerDoc.vue'),
      },
      {
        path: 'divider',
        name: 'DocsDivider',
        component: () => import('../views/docs/DividerDoc.vue'),
      },
      {
        path: 'empty',
        name: 'DocsEmpty',
        component: () => import('../views/docs/EmptyDoc.vue'),
      },
      {
        path: 'scrollbar',
        name: 'DocsScrollbar',
        component: () => import('../views/docs/ScrollbarDoc.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
