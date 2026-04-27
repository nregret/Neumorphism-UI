<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'
import NeuCard from './NeuCard.vue'
import NeuButton from './NeuButton.vue'
import { useOverlay } from '@/composables/useOverlay'

defineOptions({ inheritAttrs: false })

interface Props {
  modelValue: boolean
  title?: string
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnEsc?: boolean
  closeOnClickOutside?: boolean
  showCloseIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  width: 'md',
  closeOnEsc: true,
  closeOnClickOutside: true,
  showCloseIcon: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const { handleOutsideClick } = useOverlay({
  isOpen: () => props.modelValue,
  closeOnEsc: () => props.closeOnEsc,
  closeOnClickOutside: () => props.closeOnClickOutside,
  overlayClass: 'neu-modal-overlay',
  onClose: close,
  onOpen: () => emit('open'),
})

const widthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full m-4',
}

const containerClasses = computed(() => {
  return [
    'relative w-full mx-auto transform transition-all duration-300',
    widthClasses[props.width],
  ].join(' ')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="neu-modal" appear>
      <div 
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Overlay: handled completely by CSS transition -->
        <div 
          class="absolute inset-0 neu-modal-overlay"
          @click="handleOutsideClick"
        ></div>

        <!-- Modal Content -->
        <div :class="containerClasses" class="neu-modal-content relative z-10" role="dialog" aria-modal="true" :aria-labelledby="title ? 'modal-title' : undefined">
          <NeuCard padding="lg" class="w-full flex flex-col max-h-[90vh] bg-[var(--bg-color)]">
            
            <!-- Header -->
            <div class="flex items-center justify-between mb-6 shrink-0">
              <h2 v-if="title" id="modal-title" class="text-2xl font-bold text-neu-text">
                {{ title }}
              </h2>
              <div v-else></div> <!-- Placeholder for flex-between if no title -->
              
              <NeuButton 
                v-if="showCloseIcon" 
                variant="icon" 
                shape="circle" 
                size="sm" 
                @click="close"
                class="text-neu-text/60 hover:text-neu-accent"
                aria-label="Close modal"
              >
                <X class="w-5 h-5" />
              </NeuButton>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto pr-2 -mx-2 px-2 neu-scrollbar">
              <div class="py-4">
                <slot></slot>
              </div>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="mt-8 shrink-0 flex justify-end gap-4 pt-4 border-t border-[var(--shadow-dark)]/10">
              <slot name="footer"></slot>
            </div>
            
          </NeuCard>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.neu-modal-enter-active,
.neu-modal-leave-active {
  transition: all 0.4s ease;
}

.neu-modal-enter-from,
.neu-modal-leave-to {
  /* No global opacity to prevent double-fading */
}

/* 
  单独处理 Overlay：
  使用独立的 opacity 和 backdrop-filter 动画
*/
.neu-modal-overlay {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
}

.neu-modal-enter-from .neu-modal-overlay,
.neu-modal-leave-to .neu-modal-overlay {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

/* 
  单独处理 Content：
  添加弹跳动画和自身的淡入淡出
*/
.neu-modal-content {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.neu-modal-enter-from .neu-modal-content,
.neu-modal-leave-to .neu-modal-content {
  opacity: 0;
  transform: scale(0.9) translateY(30px);
}

</style>
