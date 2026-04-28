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
  f: number
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const fract = (x: number) => x - Math.floor(x)

const hash2 = (x: number, y: number) => {
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453123)
}

const smooth = (t: number) => t * t * (3 - 2 * t)

const noise2 = (x: number, y: number) => {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const xf = x - x0
  const yf = y - y0

  const a = hash2(x0, y0)
  const b = hash2(x0 + 1, y0)
  const c = hash2(x0, y0 + 1)
  const d = hash2(x0 + 1, y0 + 1)

  const u = smooth(xf)
  const v = smooth(yf)

  const ab = a + (b - a) * u
  const cd = c + (d - c) * u
  return ab + (cd - ab) * v
}

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

  const srcCtx = canvas.getContext('2d', { willReadFrequently: true })
  const outCtx = outCanvas.getContext('2d')
  if (!srcCtx || !outCtx) {
    setLocale(next)
    overlayRoot.remove()
    return
  }

  const image = srcCtx.getImageData(0, 0, w, h)
  const data = image.data

  const particles: Particle[] = []
  const target = clamp(Math.floor(28000 / Math.pow(dpr, 1.6)), 9000, 28000)
  let attempts = 0
  const maxAttempts = target * 18

  while (particles.length < target && attempts < maxAttempts) {
    attempts++
    const x = Math.floor(Math.random() * w)
    const y = Math.floor(Math.random() * h)
    const idx = (y * w + x) * 4
    const a = data[idx + 3]
    if (a < 18) continue

    const r = data[idx]
    const g = data[idx + 1]
    const b = data[idx + 2]

    const n = noise2(x * 0.012, y * 0.012)
    const wind = (0.35 + n * 1.55) * (0.8 + Math.random() * 0.6)
    const lift = (-0.25 - (1 - n) * 0.95) * (0.8 + Math.random() * 0.7)

    particles.push({
      x: x + (Math.random() - 0.5) * 1.6,
      y: y + (Math.random() - 0.5) * 1.6,
      vx: wind,
      vy: lift,
      a: (a / 255) * (0.85 + Math.random() * 0.25),
      r,
      g,
      b,
      s: 0.9 + Math.random() * 1.9,
      f: 0.85 + Math.random() * 0.6,
    })
  }

  appEl.style.transition = 'none'
  appEl.style.opacity = '0'

  setLocale(next)

  const duration = 980
  const revealStart = 180
  const revealDuration = 640

  const start = performance.now()
  let prev = start

  const frame = (now: number) => {
    const t = now - start
    const p = clamp(t / duration, 0, 1)
    const dt = clamp((now - prev) / 16.6667, 0.4, 2.2)
    prev = now

    outCtx.clearRect(0, 0, w, h)

    const decay = Math.pow(1 - p, 1.8)
    const time = now * 0.001
    const windBase = 0.85 + p * 2.4
    const gravity = 0.18 + p * 0.55
    const drag = 0.965 - p * 0.015

    for (let i = 0; i < particles.length; i++) {
      const pt = particles[i]
      const n1 = noise2(pt.x * 0.01 + time * 0.65, pt.y * 0.01)
      const n2 = noise2(pt.x * 0.014, pt.y * 0.014 + time * 0.8)
      const ax = (windBase + (n1 - 0.5) * 2.2) * pt.f
      const ay = (gravity + (n2 - 0.5) * 1.25) * pt.f

      pt.vx = pt.vx * drag + ax * 0.22 * dt
      pt.vy = pt.vy * drag + ay * 0.24 * dt

      pt.x += pt.vx * dt * 1.6
      pt.y += pt.vy * dt * 1.6

      const alpha = pt.a * decay
      if (alpha < 0.02) continue

      outCtx.fillStyle = `rgba(${pt.r},${pt.g},${pt.b},${alpha})`
      outCtx.fillRect(pt.x, pt.y, pt.s, pt.s)
    }

    const reveal = clamp((t - revealStart) / revealDuration, 0, 1)
    appEl.style.opacity = `${reveal}`

    if (p < 1) {
      requestAnimationFrame(frame)
      return
    }

    appEl.style.opacity = '1'
    overlayRoot.remove()
  }

  requestAnimationFrame(frame)
}
