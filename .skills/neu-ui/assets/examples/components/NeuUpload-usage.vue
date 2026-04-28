<script setup lang="ts">
import { ref } from 'vue'
import NeuUpload from '../../library/components/neu/NeuUpload.vue'

const files = ref([])

const handleUploadChange = (newFiles) => {
  files.value = newFiles
}
</script>

<template>
  <NeuUpload 
    accept="image/*" 
    multiple
    @change="handleUploadChange"
  />
</template>
