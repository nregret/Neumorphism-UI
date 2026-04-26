<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next'
import NeuButton from './NeuButton.vue'

interface Props {
  modelValue: number
  total: number
  pageSize?: number
  disabled?: boolean
  siblingCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  disabled: false,
  siblingCount: 1,
})

const emit = defineEmits<{
  (e: 'update:modelValue', page: number): void
  (e: 'change', page: number): void
}>()

const pageCount = computed(() => Math.ceil(props.total / props.pageSize))

const handlePageChange = (page: number) => {
  if (props.disabled || page < 1 || page > pageCount.value || page === props.modelValue) return
  emit('update:modelValue', page)
  emit('change', page)
}

const paginationRange = computed(() => {
  const currentPage = props.modelValue
  const totalPageCount = pageCount.value
  const siblingCount = props.siblingCount

  // Total page numbers to show (siblings + current + first + last + 2 dots)
  const totalPageNumbers = siblingCount + 5

  if (totalPageNumbers >= totalPageCount) {
    return Array.from({ length: totalPageCount }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

  const showLeftDots = leftSiblingIndex > 2
  const showRightDots = rightSiblingIndex < totalPageCount - 2

  const firstPageIndex = 1
  const lastPageIndex = totalPageCount

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, '...', totalPageCount]
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPageCount - rightItemCount + i + 1
    )
    return [firstPageIndex, '...', ...rightRange]
  }

  if (showLeftDots && showRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    )
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
  }

  return []
})
</script>

<template>
  <nav class="flex items-center justify-center space-x-2" aria-label="Pagination">
    <!-- Previous Button -->
    <NeuButton 
      variant="icon" 
      shape="rounded" 
      size="sm"
      :disabled="modelValue === 1 || disabled"
      @click="handlePageChange(modelValue - 1)"
      aria-label="Previous page"
    >
      <ChevronLeft class="w-5 h-5" />
    </NeuButton>

    <!-- Page Numbers -->
    <template v-for="(page, index) in paginationRange" :key="index">
      <div v-if="page === '...'" class="px-2 text-neu-text/50 flex items-center justify-center pointer-events-none">
        <MoreHorizontal class="w-4 h-4" />
      </div>
      
      <NeuButton
        v-else
        shape="rounded"
        size="sm"
        class="min-w-[2.5rem]"
        :active="page === modelValue"
        :disabled="disabled"
        :variant="page === modelValue ? 'primary' : 'default'"
        @click="handlePageChange(page as number)"
        :aria-current="page === modelValue ? 'page' : undefined"
      >
        {{ page }}
      </NeuButton>
    </template>

    <!-- Next Button -->
    <NeuButton 
      variant="icon" 
      shape="rounded" 
      size="sm"
      :disabled="modelValue === pageCount || disabled"
      @click="handlePageChange(modelValue + 1)"
      aria-label="Next page"
    >
      <ChevronRight class="w-5 h-5" />
    </NeuButton>
  </nav>
</template>
