<script setup lang="ts">
import NeuBreadcrumb from '../../components/neu/NeuBreadcrumb.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { Home, LayoutDashboard, Settings } from 'lucide-vue-next'

const basicItems = [
  { label: '首页', path: '/' },
  { label: '组件库', path: '/components' },
  { label: '基础组件', disabled: true },
  { label: '面包屑' }
]

const usageCode = `
<script setup>
import NeuBreadcrumb from './components/neu/NeuBreadcrumb.vue'

const items = [
  { label: '首页', path: '/' },
  { label: '用户管理', path: '/users' },
  { label: '详情' } // 最后一个默认是高亮的当前页
]
<\/script>

<template>
  <!-- 基础面包屑 (外阴影) -->
  <NeuBreadcrumb :items="items" />
  
  <!-- 内凹槽面包屑 -->
  <NeuBreadcrumb :items="items" variant="pressed" />
  
  <!-- 自定义分隔符 -->
  <NeuBreadcrumb :items="items" separator="/" />
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Breadcrumb 面包屑</h1>
      <p class="text-neu-text/80 text-lg">
        显示当前页面在系统层级结构中的位置，带有新拟态特有的浮雕容器。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-4xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">外凸样式 (Flat)</h3>
          <NeuBreadcrumb :items="basicItems" />
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">内凹样式 (Pressed)</h3>
          <NeuBreadcrumb :items="basicItems" variant="pressed" />
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">自定义分隔符 (Separator)</h3>
          <NeuBreadcrumb :items="basicItems" separator="/" />
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">带图标 (Icons)</h3>
          <NeuBreadcrumb :items="basicItems" variant="pressed">
            <template #icon-0><Home class="w-4 h-4" /></template>
            <template #icon-1><LayoutDashboard class="w-4 h-4" /></template>
            <template #icon-2><Settings class="w-4 h-4" /></template>
          </NeuBreadcrumb>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
