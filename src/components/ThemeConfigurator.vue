<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Palette, Copy, Check, Layers } from 'lucide-vue-next'
import NeuColorPicker from './neu/NeuColorPicker.vue'
import NeuButton from './neu/NeuButton.vue'
import NeuDrawer from './neu/NeuDrawer.vue'
import {
  DEFAULT_THEME_PALETTE,
  applyThemePalette,
  readThemePalette,
  saveThemePalette,
} from '../composables/useThemePalette'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const saved = readThemePalette()
const baseColor   = ref(saved?.bg      ?? DEFAULT_THEME_PALETTE.bg)
const accentColor = ref(saved?.accent  ?? DEFAULT_THEME_PALETTE.accent)
const textColor   = ref(saved?.text    ?? DEFAULT_THEME_PALETTE.text)
const neuScale    = ref(saved?.scale   ?? DEFAULT_THEME_PALETTE.scale)
const depthSm     = ref(saved?.depthSm ?? DEFAULT_THEME_PALETTE.depthSm)
const depthMd     = ref(saved?.depthMd ?? DEFAULT_THEME_PALETTE.depthMd)
const depthLg     = ref(saved?.depthLg ?? DEFAULT_THEME_PALETTE.depthLg)

// ── Presets ──────────────────────────────────────────────
const presets = [
  { name: '经典白 (Classic Light)', bg: '#e0e5ec', accent: '#4f46e5', text: '#333333' },
  { name: '深邃黑 (Dark Mode)',      bg: '#292d32', accent: '#6366f1', text: '#e0e5ec' },
  { name: '薄荷绿 (Mint Green)',     bg: '#dcedc8', accent: '#2e7d32', text: '#33691e' },
  { name: '莫兰迪紫 (Morandi)',      bg: '#e1bee7', accent: '#6a1b9a', text: '#4a148c' },
  { name: '暗橙灰 (Dark Orange)',    bg: '#303030', accent: '#ff9800', text: '#f5f5f5' },
]

const applyPreset = (preset: (typeof presets)[0]) => {
  baseColor.value   = preset.bg
  accentColor.value = preset.accent
  textColor.value   = preset.text
}

// ── Live update ───────────────────────────────────────────
const currentPalette = computed(() => ({
  bg:      baseColor.value,
  accent:  accentColor.value,
  text:    textColor.value,
  scale:   neuScale.value,
  depthSm: depthSm.value,
  depthMd: depthMd.value,
  depthLg: depthLg.value,
}))

watch(
  currentPalette,
  (p) => {
    applyThemePalette(p)
    saveThemePalette(p)
  },
  { immediate: true, deep: true }
)

const resetDepths = () => {
  neuScale.value = DEFAULT_THEME_PALETTE.scale
  depthSm.value  = DEFAULT_THEME_PALETTE.depthSm
  depthMd.value  = DEFAULT_THEME_PALETTE.depthMd
  depthLg.value  = DEFAULT_THEME_PALETTE.depthLg
}

// ── Shadow helpers (for preview dots) ────────────────────
const blendColor = (hex: string, amount: number, isLighten: boolean) => {
  let r = parseInt(hex.substring(1, 3), 16)
  let g = parseInt(hex.substring(3, 5), 16)
  let b = parseInt(hex.substring(5, 7), 16)
  if (isLighten) {
    r = Math.round(r + (255 - r) * amount)
    g = Math.round(g + (255 - g) * amount)
    b = Math.round(b + (255 - b) * amount)
  } else {
    r = Math.round(r * (1 - amount))
    g = Math.round(g * (1 - amount))
    b = Math.round(b * (1 - amount))
  }
  const h = (c: number) => Math.max(0, Math.min(255, c)).toString(16).padStart(2, '0')
  return `#${h(r)}${h(g)}${h(b)}`
}
const shadowLight = computed(() => blendColor(baseColor.value, parseInt(baseColor.value.substring(1, 3), 16) < 100 ? 0.15 : 0.4, true))
const shadowDark  = computed(() => blendColor(baseColor.value, parseInt(baseColor.value.substring(1, 3), 16) < 100 ? 0.3  : 0.15, false))

