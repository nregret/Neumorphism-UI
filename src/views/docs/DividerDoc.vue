<script setup lang="ts">
import CodeBlock from '../../components/CodeBlock.vue'
import NeuDivider from '../../components/neu/NeuDivider.vue'
import { useDocI18n } from './useDocI18n'

const horizontalGroove = `<NeuDivider variant="groove" />`
const horizontalRidge = `<NeuDivider variant="ridge" />`
const verticalGroove = `<NeuDivider type="vertical" variant="groove" />`
const { pick } = useDocI18n()
</script>

<template>
  <div class="space-y-12 max-w-4xl">
    <div>
      <h1 class="text-4xl font-bold mb-4 text-neu-text">{{ pick('Divider 分割线', 'Divider') }}</h1>
      <p class="text-lg text-neu-text/70 mb-8">
        {{ pick('区隔内容的分割线，支持内凹（沟槽）和外凸（脊线）两种立体质感。', 'A divider for separating content, supporting both groove (pressed) and ridge (raised) styles.') }}
      </p>

      <div class="space-y-8">
        <!-- 凹陷（沟槽）分割线 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">{{ pick('凹陷样式 (Groove)', 'Groove') }}</h2>
          <p class="text-neu-text/70 mb-4">{{ pick('默认样式，像是刻在表面的一道凹槽。', 'Default style, like a groove carved into the surface.') }}</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <div>{{ pick('上方内容', 'Content above') }}</div>
            <NeuDivider variant="groove" />
            <div>{{ pick('下方内容', 'Content below') }}</div>
          </div>
          <CodeBlock :code="horizontalGroove" />
        </section>

        <!-- 凸起（脊线）分割线 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">{{ pick('外凸样式 (Ridge)', 'Ridge') }}</h2>
          <p class="text-neu-text/70 mb-4">{{ pick('像一条微微浮出表面的横条。', 'Like a small ridge raised above the surface.') }}</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <div>{{ pick('上方内容', 'Content above') }}</div>
            <NeuDivider variant="ridge" />
            <div>{{ pick('下方内容', 'Content below') }}</div>
          </div>
          <CodeBlock :code="horizontalRidge" />
        </section>

        <!-- 垂直分割线 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">{{ pick('垂直方向', 'Vertical') }}</h2>
          <p class="text-neu-text/70 mb-4">{{ pick('使用', 'Use') }} <code>type="vertical"</code> {{ pick('创建垂直分割线。', 'to create a vertical divider.') }}</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4 h-32 flex items-center justify-center">
            <span>{{ pick('左侧', 'Left') }}</span>
            <NeuDivider type="vertical" variant="groove" />
            <span>{{ pick('中间', 'Middle') }}</span>
            <NeuDivider type="vertical" variant="ridge" />
            <span>{{ pick('右侧', 'Right') }}</span>
          </div>
          <CodeBlock :code="verticalGroove" />
        </section>
      </div>
    </div>
  </div>
</template>
