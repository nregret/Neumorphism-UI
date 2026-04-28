<script setup lang="ts">
import NeuPopconfirm from '../../library/components/neu/NeuPopconfirm.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'

const handleConfirm = () => {
  console.log('Confirmed')
}

const handleCancel = () => {
  console.log('Canceled')
}
</script>

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
