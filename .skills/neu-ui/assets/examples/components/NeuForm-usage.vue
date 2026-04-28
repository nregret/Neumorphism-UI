<script setup lang="ts">
import { ref } from 'vue'
import NeuForm from '../../library/components/neu/NeuForm.vue'
import NeuFormItem from '../../library/components/neu/NeuFormItem.vue'
import NeuInput from '../../library/components/neu/NeuInput.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'

const formData = ref({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

const handleSubmit = (e: Event) => {
  console.log('submit', formData.value)
}
</script>

<template>
  <NeuForm 
    :model="formData" 
    :rules="rules" 
    layout="vertical"
    @submit="handleSubmit"
  >
    <NeuFormItem label="用户名" prop="username">
      <NeuInput v-model="formData.username" placeholder="请输入用户名" />
    </NeuFormItem>
    <NeuFormItem label="密码" prop="password">
      <NeuInput v-model="formData.password" type="password" placeholder="请输入密码" />
    </NeuFormItem>
    <NeuFormItem>
      <NeuButton type="submit" variant="primary">提交</NeuButton>
    </NeuFormItem>
  </NeuForm>
</template>
