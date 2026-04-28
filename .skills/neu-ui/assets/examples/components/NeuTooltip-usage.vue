<script setup lang="ts">
import NeuTooltip from '../../library/components/neu/NeuTooltip.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'
</script>

<template>
  <NeuTooltip content="这是上方的提示" position="top">
    <NeuButton>Hover Me</NeuButton>
  </NeuTooltip>
</template>
