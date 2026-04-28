import html2canvas from 'html2canvas'
import type { SupportedLocale } from './locale'
import { setLocale } from './index'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  a: number
  r: number
  g: number
  b: number
  s: number
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export const switchLocaleWithSand = async (next: SupportedLocale) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    setLocale(next)
    return
  }

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  const appEl = document.getElementById('app')
  if (!appEl || reduceMotion) {
    setLocale(next)
    return
  }

  const rect = appEl.getBoundingClientRect()
  if (rect.width <= 0 || rect.height <= 0) {
    setLocale(next)
    return
  }

  const overlayRoot = document.createElement('div')
  overlayRoot.style.position = 'fixed'
  overlayRoot.style.inset = '0'
  overlayRoot.style.zIndex = '9999'
  overlayRoot.style.pointerEvents = 'none'

  const blurLayer = document.createElement('div')
  blurLayer.style.position = 'absolute'
  blurLayer.style.inset = '0'
  blurLayer.style.backdropFilter = 'blur(10px)'
  blurLayer.style.background = 'rgba(0,0,0,0.06)'
  blurLayer.style.opacity = '0'
  blurLayer.style.transition = 'opacity 140ms ease'
  overlayRoot.appendChild(blurLayer)

  const canvas = await html2canvas(appEl, {
    backgroundColor: null,
    scale: window.devicePixelRatio || 1,
    useCORS: true,
    logging: false,
  })

  const dpr = window.devicePixelRatio || 1
  const w = canvas.width
  const h = canvas.height

  const outCanvas = document.createElement('canvas')
  outCanvas.width = w
  outCanvas.height = h
  outCanvas.style.position = 'absolute'
  outCanvas.style.left = `${rect.left}px`
  outCanvas.style.top = `${rect.top}px`
  outCanvas.style.width = `${rect.width}px`
  outCanvas.style.height = `${rect.height}px`
  overlayRoot.appendChild(outCanvas)

  document.body.appendChild(overlayRoot)
  requestAnimationFrame(() => {
    blurLayer.style.opacity = '1'
  })

  const srcCtx = canvas.getContext('2d', { willReadFrequently: true })
  const outCtx = outCanvas.getContext('2d')
  if (!srcCtx || !outCtx) {
    setLocale(next)
    overlayRoot.remove()
    return
  }

  const image = srcCtx.getImageData(0, 0, w, h)
  const data = image.data

  const targetParticles = 28000
  const step = clamp(Math.floor(Math.sqrt((w * h) / targetParticles)), 4, 14)
  const size = clamp(Math.floor(step * 0.9), 2, 12)

  const particles: Particle[] = []
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const idx = (y * w + x) * 4
      const a = data[idx + 3]
      if (a < 18) continue

      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]

      const jitter = (Math.random() - 0.5) * step * 0.6
      const jitter2 = (Math.random() - 0.5) * step * 0.6

      const wind = 0.55 + Math.random() * 1.05
      const lift = -0.35 - Math.random() * 0.65

      particles.push({
        x: x + jitter,
        y: y + jitter2,
        vx: wind * step * 0.6,
        vy: lift * step * 0.55,
        a: a / 255,
        r,
        g,
        b,
        s: size,
      })
    }
  }

  appEl.style.transition = 'opacity 160ms ease'
  appEl.style.opacity = '0'

  setLocale(next)

  const duration = 700
  const fadeInAt = 420

  const start = performance.now()

  const frame = (now: number) => {
    const t = now - start
    const p = clamp(t / duration, 0, 1)

    outCtx.clearRect(0, 0, w, h)

    const decay = 1 - p
    const localWind = (0.8 + p * 1.8) * step
    const swirl = Math.sin(p * Math.PI) * 0.9

    for (let i = 0; i < particles.length; i++) {
      const pt = particles[i]
      const nx = pt.x + pt.vx * p * localWind + (Math.random() - 0.5) * swirl * step
      const ny = pt.y + pt.vy * p * localWind + (Math.random() - 0.5) * swirl * step

      const alpha = pt.a * Math.pow(decay, 1.3)
      if (alpha < 0.02) continue

      outCtx.fillStyle = `rgba(${pt.r},${pt.g},${pt.b},${alpha})`
      outCtx.fillRect(nx, ny, pt.s, pt.s)
    }

    if (t >= fadeInAt) {
      appEl.style.opacity = '1'
    }

    if (p < 1) {
      requestAnimationFrame(frame)
      return
    }

    blurLayer.style.opacity = '0'
    window.setTimeout(() => overlayRoot.remove(), 160)
  }

  requestAnimationFrame(frame)
}

