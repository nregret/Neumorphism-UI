<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
</script>

<template>
  <NeuRate v-model="value" />
</template>
