<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'

interface Props {
  description?: string
  image?: string
}

withDefaults(defineProps<Props>(), {
  description: '暂无数据'
})
</script>

<template>
  <div class="flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px]">
    <!-- Recessed Icon Container -->
    <div 
      class="w-32 h-32 rounded-full shadow-neu-pressed bg-[var(--bg-color)] flex items-center justify-center mb-6"
    >
      <slot name="image">
        <img v-if="image" :src="image" alt="empty" class="w-16 h-16 object-contain opacity-60 mix-blend-luminosity" />
        <Inbox v-else class="w-12 h-12 text-neu-text/30 stroke-[1.5]" />
      </slot>
    </div>
    
    <!-- Description -->
    <p class="text-neu-text/50 font-medium text-sm md:text-base">
      <slot>{{ description }}</slot>
    </p>

    <!-- Optional extra content (like a 'Create' button) -->
    <div v-if="$slots.extra" class="mt-6">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
