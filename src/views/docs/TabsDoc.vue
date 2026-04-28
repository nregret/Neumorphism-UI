<script setup lang="ts">
import { computed, ref } from 'vue'
import NeuTabs from '../../components/neu/NeuTabs.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const activeTab1 = ref('profile')
const activeTab2 = ref('settings')
const { isEn, pick } = useDocI18n()

const tabsItems1 = computed(() => [
  { label: isEn.value ? 'Profile' : '个人资料', value: 'profile' },
  { label: isEn.value ? 'Settings' : '账户设置', value: 'settings' },
  { label: isEn.value ? 'Privacy' : '隐私安全', value: 'privacy' },
])

const tabsItems2 = computed(() => [
  { label: isEn.value ? 'All' : '全部消息', value: 'all' },
  { label: isEn.value ? 'Unread' : '未读消息', value: 'unread' },
  { label: isEn.value ? 'Deleted' : '已删除', value: 'deleted', disabled: true },
])

const usageCode = pick(
  `
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
`,
  `
<script setup>
import { ref } from 'vue'
import NeuTabs from './components/neu/NeuTabs.vue'

const activeTab = ref('profile')
const tabsItems = [
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
  { label: 'Privacy', value: 'privacy' },
]
<\/script>

<template>
  <NeuTabs v-model="activeTab" :items="tabsItems">
    <div v-if="activeTab === 'profile'">Profile content...</div>
    <div v-if="activeTab === 'settings'">Settings content...</div>
    <div v-if="activeTab === 'privacy'">Privacy content...</div>
  </NeuTabs>

  <NeuTabs v-model="activeTab" :items="tabsItems" variant="pills" fullWidth />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Tabs 标签页', 'Tabs') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的标签页和分段控制器，常用于对内容进行分组和层级划分。', 'Neumorphic tabs and segmented controls for organizing content into sections.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('胶囊分段器 (Pills / Segmented Control)', 'Pills / Segmented Control') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('自适应宽度', 'Auto width') }}</h3>
          <NeuTabs v-model="activeTab1" :items="tabsItems1" variant="pills" />
        </div>
        
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('等宽填充 (Full Width)', 'Full width') }}</h3>
          <NeuTabs v-model="activeTab2" :items="tabsItems2" variant="pills" fullWidth />
        </div>

        <div class="mt-8 p-6 rounded-2xl shadow-neu-pressed bg-[var(--bg-color)]">
          <transition name="fade" mode="out-in">
            <div :key="activeTab1" class="text-neu-text/80 leading-relaxed">
              <p v-if="activeTab1 === 'profile'">
                <template v-if="isEn">This is the <strong>Profile</strong> section. Show avatar, name, and bio here.</template>
                <template v-else>这是 <strong>个人资料</strong> 的详细内容。这里可以展示用户的头像、昵称和个性签名。</template>
              </p>
              <p v-if="activeTab1 === 'settings'">
                <template v-if="isEn">This is the <strong>Settings</strong> section. Configure password, email, and phone binding.</template>
                <template v-else>这是 <strong>账户设置</strong> 的详细内容。这里可以配置密码、绑定的邮箱和手机号。</template>
              </p>
              <p v-if="activeTab1 === 'privacy'">
                <template v-if="isEn">This is the <strong>Privacy</strong> section. Manage 2FA and signed-in devices.</template>
                <template v-else>这是 <strong>隐私安全</strong> 的详细内容。这里可以管理两步验证、登录设备管理等。</template>
              </p>
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
