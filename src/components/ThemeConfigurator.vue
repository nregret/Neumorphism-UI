<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Palette, Copy, Check, Layers } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import NeuColorPicker from './neu/NeuColorPicker.vue'
import NeuButton from './neu/NeuButton.vue'
import NeuDrawer from './neu/NeuDrawer.vue'
import {
  DEFAULT_THEME_PALETTE,
  applyThemePalette,
  readThemePalette,
  saveThemePalette,
} from '../composables/useThemePalette'

defineOptions({ inheritAttrs: false })
const { t } = useI18n()

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
const radiusScale = ref(saved?.radiusScale ?? DEFAULT_THEME_PALETTE.radiusScale)
const radiusSm    = ref(saved?.radiusSm    ?? DEFAULT_THEME_PALETTE.radiusSm)
const radiusMd    = ref(saved?.radiusMd    ?? DEFAULT_THEME_PALETTE.radiusMd)
const radiusLg    = ref(saved?.radiusLg    ?? DEFAULT_THEME_PALETTE.radiusLg)

// ── Presets ──────────────────────────────────────────────
type Preset = { name: string; bg: string; accent: string; text: string }

const presets = computed<Preset[]>(() => [
  { name: t('theme.presets.classicLight'), bg: '#e0e5ec', accent: '#E89DB5', text: '#333333' },
  { name: t('theme.presets.darkMode'), bg: '#292d32', accent: '#E89DB5', text: '#e0e5ec' },
  { name: t('theme.presets.mintGreen'), bg: '#dcedc8', accent: '#2e7d32', text: '#33691e' },
  { name: t('theme.presets.morandi'), bg: '#e1bee7', accent: '#6a1b9a', text: '#4a148c' },
  { name: t('theme.presets.darkOrange'), bg: '#303030', accent: '#ff9800', text: '#f5f5f5' },
])

const applyPreset = (preset: Preset) => {
  baseColor.value   = preset.bg
  accentColor.value = preset.accent
  textColor.value   = preset.text
}

