<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Star } from 'lucide-vue-next'

interface Props {
  modelValue?: number
  max?: number
  disabled?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 5,
  disabled: false,
  readonly: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const hoverValue = ref(0)
const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal
})

const displayValue = computed(() => {
  if (props.disabled || props.readonly) return internalValue.value
  return hoverValue.value > 0 ? hoverValue.value : internalValue.value
})

const handleMouseEnter = (val: number) => {
  if (props.disabled || props.readonly) return
  hoverValue.value = val
}

const handleMouseLeave = () => {
  if (props.disabled || props.readonly) return
  hoverValue.value = 0
}

const handleClick = (val: number) => {
  if (props.disabled || props.readonly) return
  internalValue.value = val
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <div class="flex items-center gap-3" @mouseleave="handleMouseLeave">
    <div 
      v-for="i in max" 
      :key="i"
      @mouseenter="handleMouseEnter(i)"
      @click="handleClick(i)"
      class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 select-none"
      :class="[
        (disabled || readonly) ? 'cursor-default' : 'cursor-pointer',
        disabled ? 'opacity-50' : '',
        displayValue >= i 
          ? 'shadow-neu-flat scale-100' 
          : 'shadow-neu-pressed scale-95'
      ]"
    >
      <Star 
        class="w-5 h-5 transition-all duration-300"
        :class="[
          displayValue >= i 
            ? 'fill-neu-accent text-neu-accent drop-shadow-[0_0_6px_rgba(79,70,229,0.4)]' 
            : 'fill-transparent text-neu-text/30'
        ]"
      />
    </div>
  </div>
</template>
