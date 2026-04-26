<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const sliderRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const progressPercent = computed(() => {
  const range = props.max - props.min
  const value = Math.max(props.min, Math.min(props.max, props.modelValue))
  return ((value - props.min) / range) * 100
})

const calculateValue = (clientX: number) => {
  if (!sliderRef.value) return props.modelValue
  
  const rect = sliderRef.value.getBoundingClientRect()
  const rawPercentage = (clientX - rect.left) / rect.width
  const percentage = Math.max(0, Math.min(1, rawPercentage))
  
  const range = props.max - props.min
  let rawValue = percentage * range + props.min
  
  // Snap to step
  if (props.step > 0) {
    const stepped = Math.round(rawValue / props.step) * props.step
    rawValue = stepped
  }
  
  return Math.max(props.min, Math.min(props.max, rawValue))
}

const handleMouseDown = (e: MouseEvent | TouchEvent) => {
  if (props.disabled) return
  isDragging.value = true
  
  const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
  emit('update:modelValue', calculateValue(clientX))
}

const handleMouseMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || props.disabled) return
  
  const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
  emit('update:modelValue', calculateValue(clientX))
}

const handleMouseUp = () => {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('touchmove', handleMouseMove, { passive: false })
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('touchend', handleMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('touchmove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('touchend', handleMouseUp)
})
</script>

<template>
  <div 
    class="w-full relative py-4 select-none touch-none"
    :class="disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
    ref="sliderRef"
    @mousedown.prevent="handleMouseDown"
    @touchstart.prevent="handleMouseDown"
  >
    <!-- Track (凹陷阴影) -->
    <div class="h-3 rounded-full bg-[var(--bg-color)] shadow-neu-pressed relative overflow-hidden">
      <!-- Fill -->
      <div 
        class="absolute left-0 top-0 bottom-0 bg-neu-accent transition-all"
        :class="isDragging ? 'duration-0' : 'duration-150 ease-out'"
        :style="{ width: `${progressPercent}%` }"
      ></div>
    </div>
    
    <!-- Thumb (凸起阴影) -->
    <div 
      class="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--bg-color)] flex items-center justify-center transition-all z-10"
      :class="[
        isDragging ? 'shadow-neu-flat-sm scale-95 duration-0' : 'shadow-neu-flat hover:shadow-neu-flat-sm duration-150 ease-out',
      ]"
      :style="{ left: `calc(${progressPercent}% - 12px)` }"
    >
      <!-- Center dot -->
      <div class="w-2 h-2 rounded-full bg-neu-accent opacity-50"></div>
    </div>
  </div>
</template>
