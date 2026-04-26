<script setup lang="ts">
import { ref } from 'vue'
import NeuDrawer from '../../components/neu/NeuDrawer.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import NeuInput from '../../components/neu/NeuInput.vue'
import CodeBlock from '../../components/CodeBlock.vue'

const showRight = ref(false)
const showLeft = ref(false)
const showBottom = ref(false)
const showTop = ref(false)

const inputValue = ref('')

const usageCode = `
<script setup>
import { ref } from 'vue'
import NeuDrawer from './components/neu/NeuDrawer.vue'
import NeuButton from './components/neu/NeuButton.vue'

const showDrawer = ref(false)
<\/script>

<template>
  <NeuButton @click="showDrawer = true">打开抽屉</NeuButton>

  <NeuDrawer 
    v-model="showDrawer" 
    title="抽屉标题" 
    placement="right" 
    size="400px"
  >
    <p>这里是抽屉的内容区域...</p>
    
    <template #footer>
      <div class="flex justify-end gap-4">
        <NeuButton @click="showDrawer = false">取消</NeuButton>
        <NeuButton variant="primary" @click="showDrawer = false">确认</NeuButton>
      </div>
    </template>
  </NeuDrawer>
</template>
`
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">Drawer 抽屉</h1>
      <p class="text-neu-text/80 text-lg">
        从屏幕边缘滑出的面板组件，常用于包含表单、详情或设置面板。带有新拟态物理阴影和丝滑的滑入动画。
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">基础用法 (Placement)</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div class="flex flex-wrap gap-4 justify-center">
          <NeuButton @click="showLeft = true">左侧滑出 (Left)</NeuButton>
          <NeuButton @click="showTop = true">顶部滑出 (Top)</NeuButton>
          <NeuButton @click="showBottom = true">底部滑出 (Bottom)</NeuButton>
          <NeuButton variant="primary" @click="showRight = true">右侧滑出 (Right)</NeuButton>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <!-- Drawers -->
    <NeuDrawer v-model="showRight" title="编辑资料" placement="right" size="400px">
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">用户名</label>
          <NeuInput v-model="inputValue" placeholder="请输入用户名" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">个人简介</label>
          <NeuInput v-model="inputValue" placeholder="用一句话介绍自己..." />
        </div>
      </div>
      
      <template #footer>
        <div class="flex justify-end gap-4">
          <NeuButton size="sm" @click="showRight = false">取消</NeuButton>
          <NeuButton size="sm" variant="primary" @click="showRight = false">保存修改</NeuButton>
        </div>
      </template>
    </NeuDrawer>

    <NeuDrawer v-model="showLeft" title="左侧菜单" placement="left" size="300px">
      <p class="text-neu-text/80 leading-relaxed">
        这是一个从左侧滑出的抽屉。你可以把导航菜单放在这里。
      </p>
    </NeuDrawer>

    <NeuDrawer v-model="showBottom" title="底部面板" placement="bottom" size="40vh">
      <p class="text-neu-text/80 leading-relaxed">
        这是一个从底部滑出的抽屉，常用于移动端的底部操作表 (Action Sheet)。
      </p>
    </NeuDrawer>

    <NeuDrawer v-model="showTop" title="顶部面板" placement="top" size="300px">
      <p class="text-neu-text/80 leading-relaxed">
        这是一个从顶部滑出的抽屉。
      </p>
    </NeuDrawer>
  </div>
</template>
