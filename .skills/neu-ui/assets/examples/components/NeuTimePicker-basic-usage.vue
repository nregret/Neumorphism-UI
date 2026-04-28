<script setup lang="ts">
import { ref } from 'vue'
const time = ref('09:30')
</script>

<template>
  <NeuTimePicker v-model="time" />
</template>
