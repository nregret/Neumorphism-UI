<script setup lang="ts">
import NeuCarousel from '../../library/components/neu/NeuCarousel.vue'
</script>

<NeuCarousel :items="items" effect="slide" :show-progress="true" class="h-72">
  <template #default="{ item }">
    <div class="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br"
      :class="item.color">
      <div class="text-5xl">{{ item.icon }}</div>
      <div class="text-2xl font-bold">{{ item.title }}</div>
      <div class="text-sm opacity-70">{{ item.subtitle }}</div>
    </div>
  </template>
</NeuCarousel>
