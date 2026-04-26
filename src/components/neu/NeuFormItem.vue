<script setup lang="ts">
import { computed, inject } from 'vue'

interface Props {
  label?: string
  prop?: string
  required?: boolean
  error?: string
}

const props = defineProps<Props>()

const formState = inject<any>('neuForm', {
  layout: 'vertical',
  labelWidth: '100px'
})

const isRequired = computed(() => {
  if (props.required) return true
  if (props.prop && formState.rules?.[props.prop]) {
    const rules = [].concat(formState.rules[props.prop] || [])
    return rules.some((rule: any) => rule.required)
  }
  return false
})

const computedClasses = computed(() => {
  return [
    'neu-form-item',
    `layout-${formState.layout}`,
    props.error ? 'has-error' : ''
  ]
})
</script>

<template>
  <div :class="computedClasses">
    <label 
      v-if="label" 
      class="neu-form-item-label text-neu-text/80 font-medium"
      :style="formState.layout === 'horizontal' ? { width: formState.labelWidth } : {}"
    >
      <span v-if="isRequired" class="text-red-500 mr-1">*</span>
      {{ label }}
    </label>
    
    <div class="neu-form-item-content">
      <slot />
      <div v-if="error" class="neu-form-item-error text-red-500 text-sm mt-1 px-2">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.neu-form-item {
  display: flex;
  margin-bottom: 0;
}

.layout-vertical {
  flex-direction: column;
  gap: 0.5rem;
}

.layout-horizontal {
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.layout-horizontal .neu-form-item-label {
  text-align: right;
  flex-shrink: 0;
}

.layout-inline {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.neu-form-item-content {
  flex: 1;
  min-width: 0;
}
</style>
