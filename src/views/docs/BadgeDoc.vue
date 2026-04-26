<script setup lang="ts">
import NeuBadge from '../../components/neu/NeuBadge.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const usageCode = `
<script setup>
import NeuBadge from './components/neu/NeuBadge.vue'
<\/script>

<template>
  <!-- 基础徽标 (外阴影) -->
  <NeuBadge>默认</NeuBadge>
  <NeuBadge variant="primary">主要</NeuBadge>
  <NeuBadge variant="success">成功</NeuBadge>
  
  <!-- 内阴影徽标 -->
  <NeuBadge type="pressed" variant="warning">警告</NeuBadge>
  
  <!-- 带点指示器的徽标 -->
  <NeuBadge dot variant="error">错误</NeuBadge>
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Badge 徽标</h1>
      <p class="text-neu-text/80 text-lg">
        新拟态风格的徽标组件，用于状态标记、数字提示或分类标签。支持外凸、内凹及幽灵样式。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">外阴影 (Flat)</h3>
          <div class="flex flex-wrap items-center gap-4">
            <NeuBadge>默认状态</NeuBadge>
            <NeuBadge variant="primary">主要标记</NeuBadge>
            <NeuBadge variant="success">成功通过</NeuBadge>
            <NeuBadge variant="warning">警告提示</NeuBadge>
            <NeuBadge variant="error">错误拦截</NeuBadge>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">内阴影 (Pressed)</h3>
          <div class="flex flex-wrap items-center gap-4">
            <NeuBadge type="pressed">默认状态</NeuBadge>
            <NeuBadge type="pressed" variant="primary">主要标记</NeuBadge>
            <NeuBadge type="pressed" variant="success">成功通过</NeuBadge>
            <NeuBadge type="pressed" variant="warning">警告提示</NeuBadge>
            <NeuBadge type="pressed" variant="error">错误拦截</NeuBadge>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">幽灵样式 (Ghost)</h3>
          <div class="flex flex-wrap items-center gap-4">
            <NeuBadge type="ghost">默认状态</NeuBadge>
            <NeuBadge type="ghost" variant="primary">主要标记</NeuBadge>
            <NeuBadge type="ghost" variant="success">成功通过</NeuBadge>
            <NeuBadge type="ghost" variant="warning">警告提示</NeuBadge>
            <NeuBadge type="ghost" variant="error">错误拦截</NeuBadge>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">点状指示器 (Dot)</h3>
          <div class="flex flex-wrap items-center gap-4">
            <NeuBadge dot>离线</NeuBadge>
            <NeuBadge dot variant="primary">在线</NeuBadge>
            <NeuBadge dot type="pressed" variant="success">可用</NeuBadge>
            <NeuBadge dot type="ghost" variant="warning">离开</NeuBadge>
            <NeuBadge dot variant="error">忙碌</NeuBadge>
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">不同尺寸 (Sizes)</h3>
          <div class="flex flex-wrap items-end gap-4">
            <NeuBadge size="sm" variant="primary">小尺寸 (sm)</NeuBadge>
            <NeuBadge size="md" variant="primary">默认尺寸 (md)</NeuBadge>
            <NeuBadge size="lg" variant="primary">大尺寸 (lg)</NeuBadge>
          </div>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
