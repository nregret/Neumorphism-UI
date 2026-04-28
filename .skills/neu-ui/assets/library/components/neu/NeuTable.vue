<script setup lang="ts">
import { computed } from 'vue'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'
import NeuSpin from './NeuSpin.vue'

export interface TableColumn {
  key: string
  title: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
}

export interface TableSort {
  key: string
  order: 'asc' | 'desc'
}

interface Props {
  columns: TableColumn[]
  data: any[]
  sort?: TableSort | null
  loading?: boolean
  striped?: boolean
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sort: null,
  loading: false,
  striped: false,
  hoverable: true,
})

const emit = defineEmits<{
  (e: 'sort', sort: TableSort): void
  (e: 'row-click', row: any, index: number): void
}>()

const handleSort = (column: TableColumn) => {
  if (!column.sortable) return

  let newOrder: 'asc' | 'desc' = 'asc'
  if (props.sort && props.sort.key === column.key) {
    newOrder = props.sort.order === 'asc' ? 'desc' : 'asc'
  }

  emit('sort', { key: column.key, order: newOrder })
}

const getAlignClass = (align?: 'left' | 'center' | 'right') => {
  switch (align) {
    case 'center': return 'text-center justify-center'
    case 'right': return 'text-right justify-end'
    case 'left':
    default: return 'text-left justify-start'
  }
}
</script>

<template>
  <div class="w-full overflow-x-auto rounded-neu-md bg-[var(--bg-color)] shadow-neu-pressed p-4">
    <table class="w-full text-sm text-left whitespace-nowrap">
      
      <!-- Table Header -->
      <thead class="text-xs text-neu-text/60 uppercase">
        <tr>
          <th 
            v-for="col in columns" 
            :key="col.key"
            scope="col" 
            class="px-6 py-4 font-bold tracking-wider"
            :class="[
              getAlignClass(col.align),
              col.sortable ? 'cursor-pointer hover:text-neu-accent transition-colors select-none' : ''
            ]"
            :style="{ width: col.width }"
            @click="handleSort(col)"
          >
            <div class="flex items-center gap-2" :class="getAlignClass(col.align)">
              {{ col.title }}
              
              <!-- Sort Icons -->
              <span v-if="col.sortable" class="flex flex-col opacity-50 transition-opacity" :class="sort?.key === col.key ? 'opacity-100' : ''">
                <ChevronUp 
                  class="w-3 h-3 -mb-1" 
                  :class="sort?.key === col.key && sort.order === 'asc' ? 'text-neu-accent' : ''"
                />
                <ChevronDown 
                  class="w-3 h-3" 
                  :class="sort?.key === col.key && sort.order === 'desc' ? 'text-neu-accent' : ''"
                />
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody class="text-neu-text relative">
        
        <!-- Loading Overlay -->
        <div v-if="loading" class="absolute inset-0 z-10 flex items-center justify-center bg-[var(--bg-color)]/50 backdrop-blur-sm rounded-xl">
          <NeuSpin size="sm" />
        </div>

        <tr 
          v-for="(row, rowIndex) in data" 
          :key="rowIndex"
          class="transition-colors duration-200 border-b border-[var(--shadow-dark)]/10 last:border-b-0"
          :class="[
            striped && rowIndex % 2 !== 0 ? 'bg-[var(--shadow-dark)]/5' : '',
            hoverable ? 'hover:bg-[var(--shadow-dark)]/10 cursor-pointer' : ''
          ]"
          @click="emit('row-click', row, rowIndex)"
        >
          <td 
            v-for="col in columns" 
            :key="col.key"
            class="px-6 py-4 font-medium"
            :class="getAlignClass(col.align)"
          >
            <slot :name="`cell-${col.key}`" :row="row" :index="rowIndex">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-if="!loading && data.length === 0">
          <td :colspan="columns.length" class="px-6 py-12 text-center text-neu-text/50">
            暂无数据
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>
