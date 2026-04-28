<script setup lang="ts">
import { computed, ref } from 'vue'
import NeuTree from '../../components/neu/NeuTree.vue'
import type { TreeNode } from '../../components/neu/NeuTreeNode.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { NeuToast } from '../../components/neu/toast'
import { useDocI18n } from './useDocI18n'

const { isEn, pick } = useDocI18n()

const basicData = computed<TreeNode[]>(() => [
  {
    key: '1',
    label: isEn.value ? 'Node 1' : '节点 1',
    expanded: true,
    children: [
      {
        key: '1-1',
        label: isEn.value ? 'Node 1-1' : '节点 1-1',
        children: [
          { key: '1-1-1', label: isEn.value ? 'Node 1-1-1' : '节点 1-1-1' },
          { key: '1-1-2', label: isEn.value ? 'Node 1-1-2' : '节点 1-1-2' }
        ]
      },
      {
        key: '1-2',
        label: isEn.value ? 'Node 1-2' : '节点 1-2'
      }
    ]
  },
  {
    key: '2',
    label: isEn.value ? 'Node 2' : '节点 2',
    children: [
      { key: '2-1', label: isEn.value ? 'Node 2-1' : '节点 2-1' },
      { key: '2-2', label: isEn.value ? 'Node 2-2 (disabled)' : '节点 2-2', disabled: true }
    ]
  },
  {
    key: '3',
    label: isEn.value ? 'Node 3 (disabled)' : '节点 3 (禁用)',
    disabled: true
  }
])

const selectedKeys1 = ref<string[]>(['1-1-1'])
const selectedKeys2 = ref<string[]>(['1-1-1', '1-2'])

const handleSelect = (node: TreeNode) => {
  NeuToast.success(isEn.value ? `Selected: ${node.label}` : `选中了节点: ${node.label}`)
}

const usageCode = pick(
  `
<script setup>
import { ref } from 'vue'
import NeuTree from './components/neu/NeuTree.vue'

const data = ref([
  {
    key: '1',
    label: '节点 1',
    expanded: true,
    children: [
      { key: '1-1', label: '节点 1-1' },
      { key: '1-2', label: '节点 1-2' }
    ]
  }
])

const selectedKeys = ref(['1-1'])
<\/script>

<template>
  <!-- 单选树 -->
  <NeuTree
    :data="data"
    v-model:selectedKeys="selectedKeys"
  />
  
  <!-- 多选树 -->
  <NeuTree
    :data="data"
    v-model:selectedKeys="selectedKeys"
    multiple
  />
</template>
`,
  `
<script setup>
import { ref } from 'vue'
import NeuTree from './components/neu/NeuTree.vue'

const data = ref([
  {
    key: '1',
    label: 'Node 1',
    expanded: true,
    children: [
      { key: '1-1', label: 'Node 1-1' },
      { key: '1-2', label: 'Node 1-2' }
    ]
  }
])

const selectedKeys = ref(['1-1'])
<\/script>

<template>
  <NeuTree :data="data" v-model:selectedKeys="selectedKeys" />
  <NeuTree :data="data" v-model:selectedKeys="selectedKeys" multiple />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Tree 树形控件', 'Tree') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('新拟态风格的树形控件，用于清晰地展现层级关系，支持单选、多选和节点展开/收起。', 'A neumorphic tree view for showing hierarchy. Supports single/multiple selection and node expand/collapse.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法 (Basic)', 'Basic') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('单选 (Single Selection)', 'Single selection') }}</h3>
          <NeuTree
            :data="basicData"
            v-model:selectedKeys="selectedKeys1"
            @select="handleSelect"
          />
          <div class="mt-4 text-sm text-neu-text/80">
            {{ pick('当前选中项:', 'Selected:') }} {{ selectedKeys1 }}
          </div>
        </div>

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('多选 (Multiple Selection)', 'Multiple selection') }}</h3>
          <NeuTree
            :data="basicData"
            v-model:selectedKeys="selectedKeys2"
            multiple
          />
          <div class="mt-4 text-sm text-neu-text/80">
            {{ pick('当前选中项:', 'Selected:') }} {{ selectedKeys2 }}
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('代码示例', 'Code') }}</h2>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
