<script setup lang="ts">
import { computed } from 'vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { Home, Settings, Search } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isEn = computed(() => locale.value === 'en-US')

const title = computed(() => isEn.value ? 'Button' : 'Button 按钮')
const description = computed(() => isEn.value
  ? 'A neumorphic button component. It switches between raised (Default) and pressed (Pressed/Active) states via inner and outer shadows.'
  : '新拟态风格的按钮组件，通过内外阴影的切换表现凸起（Default）与凹陷（Pressed/Active）的物理状态。'
)
const sectionBasic = computed(() => isEn.value ? 'Basic Usage' : '基础用法')
const sectionSizes = computed(() => isEn.value ? 'Sizes' : '尺寸 (Sizes)')
const sectionShapes = computed(() => isEn.value ? 'Shapes & Icons' : '形状与图标 (Shapes & Icons)')

const usageCodeZh = `
<script setup>
import NeuButton from './components/neu/NeuButton.vue'
<\/script>

<template>
  <NeuButton>默认按钮</NeuButton>
  <NeuButton variant="primary">主要按钮</NeuButton>
  <NeuButton active>激活状态</NeuButton>
  <NeuButton disabled>禁用状态</NeuButton>
</template>
`

const usageCodeEn = `
<script setup>
import NeuButton from './components/neu/NeuButton.vue'
<\/script>

<template>
  <NeuButton>Default</NeuButton>
  <NeuButton variant="primary">Primary</NeuButton>
  <NeuButton active>Active</NeuButton>
  <NeuButton disabled>Disabled</NeuButton>
</template>
`

const usageCode = computed(() => isEn.value ? usageCodeEn : usageCodeZh)

const sizeCodeZh = `
<NeuButton size="sm">小尺寸</NeuButton>
<NeuButton size="md">中等尺寸</NeuButton>
<NeuButton size="lg">大尺寸</NeuButton>
`

const sizeCodeEn = `
<NeuButton size="sm">Small</NeuButton>
<NeuButton size="md">Medium</NeuButton>
<NeuButton size="lg">Large</NeuButton>
`

const sizeCode = computed(() => isEn.value ? sizeCodeEn : sizeCodeZh)

const shapeCodeZh = `
<NeuButton shape="rounded">圆角</NeuButton>
<NeuButton shape="circle" variant="icon">
  <Home class="w-5 h-5" />
</NeuButton>
`

const shapeCodeEn = `
<NeuButton shape="rounded">Rounded</NeuButton>
<NeuButton shape="circle" variant="icon">
  <Home class="w-5 h-5" />
</NeuButton>
`

const shapeCode = computed(() => isEn.value ? shapeCodeEn : shapeCodeZh)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ description }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ sectionBasic }}</h2>
      <NeuCard class="flex flex-wrap gap-6 items-center justify-center p-12 bg-[var(--bg-color)]">
        <NeuButton>{{ isEn ? 'Default' : '默认按钮' }}</NeuButton>
        <NeuButton variant="primary">{{ isEn ? 'Primary' : '主要按钮' }}</NeuButton>
        <NeuButton active>{{ isEn ? 'Active' : '激活状态' }}</NeuButton>
        <NeuButton disabled>{{ isEn ? 'Disabled' : '禁用状态' }}</NeuButton>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ sectionSizes }}</h2>
      <NeuCard class="flex flex-wrap gap-6 items-center justify-center p-12 bg-[var(--bg-color)]">
        <NeuButton size="sm">{{ isEn ? 'Small (sm)' : '小尺寸 (sm)' }}</NeuButton>
        <NeuButton size="md">{{ isEn ? 'Default (md)' : '默认尺寸 (md)' }}</NeuButton>
        <NeuButton size="lg">{{ isEn ? 'Large (lg)' : '大尺寸 (lg)' }}</NeuButton>
      </NeuCard>
      <CodeBlock :code="sizeCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ sectionShapes }}</h2>
      <NeuCard class="flex flex-wrap gap-6 items-center justify-center p-12 bg-[var(--bg-color)]">
        <NeuButton shape="rounded">{{ isEn ? 'Rounded' : '默认圆角' }}</NeuButton>
        <NeuButton shape="circle" variant="icon"><Home class="w-5 h-5" /></NeuButton>
        <NeuButton shape="circle" variant="icon"><Settings class="w-5 h-5" /></NeuButton>
        <NeuButton shape="circle" variant="icon" active><Search class="w-5 h-5" /></NeuButton>
      </NeuCard>
      <CodeBlock :code="shapeCode" language="html" />
    </section>
  </div>
</template>
