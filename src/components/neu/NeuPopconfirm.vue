<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NeuButton from './NeuButton.vue'

interface Props {
  title: string
  content?: string
  confirmText?: string
  cancelText?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: '确定',
  cancelText: '取消',
  position: 'top',
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const show = ref(false)
const popconfirmRef = ref<HTMLElement | null>(null)

const toggle = () => {
  show.value = !show.value
}

const handleConfirm = () => {
  show.value = false
  emit('confirm')
}

const handleCancel = () => {
  show.value = false
  emit('cancel')
}

const handleClickOutside = (event: MouseEvent) => {
  if (show.value && popconfirmRef.value && !popconfirmRef.value.contains(event.target as Node)) {
    show.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

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
  <div class="relative inline-flex" ref="popconfirmRef">
    <div @click.stop="toggle" class="inline-flex cursor-pointer">
      <slot />
    </div>

    <Transition name="neu-popconfirm">
      <div 
        v-if="show"
        class="absolute z-50 min-w-[200px]"
        :class="positionClasses"
      >
        <div class="p-4 rounded-2xl shadow-neu-flat bg-neu-bg text-neu-text relative">
          <div class="font-medium mb-1">{{ title }}</div>
          <div v-if="content" class="text-sm text-neu-text/70 mb-4">{{ content }}</div>
          <div v-else class="mb-4"></div>
          
          <div class="flex justify-end gap-3">
            <NeuButton size="sm" @click.stop="handleCancel">{{ cancelText }}</NeuButton>
            <NeuButton size="sm" variant="primary" @click.stop="handleConfirm">{{ confirmText }}</NeuButton>
          </div>

          <!-- Arrow -->
          <div 
            class="absolute w-3 h-3 bg-neu-bg rotate-45"
            :class="{
              '-bottom-1.5 left-1/2 -translate-x-1/2 shadow-[2px_2px_4px_var(--shadow-dark)]': position === 'top',
              '-top-1.5 left-1/2 -translate-x-1/2 shadow-[-2px_-2px_4px_var(--shadow-light)]': position === 'bottom',
              '-right-1.5 top-1/2 -translate-y-1/2 shadow-[2px_-2px_4px_var(--shadow-dark)]': position === 'left',
              '-left-1.5 top-1/2 -translate-y-1/2 shadow-[-2px_2px_4px_var(--shadow-light)]': position === 'right',
            }"
          ></div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.neu-popconfirm-enter-active,
.neu-popconfirm-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.neu-popconfirm-enter-from,
.neu-popconfirm-leave-to {
  opacity: 0;
  transform: scale(0.9) !important;
}

/* Ensure transform from positionClasses is preserved but scaled */
.neu-popconfirm-enter-active.bottom-full { transform: translate(-50%, 0) scale(1) !important; }
.neu-popconfirm-enter-active.top-full { transform: translate(-50%, 0) scale(1) !important; }
.neu-popconfirm-enter-active.right-full { transform: translate(0, -50%) scale(1) !important; }
.neu-popconfirm-enter-active.left-full { transform: translate(0, -50%) scale(1) !important; }

.neu-popconfirm-enter-from.bottom-full, .neu-popconfirm-leave-to.bottom-full { transform: translate(-50%, 10px) scale(0.9) !important; }
.neu-popconfirm-enter-from.top-full, .neu-popconfirm-leave-to.top-full { transform: translate(-50%, -10px) scale(0.9) !important; }
.neu-popconfirm-enter-from.right-full, .neu-popconfirm-leave-to.right-full { transform: translate(10px, -50%) scale(0.9) !important; }
.neu-popconfirm-enter-from.left-full, .neu-popconfirm-leave-to.left-full { transform: translate(-10px, -50%) scale(0.9) !important; }
</style>
