<script setup lang="ts">
import NeuTooltip from '../../components/neu/NeuTooltip.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const usageCode = `
<script setup>
import NeuTooltip from './components/neu/NeuTooltip.vue'
import NeuButton from './components/neu/NeuButton.vue'
<\/script>

<template>
  <NeuTooltip content="这是上方的提示" position="top">
    <NeuButton>Hover Me</NeuButton>
  </NeuTooltip>
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Tooltip 文字提示</h1>
      <p class="text-neu-text/80 text-lg">
        新拟态风格的气泡提示框，用于在鼠标悬停时显示附加信息。带有指向箭头和丝滑的弹出动画。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">不同方向 (Positions)</h2>
      <NeuCard class="flex flex-col items-center gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div class="grid grid-cols-3 gap-8 w-full max-w-md mx-auto items-center justify-items-center mt-8 mb-8">
          <div class="col-start-2">
            <NeuTooltip content="Top 提示信息" position="top">
              <NeuButton>Top</NeuButton>
            </NeuTooltip>
          </div>
          
          <div class="col-start-1 col-span-3 flex justify-between w-full">
            <NeuTooltip content="Left 提示信息" position="left">
              <NeuButton>Left</NeuButton>
            </NeuTooltip>
            
            <NeuTooltip content="Right 提示信息" position="right">
              <NeuButton>Right</NeuButton>
            </NeuTooltip>
          </div>
          
          <div class="col-start-2">
            <NeuTooltip content="Bottom 提示信息" position="bottom">
              <NeuButton>Bottom</NeuButton>
            </NeuTooltip>
          </div>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
