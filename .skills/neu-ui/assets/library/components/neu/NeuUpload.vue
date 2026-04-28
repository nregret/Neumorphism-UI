<script setup lang="ts">
import { ref, computed } from 'vue'
import { UploadCloud, X, File as FileIcon } from 'lucide-vue-next'

interface Props {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  maxSize?: number // in bytes
}

const props = withDefaults(defineProps<Props>(), {
  accept: '*',
  multiple: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'change', files: File[]): void
  (e: 'error', error: string): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const selectedFiles = ref<File[]>([])

const triggerClick = () => {
  if (props.disabled) return
  fileInputRef.value?.click()
}

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  if (props.disabled) return
  isDragging.value = true
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  if (props.disabled) return
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
}

const processFiles = (files: FileList | null) => {
  if (!files || files.length === 0) return

  let newFiles = Array.from(files)

  if (!props.multiple) {
    newFiles = [newFiles[0]]
  }

  // Filter by size
  if (props.maxSize) {
    const validFiles = newFiles.filter(f => f.size <= props.maxSize!)
    if (validFiles.length < newFiles.length) {
      emit('error', `Some files exceed the maximum size of ${props.maxSize} bytes`)
    }
    newFiles = validFiles
  }

  if (props.multiple) {
    selectedFiles.value = [...selectedFiles.value, ...newFiles]
  } else {
    selectedFiles.value = newFiles
  }

  emit('change', selectedFiles.value)
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  if (props.disabled) return
  
  processFiles(e.dataTransfer?.files || null)
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  processFiles(target.files)
  // Reset input so the same file can be selected again
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const removeFile = (index: number) => {
  if (props.disabled) return
  selectedFiles.value.splice(index, 1)
  emit('change', selectedFiles.value)
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const computedClasses = computed(() => {
  return [
    'w-full p-8 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-2 border-dashed',
    props.disabled ? 'opacity-50 cursor-not-allowed border-neu-text/20' : 'cursor-pointer',
    isDragging.value ? 'shadow-neu-pressed border-neu-accent bg-neu-accent/5' : 'shadow-neu-flat border-transparent hover:shadow-neu-flat-sm active:shadow-neu-pressed'
  ].join(' ')
})
</script>

<template>
  <div class="neu-upload w-full">
    <!-- Dropzone -->
    <div
      :class="computedClasses"
      @click="triggerClick"
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <div 
        class="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300"
        :class="isDragging ? 'shadow-neu-pressed' : 'shadow-neu-flat'"
      >
        <UploadCloud 
          class="w-8 h-8"
          :class="isDragging ? 'text-neu-accent' : 'text-neu-text/60'"
        />
      </div>
      
      <p class="text-neu-text font-medium text-center mb-2">
        <span class="text-neu-accent">点击上传</span> 或将文件拖拽到此处
      </p>
      
      <p class="text-neu-text/50 text-sm text-center">
        支持的格式: {{ accept === '*' ? '所有格式' : accept }}
      </p>

      <input
        ref="fileInputRef"
        type="file"
        class="hidden"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleFileChange"
      />
    </div>

    <!-- File List -->
    <TransitionGroup 
      name="list" 
      tag="ul" 
      class="mt-6 flex flex-col gap-3"
      v-if="selectedFiles.length > 0"
    >
      <li 
        v-for="(file, index) in selectedFiles" 
        :key="file.name + index"
        class="flex items-center justify-between p-4 rounded-xl shadow-neu-flat bg-[var(--bg-color)] transition-all duration-300"
      >
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-neu-pressed shrink-0">
            <FileIcon class="w-5 h-5 text-neu-accent" />
          </div>
          <div class="flex flex-col overflow-hidden">
            <span class="text-neu-text font-medium truncate">{{ file.name }}</span>
            <span class="text-neu-text/50 text-xs">{{ formatFileSize(file.size) }}</span>
          </div>
        </div>
        
        <button
          v-if="!disabled"
          @click.stop="removeFile(index)"
          class="w-8 h-8 rounded-full flex items-center justify-center shadow-neu-flat hover:shadow-neu-pressed hover:text-red-500 transition-all duration-300 shrink-0 text-neu-text/60 ml-3"
          title="删除文件"
        >
          <X class="w-4 h-4" />
        </button>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
