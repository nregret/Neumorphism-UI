<script setup lang="ts" generic="T = unknown">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import NeuButton from './NeuButton.vue'

const TRACK_DURATION = 550

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

// displayItems: real items + first-item clone at the end (for infinite scroll illusion)
const displayItems = computed(() => {
  if (props.items.length <= 1) return props.items
  return [...props.items, props.items[0]]
})

// visualIndex: position in displayItems track (0..items.length)
const visualIndex = ref(0)
// realIndex: actual slide index (0..items.length-1)
const realIndex = computed(() => visualIndex.value % Math.max(1, props.items.length))
const isAnimating = ref(false)
const isSeamlessJump = ref(false)

let timer: ReturnType<typeof setInterval> | null = null
let progressTimer: ReturnType<typeof setInterval> | null = null
const progressValue = ref(0)

const finishAnimating = () => { isAnimating.value = false }

const performSeamlessJump = (targetIndex: number) => {
  isSeamlessJump.value = true
  visualIndex.value = targetIndex
  // Force reflow so the browser picks up the no-transition state
  requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    isSeamlessJump.value = false
  })
  })
}

const next = () => {
  if (isAnimating.value || props.items.length <= 1) return
  isAnimating.value = true
  resetProgress()

  visualIndex.value++
  if (visualIndex.value >= props.items.length) {
    // Moved to the clone — after animation, jump back to real first
    setTimeout(() => {
      performSeamlessJump(0)
      finishAnimating()
    }, TRACK_DURATION)
  } else {
    setTimeout(finishAnimating, TRACK_DURATION)
  }
}

const prev = () => {
  if (isAnimating.value || props.items.length <= 1) return
  resetProgress()

  if (visualIndex.value === 0) {
    // At real first — jump to clone position first, then animate back
    isAnimating.value = true
    performSeamlessJump(props.items.length)
    requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      visualIndex.value = props.items.length - 1
      setTimeout(finishAnimating, TRACK_DURATION)
    })
    })
  } else {
    isAnimating.value = true
    visualIndex.value--
    setTimeout(finishAnimating, TRACK_DURATION)
  }
}

const goTo = (realIdx: number) => {
  if (isAnimating.value || realIdx === realIndex.value || props.items.length <= 1) return
  isAnimating.value = true
  visualIndex.value = realIdx
  setTimeout(finishAnimating, TRACK_DURATION)
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
  return {
    transform: `translateX(-${visualIndex.value * 100}%)`,
    transition: isSeamlessJump.value
      ? 'none'
      : `transform ${TRACK_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
  }
})
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-[1.5rem] bg-[var(--bg-color)] shadow-neu-flat-sm"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
    @touchstart="stopAutoPlay"
    @touchend="startAutoPlay"
  >
    <!-- ── SLIDE effect ─────────────────── -->
    <template v-if="effect === 'slide'">
      <div
        class="flex h-full w-full"
        :style="trackStyle"
      >
        <div
          v-for="(item, idx) in displayItems"
          :key="idx"
          class="w-full h-full flex-shrink-0 min-w-full"
        >
          <slot :item="item" :index="idx % items.length" />
        </div>
      </div>
    </template>

    <!-- ── FADE effect ──────────────────── -->
    <template v-else>
      <div class="relative w-full h-full">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
          :style="{
            opacity: idx === realIndex ? 1 : 0,
            transform: idx === realIndex ? 'scale(1)' : 'scale(1.03)',
            zIndex: idx === realIndex ? 1 : 0,
          }"
        >
          <slot :item="item" :index="idx" />
        </div>
      </div>
    </template>

    <!-- ── Navigation Arrows ─────────────── -->
    <template v-if="showArrows && items.length > 1">
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
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-color)]/60 backdrop-blur-sm shadow-neu-pressed-sm">
        <button
          v-for="(_, idx) in items"
          :key="idx"
          @click.stop="goTo(idx)"
          :aria-label="`Go to slide ${idx + 1}`"
          class="transition-all duration-350 ease-out rounded-full"
          :class="[
            idx === realIndex
              ? 'w-6 h-2 bg-[var(--accent)] opacity-100 shadow-[0_0_10px_var(--accent)]'
              : 'w-2 h-2 bg-[var(--shadow-dark)] opacity-45'
          ]"
        />
      </div>

      <!-- Optional progress bar -->
      <div
        v-if="showProgress"
        class="w-24 h-1 rounded-full overflow-hidden bg-[var(--shadow-dark)]/25"
      >
        <div
          class="h-full rounded-full transition-none bg-[var(--accent)]"
          :style="{ width: `${progressValue}%` }"
        />
      </div>
    </div>

    <!-- ── Slide counter badge (top-right) ─ -->
    <div
      v-if="items.length > 1"
      class="absolute top-3 right-3 z-10 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-lg bg-[var(--bg-color)]/70 backdrop-blur-sm text-[var(--text-color)] opacity-70 shadow-neu-flat-sm"
    >
      {{ realIndex + 1 }} / {{ items.length }}
    </div>
  </div>
</template>
