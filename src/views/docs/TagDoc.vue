<script setup lang="ts">
import { ref } from 'vue'
import NeuTag from '../../components/neu/NeuTag.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { NeuToast } from '../../components/neu/toast'
import { useDocI18n } from './useDocI18n'

const tags = ref(['标签一', '标签二', '标签三'])
const { isEn, pick } = useDocI18n()

const handleClose = (index: number) => {
  const removed = tags.value.splice(index, 1)
  NeuToast.success(isEn.value ? `Removed: ${removed[0]}` : `移除了: ${removed[0]}`)
}

const usageCode = pick(
  `
<script setup>
import NeuTag from './components/neu/NeuTag.vue'

const handleClose = () => {
  console.log('Tag closed')
}
<\/script>

<template>
  <!-- 基础标签 (外阴影) -->
  <NeuTag>默认</NeuTag>
  <NeuTag variant="primary">主要</NeuTag>
  <NeuTag variant="success">成功</NeuTag>
  
  <!-- 内阴影标签 -->
  <NeuTag type="pressed" variant="warning">警告</NeuTag>
  
  <!-- 可关闭的标签 -->
  <NeuTag closable @close="handleClose">可关闭</NeuTag>
</template>
`,
  `
<script setup>
import NeuTag from './components/neu/NeuTag.vue'

const handleClose = () => {
  console.log('Tag closed')
}
<\/script>

<template>
  <NeuTag>Default</NeuTag>
  <NeuTag variant="primary">Primary</NeuTag>
  <NeuTag variant="success">Success</NeuTag>

  <NeuTag type="pressed" variant="warning">Warning</NeuTag>

  <NeuTag closable @close="handleClose">Closable</NeuTag>
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Tag 标签', 'Tag') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的标签组件，用于进行标记和分类。支持可关闭功能。', 'A neumorphic tag for labeling and categorization. Supports closable tags.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法 (Basic)', 'Basic') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('外阴影 (Flat)', 'Flat') }}</h3>
          <div class="flex flex-wrap items-center gap-4">
            <NeuTag>{{ isEn ? 'Default' : '默认标签' }}</NeuTag>
            <NeuTag variant="primary">{{ isEn ? 'Primary' : '主要标签' }}</NeuTag>
            <NeuTag variant="success">{{ isEn ? 'Success' : '成功标签' }}</NeuTag>
            <NeuTag variant="warning">{{ isEn ? 'Warning' : '警告标签' }}</NeuTag>
            <NeuTag variant="error">{{ isEn ? 'Error' : '错误标签' }}</NeuTag>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('内阴影 (Pressed)', 'Pressed') }}</h3>
          <div class="flex flex-wrap items-center gap-4">
            <NeuTag type="pressed">{{ isEn ? 'Default' : '默认标签' }}</NeuTag>
            <NeuTag type="pressed" variant="primary">{{ isEn ? 'Primary' : '主要标签' }}</NeuTag>
            <NeuTag type="pressed" variant="success">{{ isEn ? 'Success' : '成功标签' }}</NeuTag>
            <NeuTag type="pressed" variant="warning">{{ isEn ? 'Warning' : '警告标签' }}</NeuTag>
            <NeuTag type="pressed" variant="error">{{ isEn ? 'Error' : '错误标签' }}</NeuTag>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('可关闭 (Closable)', 'Closable') }}</h3>
          <div class="flex flex-wrap items-center gap-4">
            <NeuTag
              v-for="(tag, index) in tags"
              :key="tag"
              closable
              variant="primary"
              @close="handleClose(index)"
            >
              {{ tag }}
            </NeuTag>
            <NeuTag closable disabled>{{ isEn ? 'Disabled' : '禁用状态' }}</NeuTag>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('不同尺寸 (Sizes)', 'Sizes') }}</h3>
          <div class="flex flex-wrap items-end gap-4">
            <NeuTag size="sm" variant="primary" closable>{{ isEn ? 'Small (sm)' : '小尺寸 (sm)' }}</NeuTag>
            <NeuTag size="md" variant="primary" closable>{{ isEn ? 'Default (md)' : '默认尺寸 (md)' }}</NeuTag>
            <NeuTag size="lg" variant="primary" closable>{{ isEn ? 'Large (lg)' : '大尺寸 (lg)' }}</NeuTag>
          </div>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
