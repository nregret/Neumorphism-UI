<script setup lang="ts">
import { ref } from 'vue'
import NeuRadio from '../../library/components/neu/NeuRadio.vue'

const selectedValue = ref('1')
</script>

<template>
  <NeuRadio v-model="selectedValue" value="1" label="选项一" />
  <NeuRadio v-model="selectedValue" value="2" label="选项二" />
  <NeuRadio v-model="selectedValue" value="3" label="禁用选项" disabled />
</template>
