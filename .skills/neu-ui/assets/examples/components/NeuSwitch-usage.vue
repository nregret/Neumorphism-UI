<script setup lang="ts">
import { ref } from 'vue'
import NeuSwitch from '../../library/components/neu/NeuSwitch.vue'

const isActive = ref(true)
</script>

<template>
  <NeuSwitch v-model="isActive" />
  <NeuSwitch v-model="isActive" disabled />
</template>
