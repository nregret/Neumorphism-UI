<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { Clock } from 'lucide-vue-next'

interface Props {
  modelValue?: string // Format: "HH:mm"
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择时间',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)
const hoursRef = ref<HTMLDivElement | null>(null)
const minsRef = ref<HTMLDivElement | null>(null)

const selectedHour = ref('00')
const selectedMin = ref('00')

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

watch(() => props.modelValue, (newVal) => {
  if (newVal && newVal.includes(':')) {
    const [h, m] = newVal.split(':')
    selectedHour.value = h
    selectedMin.value = m
  }
}, { immediate: true })

const updateValue = () => {
  const val = `${selectedHour.value}:${selectedMin.value}`
  emit('update:modelValue', val)
  emit('change', val)
}

const handleHourScroll = () => {
  if (!hoursRef.value) return
  const scrollTop = hoursRef.value.scrollTop
  const itemHeight = 40 // 40px per item
  const index = Math.round(scrollTop / itemHeight)
  if (hours[index]) {
    selectedHour.value = hours[index]
    updateValue()
  }
}

const handleMinScroll = () => {
  if (!minsRef.value) return
  const scrollTop = minsRef.value.scrollTop
  const itemHeight = 40
  const index = Math.round(scrollTop / itemHeight)
  if (minutes[index]) {
    selectedMin.value = minutes[index]
    updateValue()
  }
}

const togglePicker = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  
  if (isOpen.value) {
    // Scroll to current time when opened
    setTimeout(() => {
      if (hoursRef.value) {
        const hIndex = hours.indexOf(selectedHour.value)
        hoursRef.value.scrollTop = hIndex * 40
      }
      if (minsRef.value) {
        const mIndex = minutes.indexOf(selectedMin.value)
        minsRef.value.scrollTop = mIndex * 40
      }
    }, 50)
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

const computedClasses = computed(() => {
  return [
    'relative w-full px-6 py-4 text-base font-medium rounded-2xl transition-all duration-300 flex items-center justify-between select-none',
    'bg-[var(--bg-color)]',
    props.disabled ? 'opacity-50 cursor-not-allowed shadow-neu-flat' : 'cursor-pointer hover:shadow-neu-flat-sm active:shadow-neu-pressed',
    !props.disabled && !isOpen.value ? 'shadow-neu-flat' : '',
    isOpen.value && !props.disabled ? 'shadow-neu-pressed' : ''
  ].join(' ')
})

const textClasses = computed(() => {
  if (!props.modelValue) return 'text-neu-text/50'
  return 'text-neu-text truncate pr-4'
})
</script>

<template>
  <div class="relative w-full" ref="containerRef">
    <!-- Trigger -->
    <div 
      :class="computedClasses"
      @click="togglePicker"
      role="button"
      :aria-disabled="disabled"
    >
      <span :class="textClasses">
        {{ modelValue || placeholder }}
      </span>
      
      <!-- Clock Icon -->
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
        :class="isOpen ? 'text-neu-accent shadow-neu-pressed' : 'text-neu-text/60 shadow-neu-flat'"
      >
        <Clock class="w-4 h-4" :class="[disabled ? 'opacity-50' : '']" />
      </div>
    </div>

    <!-- Dropdown Picker -->
    <Transition name="neu-fade-slide">
      <div 
        v-if="isOpen"
        class="absolute z-[100] mt-4 p-5 bg-[var(--bg-color)] shadow-neu-flat-lg rounded-3xl"
        style="top: 100%; left: 0;"
      >
        <div class="flex items-center gap-4 justify-center relative">
          <!-- Selection Highlight Window -->
          <div class="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-10 shadow-neu-pressed rounded-xl pointer-events-none z-10 border border-[var(--bg-color)]"></div>
          
          <!-- Hours Column -->
          <div 
            ref="hoursRef"
            class="h-40 w-16 overflow-y-auto custom-scrollbar scroll-smooth snap-y snap-mandatory relative px-1 py-[60px]"
            @scroll="handleHourScroll"
          >
            <div 
              v-for="h in hours" 
              :key="'h'+h"
              class="h-10 flex items-center justify-center text-lg font-bold snap-center transition-colors duration-200"
              :class="selectedHour === h ? 'text-neu-accent' : 'text-neu-text/40'"
            >
              {{ h }}
            </div>
          </div>

          <div class="text-2xl font-bold text-neu-text pb-1">:</div>

          <!-- Minutes Column -->
          <div 
            ref="minsRef"
            class="h-40 w-16 overflow-y-auto custom-scrollbar scroll-smooth snap-y snap-mandatory relative px-1 py-[60px]"
            @scroll="handleMinScroll"
          >
            <div 
              v-for="m in minutes" 
              :key="'m'+m"
              class="h-10 flex items-center justify-center text-lg font-bold snap-center transition-colors duration-200"
              :class="selectedMin === m ? 'text-neu-accent' : 'text-neu-text/40'"
            >
              {{ m }}
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-center">
          <button 
            @click.stop="isOpen = false"
            class="px-6 py-2 rounded-xl text-sm font-bold text-neu-accent shadow-neu-flat hover:shadow-neu-flat-sm active:shadow-neu-pressed transition-all duration-300"
          >
            确定
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.neu-fade-slide-enter-active,
.neu-fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.neu-fade-slide-enter-from,
.neu-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.98);
}

/* Hide scrollbar for a cleaner look like iOS picker */
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}
.custom-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
