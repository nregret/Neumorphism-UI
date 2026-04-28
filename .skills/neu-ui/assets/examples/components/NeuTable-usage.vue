<script setup lang="ts">
import { ref } from 'vue'
import NeuTable from '../../library/components/neu/NeuTable.vue'

const columns = [
  { key: 'name', title: '名称', sortable: true },
  { key: 'age', title: '年龄', align: 'center' },
]

const data = ref([
  { name: 'Alice', age: 24 },
  { name: 'Bob', age: 30 },
])
</script>

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
