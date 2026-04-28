<script setup lang="ts">
import { ref } from 'vue'
import NeuSlider from '../../library/components/neu/NeuSlider.vue'

const volume = ref(50)
</script>

<template>
  <NeuSlider v-model="volume" :min="0" :max="100" />
  
  <!-- 禁用状态 -->
  <NeuSlider disabled v-model="volume" />
</template>
