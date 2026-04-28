<script setup lang="ts">
import NeuCarousel from '../../library/components/neu/NeuCarousel.vue'
</script>

<NeuCarousel :items="items" effect="fade" class="h-72">
  <template #default="{ item }">
    <!-- 淡入淡出模式，带轻微缩放 -->
  </template>
</NeuCarousel>
