<script setup lang="ts">
import CodeBlock from '../../components/CodeBlock.vue'
import NeuDivider from '../../components/neu/NeuDivider.vue'

const horizontalGroove = `<NeuDivider variant="groove" />`
const horizontalRidge = `<NeuDivider variant="ridge" />`
const verticalGroove = `<NeuDivider type="vertical" variant="groove" />`
</script>

<template>
  <div class="space-y-12 max-w-4xl">
    <div>
      <h1 class="text-4xl font-bold mb-4 text-neu-text">Divider 分割线</h1>
      <p class="text-lg text-neu-text/70 mb-8">
        区隔内容的分割线，支持内凹（沟槽）和外凸（脊线）两种立体质感。
      </p>

      <div class="space-y-8">
        <!-- 凹陷（沟槽）分割线 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">凹陷样式 (Groove)</h2>
          <p class="text-neu-text/70 mb-4">默认样式，像是刻在表面的一道凹槽。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <div>上方内容</div>
            <NeuDivider variant="groove" />
            <div>下方内容</div>
          </div>
          <CodeBlock :code="horizontalGroove" />
        </section>

        <!-- 凸起（脊线）分割线 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">外凸样式 (Ridge)</h2>
          <p class="text-neu-text/70 mb-4">像一条微微浮出表面的横条。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <div>上方内容</div>
            <NeuDivider variant="ridge" />
            <div>下方内容</div>
          </div>
          <CodeBlock :code="horizontalRidge" />
        </section>

        <!-- 垂直分割线 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">垂直方向</h2>
          <p class="text-neu-text/70 mb-4">使用 <code>type="vertical"</code> 创建垂直分割线。</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4 h-32 flex items-center justify-center">
            <span>左侧</span>
            <NeuDivider type="vertical" variant="groove" />
            <span>中间</span>
            <NeuDivider type="vertical" variant="ridge" />
            <span>右侧</span>
          </div>
          <CodeBlock :code="verticalGroove" />
        </section>
      </div>
    </div>
  </div>
</template>
