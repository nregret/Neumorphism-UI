<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  max?: number
  height?: 'sm' | 'md' | 'lg'
  color?: 'accent' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  striped?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  height: 'md',
  color: 'accent',
  showLabel: false,
  striped: false,
  animated: false,
})

const progressPercent = computed(() => {
  const value = Math.max(0, Math.min(props.max, props.modelValue))
  return (value / props.max) * 100
})

const heightClasses = {
  sm: 'h-2',
  md: 'h-4',
  lg: 'h-6',
}

const colorClasses = {
  accent: 'bg-neu-accent',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
}

const fillClasses = computed(() => {
  return [
    'h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden',
    colorClasses[props.color],
    props.striped ? 'progress-striped' : '',
    props.animated && props.striped ? 'progress-animated' : '',
  ].join(' ')
})
</script>

<template>
  <div class="w-full">
    <div v-if="showLabel" class="flex justify-between items-end mb-2 text-sm font-medium text-neu-text/80">
      <slot name="label">
        <span>Progress</span>
      </slot>
      <span>{{ Math.round(progressPercent) }}%</span>
    </div>
    
    <div 
      class="w-full rounded-full bg-[var(--bg-color)] shadow-neu-pressed p-1"
      :class="heightClasses[height]"
    >
      <div 
        :class="fillClasses"
        :style="{ width: `${progressPercent}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.progress-animated {
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>
