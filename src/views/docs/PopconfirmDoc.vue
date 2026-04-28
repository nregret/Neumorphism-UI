<script setup lang="ts">
import NeuPopconfirm from '../../components/neu/NeuPopconfirm.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { ref } from 'vue'
import { useDocI18n } from './useDocI18n'

const message = ref('')
const { isEn, pick, text } = useDocI18n()

const handleConfirm = () => {
  message.value = isEn.value ? 'Confirmed' : '已点击确定'
  setTimeout(() => message.value = '', 2000)
}

const handleCancel = () => {
  message.value = isEn.value ? 'Canceled' : '已点击取消'
  setTimeout(() => message.value = '', 2000)
}

const usageCode = pick(
  `
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
`,
  `
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
    title="Delete this item?"
    content="This action cannot be undone."
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <NeuButton variant="primary">Delete</NeuButton>
  </NeuPopconfirm>
</template>
`
)

const positionCode = pick(
  `
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
`,
  `
<NeuPopconfirm title="Top bubble" position="top">
  <NeuButton>Top</NeuButton>
</NeuPopconfirm>

<NeuPopconfirm title="Bottom bubble" position="bottom">
  <NeuButton>Bottom</NeuButton>
</NeuPopconfirm>

<NeuPopconfirm title="Left bubble" position="left">
  <NeuButton>Left</NeuButton>
</NeuPopconfirm>

<NeuPopconfirm title="Right bubble" position="right">
  <NeuButton>Right</NeuButton>
</NeuPopconfirm>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Popconfirm 气泡确认框', 'Popconfirm') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的气泡确认框，点击元素，弹出气泡式的确认框。', 'A neumorphic confirmation popover shown when clicking an element.') }}
      </p>
    </section>

    <!-- Message Toast for Demo -->
    <div v-if="message" class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-neu-flat bg-neu-bg text-neu-accent font-medium transition-all">
      {{ message }}
    </div>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法', 'Basic') }}</h2>
      <NeuCard class="flex flex-wrap gap-12 items-center justify-center p-12 bg-neu-bg">
        <NeuPopconfirm
          :title="text('确定要删除该项吗？', 'Delete this item?')"
          :content="text('删除后将无法恢复。', 'This action cannot be undone.')"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        >
          <NeuButton variant="primary">{{ pick('删除操作', 'Delete') }}</NeuButton>
        </NeuPopconfirm>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('不同弹出位置 (Positions)', 'Positions') }}</h2>
      <NeuCard class="flex flex-wrap gap-8 items-center justify-center p-24 bg-neu-bg">
        <NeuPopconfirm :title="text('左侧的气泡', 'Left bubble')" position="left">
          <NeuButton>{{ pick('左侧 (Left)', 'Left') }}</NeuButton>
        </NeuPopconfirm>

        <NeuPopconfirm :title="text('上方的气泡', 'Top bubble')" position="top">
          <NeuButton>{{ pick('上方 (Top)', 'Top') }}</NeuButton>
        </NeuPopconfirm>

        <NeuPopconfirm :title="text('下方的气泡', 'Bottom bubble')" position="bottom">
          <NeuButton>{{ pick('下方 (Bottom)', 'Bottom') }}</NeuButton>
        </NeuPopconfirm>

        <NeuPopconfirm :title="text('右侧的气泡', 'Right bubble')" position="right">
          <NeuButton>{{ pick('右侧 (Right)', 'Right') }}</NeuButton>
        </NeuPopconfirm>
      </NeuCard>
      <CodeBlock :code="positionCode" language="html" />
    </section>
  </div>
</template>
