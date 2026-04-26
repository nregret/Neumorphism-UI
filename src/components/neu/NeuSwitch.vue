<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}

const trackClasses = computed(() => {
  return [
    'relative w-16 h-8 rounded-full transition-all duration-300 ease-in-out cursor-pointer flex items-center p-1',
    props.modelValue ? 'shadow-neu-pressed bg-[var(--bg-color)]' : 'shadow-neu-pressed bg-[var(--bg-color)]',
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
  ].join(' ')
})

const thumbClasses = computed(() => {
  return [
    'w-6 h-6 rounded-full transition-all duration-300 ease-in-out shadow-neu-flat transform',
    props.modelValue ? 'translate-x-8 bg-neu-accent' : 'translate-x-0 bg-[var(--bg-color)]',
  ].join(' ')
})
</script>

<template>
  <div :class="trackClasses" @click="toggle" role="switch" :aria-checked="modelValue">
    <div :class="thumbClasses"></div>
  </div>
</template>
