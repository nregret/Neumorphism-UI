<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  type?: 'flat' | 'pressed' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'full' | 'default'
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'flat',
  size: 'md',
  rounded: 'full',
  dot: false,
})

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
}

const roundedClasses = {
  full: 'rounded-full',
  default: 'rounded-md',
}

const typeClasses = {
  flat: 'shadow-neu-flat bg-[var(--bg-color)]',
  pressed: 'shadow-neu-pressed bg-[var(--bg-color)]',
  ghost: 'bg-transparent border-[1.5px] border-current shadow-sm',
}

const variantColorClasses = {
  default: 'text-neu-text',
  primary: 'text-neu-accent',
  success: 'text-emerald-500',
  warning: 'text-amber-500',
  error: 'text-rose-500',
}

const dotColorClasses = {
  default: 'bg-neu-text',
  primary: 'bg-neu-accent',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
}

const computedClasses = computed(() => {
  return [
    'inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors',
    sizeClasses[props.size],
    roundedClasses[props.rounded],
    typeClasses[props.type],
    variantColorClasses[props.variant],
  ].join(' ')
})
</script>

<template>
  <span :class="computedClasses">
    <span 
      v-if="dot" 
      class="rounded-full mr-1.5"
      :class="[dotSizeClasses[size], dotColorClasses[variant]]"
    ></span>
    <slot />
  </span>
</template>
