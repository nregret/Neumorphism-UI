<script setup lang="ts">
import { computed, ref } from 'vue'
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-vue-next'

interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'default'
  title?: string
  description?: string
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  closable: false,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isVisible = ref(true)

const close = () => {
  isVisible.value = false
  emit('close')
}

const variantStyles = computed(() => {
  switch (props.variant) {
    case 'info':
      return {
        icon: Info,
        colorClass: 'text-blue-500',
        bgClass: 'bg-[var(--bg-color)] shadow-neu-pressed',
      }
    case 'success':
      return {
        icon: CheckCircle,
        colorClass: 'text-emerald-500',
        bgClass: 'bg-[var(--bg-color)] shadow-neu-pressed',
      }
    case 'warning':
      return {
        icon: AlertTriangle,
        colorClass: 'text-amber-500',
        bgClass: 'bg-[var(--bg-color)] shadow-neu-pressed',
      }
    case 'error':
      return {
        icon: XCircle,
        colorClass: 'text-rose-500',
        bgClass: 'bg-[var(--bg-color)] shadow-neu-pressed',
      }
    case 'default':
    default:
      return {
        icon: Info,
        colorClass: 'text-neu-text',
        bgClass: 'bg-[var(--bg-color)] shadow-neu-pressed',
      }
  }
})
</script>

<template>
  <Transition name="neu-alert">
    <div 
      v-if="isVisible"
      class="relative w-full rounded-neu-md p-5 flex items-start gap-4 transition-all duration-300"
      :class="variantStyles.bgClass"
      role="alert"
    >
      <!-- Icon -->
      <div 
        class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-neu-flat"
        :class="variantStyles.colorClass"
      >
        <component :is="variantStyles.icon" class="w-5 h-5" />
      </div>

      <!-- Content -->
      <div class="flex-1 pt-1">
        <h4 v-if="title" class="font-bold text-base mb-1" :class="variantStyles.colorClass">
          {{ title }}
        </h4>
        <div class="text-sm text-neu-text/80 leading-relaxed">
          <slot>{{ description }}</slot>
        </div>
      </div>

      <!-- Close Button -->
      <button 
        v-if="closable" 
        @click="close"
        class="shrink-0 p-2 rounded-full text-neu-text/50 hover:text-neu-text hover:shadow-neu-pressed transition-all focus:outline-none"
        aria-label="Close alert"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.neu-alert-enter-active,
.neu-alert-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.neu-alert-enter-from,
.neu-alert-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>
