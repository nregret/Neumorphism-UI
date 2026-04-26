<script setup lang="ts">
import { ref } from 'vue'
import NeuTag from '../../components/neu/NeuTag.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { NeuToast } from '../../components/neu/toast'

const tags = ref(['标签一', '标签二', '标签三'])

const handleClose = (index: number) => {
  const removed = tags.value.splice(index, 1)
  NeuToast.success(`移除了: ${removed[0]}`)
}

const usageCode = `
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
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Tag 标签</h1>
      <p class="text-neu-text/80 text-lg">
        新拟态风格的标签组件，用于进行标记和分类。支持可关闭功能。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">外阴影 (Flat)</h3>
          <div class="flex flex-wrap items-center gap-4">
            <NeuTag>默认标签</NeuTag>
            <NeuTag variant="primary">主要标签</NeuTag>
            <NeuTag variant="success">成功标签</NeuTag>
            <NeuTag variant="warning">警告标签</NeuTag>
            <NeuTag variant="error">错误标签</NeuTag>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">内阴影 (Pressed)</h3>
          <div class="flex flex-wrap items-center gap-4">
            <NeuTag type="pressed">默认标签</NeuTag>
            <NeuTag type="pressed" variant="primary">主要标签</NeuTag>
            <NeuTag type="pressed" variant="success">成功标签</NeuTag>
            <NeuTag type="pressed" variant="warning">警告标签</NeuTag>
            <NeuTag type="pressed" variant="error">错误标签</NeuTag>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">可关闭 (Closable)</h3>
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
            <NeuTag closable disabled>禁用状态</NeuTag>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">不同尺寸 (Sizes)</h3>
          <div class="flex flex-wrap items-end gap-4">
            <NeuTag size="sm" variant="primary" closable>小尺寸 (sm)</NeuTag>
            <NeuTag size="md" variant="primary" closable>默认尺寸 (md)</NeuTag>
            <NeuTag size="lg" variant="primary" closable>大尺寸 (lg)</NeuTag>
          </div>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
