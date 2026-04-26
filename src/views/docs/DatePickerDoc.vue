<script setup lang="ts">
import { ref } from 'vue'
import NeuDatePicker from '../../components/neu/NeuDatePicker.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const dateValue = ref('')

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuDatePicker from './components/neu/NeuDatePicker.vue'

const dateValue = ref('')
<\/script>

<template>
  <NeuDatePicker v-model="dateValue" placeholder="请选择日期" />
  <NeuDatePicker disabled placeholder="禁用状态" />
  <NeuDatePicker error placeholder="错误状态" />
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">DatePicker 日期选择器</h1>
      <p class="text-neu-text/80 text-lg">
        新拟态风格的日期选择组件，基于原生 date input 封装。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-xl">
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">普通选择</label>
          <NeuDatePicker v-model="dateValue" placeholder="请选择日期" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">禁用状态</label>
          <NeuDatePicker :modelValue="''" disabled placeholder="不可选择" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">错误状态</label>
          <NeuDatePicker :modelValue="''" error placeholder="请选择有效日期" />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
