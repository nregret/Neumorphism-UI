import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { loadAndApplyThemePalette } from './composables/useThemePalette'
import { i18n } from './i18n'

loadAndApplyThemePalette()

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
