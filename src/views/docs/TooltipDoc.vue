<script setup lang="ts">
import NeuTooltip from '../../components/neu/NeuTooltip.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const { pick, text } = useDocI18n()

const usageCode = pick(
  `
<script setup>
import NeuTooltip from './components/neu/NeuTooltip.vue'
import NeuButton from './components/neu/NeuButton.vue'
<\/script>

<template>
  <NeuTooltip content="这是上方的提示" position="top">
    <NeuButton>Hover Me</NeuButton>
  </NeuTooltip>
</template>
`,
  `
<script setup>
import NeuTooltip from './components/neu/NeuTooltip.vue'
import NeuButton from './components/neu/NeuButton.vue'
<\/script>

<template>
  <NeuTooltip content="Tooltip on top" position="top">
    <NeuButton>Hover Me</NeuButton>
  </NeuTooltip>
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Tooltip 文字提示', 'Tooltip') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的气泡提示框，用于在鼠标悬停时显示附加信息。带有指向箭头和丝滑的弹出动画。', 'A neumorphic tooltip shown on hover, with an arrow and smooth transitions.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('不同方向 (Positions)', 'Positions') }}</h2>
      <NeuCard class="flex flex-col items-center gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div class="grid grid-cols-3 gap-8 w-full max-w-md mx-auto items-center justify-items-center mt-8 mb-8">
          <div class="col-start-2">
            <NeuTooltip :content="text('Top 提示信息', 'Top tooltip')" position="top">
              <NeuButton>Top</NeuButton>
            </NeuTooltip>
          </div>
          
          <div class="col-start-1 col-span-3 flex justify-between w-full">
            <NeuTooltip :content="text('Left 提示信息', 'Left tooltip')" position="left">
              <NeuButton>Left</NeuButton>
            </NeuTooltip>
            
            <NeuTooltip :content="text('Right 提示信息', 'Right tooltip')" position="right">
              <NeuButton>Right</NeuButton>
            </NeuTooltip>
          </div>
          
          <div class="col-start-2">
            <NeuTooltip :content="text('Bottom 提示信息', 'Bottom tooltip')" position="bottom">
              <NeuButton>Bottom</NeuButton>
            </NeuTooltip>
          </div>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
