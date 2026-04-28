<script setup lang="ts">
import { ref } from 'vue'
import NeuPagination from '../../components/neu/NeuPagination.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const currentPage1 = ref(1)
const currentPage2 = ref(5)
const currentPage3 = ref(2)
const { isEn, pick } = useDocI18n()

const usageCode = pick(
  `
<script setup>
import { ref } from 'vue'
import NeuPagination from './components/neu/NeuPagination.vue'

const currentPage = ref(1)
<\/script>

<template>
  <!-- 基础分页 -->
  <NeuPagination 
    v-model="currentPage" 
    :total="100" 
    :pageSize="10" 
  />
  
  <!-- 禁用状态 -->
  <NeuPagination 
    v-model="currentPage" 
    :total="100" 
    disabled 
  />
</template>
`,
  `
<script setup>
import { ref } from 'vue'
import NeuPagination from './components/neu/NeuPagination.vue'

const currentPage = ref(1)
<\/script>

<template>
  <NeuPagination v-model="currentPage" :total="100" :pageSize="10" />
  <NeuPagination v-model="currentPage" :total="100" disabled />
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Pagination 分页', 'Pagination') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('带有新拟态物理质感的分页组件，当前激活的页码呈现内凹的按压状态。', 'A neumorphic pagination component. The active page is shown as a pressed state.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法 (Basic)', 'Basic') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-4xl">
        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('常规数量 (少于 7 页)', 'Few pages (< 7)') }}</h3>
          <NeuPagination v-model="currentPage1" :total="50" :pageSize="10" />
        </div>

        <hr class="border-[var(--shadow-dark)]/20 my-4" />

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('较多数量 (带省略号) 当前页:', 'Many pages (ellipsis) Page:') }} {{ currentPage2 }}</h3>
          <NeuPagination v-model="currentPage2" :total="200" :pageSize="10" />
        </div>

        <hr class="border-[var(--shadow-dark)]/20 my-4" />

        <div>
          <h3 class="font-bold text-sm mb-4 text-neu-text/60">{{ pick('禁用状态 (Disabled)', 'Disabled') }}</h3>
          <NeuPagination v-model="currentPage3" :total="100" :pageSize="10" disabled />
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>
  </div>
</template>
