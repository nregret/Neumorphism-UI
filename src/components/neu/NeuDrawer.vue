<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import NeuButton from './NeuButton.vue'

interface Props {
  modelValue: boolean
  title?: string
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: string // css width/height value, e.g., '300px', '50vw'
  closeOnEsc?: boolean
  closeOnClickOutside?: boolean
  showCloseIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  placement: 'right',
  size: '400px',
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

const handleOutsideClick = (e: MouseEvent) => {
  if (props.closeOnClickOutside && (e.target as HTMLElement).classList.contains('neu-drawer-overlay')) {
    close()
  }
}

const handleEscKey = (e: KeyboardEvent) => {
  if (props.closeOnEsc && e.key === 'Escape' && props.modelValue) {
    close()
  }
}

let scrollbarWidth = 0

const lockScroll = () => {
  scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
  document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    emit('open')
    lockScroll()
  } else {
    unlockScroll()
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscKey)
  unlockScroll()
})

const drawerStyle = computed(() => {
  if (props.placement === 'left' || props.placement === 'right') {
    return { width: props.size }
  }
  return { height: props.size }
})

const drawerClasses = computed(() => {
  return [
    'fixed bg-[var(--bg-color)] z-[110] flex flex-col shadow-neu-flat-lg border border-[var(--bg-color)]',
    props.placement === 'right' ? 'top-4 right-4 h-[calc(100%-2rem)] rounded-3xl' : '',
    props.placement === 'left' ? 'top-4 left-4 h-[calc(100%-2rem)] rounded-3xl' : '',
    props.placement === 'bottom' ? 'bottom-4 left-4 w-[calc(100%-2rem)] rounded-3xl' : '',
    props.placement === 'top' ? 'top-4 left-4 w-[calc(100%-2rem)] rounded-3xl' : '',
  ].join(' ')
})
</script>

<template>
  <Teleport to="body">
    <!-- Overlay Transition -->
    <Transition name="neu-drawer-fade">
      <div 
        v-if="modelValue"
        class="fixed inset-0 z-[100] bg-[var(--bg-color)]/60 backdrop-blur-sm neu-drawer-overlay"
        @click="handleOutsideClick"
      ></div>
    </Transition>

    <!-- Drawer Content Transition -->
    <Transition :name="`neu-drawer-slide-${placement}`">
      <div 
        v-if="modelValue" 
        :class="drawerClasses" 
        :style="drawerStyle"
        role="dialog" 
        aria-modal="true" 
        :aria-labelledby="title ? 'drawer-title' : undefined"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 shrink-0 relative">
          <h2 v-if="title" id="drawer-title" class="text-xl font-bold text-neu-text">
            {{ title }}
          </h2>
          <div v-else></div>
          
          <NeuButton 
            v-if="showCloseIcon" 
            variant="icon" 
            shape="circle" 
            size="sm" 
            @click="close"
            class="text-neu-text/60 hover:text-neu-accent shrink-0 ml-4"
            aria-label="Close drawer"
          >
            <X class="w-5 h-5" />
          </NeuButton>
          
          <!-- Neumorphic Divider -->
          <div class="absolute bottom-0 left-6 right-6 h-[2px] bg-[var(--bg-color)] shadow-neu-pressed rounded-full"></div>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <slot></slot>
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="p-6 shrink-0 relative bg-[var(--bg-color)]">
          <!-- Neumorphic Divider -->
          <div class="absolute top-0 left-6 right-6 h-[2px] bg-[var(--bg-color)] shadow-neu-pressed rounded-full"></div>
          <slot name="footer"></slot>
        </div>
        
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Overlay Fade */
.neu-drawer-fade-enter-active,
.neu-drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.neu-drawer-fade-enter-from,
.neu-drawer-fade-leave-to {
  opacity: 0;
}

/* Slide Right */
.neu-drawer-slide-right-enter-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.neu-drawer-slide-right-leave-active {
  transition: transform 0.3s ease-in;
}
.neu-drawer-slide-right-enter-from,
.neu-drawer-slide-right-leave-to {
  transform: translateX(calc(100% + 2rem));
}

/* Slide Left */
.neu-drawer-slide-left-enter-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.neu-drawer-slide-left-leave-active {
  transition: transform 0.3s ease-in;
}
.neu-drawer-slide-left-enter-from,
.neu-drawer-slide-left-leave-to {
  transform: translateX(calc(-100% - 2rem));
}

/* Slide Bottom */
.neu-drawer-slide-bottom-enter-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.neu-drawer-slide-bottom-leave-active {
  transition: transform 0.3s ease-in;
}
.neu-drawer-slide-bottom-enter-from,
.neu-drawer-slide-bottom-leave-to {
  transform: translateY(calc(100% + 2rem));
}

/* Slide Top */
.neu-drawer-slide-top-enter-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.neu-drawer-slide-top-leave-active {
  transition: transform 0.3s ease-in;
}
.neu-drawer-slide-top-enter-from,
.neu-drawer-slide-top-leave-to {
  transform: translateY(calc(-100% - 2rem));
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--bg-color);
  border-radius: 4px;
  box-shadow: inset 2px 2px 4px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--shadow-dark);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}
</style>
