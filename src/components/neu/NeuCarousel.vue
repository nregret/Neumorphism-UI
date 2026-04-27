<script setup lang="ts" generic="T = unknown">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import NeuButton from './NeuButton.vue'

interface Props {
  items: T[]
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showDots?: boolean
  /** 切换效果：slide（滑动）| fade（淡入淡出） */
  effect?: 'slide' | 'fade'
  /** 是否显示进度条（在 dots 下方） */
  showProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: true,
  interval: 3000,
  showArrows: true,
  showDots: true,
  effect: 'slide',
  showProgress: false,
})

const currentIndex = ref(0)
const prevIndex = ref(0)
const isAnimating = ref(false)
let timer: ReturnType<typeof setInterval> | null = null
let progressTimer: ReturnType<typeof setInterval> | null = null
const progressValue = ref(0)

const next = () => {
  if (isAnimating.value) return
  prevIndex.value = currentIndex.value
  isAnimating.value = true
  currentIndex.value = (currentIndex.value + 1) % props.items.length
  setTimeout(() => { isAnimating.value = false }, 600)
  resetProgress()
}

const prev = () => {
  if (isAnimating.value) return
  prevIndex.value = currentIndex.value
  isAnimating.value = true
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
  setTimeout(() => { isAnimating.value = false }, 600)
  resetProgress()
}

const goTo = (index: number) => {
  if (index === currentIndex.value || isAnimating.value) return
  prevIndex.value = currentIndex.value
  isAnimating.value = true
  currentIndex.value = index
  setTimeout(() => { isAnimating.value = false }, 600)
  resetProgress()
}

const resetProgress = () => {
  progressValue.value = 0
}

const startProgress = () => {
  if (!props.showProgress) return
  progressTimer = setInterval(() => {
    progressValue.value += (100 / (props.interval! / 50))
    if (progressValue.value >= 100) progressValue.value = 100
  }, 50)
}

const stopProgress = () => {
  if (progressTimer) { clearInterval(progressTimer); progressTimer = null }
}

const startAutoPlay = () => {
  if (props.autoPlay && props.items.length > 1) {
    timer = setInterval(next, props.interval)
    resetProgress()
    startProgress()
  }
}

const stopAutoPlay = () => {
  if (timer) { clearInterval(timer); timer = null }
  stopProgress()
}

onMounted(() => startAutoPlay())
onUnmounted(() => { stopAutoPlay() })

// Slide track position
const trackStyle = computed(() => {
  if (props.effect !== 'slide') return {}
  return { transform: `translateX(-${currentIndex.value * 100}%)` }
})
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-[2rem] bg-[var(--bg-color)] shadow-neu-pressed"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <!-- Inner frame with subtle outer shadow -->
    <div
      class="m-2 rounded-[1.5rem] overflow-hidden relative shadow-neu-flat-sm"
    >
      <!-- ── SLIDE effect ─────────────────── -->
      <template v-if="effect === 'slide'">
        <div
          class="flex transition-transform duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)] h-full w-full"
          :style="trackStyle"
        >
          <div
            v-for="(item, index) in items"
            :key="index"
            class="w-full h-full flex-shrink-0 min-w-full"
          >
            <slot :item="item" :index="index" />
          </div>
        </div>
      </template>

      <!-- ── FADE effect ──────────────────── -->
      <template v-else>
        <div class="relative w-full h-full min-h-[inherit]">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
            :style="{
              opacity: index === currentIndex ? 1 : 0,
              transform: index === currentIndex ? 'scale(1)' : 'scale(1.03)',
              zIndex: index === currentIndex ? 1 : 0,
            }"
          >
            <slot :item="item" :index="index" />
          </div>
        </div>
      </template>

      <!-- ── Navigation Arrows ─────────────── -->
      <template v-if="showArrows && items.length > 1">
        <!-- Prev -->
        <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <NeuButton
            variant="icon"
            shape="circle"
            size="sm"
            @click.stop="prev"
            aria-label="Previous slide"
            class="bg-[var(--bg-color)]/80 backdrop-blur-sm shadow-neu-flat"
          >
            <ChevronLeft class="w-5 h-5" />
          </NeuButton>
        </div>
        <!-- Next -->
        <div class="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <NeuButton
            variant="icon"
            shape="circle"
            size="sm"
            @click.stop="next"
            aria-label="Next slide"
            class="bg-[var(--bg-color)]/80 backdrop-blur-sm shadow-neu-flat"
          >
            <ChevronRight class="w-5 h-5" />
          </NeuButton>
        </div>
      </template>

      <!-- ── Dots + Progress ───────────────── -->
      <div
        v-if="showDots && items.length > 1"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <!-- Dot indicators -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-color)]/60 backdrop-blur-sm shadow-neu-pressed-sm">
          <button
            v-for="(_, index) in items"
            :key="index"
            @click.stop="goTo(index)"
            :aria-label="`Go to slide ${index + 1}`"
            class="transition-all duration-350 ease-out rounded-full"
            :class="[
              index === currentIndex
                ? 'w-6 h-2 bg-[var(--accent)] opacity-100 shadow-[0_0_10px_var(--accent)]'
                : 'w-2 h-2 bg-[var(--shadow-dark)] opacity-45'
            ]"
          />
        </div>

        <!-- Optional progress bar -->
        <div
          v-if="showProgress"
          class="w-24 h-1 rounded-full overflow-hidden"
          style="background: var(--shadow-dark); opacity: 0.25;"
        >
          <div
            class="h-full rounded-full transition-none"
            :style="{
              width: `${progressValue}%`,
              background: 'var(--accent)',
              opacity: 1,
            }"
          />
        </div>
      </div>

      <!-- ── Slide counter badge (top-right) ─ -->
      <div
        v-if="items.length > 1"
        class="absolute top-3 right-3 z-10 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-lg bg-[var(--bg-color)]/70 backdrop-blur-sm text-[var(--text-color)] opacity-70 shadow-neu-flat-sm"
      >
        {{ currentIndex + 1 }} / {{ items.length }}
      </div>
    </div>
  </div>
</template>
