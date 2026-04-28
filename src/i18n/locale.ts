export const SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'zh-CN'

export const LOCALE_STORAGE_KEY = 'neu-ui-locale'

export const isSupportedLocale = (value: unknown): value is SupportedLocale => {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

export const normalizeBrowserLocale = (lang: string): SupportedLocale => {
  const lowered = (lang || '').toLowerCase()
  if (lowered === 'en' || lowered.startsWith('en-')) return 'en-US'
  return 'zh-CN'
}

export const getInitialLocale = (): SupportedLocale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isSupportedLocale(saved)) return saved
  } catch {}

  const candidates: string[] = []
  if (Array.isArray(navigator.languages)) candidates.push(...navigator.languages)
  if (navigator.language) candidates.push(navigator.language)

  for (const lang of candidates) {
    const normalized = normalizeBrowserLocale(lang)
    if (isSupportedLocale(normalized)) return normalized
  }

  return DEFAULT_LOCALE
}

export const persistLocale = (locale: SupportedLocale) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {}
}

export const setDocumentLang = (locale: SupportedLocale) => {
  if (typeof document === 'undefined') return
  document.documentElement.lang = locale
}

