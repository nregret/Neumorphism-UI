<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

// Avoid generic="T" to prevent Vue compiler issues; use unknown[] for type safety
interface Props {
  items: unknown[]
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showDots?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: true,
  interval: 3000,
  showArrows: true,
  showDots: true
})

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}

const goTo = (index: number) => {
  currentIndex.value = index
}

const startAutoPlay = () => {
  if (props.autoPlay && props.items.length > 1) {
    timer = setInterval(next, props.interval)
  }
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => startAutoPlay())
onUnmounted(() => stopAutoPlay())
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-3xl shadow-neu-pressed p-2 bg-[var(--bg-color)]"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <!-- Slides Container -->
    <div
      class="flex transition-transform duration-500 ease-in-out h-full w-full rounded-2xl overflow-hidden shadow-neu-flat-sm"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full h-full flex-shrink-0"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>

    <!-- Navigation Arrows -->
    <template v-if="showArrows && items.length > 1">
      <button
        @click.stop="prev"
        class="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-color)]/80 backdrop-blur-sm flex items-center justify-center text-neu-text/60 hover:text-neu-text shadow-neu-flat hover:shadow-neu-flat-sm active:shadow-neu-pressed transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft class="w-6 h-6 pr-0.5" />
      </button>
      <button
        @click.stop="next"
        class="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-color)]/80 backdrop-blur-sm flex items-center justify-center text-neu-text/60 hover:text-neu-text shadow-neu-flat hover:shadow-neu-flat-sm active:shadow-neu-pressed transition-all"
        aria-label="Next slide"
      >
        <ChevronRight class="w-6 h-6 pl-0.5" />
      </button>
    </template>

    <!-- Indicators (Dots) -->
    <div
      v-if="showDots && items.length > 1"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3"
    >
      <button
        v-for="(_, index) in items"
        :key="index"
        @click.stop="goTo(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="[
          currentIndex === index
            ? 'bg-neu-accent shadow-[0_0_8px_rgba(79,70,229,0.6)] scale-125'
            : 'bg-[var(--bg-color)] shadow-neu-pressed hover:shadow-neu-flat-sm'
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>
  </div>
</template>
