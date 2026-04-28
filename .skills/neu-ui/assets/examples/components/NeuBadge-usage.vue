<script setup lang="ts">
import NeuBadge from '../../library/components/neu/NeuBadge.vue'
</script>

<template>
  <!-- 基础徽标 (外阴影) -->
  <NeuBadge>默认</NeuBadge>
  <NeuBadge variant="primary">主要</NeuBadge>
  <NeuBadge variant="success">成功</NeuBadge>
  
  <!-- 内阴影徽标 -->
  <NeuBadge type="pressed" variant="warning">警告</NeuBadge>
  
  <!-- 带点指示器的徽标 -->
  <NeuBadge dot variant="error">错误</NeuBadge>
</template>
