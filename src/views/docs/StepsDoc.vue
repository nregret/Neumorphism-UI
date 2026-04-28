<script setup lang="ts">
import { computed, ref } from 'vue'
import NeuSteps from '../../components/neu/NeuSteps.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const currentStep1 = ref(1)
const currentStep2 = ref(0)
const currentStep3 = ref(2)
const { isEn, pick } = useDocI18n()

const stepsItems = computed(() => [
  { title: isEn.value ? 'Choose items' : '选择商品', description: isEn.value ? 'Select from cart' : '从购物车中选择' },
  { title: isEn.value ? 'Order details' : '填写订单', description: isEn.value ? 'Confirm address' : '确认收货地址' },
  { title: isEn.value ? 'Payment' : '支付款项', description: isEn.value ? 'Multiple methods' : '支持多种支付方式' },
  { title: isEn.value ? 'Done' : '完成交易', description: isEn.value ? 'Await shipment' : '等待商家发货' },
])

const stepsCount = computed(() => stepsItems.value.length)

const nextStep = () => {
  if (currentStep1.value < stepsCount.value) {
    currentStep1.value++
  }
}

const prevStep = () => {
  if (currentStep1.value > 0) {
    currentStep1.value--
  }
}

const usageCode = pick(
  `
<script setup>
import { ref } from 'vue'
import NeuSteps from './components/neu/NeuSteps.vue'

const current = ref(1)
const steps = [
  { title: '第一步', description: '描述信息' },
  { title: '第二步', description: '描述信息' },
  { title: '第三步', description: '描述信息' },
]
<\/script>

<template>
  <!-- 水平步骤条 -->
  <NeuSteps v-model="current" :items="steps" />
  
  <!-- 垂直步骤条 -->
  <NeuSteps v-model="current" :items="steps" direction="vertical" />
  
  <!-- 可点击步骤条 -->
  <NeuSteps v-model="current" :items="steps" clickable />
</template>
`,
  `
<script setup>
import { ref } from 'vue'
import NeuSteps from './components/neu/NeuSteps.vue'

const current = ref(1)
const steps = [
  { title: 'Step 1', description: 'Description' },
  { title: 'Step 2', description: 'Description' },
  { title: 'Step 3', description: 'Description' },
]
<\/script>

<template>
  <NeuSteps v-model="current" :items="steps" />
  <NeuSteps v-model="current" :items="steps" direction="vertical" />
  <NeuSteps v-model="current" :items="steps" clickable />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Steps 步骤条', 'Steps') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的步骤条，用于引导用户按照流程完成任务。', 'A neumorphic stepper used to guide users through a process.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法', 'Basic') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)]">
        <div>
          <NeuSteps v-model="currentStep1" :items="stepsItems" />
        </div>
        
        <div class="flex justify-center gap-4 mt-8">
          <NeuButton @click="prevStep" :disabled="currentStep1 === 0">{{ pick('上一步', 'Previous') }}</NeuButton>
          <NeuButton @click="nextStep" variant="primary" :disabled="currentStep1 === stepsCount">{{ pick('下一步', 'Next') }}</NeuButton>
        </div>
      </NeuCard>
    </section>
    
    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('垂直方向', 'Vertical') }}</h2>
      <NeuCard class="p-12 bg-[var(--bg-color)]">
        <NeuSteps v-model="currentStep2" :items="stepsItems" direction="vertical" />
      </NeuCard>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('可点击', 'Clickable') }}</h2>
      <NeuCard class="p-12 bg-[var(--bg-color)]">
        <p class="mb-8 text-neu-text/60">
          <template v-if="isEn">
            Set <code class="px-2 py-1 bg-[var(--shadow-dark)]/10 rounded">clickable</code> to allow jumping by clicking steps.
          </template>
          <template v-else>
            通过设置 <code class="px-2 py-1 bg-[var(--shadow-dark)]/10 rounded">clickable</code> 属性，允许用户直接点击步骤进行跳转。
          </template>
        </p>
        <NeuSteps v-model="currentStep3" :items="stepsItems" clickable />
      </NeuCard>
      
      <div class="mt-8">
        <CodeBlock :code="usageCode" language="html" />
      </div>
    </section>
  </div>
</template>
