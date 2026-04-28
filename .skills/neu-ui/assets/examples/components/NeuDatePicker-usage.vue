<script setup lang="ts">
import { ref } from 'vue'
import NeuDatePicker from '../../library/components/neu/NeuDatePicker.vue'

const dateValue = ref('')
</script>

<template>
  <NeuDatePicker v-model="dateValue" placeholder="请选择日期" />
  <NeuDatePicker disabled placeholder="禁用状态" />
  <NeuDatePicker error placeholder="错误状态" />
</template>
