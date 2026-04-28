<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import NeuSelect, { type SelectOption } from './neu/NeuSelect.vue'
import { i18n, setLocale } from '../i18n'
import type { SupportedLocale } from '../i18n/locale'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs as Record<string, unknown>
  return rest
})

const rootClass = computed(() => [
  'w-44',
  (attrs as Record<string, unknown>).class,
])

const options: SelectOption[] = [
  { label: '中文简体', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

const model = computed({
  get: () => i18n.global.locale.value as SupportedLocale,
  set: (val) => setLocale(val as SupportedLocale),
})
</script>

<template>
  <div :class="rootClass" v-bind="forwardedAttrs">
    <NeuSelect v-model="model" :options="options" size="sm" />
  </div>
</template>
