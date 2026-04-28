<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

export interface StepItem {
  title: string
  description?: string
}

interface Props {
  items: StepItem[]
  modelValue?: number
  direction?: 'horizontal' | 'vertical'
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  direction: 'horizontal',
  clickable: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const handleStepClick = (index: number) => {
  if (props.clickable) {
    emit('update:modelValue', index)
  }
}

const getStepStatus = (index: number) => {
  if (index < props.modelValue) return 'finish'
  if (index === props.modelValue) return 'process'
  return 'wait'
}
</script>

<template>
  <div 
    class="flex w-full"
    :class="[
      direction === 'vertical' ? 'flex-col' : 'flex-row items-start justify-between'
    ]"
  >
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="relative flex"
      :class="[
        direction === 'vertical' ? 'flex-row items-start' : 'flex-1 flex-col items-center',
        clickable ? 'cursor-pointer' : ''
      ]"
      @click="handleStepClick(index)"
    >
      <!-- Line separator -->
      <div 
        v-if="index !== items.length - 1"
        class="absolute bg-[var(--shadow-dark)]/10 rounded-full overflow-hidden"
        :class="[
          direction === 'vertical' 
            ? 'w-[2px] h-[calc(100%-1rem)] left-5 top-12' 
            : 'h-[2px] w-[calc(100%-3rem)] left-[calc(50%+1.5rem)] top-5'
        ]"
      >
        <div 
          class="h-full bg-neu-accent transition-all duration-500 ease-in-out"
          :style="{
            width: direction === 'horizontal' ? (index < modelValue ? '100%' : '0%') : '100%',
            height: direction === 'vertical' ? (index < modelValue ? '100%' : '0%') : '100%'
          }"
        ></div>
      </div>

      <!-- Icon/Number -->
      <div 
        class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300"
        :class="[
          getStepStatus(index) === 'process' ? 'shadow-neu-flat text-neu-accent font-bold ring-2 ring-[var(--bg-color)]' : 
          getStepStatus(index) === 'finish' ? 'shadow-neu-flat text-neu-accent' : 
          'shadow-neu-pressed text-neu-text/40'
        ]"
      >
        <Check v-if="getStepStatus(index) === 'finish'" class="w-5 h-5" />
        <span v-else class="text-sm">{{ index + 1 }}</span>
      </div>

      <!-- Content -->
      <div 
        :class="[
          direction === 'vertical' ? 'ml-4 mt-2 pb-8' : 'mt-4 text-center px-2',
        ]"
      >
        <div 
          class="text-sm font-bold transition-colors duration-300"
          :class="[
            getStepStatus(index) === 'wait' ? 'text-neu-text/50' : 'text-neu-text'
          ]"
        >
          {{ item.title }}
        </div>
        <div 
          v-if="item.description"
          class="text-xs mt-1.5 text-neu-text/60 max-w-[200px]"
        >
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>