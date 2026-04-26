<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'default'
  tip?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary'
})

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
}

const colorClasses = {
  primary: 'from-neu-accent to-transparent',
  default: 'from-neu-text to-transparent',
}
</script>

<template>
  <div class="inline-flex flex-col items-center justify-center gap-4">
    <!-- Outer Groove -->
    <div 
      class="rounded-full shadow-neu-pressed bg-[var(--bg-color)] relative flex items-center justify-center overflow-hidden"
      :class="sizeClasses[size]"
    >
      <!-- Rotating Light Ray (Conic Gradient) -->
      <div 
        class="absolute inset-0 animate-[spin_1.5s_linear_infinite] rounded-full"
      >
        <!-- The conic gradient creates the sweeping light ray effect -->
        <div 
          class="w-full h-full rounded-full bg-gradient-to-tr opacity-80"
          :class="colorClasses[color]"
        ></div>
      </div>

      <!-- Center bump (masks the center to create a ring effect) -->
      <div 
        class="rounded-full bg-[var(--bg-color)] absolute z-10 flex items-center justify-center"
        :class="[
          size === 'sm' ? 'inset-[4px]' : size === 'md' ? 'inset-[6px]' : 'inset-[8px]',
          'shadow-neu-flat border border-[var(--shadow-light)]/20'
        ]"
      ></div>
    </div>
    
    <span v-if="tip" class="text-neu-text/80 text-sm font-bold tracking-wider">{{ tip }}</span>
  </div>
</template>
