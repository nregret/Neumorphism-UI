<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'rounded' | 'square'
  bordered?: boolean
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  shape: 'circle',
  bordered: true,
  status: 'none',
})

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-lg',
}

const shapeClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
  square: 'rounded-md',
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  none: 'hidden',
}

const statusPosition = computed(() => {
  if (props.shape === 'circle') {
    return 'bottom-0 right-0'
  }
  return '-bottom-1 -right-1'
})

const statusSizeClasses = {
  sm: 'w-2.5 h-2.5 border-2',
  md: 'w-3.5 h-3.5 border-2',
  lg: 'w-4 h-4 border-[3px]',
  xl: 'w-5 h-5 border-[3px]',
}

const containerClasses = computed(() => {
  return [
    'relative inline-flex items-center justify-center bg-[var(--bg-color)] flex-shrink-0',
    sizeClasses[props.size],
    shapeClasses[props.shape],
    props.bordered ? 'shadow-neu-flat' : 'shadow-none',
  ].join(' ')
})

const imageClasses = computed(() => {
  return [
    'w-full h-full object-cover',
    shapeClasses[props.shape],
    props.bordered ? 'p-1' : '',
  ].join(' ')
})

const initials = computed(() => {
  if (!props.alt) return '?'
  const words = props.alt.split(' ')
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
})
</script>

<template>
  <div :class="containerClasses">
    <img 
      v-if="src" 
      :src="src" 
      :alt="alt" 
      :class="imageClasses" 
    />
    <span v-else class="font-bold text-neu-text/60">{{ initials }}</span>
    
    <span 
      v-if="status !== 'none'"
      class="absolute rounded-full border-[var(--bg-color)]"
      :class="[
        statusColors[status],
        statusPosition,
        statusSizeClasses[size]
      ]"
    ></span>
  </div>
</template>
