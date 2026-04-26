<script setup lang="ts">
import { NeuToast } from '../../components/neu/toast'
import NeuCard from '../../components/neu/NeuCard.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const showDefaultToast = () => {
  NeuToast.show('这是一条普通的全局提示消息')
}

const showSuccessToast = () => {
  NeuToast.success('操作成功，数据已保存！')
}

const showWarningToast = () => {
  NeuToast.warning('警告：您的账户存在安全风险。')
}

const showErrorToast = () => {
  NeuToast.error('发生网络错误，请稍后重试。')
}

const showLongToast = () => {
  NeuToast.show({
    message: '这条消息会显示 5 秒钟，你可以通过配置 duration 属性来控制停留时间。',
    duration: 5000,
    type: 'info'
  })
}

const usageCode = `
<script setup>
import { NeuToast } from './components/neu/toast'

const showMessage = () => {
  // 基础用法
  NeuToast.show('这是一条提示消息')
  
  // 语义化快捷方法
  NeuToast.success('操作成功！')
  NeuToast.error('保存失败')
  NeuToast.warning('警告：内容可能丢失')
  NeuToast.info('通知：系统已更新')
  
  // 高级配置
  NeuToast.show({
    message: '这条消息停留 5 秒',
    type: 'info',
    duration: 5000
  })
}
<\/script>

<template>
  <NeuButton @click="showMessage">显示全局提示</NeuButton>
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Toast / Message 全局提示</h1>
      <p class="text-neu-text/80 text-lg">
        悬浮在页面顶部的轻量级全局提示，用于在不打断用户操作的情况下反馈系统状态。通过函数式调用 (`NeuToast.show()`) 即可使用。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">不同状态 (Types)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-4xl">
        <div class="flex flex-wrap gap-4">
          <NeuButton @click="showDefaultToast">默认提示 (Default)</NeuButton>
          <NeuButton variant="primary" @click="showSuccessToast">成功提示 (Success)</NeuButton>
          <NeuButton @click="showWarningToast">警告提示 (Warning)</NeuButton>
          <NeuButton @click="showErrorToast">错误提示 (Error)</NeuButton>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">自定义停留时间 (Duration)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <p class="text-sm text-neu-text/60">默认停留时间为 3000ms。你可以通过传入 <code>duration</code> 来修改它。</p>
        <div>
          <NeuButton @click="showLongToast">显示 5 秒钟的提示</NeuButton>
        </div>
      </NeuCard>
    </section>
  </div>
</template>
