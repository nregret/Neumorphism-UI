<script setup lang="ts">
import NeuSpin from '../../library/components/neu/NeuSpin.vue'
import NeuCard from '../../library/components/neu/NeuCard.vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <NeuSpin tip="加载中..." />
    <NeuSpin tip="正在同步数据..." color="default" />
  </div>
</template>
