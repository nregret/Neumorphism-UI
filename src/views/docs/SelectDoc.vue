<script setup lang="ts">
import { computed, ref } from 'vue'
import NeuSelect from '../../components/neu/NeuSelect.vue'
import type { SelectOption } from '../../components/neu/NeuSelect.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useI18n } from 'vue-i18n'

const singleValue = ref('')
const multipleValue = ref(['apple'])
const disabledValue = ref('')

const { locale } = useI18n()
const isEn = computed(() => locale.value === 'en-US')

const title = computed(() => isEn.value ? 'Select' : 'Select 下拉选择框')
const description = computed(() => isEn.value
  ? 'A neumorphic select component. The trigger feels pressed on click, and the dropdown uses a large embossed shadow with a custom scrollbar.'
  : '新拟态风格的下拉选择组件，点击时容器呈现物理凹陷感，弹出层带有大尺寸浮雕阴影和定制滚动条。'
)
const sectionBasic = computed(() => isEn.value ? 'Basic' : '基础用法 (Basic)')

const fruitOptions = computed<SelectOption[]>(() => [
  { label: isEn.value ? 'Apple' : '苹果 (Apple)', value: 'apple' },
  { label: isEn.value ? 'Banana' : '香蕉 (Banana)', value: 'banana' },
  { label: isEn.value ? 'Cherry' : '樱桃 (Cherry)', value: 'cherry' },
  { label: isEn.value ? 'Dragonfruit' : '火龙果 (Dragonfruit)', value: 'dragonfruit' },
  { label: isEn.value ? 'Elderberry' : '接骨木果 (Elderberry)', value: 'elderberry', disabled: true },
  { label: isEn.value ? 'Fig' : '无花果 (Fig)', value: 'fig' },
  { label: isEn.value ? 'Grape' : '葡萄 (Grape)', value: 'grape' },
])

const usageCodeZh = `
<script setup>
import { ref } from 'vue'
import NeuSelect from './components/neu/NeuSelect.vue'

const singleValue = ref('')
const multipleValue = ref(['apple'])

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '售罄水果', value: 'soldout', disabled: true },
]
<\/script>

<template>
  <!-- 单选 -->
  <NeuSelect 
    v-model="singleValue" 
    :options="options" 
    placeholder="请选择你喜欢的水果" 
  />

  <!-- 多选 -->
  <NeuSelect 
    v-model="multipleValue" 
    :options="options" 
    multiple 
    placeholder="可选择多个水果" 
  />

  <!-- 禁用/错误状态 -->
  <NeuSelect disabled placeholder="不可选择" />
  <NeuSelect error placeholder="发生错误" />
</template>
`

const usageCodeEn = `
<script setup>
import { ref } from 'vue'
import NeuSelect from './components/neu/NeuSelect.vue'

const singleValue = ref('')
const multipleValue = ref(['apple'])

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Sold out', value: 'soldout', disabled: true },
]
<\/script>

<template>
  <!-- Single -->
  <NeuSelect
    v-model="singleValue"
    :options="options"
    placeholder="Pick a fruit"
  />

  <!-- Multiple -->
  <NeuSelect
    v-model="multipleValue"
    :options="options"
    multiple
    placeholder="Pick multiple fruits"
  />

  <!-- Disabled / Error -->
  <NeuSelect disabled placeholder="Disabled" />
  <NeuSelect error placeholder="Error" />
</template>
`

const usageCode = computed(() => isEn.value ? usageCodeEn : usageCodeZh)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ description }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ sectionBasic }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-2xl min-h-[400px]">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ isEn ? 'Single' : '单选选择器 (Single)' }}</h3>
          <NeuSelect 
            v-model="singleValue" 
            :options="fruitOptions" 
            :placeholder="isEn ? 'Pick a fruit' : '请选择你喜欢的水果'" 
          />
          <p class="mt-3 text-sm text-neu-text/50">{{ isEn ? 'Selected value:' : '当前选择的值:' }} <strong class="text-neu-accent">{{ singleValue || (isEn ? 'None' : '无') }}</strong></p>
        </div>

        <hr class="border-[var(--shadow-dark)]/20 my-4" />

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ isEn ? 'Multiple' : '多选选择器 (Multiple)' }}</h3>
          <NeuSelect 
            v-model="multipleValue" 
            :options="fruitOptions" 
            multiple
            :placeholder="isEn ? 'Pick multiple fruits' : '可选择多个水果'" 
          />
          <p class="mt-3 text-sm text-neu-text/50">{{ isEn ? 'Selected value:' : '当前选择的值:' }} <strong class="text-neu-accent">{{ multipleValue }}</strong></p>
        </div>

        <hr class="border-[var(--shadow-dark)]/20 my-4" />

        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ isEn ? 'Disabled' : '禁用状态 (Disabled)' }}</h3>
            <NeuSelect 
              v-model="disabledValue" 
              :options="fruitOptions" 
              disabled
              :placeholder="isEn ? 'Disabled' : '此组件已被禁用'" 
            />
          </div>
          <div>
            <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ isEn ? 'Error' : '错误状态 (Error)' }}</h3>
            <NeuSelect 
              v-model="singleValue" 
              :options="fruitOptions" 
              error
              :placeholder="isEn ? 'Please re-select' : '请重新选择'" 
            />
          </div>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
