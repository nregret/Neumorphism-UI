<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

interface Props {
  modelValue: any[] | boolean
  value?: any
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[] | boolean): void
}>()

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.value !== undefined && props.modelValue.includes(props.value)
  }
  return !!props.modelValue
})

const toggle = () => {
  if (props.disabled) return

  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue]
    const index = newValue.indexOf(props.value)
    if (index > -1) {
      newValue.splice(index, 1)
    } else {
      newValue.push(props.value)
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', !props.modelValue)
  }
}

const containerClasses = computed(() => {
  return [
    'flex items-center cursor-pointer select-none space-x-3',
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
  ].join(' ')
})

const checkboxClasses = computed(() => {
  return [
    'flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-300 ease-in-out',
    isChecked.value ? 'shadow-neu-pressed bg-[var(--bg-color)]' : 'shadow-neu-flat hover:shadow-neu-flat-sm bg-[var(--bg-color)]',
  ].join(' ')
})

const iconClasses = computed(() => {
  return [
    'w-4 h-4 text-neu-accent transition-all duration-300 ease-in-out',
    isChecked.value ? 'opacity-100 scale-100' : 'opacity-0 scale-50',
  ].join(' ')
})
</script>

<template>
  <label :class="containerClasses" @click.prevent="toggle">
    <div :class="checkboxClasses">
      <Check :class="iconClasses" stroke-width="3" />
    </div>
    <span v-if="label" class="text-neu-text font-medium">{{ label }}</span>
  </label>
</template>
