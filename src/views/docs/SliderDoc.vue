<script setup lang="ts">
import { ref } from 'vue'
import NeuSlider from '../../components/neu/NeuSlider.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const volume = ref(50)
const brightness = ref(30)
const disabledValue = ref(75)

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuSlider from './components/neu/NeuSlider.vue'

const volume = ref(50)
<\/script>

<template>
  <NeuSlider v-model="volume" :min="0" :max="100" />
  
  <!-- 禁用状态 -->
  <NeuSlider disabled v-model="volume" />
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Slider 滑块</h1>
      <p class="text-neu-text/80 text-lg">
        新拟态风格的滑动条组件，包含一个凹陷的轨道和一个凸起的滑动按钮，并支持拖拽改变数值。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-xl">
        <div>
          <div class="flex justify-between mb-2">
            <span class="font-bold text-neu-text/60">音量 (Volume)</span>
            <span class="font-bold text-neu-accent">{{ volume }}%</span>
          </div>
          <NeuSlider v-model="volume" />
        </div>
        
        <hr class="border-[var(--shadow-dark)]/20 my-4" />
        
        <div>
          <div class="flex justify-between mb-2">
            <span class="font-bold text-neu-text/60">亮度 (Brightness) 步长=10</span>
            <span class="font-bold text-neu-accent">{{ brightness }}</span>
          </div>
          <NeuSlider v-model="brightness" :step="10" />
        </div>

        <hr class="border-[var(--shadow-dark)]/20 my-4" />
        
        <div>
          <div class="flex justify-between mb-2">
            <span class="font-bold text-neu-text/60 opacity-50">禁用状态 (Disabled)</span>
            <span class="font-bold text-neu-accent opacity-50">{{ disabledValue }}</span>
          </div>
          <NeuSlider disabled v-model="disabledValue" />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
