<script setup lang="ts">
import { ref } from 'vue'
import NeuSwitch from '../../components/neu/NeuSwitch.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const isActive = ref(true)
const isDisabled = ref(false)

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuSwitch from './components/neu/NeuSwitch.vue'

const isActive = ref(true)
<\/script>

<template>
  <NeuSwitch v-model="isActive" />
  <NeuSwitch v-model="isActive" disabled />
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Switch 开关</h1>
      <p class="text-neu-text/80 text-lg">
        带有立体质感的切换开关组件。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-md">
        <div class="flex items-center justify-between">
          <span class="font-bold text-lg">开启状态: {{ isActive ? 'ON' : 'OFF' }}</span>
          <NeuSwitch v-model="isActive" />
        </div>
        <div class="flex items-center justify-between opacity-50">
          <span class="font-bold text-lg">禁用状态 (ON)</span>
          <NeuSwitch :modelValue="true" disabled />
        </div>
        <div class="flex items-center justify-between opacity-50">
          <span class="font-bold text-lg">禁用状态 (OFF)</span>
          <NeuSwitch :modelValue="false" disabled />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
