<script setup lang="ts">
import { ref } from 'vue'
import NeuAccordion from '../../library/components/neu/NeuAccordion.vue'

const items = [
  { id: '1', title: '什么是新拟态？', content: '新拟态是一种...' },
  { id: '2', title: '如何安装？', content: '拷贝组件代码...' },
  { id: '3', title: '禁用状态', content: '...', disabled: true }
]

// 单选状态
const singleKey = ref([])
// 多选状态
const multipleKeys = ref(['1'])
</script>

<template>
  <!-- 手风琴模式 (单选) -->
  <NeuAccordion v-model="singleKey" :items="items" />

  <!-- 折叠面板模式 (允许多选) -->
  <NeuAccordion v-model="multipleKeys" :items="items" multiple />
</template>
