<script setup lang="ts">
import NeuScrollbar from '../../library/components/neu/NeuScrollbar.vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <NeuScrollbar max-height="300px" :auto-hide="true">
      <!-- 鼠标悬停时才显示滚动条 -->
    </NeuScrollbar>
  </div>
</template>
