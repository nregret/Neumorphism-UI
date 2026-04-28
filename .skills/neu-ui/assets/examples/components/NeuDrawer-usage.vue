<script setup lang="ts">
import { ref } from 'vue'
import NeuDrawer from '../../library/components/neu/NeuDrawer.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'

const showDrawer = ref(false)
</script>

<template>
  <NeuButton @click="showDrawer = true">打开抽屉</NeuButton>

  <NeuDrawer 
    v-model="showDrawer" 
    title="抽屉标题" 
    placement="right" 
    size="400px"
  >
    <p>这里是抽屉的内容区域...</p>
    
    <template #footer>
      <div class="flex justify-end gap-4">
        <NeuButton @click="showDrawer = false">取消</NeuButton>
        <NeuButton variant="primary" @click="showDrawer = false">确认</NeuButton>
      </div>
    </template>
  </NeuDrawer>
</template>
