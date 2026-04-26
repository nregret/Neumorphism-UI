<script setup lang="ts">
import { ref } from 'vue'
import NeuModal from '../../components/neu/NeuModal.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const showBasicModal = ref(false)
const showCustomModal = ref(false)

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuModal from './components/neu/NeuModal.vue'
import NeuButton from './components/neu/NeuButton.vue'

const showModal = ref(false)
<\/script>

<template>
  <NeuButton @click="showModal = true">打开对话框</NeuButton>

  <NeuModal v-model="showModal" title="系统提示">
    <p class="text-neu-text/80 leading-relaxed">
      这是一个基于新拟态风格设计的模态对话框。
      它包含背景高斯模糊、内凹的滚动条以及丝滑的弹出动画。
    </p>
    
    <!-- 底部操作区 -->
    <template #footer>
      <NeuButton @click="showModal = false">取消</NeuButton>
      <NeuButton variant="primary" @click="showModal = false">确认</NeuButton>
    </template>
  </NeuModal>
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Modal 对话框</h1>
      <p class="text-neu-text/80 text-lg">
        保留物理质感的模态框，带有玻璃态背景模糊（Backdrop Blur）和定制的内凹滚动条。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-xl">
        <div class="flex gap-4">
          <NeuButton @click="showBasicModal = true" variant="primary">基础对话框</NeuButton>
          <NeuButton @click="showCustomModal = true">无标题/自定义宽度</NeuButton>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <!-- Basic Modal -->
    <NeuModal v-model="showBasicModal" title="确认操作" width="md">
      <div class="space-y-4">
        <p class="text-neu-text/80 leading-relaxed">
          你确定要执行此操作吗？该操作将无法撤销。
        </p>
        <p class="text-neu-text/60 text-sm">
          模态框支持按 <code>Esc</code> 键关闭，点击遮罩层也可以关闭。
        </p>
      </div>
      
      <template #footer>
        <NeuButton size="sm" @click="showBasicModal = false">取消</NeuButton>
        <NeuButton size="sm" variant="primary" @click="showBasicModal = false">确认删除</NeuButton>
      </template>
    </NeuModal>

    <!-- Custom Modal -->
    <NeuModal v-model="showCustomModal" width="lg" :showCloseIcon="false">
      <div class="flex flex-col items-center text-center space-y-6">
        <div class="w-16 h-16 rounded-full shadow-neu-pressed flex items-center justify-center text-green-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold">支付成功</h3>
        <p class="text-neu-text/60">
          您的订单已处理完毕，电子收据已发送至您的注册邮箱。
        </p>
        <div class="w-full mt-4 pb-4 px-2">
          <NeuButton variant="primary" class="w-full" @click="showCustomModal = false">返回首页</NeuButton>
        </div>
      </div>
    </NeuModal>
  </div>
</template>
