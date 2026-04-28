import type { SupportedLocale } from './locale'
import { setLocale } from './index'

export const switchLocaleWithFade = (next: SupportedLocale) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    setLocale(next)
    return
  }

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  if (reduceMotion) {
    setLocale(next)
    return
  }

  const appEl = document.getElementById('app')
  if (!appEl) {
    setLocale(next)
    return
  }

  const overlay = document.createElement('div')
  overlay.style.position = 'fixed'
  overlay.style.inset = '0'
  overlay.style.zIndex = '9999'
  overlay.style.pointerEvents = 'none'
  overlay.style.opacity = '0'
  overlay.style.background = 'rgba(0,0,0,0.06)'
  overlay.style.transition = 'opacity 320ms ease'

  document.body.appendChild(overlay)

  const prevTransition = appEl.style.transition
  const prevOpacity = appEl.style.opacity

  appEl.style.transition = 'opacity 260ms ease'

  requestAnimationFrame(() => {
    overlay.style.opacity = '1'
    appEl.style.opacity = '0'
  })

  window.setTimeout(() => {
    setLocale(next)

    appEl.style.transition = 'opacity 720ms ease'
    requestAnimationFrame(() => {
      appEl.style.opacity = '1'
      overlay.style.opacity = '0'
    })

    window.setTimeout(() => {
      overlay.remove()
      appEl.style.transition = prevTransition
      appEl.style.opacity = prevOpacity
    }, 760)
  }, 280)
}
