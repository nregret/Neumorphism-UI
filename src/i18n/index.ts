import { createI18n } from 'vue-i18n'
import zhCN from './messages/zh-CN'
import enUS from './messages/en-US'
import { getInitialLocale, persistLocale, setDocumentLang, type SupportedLocale } from './locale'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getInitialLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

setDocumentLang(i18n.global.locale.value as SupportedLocale)

export const setLocale = (next: SupportedLocale) => {
  i18n.global.locale.value = next
  persistLocale(next)
  setDocumentLang(next)
}

