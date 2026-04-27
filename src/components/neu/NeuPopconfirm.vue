<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import NeuButton from './NeuButton.vue'

interface Props {
  title: string
  content?: string
  confirmText?: string
  cancelText?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: '确定',
  cancelText: '取消',
  position: 'top',
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const show = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const popRef = ref<HTMLElement | null>(null)
const popconfirmRef = ref<HTMLElement | null>(null)

// Fixed viewport coordinates for the popup
const popStyle = ref<Record<string, string>>({})

const GAP = 12 // px gap between trigger and popup

const computePosition = async () => {
  await nextTick()
  if (!triggerRef.value || !popRef.value) return

  const tr = triggerRef.value.getBoundingClientRect()
  const pr = popRef.value.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight
  const scrollX = window.scrollX
  const scrollY = window.scrollY

  let top = 0
  let left = 0

  switch (props.position) {
    case 'top':
      top  = tr.top  + scrollY - pr.height - GAP
      left = tr.left + scrollX + tr.width / 2 - pr.width / 2
      break
    case 'bottom':
      top  = tr.bottom + scrollY + GAP
      left = tr.left   + scrollX + tr.width / 2 - pr.width / 2
      break
    case 'left':
      top  = tr.top  + scrollY + tr.height / 2 - pr.height / 2
      left = tr.left + scrollX - pr.width - GAP
      break
    case 'right':
      top  = tr.top   + scrollY + tr.height / 2 - pr.height / 2
      left = tr.right + scrollX + GAP
      break
  }

  // Clamp to viewport with 8px edge margin
  const margin = 8
  left = Math.max(margin + scrollX, Math.min(left, scrollX + vw - pr.width  - margin))
  top  = Math.max(margin + scrollY, Math.min(top,  scrollY + vh - pr.height - margin))

  popStyle.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
  }
}

const toggle = async () => {
  show.value = !show.value
  if (show.value) {
    await computePosition()
  }
}

const handleConfirm = () => {
  show.value = false
  emit('confirm')
}

const handleCancel = () => {
  show.value = false
  emit('cancel')
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    show.value &&
    popconfirmRef.value &&
    !popconfirmRef.value.contains(event.target as Node) &&
    !(popRef.value && popRef.value.contains(event.target as Node))
  ) {
    show.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// Recompute on resize/scroll
const recompute = () => { if (show.value) computePosition() }
onMounted(() => {
  window.addEventListener('resize', recompute)
  window.addEventListener('scroll', recompute, true)
})
onUnmounted(() => {
  window.removeEventListener('resize', recompute)
  window.removeEventListener('scroll', recompute, true)
})

// Origin for scale animation
const transformOrigin = computed(() => {
  switch (props.position) {
    case 'top':    return 'center bottom'
    case 'bottom': return 'center top'
    case 'left':   return 'right center'
    case 'right':  return 'left center'
    default:       return 'center bottom'
  }
})
</script>

<template>
  <div class="inline-flex" ref="popconfirmRef">
    <!-- Trigger -->
    <div ref="triggerRef" @click.stop="toggle" class="inline-flex cursor-pointer">
      <slot />
    </div>

    <!-- Popup — teleported to body so it's never clipped by parent overflow -->
    <Teleport to="body">
      <Transition name="neu-popconfirm">
        <div
          v-if="show"
          ref="popRef"
          class="z-[9999] min-w-[220px] max-w-[280px]"
          :style="{ ...popStyle, transformOrigin }"
          @click.stop
        >
          <div class="p-4 rounded-2xl shadow-neu-flat bg-[var(--bg-color)] text-neu-text relative">
            <div class="font-semibold text-sm mb-1">{{ title }}</div>
            <div v-if="content" class="text-xs text-neu-text/60 mb-4 leading-relaxed">{{ content }}</div>
            <div v-else class="mb-4" />

            <div class="flex justify-end gap-2">
              <NeuButton size="sm" @click.stop="handleCancel">{{ cancelText }}</NeuButton>
              <NeuButton size="sm" variant="primary" @click.stop="handleConfirm">{{ confirmText }}</NeuButton>
            </div>

            <!-- Arrow -->
            <div
              class="absolute w-3 h-3 bg-[var(--bg-color)] rotate-45"
              :class="{
                '-bottom-1.5 left-1/2 -translate-x-1/2 shadow-[2px_2px_4px_var(--shadow-dark)]':   position === 'top',
                '-top-1.5 left-1/2 -translate-x-1/2 shadow-[-2px_-2px_4px_var(--shadow-light)]': position === 'bottom',
                '-right-1.5 top-1/2 -translate-y-1/2 shadow-[2px_-2px_4px_var(--shadow-dark)]':  position === 'left',
                '-left-1.5 top-1/2 -translate-y-1/2 shadow-[-2px_2px_4px_var(--shadow-light)]':  position === 'right',
              }"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.neu-popconfirm-enter-active,
.neu-popconfirm-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.neu-popconfirm-enter-from,
.neu-popconfirm-leave-to {
  opacity: 0;
  transform: scale(0.88);
}
</style>
