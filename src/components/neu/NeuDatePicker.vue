<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  modelValue: string // Format: YYYY-MM-DD
  placeholder?: string
  disabled?: boolean
  error?: boolean
  min?: string
  max?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择日期',
  disabled: false,
  error: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

// Current view in the calendar (year and month)
const currentViewDate = ref(new Date())

// Initialize from modelValue if exists
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    const d = new Date(newVal)
    if (!isNaN(d.getTime())) {
      currentViewDate.value = new Date(d.getFullYear(), d.getMonth(), 1)
    }
  }
}, { immediate: true })

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const currentYear = computed(() => currentViewDate.value.getFullYear())
const currentMonth = computed(() => currentViewDate.value.getMonth())

const calendarGrid = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  const days = []
  
  // Padding for previous month
  const prevMonthDays = new Date(year, month, 0).getDate()
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonthDays - i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      fullDate: ''
    })
  }
  
  // Current month days
  const today = new Date()
  const selectedDateObj = props.modelValue ? new Date(props.modelValue) : null
  
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = year === today.getFullYear() && month === today.getMonth() && i === today.getDate()
    
    let isSelected = false
    if (selectedDateObj) {
      isSelected = year === selectedDateObj.getFullYear() && 
                   month === selectedDateObj.getMonth() && 
                   i === selectedDateObj.getDate()
    }
    
    const monthStr = String(month + 1).padStart(2, '0')
    const dayStr = String(i).padStart(2, '0')
    const fullDate = `${year}-${monthStr}-${dayStr}`
    
    days.push({
      date: i,
      isCurrentMonth: true,
      isToday,
      isSelected,
      fullDate
    })
  }
  
  // Padding for next month to complete the grid (usually 42 cells total)
  const totalCells = Math.ceil(days.length / 7) * 7
  const remainingCells = totalCells - days.length
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      fullDate: ''
    })
  }
  
  return days
})

const prevMonth = () => {
  currentViewDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentViewDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const selectDate = (day: any) => {
  if (!day.isCurrentMonth) return
  
  // Add min/max validation here if needed
  if (props.min && day.fullDate < props.min) return
  if (props.max && day.fullDate > props.max) return

  emit('update:modelValue', day.fullDate)
  emit('change', day.fullDate)
  isOpen.value = false
}

const togglePicker = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

// Click outside to close
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
    props.error ? 'text-red-500 shadow-[inset_4px_4px_8px_rgba(239,68,68,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]' : '',
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
    <!-- Visible Trigger -->
    <div 
      :class="computedClasses"
      @click="togglePicker"
      role="button"
      :aria-disabled="disabled"
    >
      <span :class="textClasses">
        {{ modelValue || placeholder }}
      </span>
      
      <!-- Calendar Icon -->
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
        :class="isOpen ? 'text-neu-accent shadow-neu-pressed' : 'text-neu-text/60 shadow-neu-flat'"
      >
        <Calendar class="w-4 h-4" :class="[disabled ? 'opacity-50' : '']" />
      </div>
    </div>

    <!-- Custom Dropdown Calendar -->
    <Transition name="neu-fade-slide">
      <div 
        v-if="isOpen"
        class="absolute z-[100] mt-4 p-5 w-[320px] sm:w-[340px] bg-[var(--bg-color)] shadow-neu-flat-lg rounded-3xl"
        style="top: 100%; left: 0;"
      >
        <!-- Header: Month/Year and Nav -->
        <div class="flex items-center justify-between mb-4 px-2">
          <button 
            @click.stop="prevMonth"
            class="w-10 h-10 flex items-center justify-center rounded-full shadow-neu-flat hover:shadow-neu-flat-sm active:shadow-neu-pressed text-neu-text transition-all"
          >
            <ChevronLeft class="w-5 h-5 pr-0.5" />
          </button>
          
          <div class="font-bold text-lg text-neu-text select-none">
            {{ currentYear }}年 {{ currentMonth + 1 }}月
          </div>
          
          <button 
            @click.stop="nextMonth"
            class="w-10 h-10 flex items-center justify-center rounded-full shadow-neu-flat hover:shadow-neu-flat-sm active:shadow-neu-pressed text-neu-text transition-all"
          >
            <ChevronRight class="w-5 h-5 pl-0.5" />
          </button>
        </div>

        <!-- Days of week -->
        <div class="grid grid-cols-7 gap-2 mb-3">
          <div 
            v-for="day in weekDays" 
            :key="day"
            class="text-center text-xs font-bold text-neu-text/40 select-none"
          >
            {{ day }}
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-y-3 gap-x-2">
          <div 
            v-for="(day, idx) in calendarGrid" 
            :key="idx"
            @click="selectDate(day)"
            class="w-9 h-9 mx-auto flex items-center justify-center rounded-xl text-sm transition-all duration-300 select-none"
            :class="[
              !day.isCurrentMonth ? 'text-neu-text/20 cursor-default' : 'cursor-pointer hover:shadow-neu-flat hover:text-neu-accent',
              day.isSelected ? 'shadow-neu-pressed text-neu-accent font-bold scale-[0.95]' : '',
              day.isToday && !day.isSelected ? 'text-neu-accent font-bold shadow-neu-flat-sm' : '',
              day.isCurrentMonth && !day.isSelected && !day.isToday ? 'text-neu-text' : ''
            ]"
          >
            {{ day.date }}
          </div>
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
</style>
