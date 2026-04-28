<script setup lang="ts">
import { ref } from 'vue'
import NeuModal from '../../library/components/neu/NeuModal.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'

const showModal = ref(false)
</script>

<template>
  <NeuButton @click="showModal = true">打开对话框</NeuButton>

  <NeuModal v-model="showModal" title="系统提示">
    <p class="text-neu-text/80 leading-relaxed">
      这是一个基于新拟态风格设计的模态对话框。
      它包含背景高斯模糊、内凹的滚动条以及丝滑的弹出动画。
    </p>
    
    <!-- 底部操作区 -->
    <template #footer>
      <NeuButton @click="showModal = false">取消</NeuButton>
      <NeuButton variant="primary" @click="showModal = false">确认</NeuButton>
    </template>
  </NeuModal>
</template>
