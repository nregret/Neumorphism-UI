<script setup lang="ts">
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const usageCode = `
<script setup>
import NeuCard from './components/neu/NeuCard.vue'
<\/script>

<template>
  <NeuCard>这是一个默认状态（凸起）的新拟态卡片</NeuCard>
  <NeuCard pressed>这是一个按下状态（凹陷）的新拟态卡片</NeuCard>
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Card 卡片</h1>
      <p class="text-neu-text/80 text-lg">
        卡片是新拟态UI中最基础的容器组件。通过不同的阴影方向（外阴影或内阴影）区分层级关系。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NeuCard class="flex flex-col items-center justify-center p-12 bg-[var(--bg-color)]">
          <h3 class="font-bold text-xl mb-4">外凸卡片</h3>
          <p class="text-neu-text/60 text-center">默认的 Drop shadow 外阴影</p>
        </NeuCard>
        
        <NeuCard pressed class="flex flex-col items-center justify-center p-12 bg-[var(--bg-color)]">
          <h3 class="font-bold text-xl mb-4">凹陷卡片</h3>
          <p class="text-neu-text/60 text-center">设置 pressed 后的 Inner shadow 内阴影</p>
        </NeuCard>
      </div>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">圆角与内边距 (Rounded & Padding)</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NeuCard padding="sm" rounded="sm" class="bg-[var(--bg-color)]">
          sm 内边距 / sm 圆角
        </NeuCard>
        <NeuCard padding="md" rounded="md" class="bg-[var(--bg-color)]">
          md 内边距 / md 圆角
        </NeuCard>
        <NeuCard padding="lg" rounded="lg" class="bg-[var(--bg-color)]">
          lg 内边距 / lg 圆角
        </NeuCard>
      </div>
    </section>
  </div>
</template>
