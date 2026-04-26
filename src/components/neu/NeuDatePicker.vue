<script setup lang="ts">
import { computed, ref } from 'vue'
import { Calendar } from 'lucide-vue-next'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
  min?: string
  max?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择日期',
  disabled: false,
  error: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const computedClasses = computed(() => {
  return [
    'relative w-full px-6 py-4 text-base font-medium rounded-2xl transition-all duration-300 flex items-center justify-between select-none',
    'bg-[var(--bg-color)]',
    props.disabled ? 'opacity-50 cursor-not-allowed shadow-neu-flat' : 'cursor-pointer shadow-neu-flat hover:shadow-neu-flat-sm active:shadow-neu-pressed',
    props.error ? 'text-red-500 shadow-[inset_4px_4px_8px_rgba(239,68,68,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]' : '',
  ].join(' ')
})

const textClasses = computed(() => {
  if (!props.modelValue) return 'text-neu-text/50'
  return 'text-neu-text truncate pr-4'
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('change', target.value)
}

const triggerClick = () => {
  if (props.disabled) return
  if (inputRef.value) {
    try {
      inputRef.value.showPicker()
    } catch (e) {
      inputRef.value.focus()
    }
  }
}
</script>

<template>
  <div class="relative w-full">
    <!-- Visible Trigger -->
    <div 
      :class="computedClasses"
      @click="triggerClick"
      role="button"
      :aria-disabled="disabled"
    >
      <span :class="textClasses">
        {{ modelValue || placeholder }}
      </span>
      
      <!-- Calendar Icon -->
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 shadow-neu-flat"
      >
        <Calendar 
          class="w-4 h-4 text-neu-text/60" 
          :class="[disabled ? 'text-neu-text/30' : '']"
        />
      </div>
    </div>

    <!-- Hidden Input -->
    <input
      ref="inputRef"
      type="date"
      :value="modelValue"
      :min="min"
      :max="max"
      :disabled="disabled"
      class="absolute inset-0 opacity-0 pointer-events-none"
      @input="handleInput"
    />
  </div>
</template>

<style scoped>
/* Hide the native date picker icon if it bleeds through */
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
