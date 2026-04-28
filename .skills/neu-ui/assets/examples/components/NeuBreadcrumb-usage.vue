<script setup lang="ts">
import NeuBreadcrumb from '../../library/components/neu/NeuBreadcrumb.vue'

const items = [
  { label: '首页', path: '/' },
  { label: '用户管理', path: '/users' },
  { label: '详情' } // 最后一个默认是高亮的当前页
]
</script>

<template>
  <!-- 基础面包屑 (外阴影) -->
  <NeuBreadcrumb :items="items" />
  
  <!-- 内凹槽面包屑 -->
  <NeuBreadcrumb :items="items" variant="pressed" />
  
  <!-- 自定义分隔符 -->
  <NeuBreadcrumb :items="items" separator="/" />
</template>
