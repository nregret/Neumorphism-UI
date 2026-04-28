<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'

interface TabItem {
  label: string
  value: string
  disabled?: boolean
}

interface Props {
  modelValue: string
  items: TabItem[]
  variant?: 'default' | 'pills'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  fullWidth: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const activeIndex = computed(() => {
  return props.items.findIndex(item => item.value === props.modelValue)
})

const selectTab = (item: TabItem) => {
  if (item.disabled) return
  emit('update:modelValue', item.value)
}

const tabRefs = ref<HTMLElement[]>([])
const indicatorStyle = ref({ width: '0px', transform: 'translateX(0px)' })

const updateIndicator = async () => {
  await nextTick()
  if (activeIndex.value !== -1 && tabRefs.value[activeIndex.value]) {
    const activeTab = tabRefs.value[activeIndex.value]
    indicatorStyle.value = {
      width: `${activeTab.offsetWidth}px`,
      transform: `translateX(${activeTab.offsetLeft}px)`
    }
  }
}

watch(() => props.modelValue, updateIndicator)
watch(() => props.items, updateIndicator, { deep: true })

onMounted(updateIndicator)

const containerClasses = computed(() => {
  if (props.variant === 'pills') {
    return 'relative flex items-center p-1 rounded-neu-md bg-[var(--bg-color)] shadow-neu-pressed overflow-hidden'
  }
  return 'relative flex items-center border-b border-[var(--shadow-dark)]/20'
})

const getTabClasses = (item: TabItem, index: number) => {
  const isActive = index === activeIndex.value
  
  if (props.variant === 'pills') {
    return [
      'relative z-10 px-6 py-2.5 text-sm font-medium transition-colors duration-300 rounded-xl',
      props.fullWidth ? 'flex-1 text-center' : '',
      item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      isActive ? 'text-neu-accent' : 'text-neu-text/70 hover:text-neu-text',
    ].join(' ')
  }
  
  return [
    'relative z-10 px-6 py-3 text-sm font-medium transition-all duration-300',
    props.fullWidth ? 'flex-1 text-center' : '',
    item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    isActive ? 'text-neu-accent' : 'text-neu-text/70 hover:text-neu-text',
  ].join(' ')
}
</script>

<template>
  <div class="w-full">
    <!-- Tab Headers -->
    <div :class="containerClasses" role="tablist">
      <!-- Animated Indicator -->
      <div 
        class="absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
        :class="variant === 'pills' ? 'h-full py-1 top-0' : 'bottom-0 h-0.5'"
        :style="indicatorStyle"
      >
        <div 
          :class="variant === 'pills' ? 'w-full h-full bg-[var(--bg-color)] shadow-neu-flat rounded-xl' : 'w-full h-full bg-neu-accent'"
        ></div>
      </div>

      <div
        v-for="(item, index) in items"
        :key="item.value"
        ref="tabRefs"
        :class="getTabClasses(item, index)"
        role="tab"
        :aria-selected="item.value === modelValue"
        :aria-disabled="item.disabled"
        @click="selectTab(item)"
      >
        {{ item.label }}
      </div>
    </div>
    
    <!-- Tab Content Area -->
    <div class="mt-6">
      <slot></slot>
    </div>
  </div>
</template>
