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
  <!-- Outer Neumorphic Bezel -->
  <div class="rounded-[2rem] shadow-neu-pressed p-3 bg-[var(--bg-color)] my-8">
    <!-- Inner Dark Screen -->
    <div class="relative group rounded-2xl overflow-hidden bg-[#1e1e1e] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] border border-[#333]">
      
      <!-- Window Header -->
      <div class="flex items-center justify-between px-4 py-3 bg-[#2d2d2d]/80 border-b border-[#333]">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500/80 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500/80 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/80 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]"></div>
        </div>
        <div class="text-[#888] text-xs font-mono lowercase">{{ language || 'html' }}</div>
      </div>

      <!-- Copy Button -->
      <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          @click="copyToClipboard"
          class="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm active:scale-95"
          title="Copy code"
        >
          <Check v-if="copied" class="w-4 h-4 text-green-400" />
          <Copy v-else class="w-4 h-4 text-[#888] group-hover:text-white" />
        </button>
      </div>
      
      <!-- Code Content -->
      <div class="p-4 overflow-x-auto neu-scrollbar-dark">
        <pre :class="`language-${language || 'html'} text-sm m-0 bg-transparent p-0`"><code :class="`language-${language || 'html'}`">{{ code }}</code></pre>
      </div>
    </div>
  </div>
</template>

