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
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
