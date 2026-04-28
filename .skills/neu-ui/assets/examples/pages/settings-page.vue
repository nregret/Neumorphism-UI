<script setup lang="ts">
import { computed, ref } from 'vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'
import NeuCard from '../../library/components/neu/NeuCard.vue'
import NeuColorPicker from '../../library/components/neu/NeuColorPicker.vue'
import NeuDivider from '../../library/components/neu/NeuDivider.vue'
import NeuSelect from '../../library/components/neu/NeuSelect.vue'
import NeuSlider from '../../library/components/neu/NeuSlider.vue'
import NeuSwitch from '../../library/components/neu/NeuSwitch.vue'
import NeuTabs from '../../library/components/neu/NeuTabs.vue'

const activeTab = ref('appearance')
const tabs = [
  { label: '外观', value: 'appearance' },
  { label: '通知', value: 'notifications' },
  { label: '权限', value: 'permissions' },
]

const profileDensity = ref(48)
const accent = ref('#4f46e5')
const panelTone = ref('#e0e5ec')
const notificationMode = ref<'all' | 'mentions' | 'none'>('mentions')
const switches = ref({
  compactSidebar: true,
  commandHints: false,
  emailDigest: true,
  desktopPush: true,
})

const notificationOptions = [
  { label: '接收所有通知', value: 'all' },
  { label: '仅提及与指派', value: 'mentions' },
  { label: '全部关闭', value: 'none' },
]

const densityLabel = computed(() => {
  if (profileDensity.value <= 32) return '紧凑'
  if (profileDensity.value <= 56) return '平衡'
  return '舒展'
})
</script>

<template>
  <div class="min-h-screen bg-[var(--bg-color)] px-6 py-8 text-neu-text md:px-10">
    <div class="mx-auto max-w-6xl space-y-8">
      <header class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-2">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-neu-text/45">
            Settings Pattern
          </p>
          <h1 class="text-4xl font-bold">NeuUI 设置页模板</h1>
          <p class="max-w-3xl text-base leading-8 text-neu-text/68">
            这个页面展示如何把 NeuTabs、NeuSwitch、NeuSlider、NeuSelect 和 NeuColorPicker
            组合成一个层次稳定、便于扩展的设置工作台。
          </p>
        </div>

        <div class="flex gap-3">
          <NeuButton>恢复默认</NeuButton>
          <NeuButton variant="primary">保存更改</NeuButton>
        </div>
      </header>

      <NeuTabs v-model="activeTab" :items="tabs" variant="pills" />

      <div class="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div class="space-y-6">
          <NeuCard v-if="activeTab === 'appearance'" class="space-y-6 p-7">
            <div class="space-y-2">
              <h2 class="text-2xl font-bold">界面外观</h2>
              <p class="text-sm leading-7 text-neu-text/65">
                保持主题变量和新拟态深度体系的一致性，不在单个区块里另起一套样式规则。
              </p>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div class="space-y-3">
                <div class="text-sm font-medium text-neu-text/70">强调色 Accent</div>
                <NeuColorPicker v-model="accent" />
              </div>
              <div class="space-y-3">
                <div class="text-sm font-medium text-neu-text/70">面板背景色</div>
                <NeuColorPicker v-model="panelTone" />
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm font-medium text-neu-text/70">
                <span>信息密度</span>
                <span class="text-neu-accent">{{ densityLabel }} / {{ profileDensity }}</span>
              </div>
              <NeuSlider v-model="profileDensity" :min="24" :max="72" :step="4" />
            </div>

            <NeuDivider />

            <div class="grid gap-5 md:grid-cols-2">
              <div class="flex items-center justify-between rounded-neu-md p-4 shadow-neu-pressed">
                <div class="space-y-1">
                  <div class="font-medium">紧凑侧边栏</div>
                  <div class="text-sm text-neu-text/55">减少导航占用，提升信息密度</div>
                </div>
                <NeuSwitch v-model="switches.compactSidebar" />
              </div>

              <div class="flex items-center justify-between rounded-neu-md p-4 shadow-neu-pressed">
                <div class="space-y-1">
                  <div class="font-medium">命令提示</div>
                  <div class="text-sm text-neu-text/55">在关键入口展示操作建议</div>
                </div>
                <NeuSwitch v-model="switches.commandHints" />
              </div>
            </div>
          </NeuCard>

          <NeuCard v-else-if="activeTab === 'notifications'" class="space-y-6 p-7">
            <div class="space-y-2">
              <h2 class="text-2xl font-bold">通知偏好</h2>
              <p class="text-sm leading-7 text-neu-text/65">
                用卡片分区承载配置项，让高频切换和低频说明保持清楚分工。
              </p>
            </div>

            <div class="space-y-3">
              <div class="text-sm font-medium text-neu-text/70">接收策略</div>
              <NeuSelect v-model="notificationMode" :options="notificationOptions" />
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div class="flex items-center justify-between rounded-neu-md p-4 shadow-neu-pressed">
                <div class="space-y-1">
                  <div class="font-medium">邮件汇总</div>
                  <div class="text-sm text-neu-text/55">每日发送一次摘要</div>
                </div>
                <NeuSwitch v-model="switches.emailDigest" />
              </div>

              <div class="flex items-center justify-between rounded-neu-md p-4 shadow-neu-pressed">
                <div class="space-y-1">
                  <div class="font-medium">桌面推送</div>
                  <div class="text-sm text-neu-text/55">浏览器实时提醒</div>
                </div>
                <NeuSwitch v-model="switches.desktopPush" />
              </div>
            </div>
          </NeuCard>

          <NeuCard v-else class="space-y-6 p-7">
            <div class="space-y-2">
              <h2 class="text-2xl font-bold">权限提示</h2>
              <p class="text-sm leading-7 text-neu-text/65">
                在权限页里尽量避免过度装饰，把说明、风险和确认操作分成清楚的几层。
              </p>
            </div>

            <div class="rounded-neu-lg p-6 shadow-neu-pressed">
              <div class="space-y-2">
                <div class="text-lg font-semibold">仅管理员可编辑权限策略</div>
                <p class="max-w-2xl text-sm leading-7 text-neu-text/60">
                  如果页面承载的是高风险配置，优先考虑在底部加入二次确认或 Popconfirm，
                  不要把危险操作隐藏成普通文本链接。
                </p>
              </div>
            </div>
          </NeuCard>
        </div>

        <aside class="space-y-6">
          <NeuCard class="space-y-5 p-6">
            <div class="space-y-2">
              <h3 class="text-xl font-bold">当前主题取值</h3>
              <p class="text-sm leading-7 text-neu-text/60">
                页面层面只消费主题变量，不重新创造新的阴影和圆角尺度。
              </p>
            </div>

            <div class="space-y-3 text-sm">
              <div class="flex items-center justify-between rounded-neu-md p-4 shadow-neu-pressed">
                <span>Accent</span>
                <span class="font-mono text-neu-accent">{{ accent }}</span>
              </div>
              <div class="flex items-center justify-between rounded-neu-md p-4 shadow-neu-pressed">
                <span>Panel</span>
                <span class="font-mono text-neu-text/70">{{ panelTone }}</span>
              </div>
              <div class="flex items-center justify-between rounded-neu-md p-4 shadow-neu-pressed">
                <span>Density</span>
                <span class="font-medium">{{ densityLabel }}</span>
              </div>
            </div>
          </NeuCard>
        </aside>
      </div>
    </div>
  </div>
</template>
