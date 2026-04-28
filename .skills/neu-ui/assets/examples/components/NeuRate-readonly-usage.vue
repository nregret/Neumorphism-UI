<script setup lang="ts">
import { ref } from 'vue'
import NeuRate from '../../library/components/neu/NeuRate.vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <NeuRate :model-value="4" readonly />
  </div>
</template>
