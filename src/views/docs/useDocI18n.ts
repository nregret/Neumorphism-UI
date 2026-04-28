import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export const useDocI18n = () => {
  const { locale } = useI18n()
  const isEn = computed(() => locale.value === 'en-US')

  const text = <T,>(zh: T, en: T) => (isEn.value ? en : zh)
  const pick = <T,>(zh: T, en: T) => computed(() => text(zh, en))

  return { isEn, pick, text }
}