// ── Generated CSS export ─────────────────────────────────
const generatedCSS = computed(() => `:root {
  --bg-color:     ${baseColor.value};
  --text-color:   ${textColor.value};
  --shadow-light: ${shadowLight.value};
  --shadow-dark:  ${shadowDark.value};
  --accent:       ${accentColor.value};

  /* Depth system */
  --neu-scale:    ${neuScale.value};
  --neu-d1:       ${(depthSm.value * neuScale.value).toFixed(1)}px;
  --neu-d1-n:     ${(-depthSm.value * neuScale.value).toFixed(1)}px;
  --neu-b1:       ${(depthSm.value * neuScale.value * 2.2).toFixed(1)}px;
  --neu-d2:       ${(depthMd.value * neuScale.value).toFixed(1)}px;
  --neu-d2-n:     ${(-depthMd.value * neuScale.value).toFixed(1)}px;
  --neu-b2:       ${(depthMd.value * neuScale.value * 2.2).toFixed(1)}px;
  --neu-d3:       ${(depthLg.value * neuScale.value).toFixed(1)}px;
  --neu-d3-n:     ${(-depthLg.value * neuScale.value).toFixed(1)}px;
  --neu-b3:       ${(depthLg.value * neuScale.value * 2.2).toFixed(1)}px;
}`)

