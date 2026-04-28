<script setup lang="ts">
import { NeuToast } from '../../library/components/neu/toast'

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
</script>

<template>
  <NeuButton @click="showMessage">显示全局提示</NeuButton>
</template>
