<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

export interface BreadcrumbItem {
  label: string
  path?: string
  disabled?: boolean
}

interface Props {
  items: BreadcrumbItem[]
  separator?: string
  variant?: 'flat' | 'pressed'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'flat',
})

const emit = defineEmits<{
  (e: 'navigate', item: BreadcrumbItem): void
}>()

const handleNavigate = (item: BreadcrumbItem) => {
  if (item.disabled || !item.path) return
  emit('navigate', item)
}

const containerClasses = computed(() => {
  return [
    'inline-flex items-center px-6 py-3 rounded-neu-md bg-[var(--bg-color)]',
    props.variant === 'flat' ? 'shadow-neu-flat' : 'shadow-neu-pressed'
  ].join(' ')
})
</script>

<template>
  <nav :class="containerClasses" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 sm:space-x-4">
      <li 
        v-for="(item, index) in items" 
        :key="index"
        class="flex items-center"
      >
        <!-- Custom Separator or Default Icon -->
        <span 
          v-if="index > 0" 
          class="mx-2 text-neu-text/40"
          aria-hidden="true"
        >
          <slot name="separator">
            <span v-if="separator" class="font-medium">{{ separator }}</span>
            <ChevronRight v-else class="w-4 h-4" />
          </slot>
        </span>

        <!-- Breadcrumb Item -->
        <component
          :is="item.path && !item.disabled ? 'router-link' : 'span'"
          :to="item.path"
          class="text-sm font-medium transition-colors"
          :class="[
            index === items.length - 1 
              ? 'text-neu-accent pointer-events-none' 
              : item.disabled 
                ? 'text-neu-text/40 cursor-not-allowed'
                : 'text-neu-text/70 hover:text-neu-accent cursor-pointer'
          ]"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
          @click="item.path ? null : handleNavigate(item)"
        >
          <div class="flex items-center gap-2">
            <slot :name="`icon-${index}`"></slot>
            {{ item.label }}
          </div>
        </component>
      </li>
    </ol>
  </nav>
</template>
