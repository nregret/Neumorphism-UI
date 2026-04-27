<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  pressed?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  pressed: false,
  padding: 'md',
  rounded: 'md',
})

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const roundedClasses = {
  sm: 'rounded-neu-sm',
  md: 'rounded-neu-md',
  lg: 'rounded-neu-lg',
  full: 'rounded-full',
}

const computedClasses = computed(() => {
  return [
    'transition-all duration-300 ease-in-out bg-[var(--bg-color)]',
    props.pressed ? 'shadow-neu-pressed' : 'shadow-neu-flat',
    paddingClasses[props.padding],
    roundedClasses[props.rounded],
  ].join(' ')
})
</script>

<template>
  <div :class="computedClasses">
    <slot />
  </div>
</template>
