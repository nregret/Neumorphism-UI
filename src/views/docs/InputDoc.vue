<script setup lang="ts">
import { ref } from 'vue'
import NeuInput from '../../components/neu/NeuInput.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const textValue = ref('')
const passwordValue = ref('')

const usageCode = `
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
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Input 输入框</h1>
      <p class="text-neu-text/80 text-lg">
        带有内凹阴影效果的新拟态输入框。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-xl">
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">普通文本</label>
          <NeuInput v-model="textValue" placeholder="请输入内容..." />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">密码输入</label>
          <NeuInput v-model="passwordValue" type="password" placeholder="••••••••" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">禁用状态</label>
          <NeuInput :modelValue="''" disabled placeholder="不可编辑" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">错误状态</label>
          <NeuInput :modelValue="''" error placeholder="输入内容有误" />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
