<script setup lang="ts">
import { ref } from 'vue'
import NeuSelect from '../../library/components/neu/NeuSelect.vue'

const singleValue = ref('')
const multipleValue = ref(['apple'])

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '售罄水果', value: 'soldout', disabled: true },
]
</script>

<template>
  <!-- 单选 -->
  <NeuSelect 
    v-model="singleValue" 
    :options="options" 
    placeholder="请选择你喜欢的水果" 
  />

  <!-- 多选 -->
  <NeuSelect 
    v-model="multipleValue" 
    :options="options" 
    multiple 
    placeholder="可选择多个水果" 
  />

  <!-- 禁用/错误状态 -->
  <NeuSelect disabled placeholder="不可选择" />
  <NeuSelect error placeholder="发生错误" />
</template>
