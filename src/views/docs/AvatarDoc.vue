<script setup lang="ts">
import NeuAvatar from '../../components/neu/NeuAvatar.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const { isEn, pick } = useDocI18n()

const usageCode = pick(
  `
<script setup>
import NeuAvatar from './components/neu/NeuAvatar.vue'
<\/script>

<template>
  <!-- 带图片的头像 -->
  <NeuAvatar src="https://i.pravatar.cc/150?img=68" alt="User Name" />
  
  <!-- 文本缩写头像 -->
  <NeuAvatar alt="John Doe" />
  
  <!-- 状态指示器 -->
  <NeuAvatar status="online" alt="JD" />
</template>
`,
  `
<script setup>
import NeuAvatar from './components/neu/NeuAvatar.vue'
<\/script>

<template>
  <NeuAvatar src="https://i.pravatar.cc/150?img=68" alt="User Name" />
  <NeuAvatar alt="John Doe" />
  <NeuAvatar status="online" alt="JD" />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Avatar 头像', 'Avatar') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的头像组件，支持图片加载、文本缩写兜底，并提供在线状态指示器。', 'A neumorphic avatar with image support, initials fallback, and online status indicator.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法 (Basic)', 'Basic') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-2xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('不同尺寸', 'Sizes') }}</h3>
          <div class="flex items-end gap-6">
            <NeuAvatar size="sm" src="https://i.pravatar.cc/150?img=68" />
            <NeuAvatar size="md" src="https://i.pravatar.cc/150?img=68" />
            <NeuAvatar size="lg" src="https://i.pravatar.cc/150?img=68" />
            <NeuAvatar size="xl" src="https://i.pravatar.cc/150?img=68" />
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('不同形状', 'Shapes') }}</h3>
          <div class="flex items-end gap-6">
            <NeuAvatar shape="circle" src="https://i.pravatar.cc/150?img=47" />
            <NeuAvatar shape="rounded" src="https://i.pravatar.cc/150?img=47" />
            <NeuAvatar shape="square" src="https://i.pravatar.cc/150?img=47" />
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('文本兜底 (Initials)', 'Initials') }}</h3>
          <div class="flex items-end gap-6">
            <NeuAvatar alt="T" />
            <NeuAvatar alt="John Doe" />
            <NeuAvatar alt="Vue Framework" shape="rounded" />
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('状态指示 (Status)', 'Status') }}</h3>
          <div class="flex items-end gap-6">
            <NeuAvatar status="online" :alt="isEn ? 'Online user' : '在线用户'" />
            <NeuAvatar status="away" :alt="isEn ? 'Away user' : '离开用户'" />
            <NeuAvatar status="busy" :alt="isEn ? 'Busy user' : '忙碌用户'" />
            <NeuAvatar status="offline" :alt="isEn ? 'Offline user' : '离线用户'" />
          </div>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
