<script setup lang="ts">
import { ref } from 'vue'
import NeuProgress from '../../library/components/neu/NeuProgress.vue'

const progress = ref(45)
</script>

<template>
  <!-- 基础进度条 -->
  <NeuProgress :modelValue="progress" />
  
  <!-- 带标签和条纹动画的进度条 -->
  <NeuProgress 
    :modelValue="progress" 
    color="success" 
    height="lg"
    showLabel 
    striped 
    animated 
  >
    <template #label>上传进度</template>
  </NeuProgress>
</template>
