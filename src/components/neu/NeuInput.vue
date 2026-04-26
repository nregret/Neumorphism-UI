<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  type?: string
  disabled?: boolean
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  error: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const computedClasses = computed(() => {
  return [
    'w-full px-6 py-4 text-base font-medium rounded-2xl outline-none transition-all duration-300',
    'bg-[var(--bg-color)] text-neu-text placeholder:text-neu-text/50',
    'shadow-neu-pressed focus:shadow-neu-pressed-sm',
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
    props.error ? 'text-red-500 shadow-red-500/20' : '',
  ].join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="relative w-full">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="computedClasses"
      @input="handleInput"
    />
  </div>
</template>
