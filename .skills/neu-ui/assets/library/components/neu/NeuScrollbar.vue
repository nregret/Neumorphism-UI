<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Props {
  height?: string
  maxHeight?: string
  autoHide?: boolean
  /** 填满父容器剩余高度（flex-1），用于侧边栏等场景 */
  fill?: boolean
  /**
   * 滚动条轨道距容器顶部和底部的像素间距。
   * 当父容器有圆角时（如侧边栏 rounded-r-[2rem] = 32px），
   * 需设置足够大的值避免轨道伸入圆角区域。默认 8px。
   */
  trackInset?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 'auto',
  maxHeight: undefined,
  autoHide: false,
  fill: false,
  trackInset: 8,
})

const containerRef = ref<HTMLDivElement | null>(null)
const trackRef = ref<HTMLDivElement | null>(null)
const thumbRef = ref<HTMLDivElement | null>(null)

// Scrollbar state
const thumbHeight = ref(40)
const thumbTop = ref(0)
const isVisible = ref(!props.autoHide)
const isDragging = ref(false)
const isScrollbarNeeded = ref(false)

let dragStartY = 0
let dragStartScrollTop = 0
let hideTimer: ReturnType<typeof setTimeout> | null = null

const updateScrollbar = () => {
  const el = containerRef.value
  if (!el) return

  const { scrollHeight, clientHeight, scrollTop } = el
  isScrollbarNeeded.value = scrollHeight > clientHeight

  if (!isScrollbarNeeded.value) {
    thumbHeight.value = 0
    return
  }

  // Track height = container height minus top+bottom insets
  const trackHeight = clientHeight - 2 * props.trackInset
  const ratio = clientHeight / scrollHeight
  // Thumb sized relative to track (not container), so it stays within bounds
  thumbHeight.value = Math.max(32, ratio * trackHeight)
  // Thumb offset is within [0, trackHeight - thumbHeight]
  thumbTop.value =
    (scrollTop / (scrollHeight - clientHeight)) * (trackHeight - thumbHeight.value)
}

const onScroll = () => {
  updateScrollbar()

  if (props.autoHide) {
    isVisible.value = true
    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
      if (!isDragging.value) isVisible.value = false
    }, 1000)
  }
}

// Thumb drag
const onThumbMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  isDragging.value = true
  dragStartY = e.clientY
  dragStartScrollTop = containerRef.value?.scrollTop ?? 0

  document.addEventListener('mousemove', onThumbMouseMove)
  document.addEventListener('mouseup', onThumbMouseUp)
}

const onThumbMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !containerRef.value) return
  const el = containerRef.value
  const { scrollHeight, clientHeight } = el
  const trackHeight = clientHeight - 2 * props.trackInset
  const delta = e.clientY - dragStartY
  // Map drag delta within track space → scroll position
  const scrollRatio = delta / (trackHeight - thumbHeight.value)
  el.scrollTop = dragStartScrollTop + scrollRatio * (scrollHeight - clientHeight)
}

const onThumbMouseUp = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onThumbMouseMove)
  document.removeEventListener('mouseup', onThumbMouseUp)

  if (props.autoHide) {
    hideTimer = setTimeout(() => {
      isVisible.value = false
    }, 800)
  }
}

// Track click to jump
const onTrackClick = (e: MouseEvent) => {
  if (!containerRef.value || !trackRef.value) return
  if ((e.target as HTMLElement) === thumbRef.value) return

  const trackRect = trackRef.value.getBoundingClientRect()
  const clickY = e.clientY - trackRect.top
  const el = containerRef.value
  const { scrollHeight, clientHeight } = el
  const trackHeight = clientHeight - 2 * props.trackInset
  // Convert click position within track to scroll ratio
  const targetRatio = (clickY - thumbHeight.value / 2) / (trackHeight - thumbHeight.value)
  el.scrollTop = Math.max(0, targetRatio) * (scrollHeight - clientHeight)
}

const resizeObserver = new ResizeObserver(() => {
  nextTick(updateScrollbar)
})

onMounted(() => {
  const el = containerRef.value
  if (el) {
    el.addEventListener('scroll', onScroll, { passive: true })
    resizeObserver.observe(el)
    updateScrollbar()
  }
  if (props.autoHide) isVisible.value = false
})

onUnmounted(() => {
  const el = containerRef.value
  if (el) {
    el.removeEventListener('scroll', onScroll)
    resizeObserver.disconnect()
  }
  document.removeEventListener('mousemove', onThumbMouseMove)
  document.removeEventListener('mouseup', onThumbMouseUp)
  if (hideTimer) clearTimeout(hideTimer)
})

