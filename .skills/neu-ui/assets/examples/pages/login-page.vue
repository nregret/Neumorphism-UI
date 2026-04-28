<script setup lang="ts">
import { ref } from 'vue'
import NeuAlert from '../../library/components/neu/NeuAlert.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'
import NeuCard from '../../library/components/neu/NeuCard.vue'
import NeuCheckbox from '../../library/components/neu/NeuCheckbox.vue'
import NeuForm from '../../library/components/neu/NeuForm.vue'
import NeuFormItem from '../../library/components/neu/NeuFormItem.vue'
import NeuInput from '../../library/components/neu/NeuInput.vue'

const formData = ref({
  email: '',
  password: '',
  remember: true,
})

const formRules = {
  email: [{ required: true, message: '请输入邮箱地址' }],
  password: [{ required: true, message: '请输入密码' }],
}

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))
  isSubmitting.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[var(--bg-color)] px-6 py-10 text-neu-text md:px-10">
    <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
      <div class="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <section class="space-y-6 self-center">
          <div class="space-y-3">
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-neu-text/45">
              NeuUI Workspace
            </p>
            <h1 class="text-4xl font-bold leading-tight md:text-5xl">
              用带触感的新拟态界面，把登录入口做得安静又清晰
            </h1>
            <p class="max-w-2xl text-base leading-8 text-neu-text/70 md:text-lg">
              这个模板展示了 NeuForm、NeuInput、NeuCheckbox 和 NeuButton 在高频身份验证场景里的组合方式，
              适合作为后台、工具站或私有系统的统一登录页起点。
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <NeuCard class="space-y-2 p-5">
              <div class="text-sm font-medium text-neu-text/55">视觉语气</div>
              <div class="text-xl font-bold">柔和、克制</div>
            </NeuCard>
            <NeuCard class="space-y-2 p-5">
              <div class="text-sm font-medium text-neu-text/55">主交互</div>
              <div class="text-xl font-bold">单一主按钮</div>
            </NeuCard>
            <NeuCard class="space-y-2 p-5">
              <div class="text-sm font-medium text-neu-text/55">主题变量</div>
              <div class="text-xl font-bold">全局可切换</div>
            </NeuCard>
          </div>
        </section>

        <NeuCard class="mx-auto w-full max-w-xl space-y-8 p-8 md:p-10">
          <div class="space-y-3">
            <h2 class="text-3xl font-bold">欢迎回来</h2>
            <p class="text-sm leading-7 text-neu-text/65">
              输入你的账号信息继续访问项目工作台。
            </p>
          </div>

          <NeuAlert variant="info" title="演示提示" description="该页面模板默认只展示交互结构，不接入真实鉴权流程。" />

          <NeuForm :model="formData" :rules="formRules" layout="vertical" @submit.prevent="handleSubmit">
            <NeuFormItem label="邮箱" prop="email">
              <NeuInput v-model="formData.email" type="email" placeholder="you@example.com" />
            </NeuFormItem>

            <NeuFormItem label="密码" prop="password">
              <NeuInput v-model="formData.password" type="password" placeholder="请输入密码" />
            </NeuFormItem>

            <div class="flex items-center justify-between gap-4 text-sm">
              <NeuCheckbox v-model="formData.remember" label="记住我" />
              <button type="button" class="font-medium text-neu-accent transition-opacity hover:opacity-75">
                忘记密码
              </button>
            </div>

            <div class="space-y-4 pt-2">
              <NeuButton
                type="submit"
                variant="primary"
                class="w-full justify-center"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? '正在登录...' : '登录工作台' }}
              </NeuButton>

              <p class="text-center text-xs leading-6 text-neu-text/45">
                登录即表示你同意当前工作区的访问规范与审计策略。
              </p>
            </div>
          </NeuForm>
        </NeuCard>
      </div>
    </div>
  </div>
</template>
