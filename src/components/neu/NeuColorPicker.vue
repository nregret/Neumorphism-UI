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
const paletteRef = ref<HTMLDivElement | null>(null)
const hueRef = ref<HTMLDivElement | null>(null)
const panelStyle = ref({ top: '100%', left: '0', right: 'auto' })

// --- Color Conversion Utilities ---
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

const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, v }
}

const hsvToRgb = (h: number, s: number, v: number) => {
  let i = Math.floor((h / 360) * 6);
  let f = (h / 360) * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

// --- State ---
const hsv = ref({ h: 245, s: 0.7, v: 0.9 })
const isDraggingPalette = ref(false)
const isDraggingHue = ref(false)

// Internal sync lock to prevent recursive updates
let isInternalUpdate = false

watch(() => props.modelValue, (newVal) => {
  if (isInternalUpdate) return
  const rgb = hexToRgb(newVal)
  hsv.value = rgbToHsv(rgb.r, rgb.g, rgb.b)
}, { immediate: true })

const updateFromHsv = () => {
  const rgb = hsvToRgb(hsv.value.h, hsv.value.s, hsv.value.v)
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
  isInternalUpdate = true
  emit('update:modelValue', hex)
  emit('change', hex)
  setTimeout(() => isInternalUpdate = false, 0)
}

// --- Drag Logic ---
const handlePaletteDrag = (e: MouseEvent | TouchEvent) => {
  if (!paletteRef.value || (!isDraggingPalette.value && e.type !== 'mousedown' && e.type !== 'touchstart')) return
  
  isDraggingPalette.value = true
  const rect = paletteRef.value.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY
  
  let x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  let y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
  
  hsv.value.s = x
  hsv.value.v = 1 - y // V is 1 at top, 0 at bottom
  updateFromHsv()
}

const handleHueDrag = (e: MouseEvent | TouchEvent) => {
  if (!hueRef.value || (!isDraggingHue.value && e.type !== 'mousedown' && e.type !== 'touchstart')) return
  
  isDraggingHue.value = true
  const rect = hueRef.value.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
  
  let x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  hsv.value.h = x * 360
  updateFromHsv()
}

const stopDrag = () => {
  isDraggingPalette.value = false
  isDraggingHue.value = false
}

// --- Component Logic ---
const presetColors = [
  '#ef4444', '#f97316', '#f59e0b', '#10b981', 
  '#3b82f6', '#4f46e5', '#8b5cf6', '#ec4899',
  '#1f2937', '#9ca3af'
]

const selectPreset = (color: string) => {
  const rgb = hexToRgb(color)
  hsv.value = rgbToHsv(rgb.r, rgb.g, rgb.b)
  updateFromHsv()
}

const togglePicker = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  
  if (isOpen.value && containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    // Panel width is 300px. Check if it overflows the right side of the screen
    if (rect.left + 300 + 20 > window.innerWidth) {
      panelStyle.value = { top: '100%', left: 'auto', right: '0' }
    } else {
      panelStyle.value = { top: '100%', left: '0', right: 'auto' }
    }
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('mousemove', handlePaletteDrag)
  window.addEventListener('mousemove', handleHueDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', handlePaletteDrag, { passive: false })
  window.addEventListener('touchmove', handleHueDrag, { passive: false })
  window.addEventListener('touchend', stopDrag)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('mousemove', handlePaletteDrag)
  window.removeEventListener('mousemove', handleHueDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', handlePaletteDrag)
  window.removeEventListener('touchmove', handleHueDrag)
  window.removeEventListener('touchend', stopDrag)
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
        class="absolute z-[100] mt-4 p-5 w-[300px] bg-[var(--bg-color)] shadow-neu-flat-lg rounded-3xl cursor-default"
        :style="panelStyle"
      >
        <!-- 2D Color Palette (Saturation & Value) -->
        <div 
          ref="paletteRef"
          class="w-full h-40 rounded-2xl mb-4 relative overflow-hidden shadow-neu-pressed cursor-crosshair border-4 border-[var(--bg-color)] select-none touch-none"
          :style="{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }"
          @mousedown.prevent="handlePaletteDrag"
          @touchstart.prevent="handlePaletteDrag"
        >
          <!-- White gradient (Saturation) -->
          <div class="absolute inset-0 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <!-- Black gradient (Value) -->
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
          
          <!-- Palette Thumb -->
          <div 
            class="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white shadow-md pointer-events-none transition-transform duration-75"
            :class="isDraggingPalette ? 'scale-125' : ''"
            :style="{ 
              left: `${hsv.s * 100}%`, 
              top: `${(1 - hsv.v) * 100}%`,
              backgroundColor: modelValue
            }"
          ></div>
        </div>

        <!-- Hue Slider -->
        <div 
          ref="hueRef"
          class="w-full h-5 rounded-full mb-5 shadow-neu-pressed relative cursor-pointer border-2 border-[var(--bg-color)] select-none touch-none"
          style="background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);"
          @mousedown.prevent="handleHueDrag"
          @touchstart.prevent="handleHueDrag"
        >
          <!-- Hue Thumb -->
          <div 
            class="absolute top-1/2 -translate-y-1/2 w-6 h-6 -ml-3 bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] pointer-events-none transition-transform duration-75 border border-gray-200"
            :class="isDraggingHue ? 'scale-110' : ''"
            :style="{ 
              left: `${(hsv.h / 360) * 100}%`
            }"
          ></div>
        </div>

        <!-- Preview & Hex Input -->
        <div class="flex items-center gap-3 mb-5">
          <div 
            class="w-10 h-10 rounded-full shadow-neu-pressed-sm border-2 border-[var(--bg-color)] shrink-0"
            :style="{ backgroundColor: modelValue }"
          ></div>
          <div class="flex-1 px-4 py-2 rounded-xl bg-[var(--bg-color)] shadow-neu-pressed text-neu-text font-mono text-sm flex items-center justify-center select-all">
            {{ modelValue.toUpperCase() }}
          </div>
        </div>

        <!-- Presets -->
        <div class="grid grid-cols-5 gap-3">
          <div 
            v-for="color in presetColors" 
            :key="color"
            @click="selectPreset(color)"
            class="w-8 h-8 mx-auto rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-neu-flat border-2 border-[var(--bg-color)]"
            :style="{ backgroundColor: color }"
          ></div>
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
</style>
