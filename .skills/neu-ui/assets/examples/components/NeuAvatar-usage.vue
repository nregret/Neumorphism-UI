<script setup lang="ts">
import NeuAvatar from '../../library/components/neu/NeuAvatar.vue'
</script>

<template>
  <!-- 带图片的头像 -->
  <NeuAvatar src="https://i.pravatar.cc/150?img=68" alt="User Name" />
  
  <!-- 文本缩写头像 -->
  <NeuAvatar alt="John Doe" />
  
  <!-- 状态指示器 -->
  <NeuAvatar status="online" alt="JD" />
</template>
