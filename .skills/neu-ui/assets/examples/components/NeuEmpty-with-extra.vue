<script setup lang="ts">
import NeuEmpty from '../../library/components/neu/NeuEmpty.vue'
import NeuButton from '../../library/components/neu/NeuButton.vue'
import { FolderOpen } from 'lucide-vue-next'
</script>

<NeuEmpty description="暂无项目">
  <template #extra>
    <NeuButton variant="primary">创建项目</NeuButton>
  </template>
</NeuEmpty>
