<script setup lang="ts">
import { ref } from 'vue'
import { Home, User, Settings } from 'lucide-vue-next'
import NeuMenu from '../../library/components/neu/NeuMenu.vue'

const activeKey = ref('home')

const menuItems = [
  { type: 'group', label: '主要', key: 'g1' },
  { key: 'home', label: '首页', icon: Home },
  { key: 'profile', label: '个人中心', icon: User },
  { type: 'divider', key: 'd1' },
  { key: 'settings', label: '设置', icon: Settings },
]
</script>

<template>
  <!-- 垂直菜单 (默认) -->
  <NeuMenu v-model="activeKey" :items="menuItems" />
  
  <!-- 水平菜单 -->
  <NeuMenu v-model="activeKey" :items="menuItems" mode="horizontal" />
</template>
