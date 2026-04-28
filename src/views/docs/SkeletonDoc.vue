<script setup lang="ts">
import NeuSkeleton from '../../components/neu/NeuSkeleton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const { isEn, pick, text } = useDocI18n()

const usageCode = pick(
  `
<script setup>
import NeuSkeleton from './components/neu/NeuSkeleton.vue'
<\/script>

<template>
  <!-- 文本骨架 (默认 3 行) -->
  <NeuSkeleton type="text" />
  
  <!-- 圆形骨架 -->
  <NeuSkeleton type="circle" width="64px" />
  
  <!-- 矩形图片/区域骨架 -->
  <NeuSkeleton type="rect" height="150px" />
  
  <!-- 复杂的卡片预设骨架 -->
  <NeuSkeleton type="card" />
</template>
`,
  `
<script setup>
import NeuSkeleton from './components/neu/NeuSkeleton.vue'
<\/script>

<template>
  <!-- Text skeleton -->
  <NeuSkeleton type="text" />

  <!-- Circle skeleton -->
  <NeuSkeleton type="circle" width="64px" />

  <!-- Rect skeleton -->
  <NeuSkeleton type="rect" height="150px" />

  <!-- Card preset -->
  <NeuSkeleton type="card" />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Skeleton 骨架屏', 'Skeleton') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('在内容加载时展示的占位图形。基于新拟态的内凹阴影 (`shadow-neu-pressed`) 设计，辅以高光扫过的动画效果。', 'Placeholders shown while content is loading. Designed with pressed neumorphic shadows and a shimmering highlight animation.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('不同形状 (Types)', 'Types') }}</h2>
      <NeuCard class="flex flex-col gap-12 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ text('文本段落 (Text)', 'Text') }}</h3>
          <NeuSkeleton type="text" :rows="4" />
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ text('头像/圆形 (Circle)', 'Circle') }}</h3>
          <div class="flex gap-4">
            <NeuSkeleton type="circle" width="40px" />
            <NeuSkeleton type="circle" width="56px" />
            <NeuSkeleton type="circle" width="72px" />
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ text('图片/矩形 (Rect)', 'Rect') }}</h3>
          <NeuSkeleton type="rect" height="120px" />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('复合卡片预设 (Card Preset)', 'Card preset') }}</h2>
      <NeuCard class="p-12 bg-[var(--bg-color)] max-w-2xl mx-auto">
        <NeuSkeleton type="card" />
      </NeuCard>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('静态骨架 (Static)', 'Static') }}</h2>
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-3xl">
        <p class="text-sm text-neu-text/60 mb-4">
          <template v-if="isEn">Set <code>:animated="false"</code> to remove the shimmer animation.</template>
          <template v-else>可以通过设置 <code>:animated="false"</code> 移除高光扫过动画。</template>
        </p>
        <NeuSkeleton type="text" :animated="false" />
      </NeuCard>
    </section>
  </div>
</template>
