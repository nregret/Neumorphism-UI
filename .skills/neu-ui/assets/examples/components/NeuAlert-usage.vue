<script setup lang="ts">
import NeuAlert from '../../library/components/neu/NeuAlert.vue'
</script>

<template>
  <!-- 基础用法 -->
  <NeuAlert description="这是一条普通提示信息。" />
  
  <!-- 带标题和语义颜色的用法 -->
  <NeuAlert variant="success" title="操作成功" description="您的订单已提交并正在处理中。" />
  
  <!-- 可关闭的警告框 -->
  <NeuAlert variant="warning" title="系统维护警告" closable>
    系统将在今晚 00:00 - 04:00 进行停机维护，请提前保存您的工作进度以免丢失数据。
  </NeuAlert>
</template>
