<script setup lang="ts">
import { provide, reactive } from 'vue'

interface Props {
  model?: any
  rules?: any
  layout?: 'horizontal' | 'vertical' | 'inline'
  labelWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  model: () => ({}),
  rules: () => ({}),
  layout: 'vertical',
  labelWidth: '100px'
})

const emit = defineEmits<{
  (e: 'submit', event: Event): void
}>()

const formState = reactive({
  model: props.model,
  rules: props.rules,
  layout: props.layout,
  labelWidth: props.labelWidth
})

provide('neuForm', formState)

const handleSubmit = (event: Event) => {
  event.preventDefault()
  emit('submit', event)
}
</script>

<template>
  <form 
    class="neu-form" 
    :class="[`layout-${layout}`]"
    @submit="handleSubmit"
  >
    <slot />
  </form>
</template>

<style scoped>
.neu-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.layout-horizontal {
  /* Handled by FormItem */
}

.layout-inline {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem;
}
</style>
