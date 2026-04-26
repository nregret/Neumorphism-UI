<script setup lang="ts">
import { ref } from 'vue'
import NeuForm from '../../components/neu/NeuForm.vue'
import NeuFormItem from '../../components/neu/NeuFormItem.vue'
import NeuInput from '../../components/neu/NeuInput.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

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

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuForm from './components/neu/NeuForm.vue'
import NeuFormItem from './components/neu/NeuFormItem.vue'
import NeuInput from './components/neu/NeuInput.vue'
import NeuButton from './components/neu/NeuButton.vue'

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
<\/script>

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
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Form 表单</h1>
      <p class="text-neu-text/80 text-lg">
        具有数据收集、校验和提交功能的表单，包含输入、选择等控件。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="p-8 bg-[var(--bg-color)] max-w-xl">
        <NeuForm 
          :model="formData" 
          :rules="rules" 
          layout="vertical"
          @submit="handleSubmit"
        >
          <NeuFormItem label="用户名" prop="username">
            <NeuInput v-model="formData.username" placeholder="请输入用户名" />
          </NeuFormItem>
          <NeuFormItem label="密码" prop="password" :error="formData.password.length > 0 && formData.password.length < 6 ? '密码长度不能小于 6 位' : ''">
            <NeuInput v-model="formData.password" type="password" placeholder="请输入密码" />
          </NeuFormItem>
          <NeuFormItem>
            <NeuButton type="submit" variant="primary">登录</NeuButton>
          </NeuFormItem>
        </NeuForm>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
