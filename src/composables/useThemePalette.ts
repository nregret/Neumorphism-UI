export interface ThemePalette {
  bg: string
  accent: string
  text: string
}

export const THEME_PALETTE_STORAGE_KEY = 'neu-theme-palette'

export const DEFAULT_THEME_PALETTE: ThemePalette = {
  bg: '#e0e5ec',
  accent: '#4f46e5',
  text: '#333333',
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
  root.style.setProperty('--bg-color', palette.bg)
  root.style.setProperty('--accent', palette.accent)
  root.style.setProperty('--text-color', palette.text)
  root.style.setProperty('--shadow-light', getShadowLight(palette.bg))
  root.style.setProperty('--shadow-dark', getShadowDark(palette.bg))
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
