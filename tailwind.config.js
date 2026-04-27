/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        neu: {
          bg: "var(--bg-color)",
          text: "var(--text-color)",
          accent: "var(--accent)",
        },
      },
      boxShadow: {
        // ── sm: 搜索框、徽标、小控件 ──────────────────────────────
        "neu-flat-sm":    "var(--neu-d1) var(--neu-d1) var(--neu-b1) var(--shadow-dark), var(--neu-d1-n) var(--neu-d1-n) var(--neu-b1) var(--shadow-light)",
        "neu-pressed-sm": "inset var(--neu-d1) var(--neu-d1) var(--neu-b1) var(--shadow-dark), inset var(--neu-d1-n) var(--neu-d1-n) var(--neu-b1) var(--shadow-light)",
        // ── md: 卡片、按钮、通用元素 (默认) ─────────────────────────
        "neu-flat":       "var(--neu-d2) var(--neu-d2) var(--neu-b2) var(--shadow-dark), var(--neu-d2-n) var(--neu-d2-n) var(--neu-b2) var(--shadow-light)",
        "neu-pressed":    "inset var(--neu-d2) var(--neu-d2) var(--neu-b2) var(--shadow-dark), inset var(--neu-d2-n) var(--neu-d2-n) var(--neu-b2) var(--shadow-light)",
        // ── lg: 主体面板、侧边栏、英雄区 ─────────────────────────────
        "neu-flat-lg":    "var(--neu-d3) var(--neu-d3) var(--neu-b3) var(--shadow-dark), var(--neu-d3-n) var(--neu-d3-n) var(--neu-b3) var(--shadow-light)",
        "neu-pressed-lg": "inset var(--neu-d3) var(--neu-d3) var(--neu-b3) var(--shadow-dark), inset var(--neu-d3-n) var(--neu-d3-n) var(--neu-b3) var(--shadow-light)",
      },
    },
  },
  plugins: [],
};
