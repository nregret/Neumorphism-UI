<script setup lang="ts">
import { useDark } from '@vueuse/core'

// Initialize dark mode
useDark()
</script>

<template>
  <div class="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
    <router-view />
  </div>
</template>

<style>
/* Add any global styles here if needed */
</style>