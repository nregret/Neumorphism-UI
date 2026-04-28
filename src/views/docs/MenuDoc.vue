<script setup lang="ts">
import { computed, ref } from 'vue'
import { Home, Settings, User, Mail, Bell, Shield } from 'lucide-vue-next'
import NeuMenu from '../../components/neu/NeuMenu.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

import type { MenuItem } from '../../components/neu/NeuMenu.vue'

const activeMenu1 = ref('home')
const activeMenu2 = ref('profile')
const { isEn, pick } = useDocI18n()

const verticalItems = computed<MenuItem[]>(() => [
  { type: 'group', label: isEn.value ? 'Main' : '主要功能', key: 'g1' },
  { key: 'home', label: isEn.value ? 'Overview' : '首页概览', icon: Home },
  { key: 'messages', label: isEn.value ? 'Notifications' : '消息通知', icon: Bell },
  { key: 'mail', label: isEn.value ? 'Inbox' : '收件箱', icon: Mail, disabled: true },
  { type: 'divider', key: 'd1', label: '' },
  { type: 'group', label: isEn.value ? 'Settings' : '系统设置', key: 'g2' },
  { key: 'profile', label: isEn.value ? 'Profile' : '个人中心', icon: User },
  { key: 'security', label: isEn.value ? 'Security' : '安全设置', icon: Shield },
  { key: 'settings', label: isEn.value ? 'System' : '系统配置', icon: Settings },
])

const horizontalItems = computed<MenuItem[]>(() => [
  { key: 'home', label: isEn.value ? 'Home' : '首页', icon: Home },
  { key: 'profile', label: isEn.value ? 'Profile' : '个人中心', icon: User },
  { type: 'divider', key: 'd1', label: '' },
  { key: 'settings', label: isEn.value ? 'Settings' : '设置', icon: Settings },
])

const usageCode = pick(
  `
<script setup>
import { ref } from 'vue'
import { Home, User, Settings } from 'lucide-vue-next'
import NeuMenu from './components/neu/NeuMenu.vue'

const activeKey = ref('home')

const menuItems = [
  { type: 'group', label: '主要', key: 'g1' },
  { key: 'home', label: '首页', icon: Home },
  { key: 'profile', label: '个人中心', icon: User },
  { type: 'divider', key: 'd1' },
  { key: 'settings', label: '设置', icon: Settings },
]
<\/script>

<template>
  <!-- 垂直菜单 (默认) -->
  <NeuMenu v-model="activeKey" :items="menuItems" />
  
  <!-- 水平菜单 -->
  <NeuMenu v-model="activeKey" :items="menuItems" mode="horizontal" />
</template>
`,
  `
<script setup>
import { ref } from 'vue'
import { Home, User, Settings } from 'lucide-vue-next'
import NeuMenu from './components/neu/NeuMenu.vue'

const activeKey = ref('home')

const menuItems = [
  { type: 'group', label: 'Main', key: 'g1' },
  { key: 'home', label: 'Home', icon: Home },
  { key: 'profile', label: 'Profile', icon: User },
  { type: 'divider', key: 'd1' },
  { key: 'settings', label: 'Settings', icon: Settings },
]
<\/script>

<template>
  <NeuMenu v-model="activeKey" :items="menuItems" />
  <NeuMenu v-model="activeKey" :items="menuItems" mode="horizontal" />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Menu 导航菜单', 'Menu') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('为网站提供导航功能的菜单，支持垂直和水平两种模式。', 'A navigation menu component supporting both vertical and horizontal modes.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('垂直菜单 (侧边栏)', 'Vertical (sidebar)') }}</h2>
      <NeuCard class="p-12 bg-[var(--bg-color)]">
        <div class="flex gap-12">
          <NeuMenu v-model="activeMenu1" :items="verticalItems" />
          <div class="flex-1 p-8 rounded-2xl shadow-neu-pressed bg-[var(--bg-color)] flex items-center justify-center">
            <p class="text-neu-text/60">{{ pick('当前选中:', 'Selected:') }} <strong class="text-neu-accent">{{ activeMenu1 }}</strong></p>
          </div>
        </div>
      </NeuCard>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('水平菜单 (顶栏)', 'Horizontal (top bar)') }}</h2>
      <NeuCard class="p-12 bg-[var(--bg-color)]">
        <div class="flex flex-col gap-8">
          <NeuMenu v-model="activeMenu2" :items="horizontalItems" mode="horizontal" />
          <div class="p-8 rounded-2xl shadow-neu-pressed bg-[var(--bg-color)] flex items-center justify-center h-32">
            <p class="text-neu-text/60">{{ pick('当前选中:', 'Selected:') }} <strong class="text-neu-accent">{{ activeMenu2 }}</strong></p>
          </div>
        </div>
      </NeuCard>
      
      <div class="mt-8">
        <CodeBlock :code="usageCode" language="html" />
      </div>
    </section>
  </div>
</template>
