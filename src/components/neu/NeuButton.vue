<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'circle'
  active?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  shape: 'rounded',
  active: false,
  disabled: false,
  type: 'button'
})

const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out focus:outline-none select-none bg-[var(--bg-color)]'

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const iconSizeClasses = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
}

const shapeClasses = {
  rounded: 'rounded-2xl',
  circle: 'rounded-full',
}

const neuClasses = computed(() => {
  if (props.disabled) {
    return 'opacity-50 cursor-not-allowed shadow-neu-flat'
  }
  if (props.active) {
    return 'shadow-neu-pressed text-neu-accent scale-[0.98]'
  }
  return 'shadow-neu-flat hover:shadow-neu-flat-sm active:shadow-neu-pressed active:scale-[0.98]'
})

const variantClasses = computed(() => {
  if (props.variant === 'primary') {
    return 'text-neu-accent font-bold'
  }
  return 'text-neu-text'
})

const computedClasses = computed(() => {
  const isIcon = props.variant === 'icon'
  return [
    baseClasses,
    isIcon ? iconSizeClasses[props.size] : sizeClasses[props.size],
    shapeClasses[props.shape],
    neuClasses.value,
    variantClasses.value,
  ].join(' ')
})
</script>

<template>
  <button :type="type" :class="computedClasses" :disabled="disabled">
    <slot />
  </button>
</template>
