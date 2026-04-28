<script setup lang="ts">
import { ref } from 'vue'
import NeuDatePicker from '../../components/neu/NeuDatePicker.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const dateValue = ref('')
const { isEn, pick } = useDocI18n()

const usageCode = pick(
  `
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
`,
  `
<script setup>
import { ref } from 'vue'
import NeuDatePicker from './components/neu/NeuDatePicker.vue'

const dateValue = ref('')
<\/script>

<template>
  <NeuDatePicker v-model="dateValue" placeholder="Select a date" />
  <NeuDatePicker disabled placeholder="Disabled" />
  <NeuDatePicker error placeholder="Error" />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('DatePicker 日期选择器', 'Date Picker') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的日期选择组件，基于原生 date input 封装。', 'A neumorphic date picker built on top of the native date input.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法 (Basic)', 'Basic') }}</h2>
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-xl">
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">{{ pick('普通选择', 'Default') }}</label>
          <NeuDatePicker v-model="dateValue" :placeholder="isEn ? 'Select a date' : '请选择日期'" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">{{ pick('禁用状态', 'Disabled') }}</label>
          <NeuDatePicker :modelValue="''" disabled :placeholder="isEn ? 'Disabled' : '不可选择'" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">{{ pick('错误状态', 'Error') }}</label>
          <NeuDatePicker :modelValue="''" error :placeholder="isEn ? 'Select a valid date' : '请选择有效日期'" />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
