<script setup lang="ts">
import { ref } from 'vue'
import NeuSwitch from '../../components/neu/NeuSwitch.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const isActive = ref(true)
const isDisabled = ref(false)
const { isEn, pick } = useDocI18n()

const usageCode = pick(
  `
<script setup>
import { ref } from 'vue'
import NeuSwitch from './components/neu/NeuSwitch.vue'

const isActive = ref(true)
<\/script>

<template>
  <NeuSwitch v-model="isActive" />
  <NeuSwitch v-model="isActive" disabled />
</template>
`,
  `
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
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Switch 开关', 'Switch') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('带有立体质感的切换开关组件。', 'A tactile neumorphic toggle switch.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法 (Basic)', 'Basic') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-md">
        <div class="flex items-center justify-between">
          <span class="font-bold text-lg">{{ pick('开启状态:', 'State:') }} {{ isActive ? 'ON' : 'OFF' }}</span>
          <NeuSwitch v-model="isActive" />
        </div>
        <div class="flex items-center justify-between opacity-50">
          <span class="font-bold text-lg">{{ pick('禁用状态 (ON)', 'Disabled (ON)') }}</span>
          <NeuSwitch :modelValue="true" disabled />
        </div>
        <div class="flex items-center justify-between opacity-50">
          <span class="font-bold text-lg">{{ pick('禁用状态 (OFF)', 'Disabled (OFF)') }}</span>
          <NeuSwitch :modelValue="false" disabled />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
