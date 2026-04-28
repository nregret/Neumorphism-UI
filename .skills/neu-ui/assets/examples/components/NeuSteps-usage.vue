<script setup lang="ts">
import { ref } from 'vue'
import NeuSteps from '../../library/components/neu/NeuSteps.vue'

const current = ref(1)
const steps = [
  { title: '第一步', description: '描述信息' },
  { title: '第二步', description: '描述信息' },
  { title: '第三步', description: '描述信息' },
]
</script>

<template>
  <!-- 水平步骤条 -->
  <NeuSteps v-model="current" :items="steps" />
  
  <!-- 垂直步骤条 -->
  <NeuSteps v-model="current" :items="steps" direction="vertical" />
  
  <!-- 可点击步骤条 -->
  <NeuSteps v-model="current" :items="steps" clickable />
</template>