// ── Live update ───────────────────────────────────────────
const currentPalette = computed(() => ({
  bg:          baseColor.value,
  accent:      accentColor.value,
  text:        textColor.value,
  scale:       neuScale.value,
  depthSm:     depthSm.value,
  depthMd:     depthMd.value,
  depthLg:     depthLg.value,
  radiusScale: radiusScale.value,
  radiusSm:    radiusSm.value,
  radiusMd:    radiusMd.value,
  radiusLg:    radiusLg.value,
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

const resetRadius = () => {
  radiusScale.value = DEFAULT_THEME_PALETTE.radiusScale
  radiusSm.value    = DEFAULT_THEME_PALETTE.radiusSm
  radiusMd.value    = DEFAULT_THEME_PALETTE.radiusMd
  radiusLg.value    = DEFAULT_THEME_PALETTE.radiusLg
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

  /* Border-radius system */
  --neu-radius-scale: ${radiusScale.value};
  --neu-radius-sm:    ${(radiusSm.value * radiusScale.value).toFixed(1)}px;
  --neu-radius-md:    ${(radiusMd.value * radiusScale.value).toFixed(1)}px;
  --neu-radius-lg:    ${(radiusLg.value * radiusScale.value).toFixed(1)}px;
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
  <NeuDrawer v-model="isOpen" placement="right" size="400px" :title="$t('theme.drawerTitle')">
    <div class="space-y-8">

      <!-- Intro -->
      <p class="text-sm text-neu-text/70 leading-relaxed">
        {{ $t('theme.intro') }}
      </p>

      <!-- Presets -->
      <div class="space-y-3">
        <h3 class="text-sm font-bold text-neu-text flex items-center gap-2">
          <Palette class="w-4 h-4" /> {{ $t('theme.presetsTitle') }}
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
        <h3 class="text-sm font-bold text-neu-text border-b border-[var(--shadow-dark)]/10 pb-2">{{ $t('theme.customColorsTitle') }}</h3>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neu-text/80">{{ $t('theme.bgLabel') }}</span>
          <NeuColorPicker v-model="baseColor" />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neu-text/80">{{ $t('theme.accentLabel') }}</span>
          <NeuColorPicker v-model="accentColor" />
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-neu-text/80">{{ $t('theme.textLabel') }}</span>
          <NeuColorPicker v-model="textColor" />
        </div>
      </div>

      <!-- ── Depth System ────────────────────────────── -->
      <div class="space-y-5">
        <div class="flex items-center justify-between border-b border-[var(--shadow-dark)]/10 pb-2">
          <h3 class="text-sm font-bold text-neu-text flex items-center gap-2">
            <Layers class="w-4 h-4" /> {{ $t('theme.depthTitle') }}
          </h3>
          <button
            @click="resetDepths"
            class="text-xs text-neu-accent hover:underline"
          >{{ $t('common.reset') }}</button>
        </div>

        <!-- Global scale -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm text-neu-text/80">{{ $t('theme.depthScaleLabel') }}</label>
            <span class="text-sm font-mono font-bold text-neu-accent">× {{ neuScale.toFixed(2) }}</span>
          </div>
          <div class="px-1">
            <input
              v-model.number="neuScale"
              type="range" min="0.3" max="1.8" step="0.05"
              class="neu-range w-full"
            />
            <div class="flex justify-between text-[10px] text-neu-text/30 mt-1">
              <span>{{ $t('theme.depthScaleTicks.soft') }}</span><span>{{ $t('theme.depthScaleTicks.default') }}</span><span>{{ $t('theme.depthScaleTicks.strong') }}</span>
            </div>
          </div>

          <!-- Preview bubbles -->
          <div class="flex items-end gap-4 justify-center py-3">
            <div class="flex flex-col items-center gap-2">
              <div
                class="rounded-neu-md bg-[var(--bg-color)]"
                :style="{
                  width:'36px', height:'36px',
                  boxShadow: `${depthSm*neuScale}px ${depthSm*neuScale}px ${depthSm*neuScale*2.2}px ${shadowDark}, ${-depthSm*neuScale}px ${-depthSm*neuScale}px ${depthSm*neuScale*2.2}px ${shadowLight}`
                }"
              />
              <span class="text-[10px] text-neu-text/40">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div
                class="rounded-neu-md bg-[var(--bg-color)]"
                :style="{
                  width:'48px', height:'48px',
                  boxShadow: `${depthMd*neuScale}px ${depthMd*neuScale}px ${depthMd*neuScale*2.2}px ${shadowDark}, ${-depthMd*neuScale}px ${-depthMd*neuScale}px ${depthMd*neuScale*2.2}px ${shadowLight}`
                }"
              />
              <span class="text-[10px] text-neu-text/40">md</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div
                class="rounded-neu-md bg-[var(--bg-color)]"
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
              <label class="text-xs text-neu-text/60">{{ $t('theme.depthLevels.sm') }}</label>
              <span class="text-xs font-mono text-neu-text/60">{{ depthSm }}px</span>
            </div>
            <input v-model.number="depthSm" type="range" min="1" max="8"  step="1" class="neu-range w-full" />
          </div>
          <!-- md -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-neu-text/60">{{ $t('theme.depthLevels.md') }}</label>
              <span class="text-xs font-mono text-neu-text/60">{{ depthMd }}px</span>
            </div>
            <input v-model.number="depthMd" type="range" min="3" max="16" step="1" class="neu-range w-full" />
          </div>
          <!-- lg -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-neu-text/60">{{ $t('theme.depthLevels.lg') }}</label>
              <span class="text-xs font-mono text-neu-text/60">{{ depthLg }}px</span>
            </div>
            <input v-model.number="depthLg" type="range" min="6" max="24" step="1" class="neu-range w-full" />
          </div>
        </div>
      </div>

      <!-- ── Border-Radius System ──────────────────── -->
      <div class="space-y-5">
        <div class="flex items-center justify-between border-b border-[var(--shadow-dark)]/10 pb-2">
          <h3 class="text-sm font-bold text-neu-text flex items-center gap-2">
            <Layers class="w-4 h-4" /> {{ $t('theme.radiusTitle') }}
          </h3>
          <button
            @click="resetRadius"
            class="text-xs text-neu-accent hover:underline"
          >{{ $t('common.reset') }}</button>
        </div>

        <!-- Global radius scale -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm text-neu-text/80">{{ $t('theme.radiusScaleLabel') }}</label>
            <span class="text-sm font-mono font-bold text-neu-accent">× {{ radiusScale.toFixed(2) }}</span>
          </div>
          <div class="px-1">
            <input
              v-model.number="radiusScale"
              type="range" min="0.5" max="1.5" step="0.05"
              class="neu-range w-full"
            />
            <div class="flex justify-between text-[10px] text-neu-text/30 mt-1">
              <span>{{ $t('theme.radiusScaleTicks.sharp') }}</span><span>{{ $t('theme.radiusScaleTicks.default') }}</span><span>{{ $t('theme.radiusScaleTicks.round') }}</span>
            </div>
          </div>

          <!-- Preview dots -->
          <div class="flex items-end gap-4 justify-center py-3">
            <div class="flex flex-col items-center gap-2">
              <div
                class="bg-[var(--accent)]"
                :style="{
                  width:'36px', height:'36px',
                  borderRadius: `${radiusSm * radiusScale}px`
                }"
              />
              <span class="text-[10px] text-neu-text/40">sm</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div
                class="bg-[var(--accent)]"
                :style="{
                  width:'48px', height:'48px',
                  borderRadius: `${radiusMd * radiusScale}px`
                }"
              />
              <span class="text-[10px] text-neu-text/40">md</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div
                class="bg-[var(--accent)]"
                :style="{
                  width:'64px', height:'64px',
                  borderRadius: `${radiusLg * radiusScale}px`
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
              <label class="text-xs text-neu-text/60">{{ $t('theme.radiusLevels.sm') }}</label>
              <span class="text-xs font-mono text-neu-text/60">{{ radiusSm }}px</span>
            </div>
            <input v-model.number="radiusSm" type="range" min="4" max="16" step="1" class="neu-range w-full" />
          </div>
          <!-- md -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-neu-text/60">{{ $t('theme.radiusLevels.md') }}</label>
              <span class="text-xs font-mono text-neu-text/60">{{ radiusMd }}px</span>
            </div>
            <input v-model.number="radiusMd" type="range" min="8" max="28" step="1" class="neu-range w-full" />
          </div>
          <!-- lg -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-xs text-neu-text/60">{{ $t('theme.radiusLevels.lg') }}</label>
              <span class="text-xs font-mono text-neu-text/60">{{ radiusLg }}px</span>
            </div>
            <input v-model.number="radiusLg" type="range" min="12" max="40" step="1" class="neu-range w-full" />
          </div>
        </div>
      </div>

      <!-- Generated CSS -->
      <div class="space-y-3 pt-6 border-t border-[var(--shadow-dark)]/10">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-neu-text">{{ $t('theme.exportTitle') }}</h3>
          <NeuButton size="sm" variant="icon" @click="copyCSS" :title="$t('common.copy')">
            <Check v-if="copied" class="w-4 h-4 text-green-500" />
            <Copy v-else class="w-4 h-4 text-neu-text/70" />
          </NeuButton>
        </div>
        <div class="p-4 rounded-2xl bg-[#1e1e1e] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          <pre class="text-xs text-green-400 font-mono m-0 overflow-x-auto whitespace-pre-wrap leading-relaxed">{{ generatedCSS }}</pre>
        </div>
        <p class="text-xs text-neu-text/50">
          {{ $t('theme.exportHintPrefix') }} <code>:root</code> {{ $t('theme.exportHintSuffix') }}
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
