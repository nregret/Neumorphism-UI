<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '../../components/CodeBlock.vue'
import NeuRate from '../../components/neu/NeuRate.vue'
import { useDocI18n } from './useDocI18n'

const value1 = ref(3)
const value2 = ref(4)
const { pick } = useDocI18n()

const basicUsage = pick(
  `<script setup>
import { ref } from 'vue'
const value = ref(3)
<\/script>

<template>
  <NeuRate v-model="value" />
</template>`
,
  `<script setup>
import { ref } from 'vue'
const value = ref(3)
<\/script>

<template>
  <NeuRate v-model="value" />
</template>`
)

const readonlyUsage = pick(`<NeuRate :model-value="4" readonly />`, `<NeuRate :model-value="4" readonly />`)
</script>

<template>
  <div class="space-y-12 max-w-4xl">
    <div>
      <h1 class="text-4xl font-bold mb-4 text-neu-text">{{ pick('Rate 评分', 'Rate') }}</h1>
      <p class="text-lg text-neu-text/70 mb-8">
        {{ pick('星级评分组件。未选中的星星内凹刻印，选中的星星外凸并带有强调色发光效果。', 'A star rating component. Unselected stars are pressed; selected stars are raised with an accent glow.') }}
      </p>

      <div class="space-y-8">
        <!-- 基础用法 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">{{ pick('基础用法', 'Basic') }}</h2>
          <p class="text-neu-text/70 mb-4">{{ pick('最基础的评分组件，支持鼠标悬停和点击。', 'Basic rating with hover and click interactions.') }}</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4 flex flex-col items-start gap-4">
            <NeuRate v-model="value1" />
            <span class="text-neu-text/60">{{ pick('当前评分:', 'Current:') }} {{ value1 }}</span>
          </div>
          <CodeBlock :code="basicUsage" />
        </section>

        <!-- 只读模式 -->
        <section>
          <h2 class="text-2xl font-bold mb-4 text-neu-text">{{ pick('只读模式', 'Readonly') }}</h2>
          <p class="text-neu-text/70 mb-4">{{ pick('设置', 'Set') }} <code>readonly</code> {{ pick('属性后不可修改，通常用于展示评分结果。', 'to prevent changes, typically used to display rating results.') }}</p>
          <div class="p-8 rounded-3xl bg-[var(--bg-color)] shadow-neu-flat mb-4">
            <NeuRate v-model="value2" readonly />
          </div>
          <CodeBlock :code="readonlyUsage" />
        </section>
      </div>
    </div>
  </div>
</template>
