<script setup lang="ts">
import { ref } from 'vue'
import NeuTree from '../../library/components/neu/NeuTree.vue'

const data = ref([
  {
    key: '1',
    label: '节点 1',
    expanded: true,
    children: [
      { key: '1-1', label: '节点 1-1' },
      { key: '1-2', label: '节点 1-2' }
    ]
  }
])

const selectedKeys = ref(['1-1'])
</script>

<template>
  <!-- 单选树 -->
  <NeuTree
    :data="data"
    v-model:selectedKeys="selectedKeys"
  />
  
  <!-- 多选树 -->
  <NeuTree
    :data="data"
    v-model:selectedKeys="selectedKeys"
    multiple
  />
</template>
