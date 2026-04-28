<script setup lang="ts">
import { User, Settings, LogOut } from 'lucide-vue-next'
import NeuDropdown from '../../library/components/neu/NeuDropdown.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'

const items = [
  { label: '个人资料', value: 'profile', icon: User },
  { label: '账号设置', value: 'settings', icon: Settings },
  { label: 'divider1', value: '', divider: true },
  { label: '退出登录', value: 'logout', icon: LogOut },
]
</script>

<template>
  <NeuDropdown :items="items" placement="bottom-start" @select="handleSelect">
    <template #trigger>
      <NeuButton>点击展开菜单</NeuButton>
    </template>
  </NeuDropdown>
</template>
