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
      class="group flex items-center py-2 px-3 my-0.5 rounded-xl transition-all duration-300 cursor-pointer border border-transparent relative"
      :class="[
        isSelected 
          ? 'shadow-neu-pressed-sm bg-neu-bg/60' 
          : 'hover:bg-neu-text/5',
        node.disabled ? 'opacity-50 cursor-not-allowed' : ''
      ]"
      :style="{ paddingLeft: `${level * 20 + 12}px` }"
      @click="handleRowClick"
    >
      <!-- Caret Icon for expanding -->
      <span
        class="w-5 h-5 flex items-center justify-center mr-1.5 transition-transform duration-300 rounded-lg"
        :class="[
          !hasChildren ? 'invisible' : '',
          isExpanded ? 'rotate-90 text-neu-accent' : 'text-neu-text/40 group-hover:text-neu-text/70',
          isSelected && !isExpanded ? 'text-neu-accent' : ''
        ]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </span>
      
      <!-- Label -->
      <span 
        class="truncate transition-all duration-300"
        :class="[
          isSelected ? 'text-neu-accent font-bold translate-x-0.5' : 'text-neu-text/80 group-hover:text-neu-text font-medium'
        ]"
      >
        {{ node.label }}
      </span>
    </div>

    <!-- Children with expansion animation -->
    <div 
      v-if="hasChildren" 
      class="grid transition-all duration-300 ease-out"
      :class="isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">
        <div class="neu-tree-node-children">
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
    </div>
  </div>
</template>
