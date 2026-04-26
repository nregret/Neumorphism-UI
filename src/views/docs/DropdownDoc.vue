<script setup lang="ts">
import { ref } from 'vue'
import NeuDropdown from '../../components/neu/NeuDropdown.vue'
import type { DropdownItem } from '../../components/neu/NeuDropdown.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { User, Settings, LogOut, FileEdit, Trash2 } from 'lucide-vue-next'

const menuItems: DropdownItem[] = [
  { label: '个人资料', value: 'profile', icon: User },
  { label: '账号设置', value: 'settings', icon: Settings },
  { label: 'divider1', value: 'divider1', divider: true },
  { label: '编辑文档', value: 'edit', icon: FileEdit },
  { label: '无权限操作', value: 'disabled', icon: Trash2, disabled: true },
  { label: 'divider2', value: 'divider2', divider: true },
  { label: '退出登录', value: 'logout', icon: LogOut },
]

const handleSelect = (item: DropdownItem) => {
  console.log('Selected:', item.label)
  alert(`您选择了: ${item.label}`)
}

const usageCode = `
<script setup>
import { User, Settings, LogOut } from 'lucide-vue-next'
import NeuDropdown from './components/neu/NeuDropdown.vue'
import NeuButton from './components/neu/NeuButton.vue'

const items = [
  { label: '个人资料', value: 'profile', icon: User },
  { label: '账号设置', value: 'settings', icon: Settings },
  { label: 'divider1', value: '', divider: true },
  { label: '退出登录', value: 'logout', icon: LogOut },
]
<\/script>

<template>
  <NeuDropdown :items="items" placement="bottom-start" @select="handleSelect">
    <template #trigger>
      <NeuButton>点击展开菜单</NeuButton>
    </template>
  </NeuDropdown>
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Dropdown 下拉菜单</h1>
      <p class="text-neu-text/80 text-lg">
        带有强烈物理层级感的悬浮下拉菜单，支持点击和悬停触发。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">触发方式与定位 (Trigger & Placement)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] min-h-[400px]">
        <div class="flex justify-between items-start w-full">
          <!-- Click Trigger (Default) -->
          <div>
            <h3 class="font-bold text-sm mb-4 text-neu-text/60">点击触发 (左下对齐)</h3>
            <NeuDropdown :items="menuItems" placement="bottom-start" @select="handleSelect">
              <template #trigger>
                <NeuButton>Click Me</NeuButton>
              </template>
            </NeuDropdown>
          </div>

          <!-- Hover Trigger -->
          <div>
            <h3 class="font-bold text-sm mb-4 text-neu-text/60">悬停触发 (右下对齐)</h3>
            <NeuDropdown :items="menuItems" placement="bottom-end" trigger="hover" @select="handleSelect">
              <template #trigger>
                <NeuButton variant="primary">Hover Me</NeuButton>
              </template>
            </NeuDropdown>
          </div>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
