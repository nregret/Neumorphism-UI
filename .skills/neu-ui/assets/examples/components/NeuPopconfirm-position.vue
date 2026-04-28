<script setup lang="ts">
import NeuPopconfirm from '../../library/components/neu/NeuPopconfirm.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'
import NeuCard from '../../library/components/neu/NeuCard.vue'
import { ref } from 'vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <NeuPopconfirm title="上方的气泡" position="top">
      <NeuButton>上方 (Top)</NeuButton>
    </NeuPopconfirm>
    
    <NeuPopconfirm title="下方的气泡" position="bottom">
      <NeuButton>下方 (Bottom)</NeuButton>
    </NeuPopconfirm>
    
    <NeuPopconfirm title="左侧的气泡" position="left">
      <NeuButton>左侧 (Left)</NeuButton>
    </NeuPopconfirm>
    
    <NeuPopconfirm title="右侧的气泡" position="right">
      <NeuButton>右侧 (Right)</NeuButton>
    </NeuPopconfirm>
  </div>
</template>
