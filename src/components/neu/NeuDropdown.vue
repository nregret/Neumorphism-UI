<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

export interface DropdownItem {
  label: string
  value: string | number
  disabled?: boolean
  divider?: boolean
  icon?: any // For passing Vue components/icons
}

interface Props {
  items: DropdownItem[]
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  trigger?: 'click' | 'hover'
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-start',
  trigger: 'click',
})

const emit = defineEmits<{
  (e: 'select', item: DropdownItem): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
let hoverTimer: ReturnType<typeof setTimeout> | null = null

const toggle = () => {
  if (props.trigger === 'click') {
    isOpen.value = !isOpen.value
  }
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    if (hoverTimer) clearTimeout(hoverTimer)
    isOpen.value = true
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    hoverTimer = setTimeout(() => {
      isOpen.value = false
    }, 150)
  }
}

const handleSelect = (item: DropdownItem) => {
  if (item.disabled || item.divider) return
  emit('select', item)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (props.trigger === 'click' && isOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  if (props.trigger === 'click') {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (props.trigger === 'click') {
    document.removeEventListener('click', handleClickOutside)
  }
  if (hoverTimer) clearTimeout(hoverTimer)
})

const placementClasses = computed(() => {
  switch (props.placement) {
    case 'bottom-start': return 'top-full left-0 mt-2 origin-top-left'
    case 'bottom-end': return 'top-full right-0 mt-2 origin-top-right'
    case 'top-start': return 'bottom-full left-0 mb-2 origin-bottom-left'
    case 'top-end': return 'bottom-full right-0 mb-2 origin-bottom-right'
    default: return 'top-full left-0 mt-2 origin-top-left'
  }
})
</script>

<template>
  <div 
    class="relative inline-block text-left" 
    ref="dropdownRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Trigger -->
    <div @click="toggle" class="cursor-pointer">
      <slot name="trigger">
        <button class="px-4 py-2 bg-[var(--bg-color)] shadow-neu-flat rounded-xl hover:shadow-neu-flat-sm active:shadow-neu-pressed transition-all">
          Dropdown
        </button>
      </slot>
    </div>

    <!-- Menu -->
    <Transition name="neu-dropdown">
      <div 
        v-if="isOpen"
        class="absolute z-50 min-w-[12rem] bg-[var(--bg-color)] shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_var(--shadow-light)] rounded-2xl py-2"
        :class="placementClasses"
      >
        <div class="px-2">
          <template v-for="(item, index) in items" :key="index">
            
            <!-- Divider -->
            <div v-if="item.divider" class="h-px bg-[var(--shadow-dark)]/10 my-2 mx-2"></div>
            
            <!-- Item -->
            <button
              v-else
              @click="handleSelect(item)"
              class="w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-3"
              :class="[
                item.disabled 
                  ? 'opacity-50 cursor-not-allowed text-neu-text/50' 
                  : 'hover:bg-[var(--bg-color)] hover:shadow-neu-pressed text-neu-text hover:text-neu-accent cursor-pointer'
              ]"
              :disabled="item.disabled"
            >
              <component v-if="item.icon" :is="item.icon" class="w-4 h-4" />
              <span class="text-sm font-medium">{{ item.label }}</span>
            </button>
            
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.neu-dropdown-enter-active,
.neu-dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.neu-dropdown-enter-from,
.neu-dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