watch(
  () => props.autoHide,
  (val) => {
    isVisible.value = !val
  }
)
</script>

<template>
  <div
    class="neu-scrollbar-wrapper"
    :class="{ 'neu-scrollbar-fill': fill }"
    :style="fill ? { maxHeight } : { height, maxHeight }"
  >
    <!-- Scroll content area — padding-right reserves space for the track -->
    <div
      ref="containerRef"
      class="neu-scrollbar-content"
      :class="isScrollbarNeeded ? 'has-scrollbar' : ''"
    >
      <slot />
    </div>

    <!-- Custom Scrollbar Track -->
    <Transition name="neu-scrollbar-fade">
      <div
        v-if="isScrollbarNeeded && isVisible"
        ref="trackRef"
        class="neu-scrollbar-track"
        :style="{ top: `${trackInset}px`, bottom: `${trackInset}px` }"
        @click="onTrackClick"
      >
        <!-- Thumb -->
        <div
          ref="thumbRef"
          class="neu-scrollbar-thumb"
          :class="{ 'is-dragging': isDragging }"
          :style="{ height: `${thumbHeight}px`, top: `${thumbTop}px` }"
          @mousedown="onThumbMouseDown"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ─────────────────────────────────────────────
   Wrapper: just a sized flex row, no overflow clipping
   so child shadows (neu-flat-sm etc.) are not cut off.
───────────────────────────────────────────── */
.neu-scrollbar-wrapper {
  position: relative;
  display: flex;
}

/* Fill mode: stretch to fill remaining flex space */
.neu-scrollbar-fill {
  flex: 1;
  min-height: 0;      /* crucial: prevents flex child from overflowing */
}

.neu-scrollbar-fill .neu-scrollbar-content {
  flex: 1;
  min-height: 0;
}

/* ─────────────────────────────────────────────
   Content area
   • overflow-y: scroll  — enables scrolling
   • padding: 6px        — gives box-shadows room to breathe
   • scrollbar-width: none — hides native bar (Firefox)
   • When scrollbar is active, add right padding so content
     doesn't slide under the custom track (28px = track 8px
     + gap 4px left + 4px right + 12px spare).
───────────────────────────────────────────── */
.neu-scrollbar-content {
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  /* padding gives breathing room for box-shadows */
  padding: 6px 6px 6px 6px;
  /* Hide native scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.neu-scrollbar-content::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* When a custom scrollbar is present, push content away from the track */
.neu-scrollbar-content.has-scrollbar {
  padding-right: 22px; /* 8px track + 4px gap left + 4px gap right + 6px */
}

/* ─────────────────────────────────────────────
   Track: narrow pill on the right side
───────────────────────────────────────────── */
.neu-scrollbar-track {
  position: absolute;
  right: 4px;
  /* top / bottom are set via inline style by the :trackInset prop */
  width: 8px;
  border-radius: 999px;
  background: var(--bg-color);
  /* sm 级内嵌阴影 — 随全局深度系统联动 */
  box-shadow:
    inset var(--neu-d1) var(--neu-d1) var(--neu-b1) var(--shadow-dark),
    inset var(--neu-d1-n) var(--neu-d1-n) var(--neu-b1) var(--shadow-light);
  cursor: pointer;
  user-select: none;
}

/* ─────────────────────────────────────────────
   Thumb
───────────────────────────────────────────── */
.neu-scrollbar-thumb {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  border-radius: 999px;
  background: var(--shadow-dark);
  /* sm 级外凸阴影 — 随全局深度系统联动 */
  box-shadow:
    var(--neu-d1) var(--neu-d1) var(--neu-b1) var(--shadow-dark),
    var(--neu-d1-n) var(--neu-d1-n) var(--neu-b1) var(--shadow-light);
  cursor: grab;
  transition: background 0.2s ease, width 0.2s ease, box-shadow 0.2s ease;
}

.neu-scrollbar-thumb:hover {
  width: 7px;
  background: var(--accent);
  box-shadow: 0 0 8px color-mix(in srgb, var(--accent) 40%, transparent);
}

.neu-scrollbar-thumb.is-dragging {
  cursor: grabbing;
  width: 7px;
  background: var(--accent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 50%, transparent);
}

/* ─────────────────────────────────────────────
   Fade animation
───────────────────────────────────────────── */
.neu-scrollbar-fade-enter-active,
.neu-scrollbar-fade-leave-active {
  transition: opacity 0.25s ease;
}

.neu-scrollbar-fade-enter-from,
.neu-scrollbar-fade-leave-to {
  opacity: 0;
}
</style>
