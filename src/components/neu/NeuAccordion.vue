<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

export interface AccordionItem {
  id: string | number
  title: string
  content?: string
  disabled?: boolean
}

interface Props {
  items: AccordionItem[]
  modelValue?: (string | number)[]
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  multiple: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void
}>()

// Use internal state if no modelValue is bound, otherwise use prop
const internalActiveKeys = ref<(string | number)[]>([...props.modelValue])

const activeKeys = computed({
  get: () => (props.modelValue !== undefined ? props.modelValue : internalActiveKeys.value),
  set: (val) => {
    internalActiveKeys.value = val
    emit('update:modelValue', val)
  }
})

const isOpen = (id: string | number) => activeKeys.value.includes(id)

const toggle = (id: string | number, disabled?: boolean) => {
  if (disabled) return

  const currentlyOpen = isOpen(id)
  
  if (props.multiple) {
    if (currentlyOpen) {
      activeKeys.value = activeKeys.value.filter(k => k !== id)
    } else {
      activeKeys.value = [...activeKeys.value, id]
    }
  } else {
    activeKeys.value = currentlyOpen ? [] : [id]
  }
}
</script>

<template>
  <div class="space-y-4 w-full">
    <div 
      v-for="item in items" 
      :key="item.id"
      class="rounded-2xl bg-[var(--bg-color)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden"
      :class="[
        isOpen(item.id) ? 'shadow-neu-flat' : 'shadow-neu-flat hover:shadow-neu-flat-sm',
        item.disabled ? 'opacity-50' : ''
      ]"
    >
      <button 
        @click="toggle(item.id, item.disabled)"
        class="w-full px-6 py-4 flex justify-between items-center focus:outline-none transition-colors"
        :class="[
          item.disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:text-neu-accent',
          isOpen(item.id) ? 'text-neu-accent' : 'text-neu-text'
        ]"
        :aria-expanded="isOpen(item.id)"
        :aria-disabled="item.disabled"
      >
        <span class="font-semibold text-left">{{ item.title }}</span>
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          :class="isOpen(item.id) ? 'shadow-neu-pressed' : 'shadow-neu-flat'"
        >
          <ChevronDown 
            class="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
            :class="isOpen(item.id) ? 'rotate-180 text-neu-accent' : 'rotate-0 text-neu-text/60'"
          />
        </div>
      </button>
      
      <!-- CSS Grid animation for height transition -->
      <div 
        class="grid transition-all duration-300 ease-out"
        :class="isOpen(item.id) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      >
        <div class="overflow-hidden">
          <div class="px-6 pb-6 pt-2">
            <div class="p-4 rounded-xl shadow-neu-pressed bg-[var(--bg-color)] text-neu-text/80 text-sm leading-relaxed">
              <slot :name="`content-${item.id}`">{{ item.content }}</slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
