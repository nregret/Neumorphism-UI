<script setup lang="ts">
import { ref } from 'vue'
import NeuTabs from '../../components/neu/NeuTabs.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const activeTab1 = ref('profile')
const activeTab2 = ref('settings')

const tabsItems1 = [
  { label: '个人资料', value: 'profile' },
  { label: '账户设置', value: 'settings' },
  { label: '隐私安全', value: 'privacy' },
]

const tabsItems2 = [
  { label: '全部消息', value: 'all' },
  { label: '未读消息', value: 'unread' },
  { label: '已删除', value: 'deleted', disabled: true },
]

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuTabs from './components/neu/NeuTabs.vue'

const activeTab = ref('profile')
const tabsItems = [
  { label: '个人资料', value: 'profile' },
  { label: '账户设置', value: 'settings' },
  { label: '隐私安全', value: 'privacy' },
]
<\/script>

<template>
  <!-- 基础线条标签页 -->
  <NeuTabs v-model="activeTab" :items="tabsItems">
    <div v-if="activeTab === 'profile'">这是个人资料的内容...</div>
    <div v-if="activeTab === 'settings'">这是账户设置的内容...</div>
    <div v-if="activeTab === 'privacy'">这是隐私安全的内容...</div>
  </NeuTabs>
  
  <!-- 胶囊样式 (Pills) 分段控制器 -->
  <NeuTabs v-model="activeTab" :items="tabsItems" variant="pills" fullWidth />
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Tabs 标签页</h1>
      <p class="text-neu-text/80 text-lg">
        新拟态风格的标签页和分段控制器，常用于对内容进行分组和层级划分。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">胶囊分段器 (Pills / Segmented Control)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">自适应宽度</h3>
          <NeuTabs v-model="activeTab1" :items="tabsItems1" variant="pills" />
        </div>
        
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">等宽填充 (Full Width)</h3>
          <NeuTabs v-model="activeTab2" :items="tabsItems2" variant="pills" fullWidth />
        </div>

        <div class="mt-8 p-6 rounded-2xl shadow-neu-pressed bg-[var(--bg-color)]">
          <transition name="fade" mode="out-in">
            <div :key="activeTab1" class="text-neu-text/80 leading-relaxed">
              <p v-if="activeTab1 === 'profile'">这是 <strong>个人资料</strong> 的详细内容。这里可以展示用户的头像、昵称和个性签名。</p>
              <p v-if="activeTab1 === 'settings'">这是 <strong>账户设置</strong> 的详细内容。这里可以配置密码、绑定的邮箱和手机号。</p>
              <p v-if="activeTab1 === 'privacy'">这是 <strong>隐私安全</strong> 的详细内容。这里可以管理两步验证、登录设备管理等。</p>
            </div>
          </transition>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
