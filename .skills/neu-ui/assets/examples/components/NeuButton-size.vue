<script setup lang="ts">
import NeuButton from '../../library/components/neu/NeuButton.vue'
import NeuCard from '../../library/components/neu/NeuCard.vue'
import { Home, Settings, Search } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <NeuButton size="sm">小尺寸</NeuButton>
    <NeuButton size="md">中等尺寸</NeuButton>
    <NeuButton size="lg">大尺寸</NeuButton>
  </div>
</template>
