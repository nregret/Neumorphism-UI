<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css' // Or any other prism theme
import NeuButton from './neu/NeuButton.vue'
import { Copy, Check } from 'lucide-vue-next'

const props = defineProps<{
  code: string
  language?: string
}>()

const copied = ref(false)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy', err)
  }
}

onMounted(() => {
  Prism.highlightAll()
})
</script>

<template>
  <div class="relative group rounded-2xl overflow-hidden shadow-neu-pressed p-4 bg-[#2d2d2d] my-6">
    <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        @click="copyToClipboard"
        class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        title="Copy code"
      >
        <Check v-if="copied" class="w-4 h-4 text-green-400" />
        <Copy v-else class="w-4 h-4" />
      </button>
    </div>
    <pre :class="`language-${language || 'html'} text-sm m-0 bg-transparent p-0`"><code :class="`language-${language || 'html'}`">{{ code }}</code></pre>
  </div>
</template>
