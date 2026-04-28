<script setup lang="ts">
import { ref } from 'vue'
const color = ref('#4f46e5')
</script>

<template>
  <NeuColorPicker v-model="color" />
</template>
