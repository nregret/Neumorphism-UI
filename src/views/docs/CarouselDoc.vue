<script setup lang="ts">
import CodeBlock from '../../components/CodeBlock.vue'
import NeuCarousel from '../../components/neu/NeuCarousel.vue'

const carouselItems = [
  {
    id: 1,
    title: '第一张幻灯片',
    subtitle: '新拟态风格的轮播体验',
    color: 'from-indigo-500/20 to-indigo-400/5 text-indigo-500',
    icon: '✦'
  },
  {
    id: 2,
    title: '第二张幻灯片',
    subtitle: '自动播放，悬停暂停',
    color: 'from-pink-500/20 to-pink-400/5 text-pink-500',
    icon: '◈'
  },
  {
    id: 3,
    title: '第三张幻灯片',
    subtitle: '流畅过渡，精准定位',
    color: 'from-emerald-500/20 to-emerald-400/5 text-emerald-500',
    icon: '◉'
  },
  {
    id: 4,
    title: '第四张幻灯片',
    subtitle: '支持 slide / fade 两种效果',
    color: 'from-amber-500/20 to-amber-400/5 text-amber-500',
    icon: '❋'
  }
]

const basicUsage = `<NeuCarousel :items="items" effect="slide" :show-progress="true" class="h-72">
  <template #default="{ item }">
    <div class="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br"
      :class="item.color">
      <div class="text-5xl">{{ item.icon }}</div>
      <div class="text-2xl font-bold">{{ item.title }}</div>
      <div class="text-sm opacity-70">{{ item.subtitle }}</div>
    </div>
  </template>
</NeuCarousel>`

const fadeUsage = `<NeuCarousel :items="items" effect="fade" class="h-72">
  <template #default="{ item }">
    <!-- 淡入淡出模式，带轻微缩放 -->
  </template>
</NeuCarousel>`

const manualUsage = `<NeuCarousel :items="items" :auto-play="false" :show-progress="false" class="h-48">
  <template #default="{ item }">
    <!-- 手动切换模式 -->
  </template>
</NeuCarousel>`
</script>

