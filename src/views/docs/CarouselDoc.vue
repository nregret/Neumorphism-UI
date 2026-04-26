<script setup lang="ts">
import CodeBlock from '../../components/CodeBlock.vue'
import NeuCarousel from '../../components/neu/NeuCarousel.vue'

const carouselItems = [
  { id: 1, title: '第一张幻灯片', color: 'bg-indigo-500/10 text-indigo-500' },
  { id: 2, title: '第二张幻灯片', color: 'bg-pink-500/10 text-pink-500' },
  { id: 3, title: '第三张幻灯片', color: 'bg-emerald-500/10 text-emerald-500' },
  { id: 4, title: '第四张幻灯片', color: 'bg-amber-500/10 text-amber-500' }
]

const basicUsage = `<script setup>
const items = [
  { id: 1, title: '第一张幻灯片', color: 'bg-indigo-500/10 text-indigo-500' },
  { id: 2, title: '第二张幻灯片', color: 'bg-pink-500/10 text-pink-500' },
  { id: 3, title: '第三张幻灯片', color: 'bg-emerald-500/10 text-emerald-500' },
]
<\/script>

<template>
  <NeuCarousel :items="items" class="h-64">
    <template #default="{ item }">
      <div class="w-full h-full flex items-center justify-center font-bold text-2xl" :class="item.color">
        {{ item.title }}
      </div>
    </template>
  </NeuCarousel>
</template>`

const noAutoPlayUsage = `<NeuCarousel :items="items" :auto-play="false" class="h-64">
  <template #default="{ item }">
    <!-- ... -->
  </template>
</NeuCarousel>`
</script>

<template>
  <div class="space-y-12 max-w-4xl">
    <div>
      <h1 class="text-4xl font-bold mb-4 text-neu-text">Carousel 轮播图</h1>
      <p class="text-lg text-neu-text/70 mb-8">
        具有极强物理质感的轮播组件。轨道呈现凹陷感，指示器和控制按钮具备真实的立体按压反馈。
      </p>

      <div class="space-y-8">
        <!-- 基础用法 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">基础用法</h2>
          <p class="text-neu-text/70 mb-4">通过 <code>items</code> 属性传入数组，并在默认插槽中自定义每一项的内容渲染。默认开启自动播放。</p>
          <div class="mb-4">
            <NeuCarousel :items="carouselItems" class="h-64 sm:h-80 w-full max-w-2xl mx-auto">
              <template #default="{ item }">
                <div 
                  class="w-full h-full flex items-center justify-center font-bold text-2xl tracking-widest backdrop-blur-sm"
                  :class="item.color"
                >
                  {{ item.title }}
                </div>
              </template>
            </NeuCarousel>
          </div>
          <CodeBlock :code="basicUsage" />
        </section>

        <!-- 关闭自动播放 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">关闭自动播放</h2>
          <p class="text-neu-text/70 mb-4">设置 <code>:auto-play="false"</code> 可以关闭自动播放，用户只能通过手动点击切换。</p>
          <div class="mb-4">
            <NeuCarousel :items="carouselItems" :auto-play="false" class="h-48 w-full max-w-2xl mx-auto">
              <template #default="{ item }">
                <div 
                  class="w-full h-full flex items-center justify-center font-bold text-xl backdrop-blur-sm"
                  :class="item.color"
                >
                  {{ item.title }} (手动)
                </div>
              </template>
            </NeuCarousel>
          </div>
          <CodeBlock :code="noAutoPlayUsage" />
        </section>
      </div>
    </div>
  </div>
</template>
