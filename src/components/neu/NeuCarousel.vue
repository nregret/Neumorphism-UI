<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  items: unknown[]
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
    class="relative w-full overflow-hidden rounded-[2rem] bg-[var(--bg-color)]"
    style="box-shadow: inset var(--neu-d2) var(--neu-d2) var(--neu-b2) var(--shadow-dark), inset var(--neu-d2-n) var(--neu-d2-n) var(--neu-b2) var(--shadow-light);"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <!-- Inner frame with subtle outer shadow -->
    <div
      class="m-2 rounded-[1.5rem] overflow-hidden relative"
      style="box-shadow: var(--neu-d1) var(--neu-d1) var(--neu-b1) var(--shadow-dark), var(--neu-d1-n) var(--neu-d1-n) var(--neu-b1) var(--shadow-light);"
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
        <button
          @click.stop="prev"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 group"
          style="
            background: color-mix(in srgb, var(--bg-color) 70%, transparent);
            backdrop-filter: blur(8px);
            box-shadow: var(--neu-d2) var(--neu-d2) var(--neu-b2) var(--shadow-dark), var(--neu-d2-n) var(--neu-d2-n) var(--neu-b2) var(--shadow-light);
          "
          aria-label="Previous slide"
        >
          <ChevronLeft class="w-5 h-5 text-neu-text/50 group-hover:text-neu-accent transition-colors duration-200 -ml-0.5" />
        </button>
        <!-- Next -->
        <button
          @click.stop="next"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 group"
          style="
            background: color-mix(in srgb, var(--bg-color) 70%, transparent);
            backdrop-filter: blur(8px);
            box-shadow: var(--neu-d2) var(--neu-d2) var(--neu-b2) var(--shadow-dark), var(--neu-d2-n) var(--neu-d2-n) var(--neu-b2) var(--shadow-light);
          "
          aria-label="Next slide"
        >
          <ChevronRight class="w-5 h-5 text-neu-text/50 group-hover:text-neu-accent transition-colors duration-200 ml-0.5" />
        </button>
      </template>

      <!-- ── Dots + Progress ───────────────── -->
      <div
        v-if="showDots && items.length > 1"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <!-- Dot indicators -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style="background: color-mix(in srgb, var(--bg-color) 60%, transparent); backdrop-filter: blur(6px); box-shadow: inset var(--neu-d1) var(--neu-d1) var(--neu-b1) var(--shadow-dark), inset var(--neu-d1-n) var(--neu-d1-n) var(--neu-b1) var(--shadow-light);"
        >
          <button
            v-for="(_, index) in items"
            :key="index"
            @click.stop="goTo(index)"
            :aria-label="`Go to slide ${index + 1}`"
            class="transition-all duration-350 ease-out rounded-full"
            :style="{
              width:      index === currentIndex ? '24px'  : '8px',
              height:     '8px',
              background: index === currentIndex ? 'var(--accent)' : 'var(--shadow-dark)',
              opacity:    index === currentIndex ? 1 : 0.45,
              boxShadow:  index === currentIndex
                ? '0 0 10px color-mix(in srgb, var(--accent) 60%, transparent)'
                : 'none',
            }"
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
        class="absolute top-3 right-3 z-10 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-lg"
        style="
          background: color-mix(in srgb, var(--bg-color) 70%, transparent);
          backdrop-filter: blur(6px);
          color: var(--text-color);
          opacity: 0.7;
          box-shadow: var(--neu-d1) var(--neu-d1) var(--neu-b1) var(--shadow-dark), var(--neu-d1-n) var(--neu-d1-n) var(--neu-b1) var(--shadow-light);
        "
      >
        {{ currentIndex + 1 }} / {{ items.length }}
      </div>
    </div>
  </div>
</template>
