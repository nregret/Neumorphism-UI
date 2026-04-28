<script setup lang="ts">
import { computed, ref } from 'vue'
import NeuAccordion from '../../components/neu/NeuAccordion.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const { isEn, pick } = useDocI18n()

const items = computed(() => [
  {
    id: '1',
    title: isEn.value ? 'What is Neumorphism?' : '什么是新拟态 (Neumorphism)？',
    content: isEn.value
      ? 'Neumorphism blends flat design simplicity with subtle skeuomorphic depth. By using soft inner and outer shadows, elements look like they are pressed into or raised from the background.'
      : '新拟态是一种视觉风格，它结合了扁平化设计的简洁与拟物化设计的真实感。通过运用微妙的内外阴影，创造出仿佛元件是从背景中挤压或凸出一样的物理质感。'
  },
  {
    id: '2',
    title: isEn.value ? 'How do I integrate it into my project?' : '如何在项目中安装使用？',
    content: isEn.value
      ? 'Copy `src/components/neu` into your Vue project, and make sure your Tailwind/CSS variables for the theme and shadows are configured.'
      : '你可以直接将本项目的 `src/components/neu` 目录拷贝到你的 Vue 项目中，并确保 TailwindCSS 配置文件中添加了相应的 CSS 变量和阴影设置。'
  },
  {
    id: '3',
    title: isEn.value ? 'Can this panel be disabled?' : '这个面板可以被禁用吗？',
    content: isEn.value ? 'Yes. This item is disabled.' : '是的，此面板已经被禁用。',
    disabled: true
  }
])

const multipleKeys = ref(['1'])
const singleKey = ref([])

const usageCode = pick(
  `
<script setup>
import { ref } from 'vue'
import NeuAccordion from './components/neu/NeuAccordion.vue'

const items = [
  { id: '1', title: '什么是新拟态？', content: '新拟态是一种...' },
  { id: '2', title: '如何安装？', content: '拷贝组件代码...' },
  { id: '3', title: '禁用状态', content: '...', disabled: true }
]

// 单选状态
const singleKey = ref([])
// 多选状态
const multipleKeys = ref(['1'])
<\/script>

<template>
  <!-- 手风琴模式 (单选) -->
  <NeuAccordion v-model="singleKey" :items="items" />

  <!-- 折叠面板模式 (允许多选) -->
  <NeuAccordion v-model="multipleKeys" :items="items" multiple />
</template>
`,
  `
<script setup>
import { ref } from 'vue'
import NeuAccordion from './components/neu/NeuAccordion.vue'

const items = [
  { id: '1', title: 'What is Neumorphism?', content: '...' },
  { id: '2', title: 'How to integrate?', content: '...' },
  { id: '3', title: 'Disabled item', content: '...', disabled: true }
]

const singleKey = ref([])
const multipleKeys = ref(['1'])
<\/script>

<template>
  <NeuAccordion v-model="singleKey" :items="items" />
  <NeuAccordion v-model="multipleKeys" :items="items" multiple />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Accordion 折叠面板', 'Accordion') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的手风琴/折叠面板组件，通过 CSS Grid 实现高度自适应的丝滑展开动画，内容区采用内阴影承载。', 'A neumorphic accordion/collapse component with smooth auto-height animation powered by CSS Grid and an inset content area.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('手风琴模式 (单选)', 'Accordion (single)') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <NeuAccordion v-model="singleKey" :items="items" />
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('折叠面板模式 (多选)', 'Collapse (multiple)') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <NeuAccordion v-model="multipleKeys" :items="items" multiple />
      </NeuCard>
    </section>
  </div>
</template>