<template>
  <div class="space-y-12 max-w-4xl">
    <div>
      <h1 class="text-4xl font-bold mb-4 text-neu-text">Carousel 轮播图</h1>
      <p class="text-lg text-neu-text/70 mb-8">
        具有极强物理质感的轮播组件。凹陷外框、毛玻璃导航按钮、动态胶囊指示器，
        支持 <code class="px-1.5 py-0.5 rounded-md bg-[var(--bg-color)] shadow-neu-pressed-sm text-neu-accent font-mono text-sm">slide</code>
        与 <code class="px-1.5 py-0.5 rounded-md bg-[var(--bg-color)] shadow-neu-pressed-sm text-neu-accent font-mono text-sm">fade</code> 两种切换效果。
      </p>

      <div class="space-y-10">
        <!-- Slide + 进度条 -->
        <section>
          <h2 class="text-2xl font-bold mb-2 text-neu-text">滑动模式 (Slide + 进度条)</h2>
          <p class="text-neu-text/70 mb-5">
            默认 <code class="px-1 py-0.5 rounded bg-[var(--bg-color)] shadow-neu-pressed-sm text-neu-accent font-mono text-xs">effect="slide"</code>，
            开启 <code class="px-1 py-0.5 rounded bg-[var(--bg-color)] shadow-neu-pressed-sm text-neu-accent font-mono text-xs">:show-progress="true"</code> 显示进度条。
          </p>
          <div class="mb-4">
            <NeuCarousel
              :items="carouselItems"
              effect="slide"
              :show-progress="true"
              class="h-72 w-full max-w-2xl mx-auto"
            >
              <template #default="{ item }">
                <div
                  class="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br"
                  :class="item.color"
                >
                  <div class="text-6xl opacity-80">{{ item.icon }}</div>
                  <div class="text-2xl font-bold tracking-wider">{{ item.title }}</div>
                  <div class="text-sm opacity-60">{{ item.subtitle }}</div>
                </div>
              </template>
            </NeuCarousel>
          </div>
          <CodeBlock :code="basicUsage" />
        </section>

        <!-- Fade -->
        <section>
          <h2 class="text-2xl font-bold mb-2 text-neu-text">淡入淡出模式 (Fade)</h2>
          <p class="text-neu-text/70 mb-5">
            设置 <code class="px-1 py-0.5 rounded bg-[var(--bg-color)] shadow-neu-pressed-sm text-neu-accent font-mono text-xs">effect="fade"</code>，
            切换时画面淡入淡出并带有细微缩放效果。
          </p>
          <div class="mb-4">
            <NeuCarousel
              :items="carouselItems"
              effect="fade"
              class="h-72 w-full max-w-2xl mx-auto"
            >
              <template #default="{ item }">
                <div
                  class="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br"
                  :class="item.color"
                >
                  <div class="text-5xl opacity-70">{{ item.icon }}</div>
                  <div class="text-xl font-bold">{{ item.title }}</div>
                </div>
              </template>
            </NeuCarousel>
          </div>
          <CodeBlock :code="fadeUsage" />
        </section>

        <!-- 手动 -->
        <section>
          <h2 class="text-2xl font-bold mb-2 text-neu-text">手动切换</h2>
          <p class="text-neu-text/70 mb-5">设置 <code class="px-1 py-0.5 rounded bg-[var(--bg-color)] shadow-neu-pressed-sm text-neu-accent font-mono text-xs">:auto-play="false"</code> 关闭自动播放。</p>
          <div class="mb-4">
            <NeuCarousel
              :items="carouselItems"
              :auto-play="false"
              class="h-72 w-full max-w-2xl mx-auto"
            >
              <template #default="{ item }">
                <div
                  class="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br"
                  :class="item.color"
                >
                  <div class="text-4xl opacity-70">{{ item.icon }}</div>
                  <div class="text-lg font-semibold">{{ item.title }} (手动)</div>
                </div>
              </template>
            </NeuCarousel>
          </div>
          <CodeBlock :code="manualUsage" />
        </section>

        <!-- Props 表格 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">属性 (Props)</h2>
          <div class="rounded-2xl overflow-hidden shadow-neu-flat">
            <table class="w-full text-sm text-left">
              <thead class="bg-[var(--bg-color)] shadow-neu-pressed">
                <tr>
                  <th class="px-5 py-3 font-semibold text-neu-text/60">属性名</th>
                  <th class="px-5 py-3 font-semibold text-neu-text/60">类型</th>
                  <th class="px-5 py-3 font-semibold text-neu-text/60">默认值</th>
                  <th class="px-5 py-3 font-semibold text-neu-text/60">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in [
                  ['items',         'unknown[]',        '—',       '幻灯片数据数组'],
                  ['effect',        '\'slide\' | \'fade\'', '\'slide\'', '切换效果'],
                  ['autoPlay',      'boolean',          'true',    '是否自动播放'],
                  ['interval',      'number',           '3000',    '自动播放间隔(ms)'],
                  ['showArrows',    'boolean',          'true',    '是否显示左右箭头'],
                  ['showDots',      'boolean',          'true',    '是否显示指示器'],
                  ['showProgress',  'boolean',          'false',   '是否显示播放进度条'],
                ]" :key="row[0]" class="border-t border-[var(--shadow-dark)]/10">
                  <td class="px-5 py-3 font-mono text-neu-accent">{{ row[0] }}</td>
                  <td class="px-5 py-3 text-neu-text/70">{{ row[1] }}</td>
                  <td class="px-5 py-3 text-neu-text/50 font-mono text-xs">{{ row[2] }}</td>
                  <td class="px-5 py-3 text-neu-text/70">{{ row[3] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
