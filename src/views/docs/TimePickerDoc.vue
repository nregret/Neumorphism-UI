<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import NeuTimePicker from '../../components/neu/NeuTimePicker.vue'

const time1 = ref('09:30')
const time2 = ref('12:00')

const basicUsage = `<script setup>
import { ref } from 'vue'
const time = ref('09:30')
<\/script>

<template>
  <NeuTimePicker v-model="time" />
</template>`

const disabledUsage = `<NeuTimePicker :model-value="'12:00'" disabled />`
</script>

<template>
  <div class="space-y-12 max-w-4xl">
    <div>
      <h1 class="text-4xl font-bold mb-4 text-neu-text">TimePicker 时间选择器</h1>
      <p class="text-lg text-neu-text/70 mb-8">
        带有强烈实体质感的时间选择器。下拉面板采用了类似实体滚轮的交互方式，并在选中区域覆盖了凹陷阴影视窗。
      </p>

      <div class="space-y-8">
        <!-- 基础用法 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">基础用法</h2>
          <p class="text-neu-text/70 mb-4">点击触发按钮打开滚轮面板进行选择，支持鼠标滚轮滑动和触屏拖拽。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4 flex items-center gap-6">
            <NeuTimePicker v-model="time1" class="max-w-[300px]" />
            <span class="text-neu-text/60 font-mono text-lg font-bold">{{ time1 }}</span>
          </div>
          <CodeBlock :code="basicUsage" />
        </section>

        <!-- 禁用状态 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">禁用状态</h2>
          <p class="text-neu-text/70 mb-4">通过 <code>disabled</code> 属性禁用选择器。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <NeuTimePicker v-model="time2" class="max-w-[300px]" disabled />
          </div>
          <CodeBlock :code="disabledUsage" />
        </section>
      </div>
    </div>
  </div>
</template>
