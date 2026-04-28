<script setup lang="ts">
import { ref } from 'vue'
import NeuRadio from '../../components/neu/NeuRadio.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const selectedValue = ref('1')
const { isEn, pick } = useDocI18n()

const usageCode = pick(
  `
<script setup>
import { ref } from 'vue'
import NeuRadio from './components/neu/NeuRadio.vue'

const selectedValue = ref('1')
<\/script>

<template>
  <NeuRadio v-model="selectedValue" value="1" label="选项一" />
  <NeuRadio v-model="selectedValue" value="2" label="选项二" />
  <NeuRadio v-model="selectedValue" value="3" label="禁用选项" disabled />
</template>
`,
  `
<script setup>
import { ref } from 'vue'
import NeuRadio from './components/neu/NeuRadio.vue'

const selectedValue = ref('1')
<\/script>

<template>
  <NeuRadio v-model="selectedValue" value="1" label="Option 1" />
  <NeuRadio v-model="selectedValue" value="2" label="Option 2" />
  <NeuRadio v-model="selectedValue" value="3" label="Disabled option" disabled />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Radio 单选框', 'Radio') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的单选框组件，未选中时呈凸起状态，选中时凹陷并展示点缀色指示器。', 'A neumorphic radio. Unselected is raised; selected becomes pressed with an accent indicator.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法 (Basic)', 'Basic') }}</h2>
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-md">
        <h3 class="font-bold text-lg mb-4 text-neu-text/60">{{ pick('当前选择:', 'Selected:') }} {{ selectedValue }}</h3>
        
        <NeuRadio v-model="selectedValue" value="1" :label="isEn ? 'Option 1 (Apple)' : '选项一 (Apple)'" />
        <NeuRadio v-model="selectedValue" value="2" :label="isEn ? 'Option 2 (Banana)' : '选项二 (Banana)'" />
        <NeuRadio v-model="selectedValue" value="3" :label="isEn ? 'Option 3 (Cherry)' : '选项三 (Cherry)'" />
        
        <hr class="border-[var(--shadow-dark)]/20 my-4" />
        
        <NeuRadio v-model="selectedValue" value="4" :label="isEn ? 'Disabled option' : '禁用的选项'" disabled />
        <NeuRadio :modelValue="'5'" value="5" :label="isEn ? 'Disabled (selected)' : '禁用的选中状态'" disabled />
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