const copied = ref(false)
const copyCSS = async () => {
  try {
    await navigator.clipboard.writeText(generatedCSS.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {}
}
</script>

<template>
  <NeuDrawer v-model="isOpen" placement="right" size="400px" title="主题配置 (Theme)">
    <div class="space-y-8">

      <!-- Intro -->
      <p class="text-sm text-neu-text/70 leading-relaxed">
        调整颜色与阴影深度，系统会实时应用到整个页面，并自动计算适配新拟态效果的阴影颜色。
      </p>

      <!-- Presets -->
      <div class="space-y-3">
        <h3 class="text-sm font-bold text-neu-text flex items-center gap-2">
          <Palette class="w-4 h-4" /> 预设主题
        </h3>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="preset in presets"
            :key="preset.name"
            @click="applyPreset(preset)"
            class="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-neu-flat border-2 border-[var(--bg-color)]"
            :style="{ backgroundColor: preset.bg }"
            :title="preset.name"
          />
        </div>
      </div>

      <!-- Color Pickers -->
      <div class="space-y-5">
        <h3 class="text-sm font-bold text-neu-text border-b border-[var(--shadow-dark)]/10 pb-2">自定义颜色</h3>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neu-text/80">基础背景色</span>
          <NeuColorPicker v-model="baseColor" />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neu-text/80">强调色 (Accent)</span>
          <NeuColorPicker v-model="accentColor" />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neu-text/80">文本色 (Text)</span>
          <NeuColorPicker v-model="textColor" />
        </div>
      </div>

      <!-- ── Depth System ────────────────────────────── -->
      <div class="space-y-5">
        <div class="flex items-center justify-between border-b border-[var(--shadow-dark)]/10 pb-2">
          <h3 class="text-sm font-bold text-neu-text flex items-center gap-2">
            <Layers class="w-4 h-4" /> 阴影深度
          </h3>
          <button
            @click="resetDepths"
            class="text-xs text-neu-accent hover:underline"
          >重置</button>
        </div>

        <!-- Global scale -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm text-neu-text/80">全局深度乘数 (Scale)</label>
            <span class="text-sm font-mono font-bold text-neu-accent">× {{ neuScale.toFixed(2) }}</span>
          </div>
          <div class="px-1">
            <input
              v-model.number="neuScale"
              type="range" min="0.3" max="1.8" step="0.05"
              class="neu-range w-full"
            />
            <div class="flex justify-between text-[10px] text-neu-text/30 mt-1">
              <span>极柔 0.3</span><span>默认 1.0</span><span>强烈 1.8</span>
            </div>
          </div>

          <!-- Preview bubbles -->
          <div class="flex items-end gap-4 justify-center py-3">
            <div class="flex flex-col items-center gap-2">
              <div
                class="rounded-2xl bg-[var(--bg-color)]"
                :style="{
                  width:'36px', height:'36px',
                  boxShadow: `${depthSm*neuScale}px ${depthSm*neuScale}px ${depthSm*neuScale*2.2}px ${shadowDark}, ${-depthSm*neuScale}px ${-depthSm*neuScale}px ${depthSm*neuScale*2.2}px ${shadowLight}`
                }"
              />
              <span class="text-[10px] text-neu-text/40">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div
                class="rounded-2xl bg-[var(--bg-color)]"
                :style="{
                  width:'48px', height:'48px',
                  boxShadow: `${depthMd*neuScale}px ${depthMd*neuScale}px ${depthMd*neuScale*2.2}px ${shadowDark}, ${-depthMd*neuScale}px ${-depthMd*neuScale}px ${depthMd*neuScale*2.2}px ${shadowLight}`
                }"
              />
              <span class="text-[10px] text-neu-text/40">md</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div
                class="rounded-2xl bg-[var(--bg-color)]"
                :style="{
                  width:'64px', height:'64px',
                  boxShadow: `${depthLg*neuScale}px ${depthLg*neuScale}px ${depthLg*neuScale*2.2}px ${shadowDark}, ${-depthLg*neuScale}px ${-depthLg*neuScale}px ${depthLg*neuScale*2.2}px ${shadowLight}`
                }"
              />
              <span class="text-[10px] text-neu-text/40">lg</span>
            </div>
          </div>
        </div>

        <!-- Per-level fine tuning -->
        <div class="space-y-4 pt-1">
          <!-- sm -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-neu-text/60">sm — 精细 (搜索框 / 滚动条)</label>
              <span class="text-xs font-mono text-neu-text/60">{{ depthSm }}px</span>
            </div>
            <input v-model.number="depthSm" type="range" min="1" max="8"  step="1" class="neu-range w-full" />
          </div>
          <!-- md -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-neu-text/60">md — 通用 (卡片 / 按钮)</label>
              <span class="text-xs font-mono text-neu-text/60">{{ depthMd }}px</span>
            </div>
            <input v-model.number="depthMd" type="range" min="3" max="16" step="1" class="neu-range w-full" />
          </div>
          <!-- lg -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-neu-text/60">lg — 主体 (面板 / 侧边栏)</label>
              <span class="text-xs font-mono text-neu-text/60">{{ depthLg }}px</span>
            </div>
            <input v-model.number="depthLg" type="range" min="6" max="24" step="1" class="neu-range w-full" />
          </div>
        </div>
      </div>

      <!-- Generated CSS -->
      <div class="space-y-3 pt-6 border-t border-[var(--shadow-dark)]/10">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-neu-text">导出 CSS 变量</h3>
          <NeuButton size="sm" variant="icon" @click="copyCSS" title="复制">
            <Check v-if="copied" class="w-4 h-4 text-green-500" />
            <Copy v-else class="w-4 h-4 text-neu-text/70" />
          </NeuButton>
        </div>
        <div class="p-4 rounded-2xl bg-[#1e1e1e] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          <pre class="text-xs text-green-400 font-mono m-0 overflow-x-auto whitespace-pre-wrap leading-relaxed">{{ generatedCSS }}</pre>
        </div>
        <p class="text-xs text-neu-text/50">
          将上方代码复制并粘贴到你项目的 <code>:root</code> 下即可生效。
        </p>
      </div>

    </div>
  </NeuDrawer>
</template>

<style scoped>
/* Neumorphic range slider */
.neu-range {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 999px;
  background: var(--bg-color);
  box-shadow: inset 2px 2px 5px var(--shadow-dark), inset -2px -2px 5px var(--shadow-light);
  outline: none;
  cursor: pointer;
}

.neu-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--bg-color);
  box-shadow: 2px 2px 5px var(--shadow-dark), -2px -2px 5px var(--shadow-light);
  cursor: grab;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.neu-range::-webkit-slider-thumb:active {
  cursor: grabbing;
  box-shadow: inset 2px 2px 5px var(--shadow-dark), inset -2px -2px 5px var(--shadow-light);
  transform: scale(0.92);
}

.neu-range::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: var(--bg-color);
  box-shadow: 2px 2px 5px var(--shadow-dark), -2px -2px 5px var(--shadow-light);
  cursor: grab;
}
</style>
