<script setup lang="ts">
import NeuScrollbar from '../../library/components/neu/NeuScrollbar.vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <NeuScrollbar max-height="300px">
      <div v-for="item in items" :key="item.id" class="p-3 border-b">
        {{ item.label }}
      </div>
    </NeuScrollbar>
  </div>
</template>
