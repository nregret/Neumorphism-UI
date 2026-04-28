<script setup lang="ts">
import NeuTag from '../../library/components/neu/NeuTag.vue'

const handleClose = () => {
  console.log('Tag closed')
}
</script>

<template>
  <!-- 基础标签 (外阴影) -->
  <NeuTag>默认</NeuTag>
  <NeuTag variant="primary">主要</NeuTag>
  <NeuTag variant="success">成功</NeuTag>
  
  <!-- 内阴影标签 -->
  <NeuTag type="pressed" variant="warning">警告</NeuTag>
  
  <!-- 可关闭的标签 -->
  <NeuTag closable @close="handleClose">可关闭</NeuTag>
</template>
