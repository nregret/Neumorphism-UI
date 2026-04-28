<script setup lang="ts">
import NeuSkeleton from '../../library/components/neu/NeuSkeleton.vue'
</script>

<template>
  <!-- 文本骨架 (默认 3 行) -->
  <NeuSkeleton type="text" />
  
  <!-- 圆形骨架 -->
  <NeuSkeleton type="circle" width="64px" />
  
  <!-- 矩形图片/区域骨架 -->
  <NeuSkeleton type="rect" height="150px" />
  
  <!-- 复杂的卡片预设骨架 -->
  <NeuSkeleton type="card" />
</template>
