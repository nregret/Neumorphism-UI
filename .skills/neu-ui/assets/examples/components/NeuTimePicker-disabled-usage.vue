<script setup lang="ts">
import { ref } from 'vue'
import NeuTimePicker from '../../library/components/neu/NeuTimePicker.vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <NeuTimePicker :model-value="'12:00'" disabled />
  </div>
</template>
