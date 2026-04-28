<script setup lang="ts">
import { ref } from 'vue'
import NeuColorPicker from '../../library/components/neu/NeuColorPicker.vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <NeuColorPicker :model-value="'#10b981'" disabled />
  </div>
</template>
