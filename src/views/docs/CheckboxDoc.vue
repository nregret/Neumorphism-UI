<script setup lang="ts">
import { ref } from 'vue'
import NeuCheckbox from '../../components/neu/NeuCheckbox.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const singleChecked = ref(true)
const multipleChecked = ref(['apple'])

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuCheckbox from './components/neu/NeuCheckbox.vue'

const singleChecked = ref(true)
const multipleChecked = ref(['apple'])
<\/script>

<template>
  <!-- 单个使用 (布尔值) -->
  <NeuCheckbox v-model="singleChecked" label="同意服务条款" />
  
  <!-- 多个使用 (数组) -->
  <NeuCheckbox v-model="multipleChecked" value="apple" label="苹果" />
  <NeuCheckbox v-model="multipleChecked" value="banana" label="香蕉" />
  
  <!-- 禁用状态 -->
  <NeuCheckbox disabled label="禁用选项" />
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Checkbox 多选框</h1>
      <p class="text-neu-text/80 text-lg">
        新拟态风格的多选框组件，未选中时呈凸起状态，选中时呈现凹陷与勾选图标。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-md">
        <div>
          <h3 class="font-bold text-lg mb-4 text-neu-text/60">单一选项: {{ singleChecked }}</h3>
          <NeuCheckbox v-model="singleChecked" label="我已阅读并同意服务条款" />
        </div>
        
        <hr class="border-[var(--shadow-dark)]/20 my-4" />
        
        <div>
          <h3 class="font-bold text-lg mb-4 text-neu-text/60">多选数组: {{ multipleChecked }}</h3>
          <div class="flex flex-col gap-4">
            <NeuCheckbox v-model="multipleChecked" value="apple" label="苹果 (Apple)" />
            <NeuCheckbox v-model="multipleChecked" value="banana" label="香蕉 (Banana)" />
            <NeuCheckbox v-model="multipleChecked" value="cherry" label="樱桃 (Cherry)" />
          </div>
        </div>

        <hr class="border-[var(--shadow-dark)]/20 my-4" />
        
        <div>
          <h3 class="font-bold text-lg mb-4 text-neu-text/60">禁用状态</h3>
          <div class="flex flex-col gap-4">
            <NeuCheckbox disabled label="未选中的禁用" />
            <NeuCheckbox :modelValue="true" disabled label="选中的禁用" />
          </div>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
