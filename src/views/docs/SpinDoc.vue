<script setup lang="ts">
import NeuSpin from '../../components/neu/NeuSpin.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const { pick, text } = useDocI18n()

const usageCode = pick(
  `
<script setup>
import NeuSpin from './components/neu/NeuSpin.vue'
<\/script>

<template>
  <NeuSpin />
  <NeuSpin color="default" />
</template>
`,
  `
<script setup>
import NeuSpin from './components/neu/NeuSpin.vue'
<\/script>

<template>
  <NeuSpin />
  <NeuSpin color="default" />
</template>
`
)

const sizeCode = pick(
  `
<NeuSpin size="sm" />
<NeuSpin size="md" />
<NeuSpin size="lg" />
`,
  `
<NeuSpin size="sm" />
<NeuSpin size="md" />
<NeuSpin size="lg" />
`
)

const tipCode = pick(
  `
<NeuSpin tip="加载中..." />
<NeuSpin tip="正在同步数据..." color="default" />
`,
  `
<NeuSpin tip="Loading..." />
<NeuSpin tip="Syncing..." color="default" />
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Spin 加载中', 'Spin') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的加载动画，用于页面和区块的加载中状态。', 'A neumorphic loading spinner for page and section loading states.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法', 'Basic') }}</h2>
      <NeuCard class="flex flex-wrap gap-12 items-center justify-center p-12 bg-neu-bg">
        <NeuSpin />
        <NeuSpin color="default" />
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('不同尺寸 (Sizes)', 'Sizes') }}</h2>
      <NeuCard class="flex flex-wrap gap-12 items-center justify-center p-12 bg-neu-bg">
        <NeuSpin size="sm" />
        <NeuSpin size="md" />
        <NeuSpin size="lg" />
      </NeuCard>
      <CodeBlock :code="sizeCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('自定义文案 (With Tip)', 'With Tip') }}</h2>
      <NeuCard class="flex flex-wrap gap-12 items-center justify-center p-12 bg-neu-bg">
        <NeuSpin :tip="text('加载中...', 'Loading...')" />
        <NeuSpin :tip="text('正在同步数据...', 'Syncing...')" color="default" />
      </NeuCard>
      <CodeBlock :code="tipCode" language="html" />
    </section>
  </div>
</template>
