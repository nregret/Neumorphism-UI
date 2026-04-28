<script setup lang="ts">
import { computed } from 'vue'
import NeuDropdown from '../../components/neu/NeuDropdown.vue'
import type { DropdownItem } from '../../components/neu/NeuDropdown.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { User, Settings, LogOut, FileEdit, Trash2 } from 'lucide-vue-next'
import { useDocI18n } from './useDocI18n'

const { isEn, pick } = useDocI18n()

const menuItems = computed<DropdownItem[]>(() => [
  { label: isEn.value ? 'Profile' : '个人资料', value: 'profile', icon: User },
  { label: isEn.value ? 'Account Settings' : '账号设置', value: 'settings', icon: Settings },
  { label: 'divider1', value: 'divider1', divider: true },
  { label: isEn.value ? 'Edit Document' : '编辑文档', value: 'edit', icon: FileEdit },
  { label: isEn.value ? 'No permission' : '无权限操作', value: 'disabled', icon: Trash2, disabled: true },
  { label: 'divider2', value: 'divider2', divider: true },
  { label: isEn.value ? 'Log out' : '退出登录', value: 'logout', icon: LogOut },
])

const handleSelect = (item: DropdownItem) => {
  console.log('Selected:', item.label)
  alert(isEn.value ? `You selected: ${item.label}` : `您选择了: ${item.label}`)
}

const usageCode = pick(
  `
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
`,
  `
<script setup>
import { User, Settings, LogOut } from 'lucide-vue-next'
import NeuDropdown from './components/neu/NeuDropdown.vue'
import NeuButton from './components/neu/NeuButton.vue'

const items = [
  { label: 'Profile', value: 'profile', icon: User },
  { label: 'Settings', value: 'settings', icon: Settings },
  { label: 'divider1', value: '', divider: true },
  { label: 'Log out', value: 'logout', icon: LogOut },
]
<\/script>

<template>
  <NeuDropdown :items="items" placement="bottom-start" @select="handleSelect">
    <template #trigger>
      <NeuButton>Open menu</NeuButton>
    </template>
  </NeuDropdown>
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Dropdown 下拉菜单', 'Dropdown') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('带有强烈物理层级感的悬浮下拉菜单，支持点击和悬停触发。', 'A floating dropdown menu with strong depth, supporting click and hover triggers.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('触发方式与定位 (Trigger & Placement)', 'Trigger & Placement') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] min-h-[400px]">
        <div class="flex justify-between items-start w-full">
          <!-- Click Trigger (Default) -->
          <div>
            <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('点击触发 (左下对齐)', 'Click trigger (bottom-start)') }}</h3>
            <NeuDropdown :items="menuItems" placement="bottom-start" @select="handleSelect">
              <template #trigger>
                <NeuButton>Click Me</NeuButton>
              </template>
            </NeuDropdown>
          </div>

          <!-- Hover Trigger -->
          <div>
            <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('悬停触发 (右下对齐)', 'Hover trigger (bottom-end)') }}</h3>
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
