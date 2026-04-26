<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Palette, Copy, Check, X } from 'lucide-vue-next'
import NeuColorPicker from './neu/NeuColorPicker.vue'
import NeuButton from './neu/NeuButton.vue'
import NeuDrawer from './neu/NeuDrawer.vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const baseColor = ref('#e0e5ec')
const accentColor = ref('#4f46e5')
const textColor = ref('#333333')

// Preset themes
const presets = [
  { name: '经典白 (Classic Light)', bg: '#e0e5ec', accent: '#4f46e5', text: '#333333' },
  { name: '深邃黑 (Dark Mode)', bg: '#292d32', accent: '#6366f1', text: '#e0e5ec' },
  { name: '薄荷绿 (Mint Green)', bg: '#dcedc8', accent: '#2e7d32', text: '#33691e' },
  { name: '莫兰迪紫 (Morandi Purple)', bg: '#e1bee7', accent: '#6a1b9a', text: '#4a148c' },
  { name: '暗橙灰 (Dark Orange)', bg: '#303030', accent: '#ff9800', text: '#f5f5f5' }
]

const applyPreset = (preset: typeof presets[0]) => {
  baseColor.value = preset.bg
  accentColor.value = preset.accent
  textColor.value = preset.text
}

// Color Utility: Blend with White or Black
const blendColor = (hex: string, amount: number, isLighten: boolean) => {
  let r = parseInt(hex.substring(1, 3), 16)
  let g = parseInt(hex.substring(3, 5), 16)
  let b = parseInt(hex.substring(5, 7), 16)

  if (isLighten) {
    r = Math.round(r + (255 - r) * amount)
    g = Math.round(g + (255 - g) * amount)
    b = Math.round(b + (255 - b) * amount)
  } else {
    r = Math.round(r * (1 - amount))
    g = Math.round(g * (1 - amount))
    b = Math.round(b * (1 - amount))
  }

  const toHex = (c: number) => {
    const h = Math.max(0, Math.min(255, c)).toString(16)
    return h.length === 1 ? '0' + h : h
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const shadowLight = computed(() => {
  // Darker themes need less lightening to avoid looking blown out
  const isDark = parseInt(baseColor.value.substring(1, 3), 16) < 100
  return blendColor(baseColor.value, isDark ? 0.15 : 0.4, true)
})

const shadowDark = computed(() => {
  // Lighter themes need more darkening to show the shadow
  const isDark = parseInt(baseColor.value.substring(1, 3), 16) < 100
  return blendColor(baseColor.value, isDark ? 0.3 : 0.15, false)
})

const updateCSSVariables = () => {
  const root = document.documentElement
  root.style.setProperty('--bg-color', baseColor.value)
  root.style.setProperty('--accent', accentColor.value)
  root.style.setProperty('--text-color', textColor.value)
  root.style.setProperty('--shadow-light', shadowLight.value)
  root.style.setProperty('--shadow-dark', shadowDark.value)
}

// Watchers to live-update the page
watch([baseColor, accentColor, textColor], () => {
  updateCSSVariables()
}, { immediate: true })

const generatedCSS = computed(() => {
  return `:root {
  --bg-color: ${baseColor.value};
  --text-color: ${textColor.value};
  --shadow-light: ${shadowLight.value};
  --shadow-dark: ${shadowDark.value};
  --accent: ${accentColor.value};
}`
})

const copied = ref(false)
const copyCSS = async () => {
  try {
    await navigator.clipboard.writeText(generatedCSS.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Copy failed', err)
  }
}
</script>

<template>
  <NeuDrawer v-model="isOpen" placement="right" size="400px" title="主题配置 (Theme)">
    <div class="space-y-8">
      <!-- Intro -->
      <div>
        <p class="text-sm text-neu-text/70">
          调整下方的颜色，系统会自动计算出完美适配新拟态视觉的深/浅阴影颜色，并实时应用到整个页面。
        </p>
      </div>

      <!-- Presets -->
      <div class="space-y-3">
        <h3 class="text-sm font-bold text-neu-text flex items-center gap-2">
          <Palette class="w-4 h-4" />
          预设主题
        </h3>
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="preset in presets" 
            :key="preset.name"
            @click="applyPreset(preset)"
            class="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-neu-flat border-2 border-[var(--bg-color)]"
            :style="{ backgroundColor: preset.bg }"
            :title="preset.name"
          ></div>
        </div>
      </div>

      <!-- Color Pickers -->
      <div class="space-y-6">
        <h3 class="text-sm font-bold text-neu-text border-b border-[var(--shadow-dark)]/10 pb-2">自定义颜色</h3>
        
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neu-text/80">基础背景色 (Background)</span>
          <NeuColorPicker v-model="baseColor" />
        </div>
        
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neu-text/80">强调色 (Accent)</span>
          <NeuColorPicker v-model="accentColor" />
        </div>
        
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neu-text/80">文本色 (Text)</span>
          <NeuColorPicker v-model="textColor" />
        </div>
      </div>

      <!-- Generated CSS -->
      <div class="space-y-3 pt-6 border-t border-[var(--shadow-dark)]/10">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-neu-text">导出的 CSS 变量</h3>
          <NeuButton size="sm" variant="icon" @click="copyCSS" title="复制 CSS">
            <Check v-if="copied" class="w-4 h-4 text-green-500" />
            <Copy v-else class="w-4 h-4 text-neu-text/70" />
          </NeuButton>
        </div>
        
        <div class="p-4 rounded-2xl bg-[#1e1e1e] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          <pre class="text-xs text-green-400 font-mono m-0 overflow-x-auto whitespace-pre-wrap leading-relaxed">{{ generatedCSS }}</pre>
        </div>
        <p class="text-xs text-neu-text/50">将上方代码复制并粘贴到你项目的 <code>:root</code> 或对应容器下即可生效。</p>
      </div>
    </div>
  </NeuDrawer>
</template>
