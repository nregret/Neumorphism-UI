<script setup lang="ts">
export interface MenuItem {
  key: string
  label: string
  icon?: any
  disabled?: boolean
  type?: 'group' | 'item' | 'divider'
}

interface Props {
  items: MenuItem[]
  modelValue?: string
  mode?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  mode: 'vertical'
})

const emit = defineEmits<{
  (e: 'update:modelValue', key: string): void
  (e: 'select', item: MenuItem): void
}>()

const handleSelect = (item: MenuItem) => {
  if (item.disabled || item.type === 'group' || item.type === 'divider') return
  emit('update:modelValue', item.key)
  emit('select', item)
}
</script>

<template>
  <nav 
    class="flex p-2 rounded-2xl bg-[var(--bg-color)]"
    :class="[
      mode === 'vertical' ? 'flex-col space-y-1' : 'flex-row items-center space-x-1 shadow-neu-flat w-max',
      mode === 'vertical' ? 'shadow-neu-flat w-64' : ''
    ]"
  >
    <template v-for="item in items" :key="item.key || Math.random().toString()">
      
      <!-- Divider -->
      <div v-if="item.type === 'divider'" 
           class="bg-[var(--shadow-dark)]/10"
           :class="mode === 'vertical' ? 'h-px w-full my-2' : 'w-px h-6 mx-2'"
      ></div>

      <!-- Group -->
      <div v-else-if="item.type === 'group'" 
           class="text-xs font-bold text-neu-text/40 px-4 py-2 uppercase tracking-wider"
           :class="mode === 'vertical' ? 'mt-4 mb-1' : 'hidden'"
      >
        {{ item.label }}
      </div>

      <!-- Item -->
      <button
        v-else
        @click="handleSelect(item)"
        class="flex items-center transition-all duration-300 rounded-xl"
        :class="[
          mode === 'vertical' ? 'px-4 py-3 w-full' : 'px-5 py-2.5',
          item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          item.key === modelValue 
            ? 'shadow-neu-pressed text-neu-accent font-medium bg-[var(--bg-color)]' 
            : 'text-neu-text/80 hover:text-neu-text hover:shadow-neu-flat-sm bg-transparent'
        ]"
        :disabled="item.disabled"
      >
        <component v-if="item.icon" :is="item.icon" class="w-5 h-5" :class="[mode === 'vertical' ? 'mr-3' : 'mr-2']" />
        <span class="text-sm whitespace-nowrap">{{ item.label }}</span>
      </button>

    </template>
  </nav>
</template>

<style scoped>
</style>