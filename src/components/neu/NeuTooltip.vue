<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  delay: 200,
})

const show = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const handleMouseEnter = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    show.value = true
  }, props.delay)
}

const handleMouseLeave = () => {
  if (timer) clearTimeout(timer)
  show.value = false
}

const positionClasses = computed(() => {
  switch (props.position) {
    case 'top':
      return 'bottom-full left-1/2 -translate-x-1/2 mb-3 origin-bottom'
    case 'bottom':
      return 'top-full left-1/2 -translate-x-1/2 mt-3 origin-top'
    case 'left':
      return 'right-full top-1/2 -translate-y-1/2 mr-3 origin-right'
    case 'right':
      return 'left-full top-1/2 -translate-y-1/2 ml-3 origin-left'
    default:
      return 'bottom-full left-1/2 -translate-x-1/2 mb-3 origin-bottom'
  }
})
</script>

<template>
  <div 
    class="relative inline-flex items-center justify-center"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleMouseEnter"
    @blur="handleMouseLeave"
  >
    <slot />

    <Transition name="neu-tooltip">
      <div 
        v-if="show"
        class="absolute z-50 pointer-events-none"
        :class="positionClasses"
        role="tooltip"
      >
        <div class="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-neu-sm shadow-neu-flat bg-[var(--bg-color)] text-neu-text relative">
          {{ content }}
          
          <!-- Arrow -->
          <div 
            class="absolute w-2 h-2 bg-[var(--bg-color)] rotate-45"
            :class="{
              '-bottom-1 left-1/2 -translate-x-1/2 shadow-[2px_2px_4px_var(--shadow-dark)]': position === 'top',
              '-top-1 left-1/2 -translate-x-1/2 shadow-[-2px_-2px_4px_var(--shadow-light)]': position === 'bottom',
              '-right-1 top-1/2 -translate-y-1/2 shadow-[2px_-2px_4px_var(--shadow-dark)]': position === 'left',
              '-left-1 top-1/2 -translate-y-1/2 shadow-[-2px_2px_4px_var(--shadow-light)]': position === 'right',
            }"
          ></div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.neu-tooltip-enter-active,
.neu-tooltip-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.neu-tooltip-enter-from,
.neu-tooltip-leave-to {
  opacity: 0;
  transform: scale(0.9) !important;
}

/* Ensure transform from positionClasses is preserved but scaled */
.neu-tooltip-enter-active.bottom-full { transform: translate(-50%, 0) scale(1) !important; }
.neu-tooltip-enter-active.top-full { transform: translate(-50%, 0) scale(1) !important; }
.neu-tooltip-enter-active.right-full { transform: translate(0, -50%) scale(1) !important; }
.neu-tooltip-enter-active.left-full { transform: translate(0, -50%) scale(1) !important; }

.neu-tooltip-enter-from.bottom-full, .neu-tooltip-leave-to.bottom-full { transform: translate(-50%, 5px) scale(0.9) !important; }
.neu-tooltip-enter-from.top-full, .neu-tooltip-leave-to.top-full { transform: translate(-50%, -5px) scale(0.9) !important; }
.neu-tooltip-enter-from.right-full, .neu-tooltip-leave-to.right-full { transform: translate(5px, -50%) scale(0.9) !important; }
.neu-tooltip-enter-from.left-full, .neu-tooltip-leave-to.left-full { transform: translate(-5px, -50%) scale(0.9) !important; }
</style>
