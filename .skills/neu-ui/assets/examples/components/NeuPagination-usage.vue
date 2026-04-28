<script setup lang="ts">
import { ref } from 'vue'
import NeuPagination from '../../library/components/neu/NeuPagination.vue'

const currentPage = ref(1)
</script>

<template>
  <!-- 基础分页 -->
  <NeuPagination 
    v-model="currentPage" 
    :total="100" 
    :pageSize="10" 
  />
  
  <!-- 禁用状态 -->
  <NeuPagination 
    v-model="currentPage" 
    :total="100" 
    disabled 
  />
</template>
