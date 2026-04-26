<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import NeuColorPicker from '../../components/neu/NeuColorPicker.vue'

const color1 = ref('#4f46e5')
const color2 = ref('#ec4899')

const basicUsage = `<script setup>
import { ref } from 'vue'
const color = ref('#4f46e5')
<\/script>

<template>
  <NeuColorPicker v-model="color" />
</template>`

const disabledUsage = `<NeuColorPicker :model-value="'#10b981'" disabled />`
</script>

<template>
  <div class="space-y-12 max-w-4xl">
    <div>
      <h1 class="text-4xl font-bold mb-4 text-neu-text">ColorPicker 颜色选择器</h1>
      <p class="text-lg text-neu-text/70 mb-8">
        用于颜色选择的组件。提供预设颜色和 RGB 滑块，完全采用新拟态风格，具有极强的物理质感。
      </p>

      <div class="space-y-8">
        <!-- 基础用法 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">基础用法</h2>
          <p class="text-neu-text/70 mb-4">点击触发按钮打开颜色选择面板。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4 flex items-center gap-6">
            <NeuColorPicker v-model="color1" />
            <span class="text-neu-text/60 font-mono">{{ color1 }}</span>
          </div>
          <CodeBlock :code="basicUsage" />
        </section>

        <!-- 禁用状态 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">禁用状态</h2>
          <p class="text-neu-text/70 mb-4">通过 <code>disabled</code> 属性禁用选择器。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <NeuColorPicker v-model="color2" disabled />
          </div>
          <CodeBlock :code="disabledUsage" />
        </section>
      </div>
    </div>
  </div>
</template>
