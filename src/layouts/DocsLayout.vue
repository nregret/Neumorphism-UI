<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun, Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NeuButton from '../components/neu/NeuButton.vue'
import NeuCard from '../components/neu/NeuCard.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const route = useRoute()

const isSidebarOpen = ref(false)

const componentGroups = [
  {
    title: '基础/布局 (Basic)',
    links: [
      { name: 'Button 按钮', path: '/components/button' },
      { name: 'Card 卡片', path: '/components/card' },
    ]
  },
  {
    title: '导航 (Navigation)',
    links: [
      { name: 'Breadcrumb 面包屑', path: '/components/breadcrumb' },
      { name: 'Dropdown 下拉菜单', path: '/components/dropdown' },
      { name: 'Pagination 分页', path: '/components/pagination' },
      { name: 'Tabs 标签页', path: '/components/tabs' },
    ]
  },
  {
    title: '表单/交互 (Forms)',
    links: [
      { name: 'Input 输入框', path: '/components/input' },
      { name: 'Switch 开关', path: '/components/switch' },
      { name: 'Radio 单选框', path: '/components/radio' },
      { name: 'Checkbox 多选框', path: '/components/checkbox' },
      { name: 'Slider 滑块', path: '/components/slider' },
    ]
  },
  {
    title: '数据展示 (Data)',
    links: [
      { name: 'Table 表格', path: '/components/table' },
      { name: 'Avatar 头像', path: '/components/avatar' },
      { name: 'Badge 徽标', path: '/components/badge' },
      { name: 'Progress 进度条', path: '/components/progress' },
      { name: 'Accordion 折叠面板', path: '/components/accordion' },
      { name: 'Skeleton 骨架屏', path: '/components/skeleton' },
    ]
  },
  {
    title: '反馈/浮层 (Feedback)',
    links: [
      { name: 'Alert 警告提示', path: '/components/alert' },
      { name: 'Modal 对话框', path: '/components/modal' },
      { name: 'Drawer 抽屉', path: '/components/drawer' },
      { name: 'Toast 全局提示', path: '/components/toast' },
      { name: 'Tooltip 文字提示', path: '/components/tooltip' },
    ]
  }
]

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
    <!-- Mobile Header -->
    <div class="md:hidden flex items-center justify-between p-4 z-50 sticky top-0 bg-[var(--bg-color)]/80 backdrop-blur-md border-b border-[var(--shadow-dark)]/10">
      <router-link to="/" class="text-xl font-bold tracking-tighter">Neu<span class="text-neu-accent">UI</span></router-link>
      <div class="flex items-center gap-4">
        <NeuButton variant="icon" shape="circle" size="sm" @click="toggleDark()">
          <Moon v-if="!isDark" class="w-4 h-4" />
          <Sun v-else class="w-4 h-4" />
        </NeuButton>
        <NeuButton variant="icon" shape="circle" size="sm" @click="toggleSidebar">
          <Menu v-if="!isSidebarOpen" class="w-4 h-4" />
          <X v-else class="w-4 h-4" />
        </NeuButton>
      </div>
    </div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-40 w-64 p-6 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0',
        'bg-[var(--bg-color)] shadow-[inset_-8px_0_16px_var(--shadow-dark),inset_-8px_0_16px_var(--shadow-light)] md:shadow-none md:border-r md:border-[var(--shadow-dark)]/10',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'overflow-y-auto custom-scrollbar'
      ]"
    >
      <div class="hidden md:flex items-center justify-between mb-12">
        <router-link to="/" class="text-2xl font-bold tracking-tighter">Neu<span class="text-neu-accent">UI</span></router-link>
        <NeuButton variant="icon" shape="circle" size="sm" @click="toggleDark()">
          <Moon v-if="!isDark" class="w-4 h-4" />
          <Sun v-else class="w-4 h-4" />
        </NeuButton>
      </div>

      <nav class="space-y-8">
        <div v-for="group in componentGroups" :key="group.title">
          <h4 class="text-xs font-bold text-neu-text/40 uppercase tracking-wider mb-3 px-2">{{ group.title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in group.links" :key="link.path">
              <router-link :to="link.path" @click="isSidebarOpen = false">
                <NeuCard
                  :pressed="route.path === link.path"
                  padding="sm"
                  rounded="md"
                  class="hover:text-neu-accent cursor-pointer transition-colors"
                  :class="route.path === link.path ? 'text-neu-accent font-semibold' : ''"
                >
                  {{ link.name }}
                </NeuCard>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Overlay for mobile sidebar -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
      @click="toggleSidebar"
    ></div>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-12 lg:p-20 overflow-y-auto w-full max-w-4xl mx-auto custom-scrollbar">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--bg-color);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--shadow-dark);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}
</style>