<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import NeuSelect, { type SelectOption } from './neu/NeuSelect.vue'
import { i18n } from '../i18n'
import type { SupportedLocale } from '../i18n/locale'
import { switchLocaleWithFade } from '../i18n/localeTransition'

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
  set: (val) => {
    const next = val as SupportedLocale
    if (next === (i18n.global.locale.value as SupportedLocale)) return
    switchLocaleWithFade(next)
  },
})
</script>

<template>
  <div :class="rootClass" v-bind="forwardedAttrs">
    <NeuSelect v-model="model" :options="options" size="sm" />
  </div>
</template>
