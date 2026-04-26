<script setup lang="ts">
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { Home, Settings, Search } from 'lucide-vue-next'

const usageCode = `
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

const sizeCode = `
<NeuButton size="sm">小尺寸</NeuButton>
<NeuButton size="md">中等尺寸</NeuButton>
<NeuButton size="lg">大尺寸</NeuButton>
`

const shapeCode = `
<NeuButton shape="rounded">圆角</NeuButton>
<NeuButton shape="circle" variant="icon">
  <Home class="w-5 h-5" />
</NeuButton>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Button 按钮</h1>
      <p class="text-neu-text/80 text-lg">
        新拟态风格的按钮组件，通过内外阴影的切换表现凸起（Default）与凹陷（Pressed/Active）的物理状态。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法</h2>
      <NeuCard class="flex flex-wrap gap-6 items-center justify-center p-12 bg-[var(--bg-color)]">
        <NeuButton>默认按钮</NeuButton>
        <NeuButton variant="primary">主要按钮</NeuButton>
        <NeuButton active>激活状态</NeuButton>
        <NeuButton disabled>禁用状态</NeuButton>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">尺寸 (Sizes)</h2>
      <NeuCard class="flex flex-wrap gap-6 items-center justify-center p-12 bg-[var(--bg-color)]">
        <NeuButton size="sm">小尺寸 (sm)</NeuButton>
        <NeuButton size="md">默认尺寸 (md)</NeuButton>
        <NeuButton size="lg">大尺寸 (lg)</NeuButton>
      </NeuCard>
      <CodeBlock :code="sizeCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">形状与图标 (Shapes & Icons)</h2>
      <NeuCard class="flex flex-wrap gap-6 items-center justify-center p-12 bg-[var(--bg-color)]">
        <NeuButton shape="rounded">默认圆角</NeuButton>
        <NeuButton shape="circle" variant="icon"><Home class="w-5 h-5" /></NeuButton>
        <NeuButton shape="circle" variant="icon"><Settings class="w-5 h-5" /></NeuButton>
        <NeuButton shape="circle" variant="icon" active><Search class="w-5 h-5" /></NeuButton>
      </NeuCard>
      <CodeBlock :code="shapeCode" language="html" />
    </section>
  </div>
</template>
