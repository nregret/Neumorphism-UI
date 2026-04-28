<script setup lang="ts">
import NeuButton from '../../library/components/neu/NeuButton.vue'
import NeuCard from '../../library/components/neu/NeuCard.vue'
import { Home, Settings, Search } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <NeuButton shape="rounded">圆角</NeuButton>
    <NeuButton shape="circle" variant="icon">
      <Home class="w-5 h-5" />
    </NeuButton>
  </div>
</template>
