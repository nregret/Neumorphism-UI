<script setup lang="ts">
import NeuCarousel from '../../library/components/neu/NeuCarousel.vue'
</script>

<NeuCarousel :items="items" :auto-play="false" :show-progress="false" class="h-48">
  <template #default="{ item }">
    <!-- 手动切换模式 -->
  </template>
</NeuCarousel>
