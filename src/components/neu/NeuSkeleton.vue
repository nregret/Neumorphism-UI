<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'text' | 'circle' | 'rect' | 'card'
  width?: string
  height?: string
  animated?: boolean
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  animated: true,
  rows: 3,
})

const baseClasses = computed(() => {
  return [
    'bg-[var(--bg-color)] shadow-neu-pressed overflow-hidden relative',
    props.animated ? 'neu-skeleton-animated' : ''
  ].join(' ')
})

const getStyle = (isTextRow = false) => {
  if (isTextRow) return {}
  
  const style: Record<string, string> = {}
  if (props.width) style.width = props.width
  if (props.height) style.height = props.height
  return style
}
</script>

<template>
  <div v-if="type === 'text'" class="space-y-4" :style="{ width: width || '100%' }">
    <div 
      v-for="i in rows" 
      :key="i"
      :class="baseClasses"
      class="h-4 rounded-full w-full"
      :style="i === rows && rows > 1 ? { width: '60%' } : {}"
    ></div>
  </div>

  <div 
    v-else-if="type === 'circle'" 
    :class="baseClasses"
    class="rounded-full"
    :style="{ width: width || '48px', height: height || width || '48px' }"
  ></div>

  <div 
    v-else-if="type === 'rect'" 
    :class="baseClasses"
    class="rounded-2xl"
    :style="getStyle()"
  ></div>

  <!-- Card Preset -->
  <div 
    v-else-if="type === 'card'" 
    class="w-full space-y-6"
    :style="{ width: width || '100%' }"
  >
    <div class="flex items-center space-x-4">
      <div :class="baseClasses" class="w-12 h-12 rounded-full shrink-0"></div>
      <div class="space-y-3 flex-1">
        <div :class="baseClasses" class="h-4 rounded-full w-1/3"></div>
        <div :class="baseClasses" class="h-3 rounded-full w-1/4"></div>
      </div>
    </div>
    <div :class="baseClasses" class="h-32 rounded-2xl w-full"></div>
    <div class="space-y-3">
      <div :class="baseClasses" class="h-3 rounded-full w-full"></div>
      <div :class="baseClasses" class="h-3 rounded-full w-5/6"></div>
      <div :class="baseClasses" class="h-3 rounded-full w-4/6"></div>
    </div>
  </div>
</template>

<style scoped>
.neu-skeleton-animated::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: neu-skeleton-shimmer 2s infinite linear;
  transform: skewX(-20deg);
}

.dark .neu-skeleton-animated::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
}

@keyframes neu-skeleton-shimmer {
  0% {
    transform: translateX(-150%) skewX(-20deg);
  }
  100% {
    transform: translateX(150%) skewX(-20deg);
  }
}
</style>
