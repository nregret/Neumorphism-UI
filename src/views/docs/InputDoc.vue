<script setup lang="ts">
import { computed, ref } from 'vue'
import NeuInput from '../../components/neu/NeuInput.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useI18n } from 'vue-i18n'

const textValue = ref('')
const passwordValue = ref('')

const { locale } = useI18n()
const isEn = computed(() => locale.value === 'en-US')

const title = computed(() => isEn.value ? 'Input' : 'Input 输入框')
const description = computed(() => isEn.value ? 'A neumorphic input field with an inset shadow.' : '带有内凹阴影效果的新拟态输入框。')
const sectionBasic = computed(() => isEn.value ? 'Basic' : '基础用法 (Basic)')

const usageCodeZh = `
<script setup>
import { ref } from 'vue'
import NeuInput from './components/neu/NeuInput.vue'

const textValue = ref('')
<\/script>

<template>
  <NeuInput v-model="textValue" placeholder="请输入内容..." />
  <NeuInput type="password" placeholder="密码" />
  <NeuInput placeholder="禁用输入" disabled />
  <NeuInput placeholder="错误状态" error />
</template>
`

const usageCodeEn = `
<script setup>
import { ref } from 'vue'
import NeuInput from './components/neu/NeuInput.vue'

const textValue = ref('')
<\/script>

<template>
  <NeuInput v-model="textValue" placeholder="Enter text..." />
  <NeuInput type="password" placeholder="Password" />
  <NeuInput placeholder="Disabled" disabled />
  <NeuInput placeholder="Error" error />
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
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-xl">
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">{{ isEn ? 'Text' : '普通文本' }}</label>
          <NeuInput v-model="textValue" :placeholder="isEn ? 'Enter text...' : '请输入内容...'" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">{{ isEn ? 'Password' : '密码输入' }}</label>
          <NeuInput v-model="passwordValue" type="password" :placeholder="isEn ? '••••••••' : '••••••••'" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">{{ isEn ? 'Disabled' : '禁用状态' }}</label>
          <NeuInput :modelValue="''" disabled :placeholder="isEn ? 'Disabled' : '不可编辑'" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">{{ isEn ? 'Error' : '错误状态' }}</label>
          <NeuInput :modelValue="''" error :placeholder="isEn ? 'Invalid input' : '输入内容有误'" />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
