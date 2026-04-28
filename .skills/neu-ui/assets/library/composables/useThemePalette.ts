export interface ThemePalette {
  bg: string
  accent: string
  text: string
  /** 全局阴影深度乘数，0.4 极柔 ~ 1.0 默认 ~ 1.6 强烈 */
  scale?: number
  /** sm 级 offset (px)，对应 --neu-d1 基础值（乘以 scale 前） */
  depthSm?: number
  /** md 级 offset (px)，对应 --neu-d2 基础值 */
  depthMd?: number
  /** lg 级 offset (px)，对应 --neu-d3 基础值 */
  depthLg?: number
  /** 全局圆角乘数，0.5 锐利 ~ 1.0 默认 ~ 1.5 圆润 */
  radiusScale?: number
  /** sm 级圆角基础值 (px) */
  radiusSm?: number
  /** md 级圆角基础值 (px) */
  radiusMd?: number
  /** lg 级圆角基础值 (px) */
  radiusLg?: number
}

export const THEME_PALETTE_STORAGE_KEY = 'neu-theme-palette'

export const DEFAULT_THEME_PALETTE: Required<ThemePalette> = {
  bg: '#e0e5ec',
  accent: '#4f46e5',
  text: '#333333',
  scale: 1,
  depthSm: 3,
  depthMd: 6,
  depthLg: 12,
  radiusScale: 1,
  radiusSm: 8,
  radiusMd: 16,
  radiusLg: 24,
}

const blendColor = (hex: string, amount: number, isLighten: boolean) => {
  let r = parseInt(hex.substring(1, 3), 16)
  let g = parseInt(hex.substring(3, 5), 16)
  let b = parseInt(hex.substring(5, 7), 16)

  if (isLighten) {
    r = Math.round(r + (255 - r) * amount)
    g = Math.round(g + (255 - g) * amount)
    b = Math.round(b + (255 - b) * amount)
  } else {
    r = Math.round(r * (1 - amount))
    g = Math.round(g * (1 - amount))
    b = Math.round(b * (1 - amount))
  }

  const toHex = (c: number) => {
    const h = Math.max(0, Math.min(255, c)).toString(16)
    return h.length === 1 ? '0' + h : h
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

const getShadowLight = (bg: string) => {
  const isDark = parseInt(bg.substring(1, 3), 16) < 100
  return blendColor(bg, isDark ? 0.15 : 0.4, true)
}

const getShadowDark = (bg: string) => {
  const isDark = parseInt(bg.substring(1, 3), 16) < 100
  return blendColor(bg, isDark ? 0.3 : 0.15, false)
}

const isValidHexColor = (value: unknown): value is string => {
  return typeof value === 'string' && /^#([0-9a-fA-F]{6})$/.test(value)
}

export const applyThemePalette = (palette: ThemePalette) => {
  const root = document.documentElement

  // Colors
  root.style.setProperty('--bg-color', palette.bg)
  root.style.setProperty('--accent', palette.accent)
  root.style.setProperty('--text-color', palette.text)
  root.style.setProperty('--shadow-light', getShadowLight(palette.bg))
  root.style.setProperty('--shadow-dark', getShadowDark(palette.bg))

  // Depth system
  const scale  = palette.scale  ?? DEFAULT_THEME_PALETTE.scale
  const dSm    = palette.depthSm ?? DEFAULT_THEME_PALETTE.depthSm
  const dMd    = palette.depthMd ?? DEFAULT_THEME_PALETTE.depthMd
  const dLg    = palette.depthLg ?? DEFAULT_THEME_PALETTE.depthLg

  root.style.setProperty('--neu-scale', String(scale))

  // Override the base pixel values so calc() uses the custom depths
  // (CSS doesn't support "multiplying two CSS vars with units",
  //  so we pre-compute here and write the final values directly)
  const fmt = (px: number) => `${px}px`

  root.style.setProperty('--neu-d1',   fmt(dSm * scale))
  root.style.setProperty('--neu-d1-n', fmt(-dSm * scale))
  root.style.setProperty('--neu-b1',   fmt(dSm * scale * 2.2))

  root.style.setProperty('--neu-d2',   fmt(dMd * scale))
  root.style.setProperty('--neu-d2-n', fmt(-dMd * scale))
  root.style.setProperty('--neu-b2',   fmt(dMd * scale * 2.2))

  root.style.setProperty('--neu-d3',   fmt(dLg * scale))
  root.style.setProperty('--neu-d3-n', fmt(-dLg * scale))
  root.style.setProperty('--neu-b3',   fmt(dLg * scale * 2.2))

  // Border-radius system
  const rScale = palette.radiusScale ?? DEFAULT_THEME_PALETTE.radiusScale
  const rSm    = palette.radiusSm    ?? DEFAULT_THEME_PALETTE.radiusSm
  const rMd    = palette.radiusMd    ?? DEFAULT_THEME_PALETTE.radiusMd
  const rLg    = palette.radiusLg    ?? DEFAULT_THEME_PALETTE.radiusLg

  root.style.setProperty('--neu-radius-scale', String(rScale))
  root.style.setProperty('--neu-radius-sm',    fmt(rSm * rScale))
  root.style.setProperty('--neu-radius-md',    fmt(rMd * rScale))
  root.style.setProperty('--neu-radius-lg',    fmt(rLg * rScale))
}

export const saveThemePalette = (palette: ThemePalette) => {
  localStorage.setItem(THEME_PALETTE_STORAGE_KEY, JSON.stringify(palette))
}

export const readThemePalette = (): ThemePalette | null => {
  const raw = localStorage.getItem(THEME_PALETTE_STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as Partial<ThemePalette>
    if (!isValidHexColor(parsed.bg) || !isValidHexColor(parsed.accent) || !isValidHexColor(parsed.text)) {
      return null
    }
    return {
      bg: parsed.bg,
      accent: parsed.accent,
      text: parsed.text,
      scale:       typeof parsed.scale       === 'number' ? parsed.scale       : DEFAULT_THEME_PALETTE.scale,
      depthSm:     typeof parsed.depthSm     === 'number' ? parsed.depthSm     : DEFAULT_THEME_PALETTE.depthSm,
      depthMd:     typeof parsed.depthMd     === 'number' ? parsed.depthMd     : DEFAULT_THEME_PALETTE.depthMd,
      depthLg:     typeof parsed.depthLg     === 'number' ? parsed.depthLg     : DEFAULT_THEME_PALETTE.depthLg,
      radiusScale: typeof parsed.radiusScale === 'number' ? parsed.radiusScale : DEFAULT_THEME_PALETTE.radiusScale,
      radiusSm:    typeof parsed.radiusSm    === 'number' ? parsed.radiusSm    : DEFAULT_THEME_PALETTE.radiusSm,
      radiusMd:    typeof parsed.radiusMd    === 'number' ? parsed.radiusMd    : DEFAULT_THEME_PALETTE.radiusMd,
      radiusLg:    typeof parsed.radiusLg    === 'number' ? parsed.radiusLg    : DEFAULT_THEME_PALETTE.radiusLg,
    }
  } catch {
    return null
  }
}

export const loadAndApplyThemePalette = () => {
  const palette = readThemePalette()
  if (palette) {
    applyThemePalette(palette)
  }
}
