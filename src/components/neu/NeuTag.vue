<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  type?: 'flat' | 'pressed'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'flat',
  size: 'md',
  closable: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
}>()

const handleClose = (e: MouseEvent) => {
  if (props.disabled) return
  emit('close', e)
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
}

const iconSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

const typeClasses = {
  flat: 'shadow-neu-flat bg-[var(--bg-color)]',
  pressed: 'shadow-neu-pressed bg-[var(--bg-color)]',
}

const variantColorClasses = {
  default: 'text-neu-text',
  primary: 'text-neu-accent',
  success: 'text-emerald-500',
  warning: 'text-amber-500',
  error: 'text-rose-500',
}

const computedClasses = computed(() => {
  return [
    'inline-flex items-center gap-1.5 justify-center font-medium whitespace-nowrap transition-all duration-300 rounded-lg select-none',
    sizeClasses[props.size],
    typeClasses[props.type],
    variantColorClasses[props.variant],
    props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <span :class="computedClasses">
    <slot />
    <button
      v-if="closable"
      type="button"
      class="inline-flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-neu-accent/50 -mr-1"
      :class="[iconSizeClasses[size], { 'cursor-not-allowed': disabled }]"
      @click.stop="handleClose"
      :disabled="disabled"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full p-0.5">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  </span>
</template>
