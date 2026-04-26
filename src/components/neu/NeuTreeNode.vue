<script lang="ts">
export interface TreeNode {
  key: string | number
  label: string
  children?: TreeNode[]
  disabled?: boolean
  expanded?: boolean
}

export default {
  name: 'NeuTreeNode'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  node: TreeNode
  level?: number
  selectedKeys?: (string | number)[]
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
  selectedKeys: () => []
})

const emit = defineEmits<{
  (e: 'toggle', node: TreeNode): void
  (e: 'select', node: TreeNode): void
}>()

const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

const isExpanded = computed(() => !!props.node.expanded)
const isSelected = computed(() => props.selectedKeys.includes(props.node.key))

const handleRowClick = (e: Event) => {
  e.stopPropagation()
  if (props.node.disabled) return
  
  // Toggle expansion if it has children
  if (hasChildren.value) {
    emit('toggle', props.node)
  }
  
  // Always select the node
  emit('select', props.node)
}

const onChildToggle = (node: TreeNode) => {
  emit('toggle', node)
}

const onChildSelect = (node: TreeNode) => {
  emit('select', node)
}
</script>

<template>
  <div class="neu-tree-node select-none">
    <div
      class="flex items-center py-2 px-3 my-1 rounded-2xl transition-all duration-300 cursor-pointer border border-transparent"
      :class="[
        isSelected 
          ? 'shadow-neu-pressed bg-[var(--bg-color)]' 
          : 'hover:shadow-neu-flat hover:bg-[var(--bg-color)]',
        node.disabled ? 'opacity-50 cursor-not-allowed' : ''
      ]"
      :style="{ paddingLeft: `${level * 24 + 12}px` }"
      @click="handleRowClick"
    >
      <!-- Caret Icon for expanding -->
      <span
        class="w-6 h-6 flex items-center justify-center mr-2 transition-transform duration-300 rounded-full"
        :class="[
          !hasChildren ? 'invisible' : '',
          isExpanded ? 'rotate-90 text-neu-accent' : 'text-neu-text/60',
          isSelected && !isExpanded ? 'text-neu-accent' : ''
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </span>
      
      <!-- Label -->
      <span 
        class="truncate font-medium transition-colors duration-300"
        :class="isSelected ? 'text-neu-accent' : 'text-neu-text'"
      >
        {{ node.label }}
      </span>
    </div>

    <!-- Children -->
    <div v-if="hasChildren" v-show="isExpanded" class="neu-tree-node-children">
      <NeuTreeNode
        v-for="child in node.children"
        :key="child.key"
        :node="child"
        :level="level + 1"
        :selected-keys="selectedKeys"
        @toggle="onChildToggle"
        @select="onChildSelect"
      />
    </div>
  </div>
</template>
