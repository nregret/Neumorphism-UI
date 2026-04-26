<script setup lang="ts">
import CodeBlock from '../../components/CodeBlock.vue'
import NeuEmpty from '../../components/neu/NeuEmpty.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import { FolderOpen } from 'lucide-vue-next'

const basicUsage = `<NeuEmpty />`

const customDesc = `<NeuEmpty description="您的购物车空空如也，快去选购吧！" />`

const customIcon = `<NeuEmpty description="未找到相关文件">
  <template #image>
    <FolderOpen class="w-12 h-12 text-neu-text/20 stroke-[1.5]" />
  </template>
</NeuEmpty>`

const withExtra = `<NeuEmpty description="暂无项目">
  <template #extra>
    <NeuButton variant="primary">创建项目</NeuButton>
  </template>
</NeuEmpty>`
</script>

<template>
  <div class="space-y-12 max-w-4xl">
    <div>
      <h1 class="text-4xl font-bold mb-4 text-neu-text">Empty 空状态</h1>
      <p class="text-lg text-neu-text/70 mb-8">
        当目前没有数据时，用于占位的提示组件，采用新拟态独有的内凹式设计。
      </p>

      <div class="space-y-8">
        <!-- 基础用法 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">基础用法</h2>
          <p class="text-neu-text/70 mb-4">最简单的空状态展示。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <NeuEmpty />
          </div>
          <CodeBlock :code="basicUsage" />
        </section>

        <!-- 自定义描述 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">自定义描述</h2>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <NeuEmpty description="您的购物车空空如也，快去选购吧！" />
          </div>
          <CodeBlock :code="customDesc" />
        </section>

        <!-- 自定义图标 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">自定义图标</h2>
          <p class="text-neu-text/70 mb-4">可以通过 image 插槽自定义图标内容。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <NeuEmpty description="未找到相关文件">
              <template #image>
                <FolderOpen class="w-12 h-12 text-neu-text/20 stroke-[1.5]" />
              </template>
            </NeuEmpty>
          </div>
          <CodeBlock :code="customIcon" />
        </section>

        <!-- 包含额外操作 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">包含额外操作</h2>
          <p class="text-neu-text/70 mb-4">可以通过 extra 插槽在文字下方添加按钮等操作元素。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <NeuEmpty description="暂无项目">
              <template #extra>
                <NeuButton variant="primary">创建项目</NeuButton>
              </template>
            </NeuEmpty>
          </div>
          <CodeBlock :code="withExtra" />
        </section>
      </div>
    </div>
  </div>
</template>
