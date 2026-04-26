<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue?: string // HEX string e.g. "#FF0000"
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '#4f46e5',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

// Parse initial color
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 79, g: 70, b: 229 }
}

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)
}

const r = ref(79)
const g = ref(70)
const b = ref(229)

watch(() => props.modelValue, (newVal) => {
  const rgb = hexToRgb(newVal)
  r.value = rgb.r
  g.value = rgb.g
  b.value = rgb.b
}, { immediate: true })

const updateColor = () => {
  const hex = rgbToHex(Number(r.value), Number(g.value), Number(b.value))
  emit('update:modelValue', hex)
  emit('change', hex)
}

const presetColors = [
  '#ef4444', '#f97316', '#f59e0b', '#10b981', 
  '#3b82f6', '#4f46e5', '#8b5cf6', '#ec4899',
  '#1f2937', '#9ca3af'
]

const selectPreset = (color: string) => {
  const rgb = hexToRgb(color)
  r.value = rgb.r
  g.value = rgb.g
  b.value = rgb.b
  updateColor()
}

const togglePicker = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div class="relative inline-block" ref="containerRef">
    <!-- Trigger Button -->
    <div 
      @click="togglePicker"
      class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
      :class="[
        disabled ? 'opacity-50 cursor-not-allowed shadow-neu-flat' : 'cursor-pointer hover:shadow-neu-flat-sm active:shadow-neu-pressed',
        !disabled && !isOpen ? 'shadow-neu-flat' : '',
        isOpen && !disabled ? 'shadow-neu-pressed' : ''
      ]"
    >
      <div 
        class="w-6 h-6 rounded-full shadow-neu-pressed-sm border-2 border-[var(--bg-color)]"
        :style="{ backgroundColor: modelValue }"
      ></div>
    </div>

    <!-- Dropdown Panel -->
    <Transition name="neu-fade-slide">
      <div 
        v-if="isOpen"
        class="absolute z-[100] mt-4 p-6 w-72 bg-[var(--bg-color)] shadow-neu-flat-lg rounded-3xl"
        style="top: 100%; left: 0;"
      >
        <!-- Preview Box -->
        <div 
          class="w-full h-24 rounded-2xl mb-6 shadow-neu-pressed flex items-center justify-center border-4 border-[var(--bg-color)] transition-colors duration-200"
          :style="{ backgroundColor: modelValue }"
        >
          <span class="bg-[var(--bg-color)]/80 px-3 py-1 rounded-xl text-neu-text font-mono text-sm shadow-neu-flat-sm backdrop-blur-sm">
            {{ modelValue.toUpperCase() }}
          </span>
        </div>

        <!-- Presets -->
        <div class="grid grid-cols-5 gap-3 mb-6">
          <div 
            v-for="color in presetColors" 
            :key="color"
            @click="selectPreset(color)"
            class="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-neu-flat border-2 border-[var(--bg-color)]"
            :style="{ backgroundColor: color }"
          ></div>
        </div>

        <!-- Custom RGB Sliders -->
        <div class="space-y-4">
          <!-- R Slider -->
          <div class="flex items-center gap-3">
            <span class="text-sm font-bold text-red-500 w-4">R</span>
            <input type="range" min="0" max="255" v-model="r" @input="updateColor" class="neu-range flex-1">
          </div>
          <!-- G Slider -->
          <div class="flex items-center gap-3">
            <span class="text-sm font-bold text-green-500 w-4">G</span>
            <input type="range" min="0" max="255" v-model="g" @input="updateColor" class="neu-range flex-1">
          </div>
          <!-- B Slider -->
          <div class="flex items-center gap-3">
            <span class="text-sm font-bold text-blue-500 w-4">B</span>
            <input type="range" min="0" max="255" v-model="b" @input="updateColor" class="neu-range flex-1">
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.neu-fade-slide-enter-active,
.neu-fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.neu-fade-slide-enter-from,
.neu-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* Custom Range Input Styling */
.neu-range {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: var(--bg-color);
  border-radius: 4px;
  box-shadow: inset 2px 2px 4px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light);
  outline: none;
}

.neu-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg-color);
  box-shadow: 2px 2px 4px var(--shadow-dark), -2px -2px 4px var(--shadow-light);
  cursor: pointer;
  transition: all 0.2s ease;
}

.neu-range::-webkit-slider-thumb:active {
  box-shadow: inset 2px 2px 4px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light);
  transform: scale(0.9);
}

.neu-range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg-color);
  box-shadow: 2px 2px 4px var(--shadow-dark), -2px -2px 4px var(--shadow-light);
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.neu-range::-moz-range-thumb:active {
  box-shadow: inset 2px 2px 4px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light);
  transform: scale(0.9);
}
</style>
