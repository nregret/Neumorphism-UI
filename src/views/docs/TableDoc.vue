<script setup lang="ts">
import { ref, computed } from 'vue'
import NeuTable from '../../components/neu/NeuTable.vue'
import type { TableColumn, TableSort } from '../../components/neu/NeuTable.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuBadge from '../../components/neu/NeuBadge.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const columns: TableColumn[] = [
  { key: 'name', title: '项目名称', sortable: true },
  { key: 'status', title: '状态', align: 'center' },
  { key: 'progress', title: '进度', sortable: true, align: 'right' },
  { key: 'action', title: '操作', align: 'center', width: '120px' }
]

const tableData = ref([
  { name: 'Neumorphism UI 核心组件开发', status: 'completed', progress: 100 },
  { name: '后台管理系统模板', status: 'in-progress', progress: 45 },
  { name: '暗黑模式优化测试', status: 'pending', progress: 0 },
  { name: '官网 SEO 及性能优化', status: 'error', progress: 12 },
])

const loading = ref(false)
const sortState = ref<TableSort | null>({ key: 'name', order: 'asc' })

const handleSort = (sort: TableSort) => {
  sortState.value = sort
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const getBadgeProps = (status: string) => {
  switch(status) {
    case 'completed': return { variant: 'success', text: '已完成' }
    case 'in-progress': return { variant: 'primary', text: '进行中' }
    case 'pending': return { variant: 'warning', text: '待处理' }
    case 'error': return { variant: 'error', text: '异常' }
    default: return { variant: 'default', text: '未知' }
  }
}

const handleRowClick = (row: any) => {
  console.log('Clicked row:', row.name)
}

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuTable from './components/neu/NeuTable.vue'

const columns = [
  { key: 'name', title: '名称', sortable: true },
  { key: 'age', title: '年龄', align: 'center' },
]

const data = ref([
  { name: 'Alice', age: 24 },
  { name: 'Bob', age: 30 },
])
<\/script>

<template>
  <NeuTable 
    :columns="columns" 
    :data="data" 
    hoverable 
    striped 
  >
    <!-- 自定义单元格渲染 -->
    <template #cell-name="{ row }">
      <span class="text-neu-accent font-bold">{{ row.name }}</span>
    </template>
  </NeuTable>
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Table 表格</h1>
      <p class="text-neu-text/80 text-lg">
        带有新拟态凹陷阴影 (`shadow-neu-pressed`) 的响应式数据表格，支持自定义列渲染、排序与加载状态。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础与自定义列 (Basic & Custom Cells)</h2>
      <NeuCard class="p-8 bg-[var(--bg-color)]">
        <NeuTable 
          :columns="columns" 
          :data="tableData" 
          :sort="sortState"
          :loading="loading"
          hoverable
          striped
          @sort="handleSort"
          @row-click="handleRowClick"
        >
          <!-- Custom Status Column -->
          <template #cell-status="{ row }">
            <NeuBadge :variant="getBadgeProps(row.status).variant as any" dot type="ghost">
              {{ getBadgeProps(row.status).text }}
            </NeuBadge>
          </template>

          <!-- Custom Progress Column -->
          <template #cell-progress="{ row }">
            <span class="font-mono">{{ row.progress }}%</span>
          </template>

          <!-- Custom Action Column -->
          <template #cell-action>
            <NeuButton size="sm" variant="primary" class="px-3 py-1 text-xs">编辑</NeuButton>
          </template>
        </NeuTable>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
