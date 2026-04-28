<script setup lang="ts">
import NeuEmpty from '../../library/components/neu/NeuEmpty.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'
import { FolderOpen } from 'lucide-vue-next'
</script>

<NeuEmpty description="未找到相关文件">
  <template #image>
    <FolderOpen class="w-12 h-12 text-neu-text/20 stroke-[1.5]" />
  </template>
</NeuEmpty>
