<script setup lang="ts">
import { ref } from 'vue'
import NeuCheckbox from '../../library/components/neu/NeuCheckbox.vue'

const singleChecked = ref(true)
const multipleChecked = ref(['apple'])
</script>

<template>
  <!-- 单个使用 (布尔值) -->
  <NeuCheckbox v-model="singleChecked" label="同意服务条款" />
  
  <!-- 多个使用 (数组) -->
  <NeuCheckbox v-model="multipleChecked" value="apple" label="苹果" />
  <NeuCheckbox v-model="multipleChecked" value="banana" label="香蕉" />
  
  <!-- 禁用状态 -->
  <NeuCheckbox disabled label="禁用选项" />
</template>
