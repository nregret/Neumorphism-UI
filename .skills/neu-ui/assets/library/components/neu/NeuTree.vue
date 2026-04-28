<script setup lang="ts">
import { ref, watch } from 'vue'
import NeuTreeNode, { type TreeNode } from './NeuTreeNode.vue'

export interface TreeProps {
  data: TreeNode[]
  selectedKeys?: (string | number)[]
  multiple?: boolean
}

const props = withDefaults(defineProps<TreeProps>(), {
  data: () => [],
  selectedKeys: () => [],
  multiple: false
})

const emit = defineEmits<{
  (e: 'update:selectedKeys', keys: (string | number)[]): void
  (e: 'select', node: TreeNode): void
  (e: 'expand', node: TreeNode): void
}>()

const localSelectedKeys = ref<(string | number)[]>([...props.selectedKeys])

watch(() => props.selectedKeys, (newVal) => {
  localSelectedKeys.value = [...newVal]
}, { deep: true })

const handleToggle = (node: TreeNode) => {
  node.expanded = !node.expanded
  emit('expand', node)
}

const handleSelect = (node: TreeNode) => {
  if (node.disabled) return

  let newKeys = [...localSelectedKeys.value]
  const index = newKeys.indexOf(node.key)

  if (props.multiple) {
    if (index > -1) {
      newKeys.splice(index, 1)
    } else {
      newKeys.push(node.key)
    }
  } else {
    if (index > -1) {
      newKeys = []
    } else {
      newKeys = [node.key]
    }
  }

  localSelectedKeys.value = newKeys
  emit('update:selectedKeys', newKeys)
  emit('select', node)
}
</script>

<template>
  <div class="neu-tree p-4 rounded-xl shadow-neu-flat bg-[var(--bg-color)]">
    <NeuTreeNode
      v-for="node in data"
      :key="node.key"
      :node="node"
      :selected-keys="localSelectedKeys"
      @toggle="handleToggle"
      @select="handleSelect"
    />
    <div v-if="!data || data.length === 0" class="text-center text-neu-text/50 py-4">
      暂无数据
    </div>
  </div>
</template>
