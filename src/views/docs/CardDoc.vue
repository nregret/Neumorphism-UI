<script setup lang="ts">
import { computed } from 'vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isEn = computed(() => locale.value === 'en-US')

const title = computed(() => isEn.value ? 'Card' : 'Card 卡片')
const description = computed(() => isEn.value
  ? 'A fundamental container in neumorphic UI. Outer vs. inner shadows help indicate elevation and hierarchy.'
  : '卡片是新拟态UI中最基础的容器组件。通过不同的阴影方向（外阴影或内阴影）区分层级关系。'
)
const sectionBasic = computed(() => isEn.value ? 'Basic' : '基础用法 (Basic)')
const sectionRounded = computed(() => isEn.value ? 'Rounded & Padding' : '圆角与内边距 (Rounded & Padding)')

const usageCodeZh = `
<script setup>
import NeuCard from './components/neu/NeuCard.vue'
<\/script>

<template>
  <NeuCard>这是一个默认状态（凸起）的新拟态卡片</NeuCard>
  <NeuCard pressed>这是一个按下状态（凹陷）的新拟态卡片</NeuCard>
</template>
`

const usageCodeEn = `
<script setup>
import NeuCard from './components/neu/NeuCard.vue'
<\/script>

<template>
  <NeuCard>This is a raised neumorphic card</NeuCard>
  <NeuCard pressed>This is a pressed neumorphic card</NeuCard>
</template>
`

const usageCode = computed(() => isEn.value ? usageCodeEn : usageCodeZh)
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NeuCard class="flex flex-col items-center justify-center p-12 bg-[var(--bg-color)]">
          <h3 class="font-bold text-xl mb-4">{{ isEn ? 'Raised' : '外凸卡片' }}</h3>
          <p class="text-neu-text/60 text-center">{{ isEn ? 'Outer drop shadow' : '默认的 Drop shadow 外阴影' }}</p>
        </NeuCard>
        
        <NeuCard pressed class="flex flex-col items-center justify-center p-12 bg-[var(--bg-color)]">
          <h3 class="font-bold text-xl mb-4">{{ isEn ? 'Pressed' : '凹陷卡片' }}</h3>
          <p class="text-neu-text/60 text-center">{{ isEn ? 'Inner pressed shadow (pressed)' : '设置 pressed 后的 Inner shadow 内阴影' }}</p>
        </NeuCard>
      </div>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ sectionRounded }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NeuCard padding="sm" rounded="sm" class="bg-[var(--bg-color)]">
          {{ isEn ? 'sm padding / sm radius' : 'sm 内边距 / sm 圆角' }}
        </NeuCard>
        <NeuCard padding="md" rounded="md" class="bg-[var(--bg-color)]">
          {{ isEn ? 'md padding / md radius' : 'md 内边距 / md 圆角' }}
        </NeuCard>
        <NeuCard padding="lg" rounded="lg" class="bg-[var(--bg-color)]">
          {{ isEn ? 'lg padding / lg radius' : 'lg 内边距 / lg 圆角' }}
        </NeuCard>
      </div>
    </section>
  </div>
</template>
