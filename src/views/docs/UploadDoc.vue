<script setup lang="ts">
import { ref } from 'vue'
import NeuUpload from '../../components/neu/NeuUpload.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const files = ref<File[]>([])

const handleUploadChange = (newFiles: File[]) => {
  files.value = newFiles
  console.log('Files changed:', newFiles)
}

const handleError = (error: string) => {
  console.error('Upload error:', error)
}

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuUpload from './components/neu/NeuUpload.vue'

const files = ref([])

const handleUploadChange = (newFiles) => {
  files.value = newFiles
}
<\/script>

<template>
  <NeuUpload 
    accept="image/*" 
    multiple
    @change="handleUploadChange"
  />
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Upload 上传</h1>
      <p class="text-neu-text/80 text-lg">
        文件选择框和拖拽上传组件。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Basic)</h2>
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-xl">
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">多文件拖拽上传</label>
          <NeuUpload 
            accept="*" 
            multiple
            @change="handleUploadChange"
            @error="handleError"
          />
        </div>
        
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">禁用状态</label>
          <NeuUpload disabled />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
