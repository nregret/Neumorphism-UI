<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NeuProgress from '../../components/neu/NeuProgress.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import NeuButton from '../../components/neu/NeuButton.vue'

const progress1 = ref(45)
const progress2 = ref(70)
const progress3 = ref(30)

let interval: number

onMounted(() => {
  interval = setInterval(() => {
    progress3.value = (progress3.value + 10) % 100
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuProgress from './components/neu/NeuProgress.vue'

const progress = ref(45)
<\/script>

<template>
  <!-- 基础进度条 -->
  <NeuProgress :modelValue="progress" />
  
  <!-- 带标签和条纹动画的进度条 -->
  <NeuProgress 
    :modelValue="progress" 
    color="success" 
    height="lg"
    showLabel 
    striped 
    animated 
  >
    <template #label>上传进度</template>
  </NeuProgress>
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Progress 进度条</h1>
      <p class="text-neu-text/80 text-lg">
        带有内阴影凹槽和填充色的进度条组件，支持多种尺寸、颜色及条纹动画效果。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">默认进度条</h3>
          <NeuProgress :modelValue="progress1" />
        </div>
        
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">带标签的进度条</h3>
          <NeuProgress :modelValue="progress2" showLabel color="success">
            <template #label>完成度</template>
          </NeuProgress>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">条纹与动画</h3>
          <NeuProgress :modelValue="progress3" height="lg" showLabel striped animated color="warning">
            <template #label>处理中...</template>
          </NeuProgress>
        </div>
        
        <div class="flex gap-4 mt-4">
          <NeuButton @click="progress1 = Math.max(0, progress1 - 10)">减少 10%</NeuButton>
          <NeuButton @click="progress1 = Math.min(100, progress1 + 10)" variant="primary">增加 10%</NeuButton>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
