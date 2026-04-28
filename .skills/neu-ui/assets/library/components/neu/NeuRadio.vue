<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: any
  value: any
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const isChecked = computed(() => props.modelValue === props.value)

const select = () => {
  if (props.disabled) return
  emit('update:modelValue', props.value)
}

const containerClasses = computed(() => {
  return [
    'flex items-center cursor-pointer select-none space-x-3',
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
  ].join(' ')
})

const radioClasses = computed(() => {
  return [
    'flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ease-in-out',
    isChecked.value ? 'shadow-neu-pressed' : 'shadow-neu-flat hover:shadow-neu-flat-sm',
  ].join(' ')
})

const indicatorClasses = computed(() => {
  return [
    'w-3 h-3 rounded-full transition-all duration-300 ease-in-out',
    isChecked.value ? 'bg-neu-accent scale-100 shadow-neu-flat-sm' : 'bg-transparent scale-0',
  ].join(' ')
})
</script>

<template>
  <label :class="containerClasses" @click.prevent="select">
    <div :class="radioClasses">
      <div :class="indicatorClasses"></div>
    </div>
    <span v-if="label" class="text-neu-text font-medium">{{ label }}</span>
  </label>
</template>
