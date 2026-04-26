<script setup lang="ts">
import NeuPopconfirm from '../../components/neu/NeuPopconfirm.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { ref } from 'vue'

const message = ref('')

const handleConfirm = () => {
  message.value = '已点击确定'
  setTimeout(() => message.value = '', 2000)
}

const handleCancel = () => {
  message.value = '已点击取消'
  setTimeout(() => message.value = '', 2000)
}

const usageCode = `
<script setup>
import NeuPopconfirm from './components/neu/NeuPopconfirm.vue'
import NeuButton from './components/neu/NeuButton.vue'

const handleConfirm = () => {
  console.log('Confirmed')
}

const handleCancel = () => {
  console.log('Canceled')
}
<\/script>

<template>
  <NeuPopconfirm
    title="确定要删除该项吗？"
    content="删除后将无法恢复。"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <NeuButton variant="primary">删除</NeuButton>
  </NeuPopconfirm>
</template>
`

const positionCode = `
<NeuPopconfirm title="上方的气泡" position="top">
  <NeuButton>上方 (Top)</NeuButton>
</NeuPopconfirm>

<NeuPopconfirm title="下方的气泡" position="bottom">
  <NeuButton>下方 (Bottom)</NeuButton>
</NeuPopconfirm>

<NeuPopconfirm title="左侧的气泡" position="left">
  <NeuButton>左侧 (Left)</NeuButton>
</NeuPopconfirm>

<NeuPopconfirm title="右侧的气泡" position="right">
  <NeuButton>右侧 (Right)</NeuButton>
</NeuPopconfirm>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Popconfirm 气泡确认框</h1>
      <p class="text-neu-text/80 text-lg">
        新拟态风格的气泡确认框，点击元素，弹出气泡式的确认框。
      </p>
    </section>

    <!-- Message Toast for Demo -->
    <div v-if="message" class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-neu-flat bg-neu-bg text-neu-accent font-medium transition-all">
      {{ message }}
    </div>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法</h2>
      <NeuCard class="flex flex-wrap gap-12 items-center justify-center p-12 bg-neu-bg">
        <NeuPopconfirm
          title="确定要删除该项吗？"
          content="删除后将无法恢复。"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        >
          <NeuButton variant="primary">删除操作</NeuButton>
        </NeuPopconfirm>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">不同弹出位置 (Positions)</h2>
      <NeuCard class="flex flex-wrap gap-8 items-center justify-center p-24 bg-neu-bg">
        <NeuPopconfirm title="左侧的气泡" position="left">
          <NeuButton>左侧 (Left)</NeuButton>
        </NeuPopconfirm>

        <NeuPopconfirm title="上方的气泡" position="top">
          <NeuButton>上方 (Top)</NeuButton>
        </NeuPopconfirm>

        <NeuPopconfirm title="下方的气泡" position="bottom">
          <NeuButton>下方 (Bottom)</NeuButton>
        </NeuPopconfirm>

        <NeuPopconfirm title="右侧的气泡" position="right">
          <NeuButton>右侧 (Right)</NeuButton>
        </NeuPopconfirm>
      </NeuCard>
      <CodeBlock :code="positionCode" language="html" />
    </section>
  </div>
</template>
