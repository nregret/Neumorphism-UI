<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import NeuBadge from '../../library/components/neu/NeuBadge.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'
import NeuCard from '../../library/components/neu/NeuCard.vue'
import NeuInput from '../../library/components/neu/NeuInput.vue'
import NeuPagination from '../../library/components/neu/NeuPagination.vue'
import NeuSelect from '../../library/components/neu/NeuSelect.vue'
import NeuTable, { type TableColumn } from '../../library/components/neu/NeuTable.vue'

const keyword = ref('')
const page = ref(1)
const statusFilter = ref<'all' | 'active' | 'paused' | 'draft'>('all')

const statusOptions = [
  { label: '全部状态', value: 'all' },
  { label: '进行中', value: 'active' },
  { label: '已暂停', value: 'paused' },
  { label: '草稿', value: 'draft' },
]

const columns: TableColumn[] = [
  { key: 'name', title: '项目名称', sortable: true },
  { key: 'owner', title: '负责人' },
  { key: 'status', title: '状态', align: 'center' },
  { key: 'updatedAt', title: '最后更新', sortable: true, align: 'right' },
  { key: 'actions', title: '操作', align: 'right' },
]

const rows = ref([
  { name: 'Design System Refresh', owner: 'Mika', status: 'active', updatedAt: '2026-04-25' },
  { name: 'Billing Console', owner: 'Aria', status: 'paused', updatedAt: '2026-04-22' },
  { name: 'NeuUI Marketing Assets', owner: 'Tao', status: 'draft', updatedAt: '2026-04-20' },
  { name: 'Operations Dashboard', owner: 'Lin', status: 'active', updatedAt: '2026-04-18' },
  { name: 'Partner Portal', owner: 'Noah', status: 'active', updatedAt: '2026-04-16' },
  { name: 'Release Calendar', owner: 'Jia', status: 'paused', updatedAt: '2026-04-14' },
])

const filteredRows = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase()

  return rows.value.filter((row) => {
    const matchesStatus = statusFilter.value === 'all' || row.status === statusFilter.value
    const matchesKeyword =
      normalizedKeyword.length === 0 ||
      row.name.toLowerCase().includes(normalizedKeyword) ||
      row.owner.toLowerCase().includes(normalizedKeyword)

    return matchesStatus && matchesKeyword
  })
})

const pageSize = 4
const paginatedRows = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredRows.value.slice(start, start + pageSize)
})

const statusVariantMap: Record<string, 'default' | 'success' | 'warning'> = {
  active: 'success',
  paused: 'warning',
  draft: 'default',
}
</script>

<template>
  <div class="min-h-screen bg-[var(--bg-color)] px-6 py-8 text-neu-text md:px-10">
    <div class="mx-auto max-w-7xl space-y-6">
      <header class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-2">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-neu-text/45">
            Data List Pattern
          </p>
          <h1 class="text-4xl font-bold">NeuUI 数据列表页模板</h1>
          <p class="max-w-3xl text-base leading-8 text-neu-text/68">
            使用 NeuInput、NeuSelect、NeuTable、NeuBadge 和 NeuPagination
            搭建一个后台常见的数据列表工作区。
          </p>
        </div>

        <div class="flex gap-3">
          <NeuButton>导出</NeuButton>
          <NeuButton variant="primary">新建项目</NeuButton>
        </div>
      </header>

      <NeuCard class="space-y-5 p-6">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div class="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(240px,0.8fr)] xl:w-[70%]">
            <div class="relative">
              <div class="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-neu-text/40">
                <Search class="h-4 w-4" />
              </div>
              <NeuInput v-model="keyword" class="pl-12" placeholder="搜索项目名称或负责人" />
            </div>
            <NeuSelect v-model="statusFilter" :options="statusOptions" />
          </div>

          <div class="flex gap-3">
            <NeuButton @click="keyword = ''">清空筛选</NeuButton>
            <NeuButton variant="primary">批量操作</NeuButton>
          </div>
        </div>
      </NeuCard>

      <NeuCard class="space-y-6 p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">项目列表</h2>
            <p class="mt-1 text-sm text-neu-text/60">
              当前共 {{ filteredRows.length }} 条记录，页面保持“工具栏 + 表格 + 分页”三段结构。
            </p>
          </div>
        </div>

        <NeuTable
          :columns="columns"
          :data="paginatedRows"
          hoverable
          striped
        >
          <template #cell-status="{ row }">
            <NeuBadge :variant="statusVariantMap[row.status]" dot>
              {{ row.status }}
            </NeuBadge>
          </template>

          <template #cell-actions="{ row }">
            <div class="flex justify-end gap-2">
              <NeuButton size="sm">查看</NeuButton>
              <NeuButton size="sm" variant="primary">编辑</NeuButton>
            </div>
          </template>
        </NeuTable>

        <div class="flex flex-col gap-4 border-t border-[var(--shadow-dark)]/10 pt-4 md:flex-row md:items-center md:justify-between">
          <p class="text-sm text-neu-text/55">
            当前页 {{ page }}，每页 {{ pageSize }} 条。
          </p>
          <NeuPagination
            v-model="page"
            :page-size="pageSize"
            :total="filteredRows.length"
          />
        </div>
      </NeuCard>
    </div>
  </div>
</template>
