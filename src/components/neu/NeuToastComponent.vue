<script setup lang="ts">
import { computed } from 'vue'
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'default'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const typeStyles = computed(() => {
  switch (props.type) {
    case 'success':
      return { icon: CheckCircle, colorClass: 'text-emerald-500' }
    case 'warning':
      return { icon: AlertTriangle, colorClass: 'text-amber-500' }
    case 'error':
      return { icon: XCircle, colorClass: 'text-rose-500' }
    case 'info':
    case 'default':
    default:
      return { icon: Info, colorClass: 'text-blue-500' }
  }
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-0 left-0 right-0 z-[200] pointer-events-none flex justify-center pt-8 sm:pt-12 px-4">
      <Transition name="neu-toast">
        <div 
          v-if="show"
          class="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--bg-color)] shadow-neu-flat max-w-md w-max"
          role="alert"
        >
          <div 
            v-if="type !== 'default'"
            class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-neu-pressed"
            :class="typeStyles.colorClass"
          >
            <component :is="typeStyles.icon" class="w-3 h-3" />
          </div>
          
          <span class="text-sm font-medium text-neu-text">{{ message }}</span>
          
          <button 
            @click="emit('close')"
            class="ml-2 p-1 rounded-full text-neu-text/40 hover:text-neu-text hover:shadow-neu-pressed transition-all focus:outline-none shrink-0"
            aria-label="Close message"
          >
            <X class="w-3.5 h-3.5" />
          </button>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.neu-toast-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.neu-toast-leave-active {
  transition: all 0.3s ease-in;
}

.neu-toast-enter-from,
.neu-toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}
</style>
