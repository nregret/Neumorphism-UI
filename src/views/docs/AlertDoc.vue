<script setup lang="ts">
import NeuAlert from '../../components/neu/NeuAlert.vue'
import NeuCard from '../../components/neu/NeuCard.vue'
import CodeBlock from '../../components/CodeBlock.vue'
import { useDocI18n } from './useDocI18n'

const { isEn, pick } = useDocI18n()

const usageCode = pick(
  `
<script setup>
import NeuAlert from './components/neu/NeuAlert.vue'
<\/script>

<template>
  <!-- 基础用法 -->
  <NeuAlert description="这是一条普通提示信息。" />
  
  <!-- 带标题和语义颜色的用法 -->
  <NeuAlert variant="success" title="操作成功" description="您的订单已提交并正在处理中。" />
  
  <!-- 可关闭的警告框 -->
  <NeuAlert variant="warning" title="系统维护警告" closable>
    系统将在今晚 00:00 - 04:00 进行停机维护，请提前保存您的工作进度以免丢失数据。
  </NeuAlert>
</template>
`,
  `
<script setup>
import NeuAlert from './components/neu/NeuAlert.vue'
<\/script>

<template>
  <!-- Basic -->
  <NeuAlert description="This is an informational message." />

  <!-- With title + variant -->
  <NeuAlert variant="success" title="Success" description="Your order has been submitted and is being processed." />

  <!-- Closable -->
  <NeuAlert variant="warning" title="Maintenance Notice" closable>
    The system will be down for maintenance tonight from 00:00 to 04:00. Please save your work in advance.
  </NeuAlert>
</template>
`
)
</script>

<template>
  <div class="space-y-12">
    <section>
      <h1 class="text-4xl font-bold mb-4">{{ pick('Alert 警告提示', 'Alert') }}</h1>
      <p class="text-neu-text/80 text-lg">
        {{ pick('在页面上展示重要的全局或局部提示信息，采用内凹阴影 (`pressed`) 作为容器背景，并使用悬浮图标传达状态。', 'Show global or local messages with a pressed container and a floating status icon.') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('基础用法 (Basic)', 'Basic') }}</h2>
      <NeuCard class="flex flex-col gap-8 p-12 bg-[var(--bg-color)] max-w-3xl">
        <NeuAlert :description="isEn ? 'This is a simple informational message.' : '这是一条普通提示信息，不需要用户立即处理。'" />
      </NeuCard>
      <CodeBlock :code="usageCode" language="html" />
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('不同状态 (Variants)', 'Variants') }}</h2>
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-3xl">
        <NeuAlert
          variant="info"
          :title="isEn ? 'Notice' : '系统通知'"
          :description="isEn ? 'A new version is available with more neumorphic components.' : '我们发布了新版本，新增了多个新拟态组件，快来体验吧！'"
        />
        <NeuAlert
          variant="success"
          :title="isEn ? 'Success' : '操作成功'"
          :description="isEn ? 'Your settings have been saved.' : '您的配置已保存并生效。'"
        />
        <NeuAlert
          variant="warning"
          :title="isEn ? 'Network unstable' : '网络不稳定'"
          :description="isEn ? 'Network latency detected. Some data may not sync in real time.' : '当前网络连接存在延迟，部分数据可能无法实时同步。'"
        />
        <NeuAlert
          variant="error"
          :title="isEn ? 'Upload failed' : '上传失败'"
          :description="isEn ? 'Unsupported file format. Please upload PNG or JPG.' : '文件格式不支持，请上传 PNG 或 JPG 格式的图片。'"
        />
      </NeuCard>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-6">{{ pick('可关闭 (Closable)', 'Closable') }}</h2>
      <NeuCard class="flex flex-col gap-6 p-12 bg-[var(--bg-color)] max-w-3xl">
        <NeuAlert 
          variant="info" 
          :title="isEn ? 'Closable alert' : '可关闭的提示框'"
          :description="isEn ? 'Click the close button to hide this alert with a smooth transition.' : '点击右侧的关闭按钮可以隐藏此提示框。关闭时带有丝滑的过渡动画。'"
          closable 
        />
        <NeuAlert 
          variant="warning" 
          closable 
        >
          {{ isEn ? 'A closable warning alert without a title (slot content only).' : '这是一个没有标题，只有内容插槽的可关闭警告框。' }}
        </NeuAlert>
      </NeuCard>
    </section>
  </div>
</template>
