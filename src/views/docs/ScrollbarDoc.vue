<script setup lang="ts">
import CodeBlock from '../../components/CodeBlock.vue'
import NeuScrollbar from '../../components/neu/NeuScrollbar.vue'

const listItems = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  label: `列表项 ${i + 1}`,
  desc: `这是第 ${i + 1} 条数据，展示新拟态滚动条效果`
}))

const basicUsage = `<NeuScrollbar max-height="300px">
  <div v-for="item in items" :key="item.id" class="p-3 border-b">
    {{ item.label }}
  </div>
</NeuScrollbar>`

const fixedHeightUsage = `<NeuScrollbar height="240px">
  <!-- 固定高度内容 -->
</NeuScrollbar>`

const autoHideUsage = `<NeuScrollbar max-height="300px" :auto-hide="true">
  <!-- 鼠标悬停时才显示滚动条 -->
</NeuScrollbar>`
</script>

<template>
  <div class="space-y-12 max-w-4xl">
    <div>
      <h1 class="text-4xl font-bold mb-4 text-neu-text">Scrollbar 滚动条</h1>
      <p class="text-lg text-neu-text/70 mb-8">
        将原生滚动条替换为精心设计的新拟态风格滚动条。轨道呈内凹质感，滑块具备真实的凸起立体感，
        鼠标悬停时以主题色高亮，拖拽时配合发光效果。
      </p>

      <div class="space-y-10">
        <!-- 基础用法 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">基础用法</h2>
          <p class="text-neu-text/70 mb-4">
            通过 <code class="px-1.5 py-0.5 rounded-md bg-[var(--bg-color)] shadow-neu-pressed-sm text-neu-accent font-mono text-sm">max-height</code>
            限制容器高度，内容超出后自动出现新拟态滚动条。
          </p>
          <div class="mb-4 p-6 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat">
            <NeuScrollbar max-height="280px">
              <div
                v-for="item in listItems"
                :key="item.id"
                class="flex items-center gap-4 px-4 py-3 rounded-xl my-2 first:mt-0 bg-[var(--bg-color)] shadow-neu-flat-sm hover:shadow-neu-pressed transition-all duration-200 cursor-default"
              >
                <div class="w-8 h-8 rounded-full bg-[var(--bg-color)] shadow-neu-pressed flex items-center justify-center text-xs font-bold text-neu-accent shrink-0">
                  {{ item.id }}
                </div>
                <div>
                  <div class="font-semibold text-neu-text text-sm">{{ item.label }}</div>
                  <div class="text-neu-text/50 text-xs">{{ item.desc }}</div>
                </div>
              </div>
            </NeuScrollbar>
          </div>
          <CodeBlock :code="basicUsage" />
        </section>

        <!-- 固定高度 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">固定高度</h2>
          <p class="text-neu-text/70 mb-4">
            使用 <code class="px-1.5 py-0.5 rounded-md bg-[var(--bg-color)] shadow-neu-pressed-sm text-neu-accent font-mono text-sm">height</code>
            设置容器固定高度（而非最大高度）。
          </p>
          <div class="mb-4 p-6 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat">
            <NeuScrollbar height="220px">
              <div class="space-y-3">
                <div
                  v-for="item in listItems.slice(0, 10)"
                  :key="item.id"
                  class="px-4 py-3 rounded-xl bg-[var(--bg-color)] shadow-neu-flat-sm text-neu-text/80 text-sm"
                >
                  {{ item.label }} — {{ item.desc }}
                </div>
              </div>
            </NeuScrollbar>
          </div>
          <CodeBlock :code="fixedHeightUsage" />
        </section>

        <!-- 自动隐藏 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">自动隐藏</h2>
          <p class="text-neu-text/70 mb-4">
            设置 <code class="px-1.5 py-0.5 rounded-md bg-[var(--bg-color)] shadow-neu-pressed-sm text-neu-accent font-mono text-sm">:auto-hide="true"</code>
            后，滚动条在静止时自动消失，滚动时显现。
          </p>
          <div class="mb-4 p-6 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat">
            <NeuScrollbar max-height="240px" :auto-hide="true">
              <div class="space-y-3">
                <div
                  v-for="item in listItems"
                  :key="item.id"
                  class="px-4 py-3 rounded-xl bg-[var(--bg-color)] shadow-neu-flat-sm text-neu-text/80 text-sm"
                >
                  {{ item.label }}
                </div>
              </div>
            </NeuScrollbar>
          </div>
          <CodeBlock :code="autoHideUsage" />
        </section>

        <!-- Props 表格 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">属性 (Props)</h2>
          <div class="rounded-2xl overflow-hidden shadow-neu-flat">
            <table class="w-full text-sm text-left">
              <thead class="bg-[var(--bg-color)] shadow-neu-pressed">
                <tr>
                  <th class="px-5 py-3 font-semibold text-neu-text/60">属性名</th>
                  <th class="px-5 py-3 font-semibold text-neu-text/60">类型</th>
                  <th class="px-5 py-3 font-semibold text-neu-text/60">默认值</th>
                  <th class="px-5 py-3 font-semibold text-neu-text/60">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-t border-[var(--shadow-dark)]/10">
                  <td class="px-5 py-3 font-mono text-neu-accent">height</td>
                  <td class="px-5 py-3 text-neu-text/70">string</td>
                  <td class="px-5 py-3 text-neu-text/50">'auto'</td>
                  <td class="px-5 py-3 text-neu-text/70">容器固定高度，如 '400px'</td>
                </tr>
                <tr class="border-t border-[var(--shadow-dark)]/10">
                  <td class="px-5 py-3 font-mono text-neu-accent">max-height</td>
                  <td class="px-5 py-3 text-neu-text/70">string</td>
                  <td class="px-5 py-3 text-neu-text/50">—</td>
                  <td class="px-5 py-3 text-neu-text/70">容器最大高度，超出后出现滚动条</td>
                </tr>
                <tr class="border-t border-[var(--shadow-dark)]/10">
                  <td class="px-5 py-3 font-mono text-neu-accent">auto-hide</td>
                  <td class="px-5 py-3 text-neu-text/70">boolean</td>
                  <td class="px-5 py-3 text-neu-text/50">false</td>
                  <td class="px-5 py-3 text-neu-text/70">是否在停止滚动后自动隐藏滚动条</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
