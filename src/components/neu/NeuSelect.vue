<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { ChevronDown, Check } from 'lucide-vue-next'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue: string | number | (string | number)[]
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  error?: boolean
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
  disabled: false,
  multiple: false,
  error: false,
  size: 'md',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | (string | number)[]): void
  (e: 'change', value: string | number | (string | number)[]): void
}>()

const isOpen = ref(false)
const selectRef = ref<HTMLElement | null>(null)

// --- Handle Multiple vs Single Selection ---
const isSelected = (value: string | number) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(value)
  }
  return props.modelValue === value
}

const displayValue = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    if (props.modelValue.length === 0) return ''
    const selectedOptions = props.options.filter(opt => (props.modelValue as any[]).includes(opt.value))
    return selectedOptions.map(opt => opt.label).join(', ')
  }
  
  const selectedOption = props.options.find(opt => opt.value === props.modelValue)
  return selectedOption ? selectedOption.label : ''
})

// --- Interaction Logic ---
const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const handleSelect = (option: SelectOption) => {
  if (option.disabled) return

  if (props.multiple && Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue]
    const index = newValue.indexOf(option.value)
    
    if (index > -1) {
      newValue.splice(index, 1)
    } else {
      newValue.push(option.value)
    }
    
    emit('update:modelValue', newValue)
    emit('change', newValue)
    // Don't close on multiple selection
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpen.value = false
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value && selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// --- Computed Classes ---
const triggerClasses = computed(() => {
  const sizeClasses =
    props.size === 'sm'
      ? 'px-3 py-2 text-sm rounded-neu-sm'
      : 'px-6 py-4 text-base rounded-neu-md'
  return [
    `relative w-full font-medium transition-all duration-300 flex items-center justify-between select-none ${sizeClasses}`,
    'bg-[var(--bg-color)]',
    props.disabled ? 'opacity-50 cursor-not-allowed shadow-neu-flat' : 'cursor-pointer',
    !props.disabled && !isOpen.value ? 'shadow-neu-flat hover:shadow-neu-flat-sm active:shadow-neu-pressed' : '',
    isOpen.value && !props.disabled ? 'shadow-neu-pressed' : '',
    props.error ? 'text-red-500 shadow-[inset_4px_4px_8px_rgba(239,68,68,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]' : '',
  ].join(' ')
})

const textClasses = computed(() => {
  if (!displayValue.value) return 'text-neu-text/50'
  return 'text-neu-text truncate pr-4'
})
</script>

<template>
  <div class="relative w-full" ref="selectRef">
    <!-- Trigger Button -->
    <div 
      :class="triggerClasses"
      @click="toggleDropdown"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-disabled="disabled"
    >
      <span :class="textClasses">
        {{ displayValue || placeholder }}
      </span>
      
      <!-- Arrow Icon -->
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
        :class="isOpen ? 'shadow-neu-pressed' : 'shadow-neu-flat'"
      >
        <ChevronDown 
          class="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
          :class="[
            isOpen ? 'rotate-180 text-neu-accent' : 'rotate-0 text-neu-text/60',
            disabled ? 'text-neu-text/30' : ''
          ]"
        />
      </div>
    </div>

    <!-- Dropdown Menu -->
    <Transition name="neu-select">
      <div 
        v-if="isOpen"
        class="absolute z-50 w-full mt-3 bg-[var(--bg-color)] shadow-neu-flat-lg rounded-neu-md py-3 max-h-60 overflow-y-auto neu-scrollbar"
        role="listbox"
      >
        <div class="px-3 flex flex-col gap-1">
          <div
            v-for="option in options"
            :key="option.value"
            @click="handleSelect(option)"
            class="w-full text-left px-4 py-3 rounded-neu-sm transition-all duration-200 flex items-center justify-between"
            :class="[
              option.disabled 
                ? 'opacity-50 cursor-not-allowed text-neu-text/50' 
                : isSelected(option.value)
                  ? 'shadow-neu-pressed bg-[var(--bg-color)] text-neu-accent font-bold'
                  : 'hover:shadow-neu-flat-sm text-neu-text hover:text-neu-accent cursor-pointer'
            ]"
            role="option"
            :aria-selected="isSelected(option.value)"
            :aria-disabled="option.disabled"
          >
            <span class="truncate pr-4">{{ option.label }}</span>
            
            <Transition name="fade">
              <Check v-if="isSelected(option.value)" class="w-4 h-4 shrink-0 text-neu-accent" stroke-width="3" />
            </Transition>
          </div>
          
          <div v-if="options.length === 0" class="px-4 py-3 text-center text-neu-text/50 text-sm">
            暂无数据
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.neu-select-enter-active,
.neu-select-leave-active {
  transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: top center;
}

.neu-select-enter-from,
.neu-select-leave-to {
  opacity: 0;
  transform: scaleY(0.9) translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
