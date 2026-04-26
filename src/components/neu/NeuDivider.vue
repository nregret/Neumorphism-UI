<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'horizontal' | 'vertical'
  variant?: 'groove' | 'ridge'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'horizontal',
  variant: 'groove'
})

const computedClasses = computed(() => {
  const base = 'bg-[var(--bg-color)]'
  
  let layout = ''
  if (props.type === 'horizontal') {
    layout = 'w-full h-[2px] my-4'
  } else {
    layout = 'h-full w-[2px] mx-4 inline-block align-middle'
  }

  let shadow = ''
  if (props.variant === 'groove') {
    shadow = 'shadow-[inset_1px_1px_2px_var(--shadow-dark),inset_-1px_-1px_2px_var(--shadow-light)]'
  } else {
    shadow = 'shadow-[1px_1px_2px_var(--shadow-dark),-1px_-1px_2px_var(--shadow-light)]'
  }

  return [base, layout, shadow].join(' ')
})
</script>

<template>
  <div :class="computedClasses" role="separator" :aria-orientation="type"></div>
</template>
