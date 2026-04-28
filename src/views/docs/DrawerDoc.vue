<script setup lang="ts">
import { ref } from 'vue'
import NeuDrawer from '../../components/neu/NeuDrawer.vue'
import NeuButton from '../../components/neu/NeuButton.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import NeuInput from '../../components/neu/NeuInput.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const showRight = ref(false)
const showLeft = ref(false)
const showBottom = ref(false)
const showTop = ref(false)

const inputValue = ref('')
const { isEn, pick, text } = useDocI18n()

const usageCode = pick(
  `
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
`,
  `
<script setup>
import { ref } from 'vue'
import NeuDrawer from './components/neu/NeuDrawer.vue'
import NeuButton from './components/neu/NeuButton.vue'

const showDrawer = ref(false)
<\/script>

<template>
  <NeuButton @click="showDrawer = true">Open drawer</NeuButton>

  <NeuDrawer
    v-model="showDrawer"
    title="Drawer title"
    placement="right"
    size="400px"
  >
    <p>Drawer content...</p>

    <template #footer>
      <div class="flex justify-end gap-4">
        <NeuButton @click="showDrawer = false">Cancel</NeuButton>
        <NeuButton variant="primary" @click="showDrawer = false">OK</NeuButton>
      </div>
    </template>
  </NeuDrawer>
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Drawer 抽屉', 'Drawer') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('从屏幕边缘滑出的面板组件，常用于包含表单、详情或设置面板。带有新拟态物理阴影和丝滑的滑入动画。', 'A panel that slides from the edge of the screen. Commonly used for forms, details, or settings. Includes neumorphic shadows and smooth animation.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法 (Placement)', 'Placement') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <div class="flex flex-wrap gap-4 justify-center">
          <NeuButton @click="showLeft = true">{{ pick('左侧滑出 (Left)', 'Left') }}</NeuButton>
          <NeuButton @click="showTop = true">{{ pick('顶部滑出 (Top)', 'Top') }}</NeuButton>
          <NeuButton @click="showBottom = true">{{ pick('底部滑出 (Bottom)', 'Bottom') }}</NeuButton>
          <NeuButton variant="primary" @click="showRight = true">{{ pick('右侧滑出 (Right)', 'Right') }}</NeuButton>
        </div>
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <!-- Drawers -->
    <NeuDrawer v-model="showRight" :title="text('编辑资料', 'Edit profile')" placement="right" size="400px">
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">{{ pick('用户名', 'Username') }}</label>
          <NeuInput v-model="inputValue" :placeholder="text('请输入用户名', 'Username')" />
        </div>
        <div>
          <label class="block text-sm font-bold text-neu-text/60 mb-2">{{ pick('个人简介', 'Bio') }}</label>
          <NeuInput v-model="inputValue" :placeholder="text('用一句话介绍自己...', 'Tell us about yourself...')" />
        </div>
      </div>
      
      <template #footer>
        <div class="flex justify-end gap-4">
          <NeuButton size="sm" @click="showRight = false">{{ pick('取消', 'Cancel') }}</NeuButton>
          <NeuButton size="sm" variant="primary" @click="showRight = false">{{ pick('保存修改', 'Save') }}</NeuButton>
        </div>
      </template>
    </NeuDrawer>

    <NeuDrawer v-model="showLeft" :title="text('左侧菜单', 'Left menu')" placement="left" size="300px">
      <p class="text-neu-text/80 leading-relaxed">
        {{ pick('这是一个从左侧滑出的抽屉。你可以把导航菜单放在这里。', 'This drawer slides from the left. You can put navigation here.') }}
      </p>
    </NeuDrawer>

    <NeuDrawer v-model="showBottom" :title="text('底部面板', 'Bottom panel')" placement="bottom" size="40vh">
      <p class="text-neu-text/80 leading-relaxed">
        {{ pick('这是一个从底部滑出的抽屉，常用于移动端的底部操作表 (Action Sheet)。', 'This drawer slides from the bottom. It is often used as a mobile action sheet.') }}
      </p>
    </NeuDrawer>

    <NeuDrawer v-model="showTop" :title="text('顶部面板', 'Top panel')" placement="top" size="300px">
      <p class="text-neu-text/80 leading-relaxed">
        {{ pick('这是一个从顶部滑出的抽屉。', 'This drawer slides from the top.') }}
      </p>
    </NeuDrawer>
  </div>
</template>
