<script setup lang="ts">
import { ref } from 'vue'
import NeuInput from '../../library/components/neu/NeuInput.vue'

const textValue = ref('')
</script>

<template>
  <NeuInput v-model="textValue" placeholder="请输入内容..." />
  <NeuInput type="password" placeholder="密码" />
  <NeuInput placeholder="禁用输入" disabled />
  <NeuInput placeholder="错误状态" error />
</template>
