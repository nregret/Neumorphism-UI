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
        "neu-flat": "8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light)",
        "neu-flat-sm": "4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light)",
        "neu-flat-lg": "12px 12px 24px var(--shadow-dark), -12px -12px 24px var(--shadow-light)",
        "neu-pressed": "inset 8px 8px 16px var(--shadow-dark), inset -8px -8px 16px var(--shadow-light)",
        "neu-pressed-sm": "inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light)",
        "neu-pressed-lg": "inset 12px 12px 24px var(--shadow-dark), inset -12px -12px 24px var(--shadow-light)",
      },
    },
  },
  plugins: [],
};
