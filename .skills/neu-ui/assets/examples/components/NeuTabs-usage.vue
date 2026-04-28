<script setup lang="ts">
import { ref } from 'vue'
import NeuTabs from '../../library/components/neu/NeuTabs.vue'

const activeTab = ref('profile')
const tabsItems = [
  { label: '个人资料', value: 'profile' },
  { label: '账户设置', value: 'settings' },
  { label: '隐私安全', value: 'privacy' },
]
</script>

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
