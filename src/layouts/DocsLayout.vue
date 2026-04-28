<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Menu, Palette, Search, X } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NeuButton from '../components/neu/NeuButton.vue'
import NeuScrollbar from '../components/neu/NeuScrollbar.vue'
import ThemeConfigurator from '../components/ThemeConfigurator.vue'
import LanguageSelect from '../components/LanguageSelect.vue'
import logo from '../assets/logo.png'

const route = useRoute()
const { t } = useI18n()

const isSidebarOpen = ref(false)
const isThemeConfigOpen = ref(false)
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

const componentGroups = computed(() => [
  {
    title: t('docsLayout.groups.basic'),
    links: [
      { name: t('docsLayout.links.button'), path: '/components/button' },
      { name: t('docsLayout.links.card'), path: '/components/card' },
      { name: t('docsLayout.links.divider'), path: '/components/divider' },
    ]
  },
  {
    title: t('docsLayout.groups.navigation'),
    links: [
      { name: t('docsLayout.links.breadcrumb'), path: '/components/breadcrumb' },
      { name: t('docsLayout.links.dropdown'), path: '/components/dropdown' },
      { name: t('docsLayout.links.menu'), path: '/components/menu' },
      { name: t('docsLayout.links.pagination'), path: '/components/pagination' },
      { name: t('docsLayout.links.steps'), path: '/components/steps' },
      { name: t('docsLayout.links.tabs'), path: '/components/tabs' },
    ]
  },
  {
    title: t('docsLayout.groups.forms'),
    links: [
      { name: t('docsLayout.links.form'), path: '/components/form' },
      { name: t('docsLayout.links.input'), path: '/components/input' },
      { name: t('docsLayout.links.select'), path: '/components/select' },
      { name: t('docsLayout.links.datepicker'), path: '/components/datepicker' },
      { name: t('docsLayout.links.timepicker'), path: '/components/timepicker' },
      { name: t('docsLayout.links.colorpicker'), path: '/components/colorpicker' },
      { name: t('docsLayout.links.rate'), path: '/components/rate' },
      { name: t('docsLayout.links.upload'), path: '/components/upload' },
      { name: t('docsLayout.links.switch'), path: '/components/switch' },
      { name: t('docsLayout.links.radio'), path: '/components/radio' },
      { name: t('docsLayout.links.checkbox'), path: '/components/checkbox' },
      { name: t('docsLayout.links.slider'), path: '/components/slider' },
    ]
  },
  {
    title: t('docsLayout.groups.data'),
    links: [
      { name: t('docsLayout.links.table'), path: '/components/table' },
      { name: t('docsLayout.links.avatar'), path: '/components/avatar' },
      { name: t('docsLayout.links.badge'), path: '/components/badge' },
      { name: t('docsLayout.links.progress'), path: '/components/progress' },
      { name: t('docsLayout.links.accordion'), path: '/components/accordion' },
      { name: t('docsLayout.links.carousel'), path: '/components/carousel' },
      { name: t('docsLayout.links.scrollbar'), path: '/components/scrollbar' },
      { name: t('docsLayout.links.skeleton'), path: '/components/skeleton' },
      { name: t('docsLayout.links.tag'), path: '/components/tag' },
      { name: t('docsLayout.links.tree'), path: '/components/tree' },
      { name: t('docsLayout.links.empty'), path: '/components/empty' },
    ]
  },
  {
    title: t('docsLayout.groups.feedback'),
    links: [
      { name: t('docsLayout.links.alert'), path: '/components/alert' },
      { name: t('docsLayout.links.modal'), path: '/components/modal' },
      { name: t('docsLayout.links.drawer'), path: '/components/drawer' },
      { name: t('docsLayout.links.toast'), path: '/components/toast' },
      { name: t('docsLayout.links.tooltip'), path: '/components/tooltip' },
      { name: t('docsLayout.links.popconfirm'), path: '/components/popconfirm' },
      { name: t('docsLayout.links.spin'), path: '/components/spin' },
    ]
  }
])

// Filtered groups based on search query
const filteredGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return componentGroups.value

  return componentGroups.value
    .map(group => ({
      ...group,
      links: group.links.filter(link =>
        link.name.toLowerCase().includes(q)
      )
    }))
    .filter(group => group.links.length > 0)
})

const hasResults = computed(() => filteredGroups.value.length > 0)
const isSearching = computed(() => searchQuery.value.trim().length > 0)

const clearSearch = () => {
  searchQuery.value = ''
  searchInputRef.value?.focus()
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Global Ctrl+K shortcut to focus search
const onKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchInputRef.value?.focus()
    isSidebarOpen.value = true
  }
  if (e.key === 'Escape' && searchQuery.value) {
    clearSearch()
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

// Helper: highlight matched text parts
const highlightText = (text: string, query: string): { text: string; match: boolean }[] => {
  if (!query) return [{ text, match: false }]
  const lq = query.trim().toLowerCase()
  const result: { text: string; match: boolean }[] = []
  let remaining = text
  let lRemaining = text.toLowerCase()

  while (lRemaining.length > 0) {
    const idx = lRemaining.indexOf(lq)
    if (idx === -1) {
      result.push({ text: remaining, match: false })
      break
    }
    if (idx > 0) result.push({ text: remaining.slice(0, idx), match: false })
    result.push({ text: remaining.slice(idx, idx + lq.length), match: true })
    remaining = remaining.slice(idx + lq.length)
    lRemaining = lRemaining.slice(idx + lq.length)
  }
  return result
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col md:flex-row bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
    <!-- Mobile Header -->
    <div
      class="md:hidden flex items-center justify-between p-4 z-50 sticky top-0 bg-[var(--bg-color)]/80 backdrop-blur-md border-b border-[var(--shadow-dark)]/10">
      <router-link to="/" class="flex items-center">
        <img :src="logo" alt="Logo" class="w-16 h-16 object-contain neumorphic-logo" />
      </router-link>
      <div class="flex items-center gap-4">
        <LanguageSelect class="w-26" />
        <NeuButton variant="icon" shape="circle" size="sm" @click="isThemeConfigOpen = true"
          :title="$t('docsLayout.themeButtonTitle')">
          <Palette class="w-4 h-4" />
        </NeuButton>
        <NeuButton variant="icon" shape="circle" size="sm" @click="toggleSidebar">
          <Menu v-if="!isSidebarOpen" class="w-4 h-4" />
          <X v-else class="w-4 h-4" />
        </NeuButton>
      </div>
    </div>

    <!-- Sidebar — flush on top/bottom/left, raised shadow only on the right -->
    <aside :class="[
      'fixed inset-y-0 left-0 z-40 w-72 md:translate-x-0 md:static md:h-screen md:sticky md:top-0',
      'transition-transform duration-300 ease-in-out',
      'flex flex-col bg-[var(--bg-color)] rounded-r-[2rem] overflow-hidden',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
      style="box-shadow: var(--neu-d3) 0 var(--neu-b3) var(--shadow-dark), var(--neu-d1) 0 var(--neu-b2) var(--shadow-light);">
      <!-- Logo + Theme Button -->
      <div class="hidden md:flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
        <router-link to="/">
          <img :src="logo" alt="Logo"
            class="w-24 h-24 object-contain neumorphic-logo transition-transform hover:scale-110 duration-300" />
        </router-link>
        <div class="flex items-center gap-3">
          <LanguageSelect class="w-28" />
          <NeuButton variant="icon" shape="circle" size="sm" @click="isThemeConfigOpen = true"
            :title="$t('docsLayout.themeButtonTitle')">
            <Palette class="w-4 h-4" />
          </NeuButton>
        </div>
      </div>

      <!-- Search Box -->
      <div class="px-4 pb-3 shrink-0">
        <div
          class="flex items-center gap-2 px-3 py-2 rounded-neu-md bg-[var(--bg-color)] shadow-neu-pressed-sm transition-all duration-200">
          <Search class="w-4 h-4 text-neu-text/40 shrink-0" />
          <input ref="searchInputRef" v-model="searchQuery" type="text"
            :placeholder="$t('docsLayout.searchPlaceholder')"
            class="flex-1 bg-transparent text-sm text-neu-text placeholder:text-neu-text/30 outline-none min-w-0"
            :aria-label="$t('docsLayout.searchAria')" />
          <div class="hidden md:flex items-center gap-1 shrink-0" v-if="!isSearching">
            <kbd
              class="px-1 py-0.5 rounded text-[10px] font-mono text-neu-text/30 bg-[var(--bg-color)] shadow-neu-flat-sm">⌃K</kbd>
          </div>
          <button v-if="isSearching" @click="clearSearch"
            class="shrink-0 w-4 h-4 flex items-center justify-center rounded-full text-neu-text/40 hover:text-neu-text transition-colors"
            :aria-label="$t('docsLayout.clearSearchAria')">
            <X class="w-3 h-3" />
          </button>
        </div>
      </div>

      <!-- Nav Links via NeuScrollbar -->
      <!-- trackInset=28: 圆角 rounded-r-[2rem]=32px，留28px让轨道不侵入圆角 -->
      <NeuScrollbar fill :auto-hide="true" :track-inset="28">
        <nav class="px-4 pb-4">
          <!-- Results -->
          <template v-if="hasResults">
            <div v-for="group in filteredGroups" :key="group.title" class="mb-6">
              <h4 class="text-[11px] font-bold text-neu-text/40 uppercase tracking-widest mb-2.5 px-1">
                {{ group.title }}
              </h4>
              <ul class="space-y-2.5">
                <li v-for="link in group.links" :key="link.path">
                  <router-link :to="link.path" @click="isSidebarOpen = false">
                    <div
                      class="px-3 py-3 rounded-neu-sm text-sm cursor-pointer transition-all duration-200 bg-[var(--bg-color)]"
                      :class="[
                        route.path === link.path
                          ? 'shadow-neu-pressed-sm text-neu-accent font-semibold'
                          : 'shadow-neu-flat-sm text-neu-text/70 hover:text-neu-accent hover:shadow-neu-flat'
                      ]">
                      <!-- Highlight matched text -->
                      <template v-if="isSearching">
                        <span v-for="(part, i) in highlightText(link.name, searchQuery)" :key="i"
                          :class="part.match ? 'text-neu-accent font-bold' : ''">{{ part.text }}</span>
                      </template>
                      <template v-else>
                        {{ link.name }}
                      </template>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </template>

          <!-- No Results -->
          <div v-else class="flex flex-col items-center justify-center py-12 text-center">
            <div
              class="w-12 h-12 rounded-full bg-[var(--bg-color)] shadow-neu-pressed flex items-center justify-center mb-4">
              <Search class="w-5 h-5 text-neu-text/30" />
            </div>
            <p class="text-sm text-neu-text/40">{{ $t('docsLayout.noResultsPrefix') }} "<span class="text-neu-accent">{{
              searchQuery }}</span>"</p>
            <button @click="clearSearch" class="mt-3 text-xs text-neu-accent hover:underline">{{
              $t('docsLayout.clearSearchText')
            }}</button>
          </div>
        </nav>
      </NeuScrollbar>
    </aside>

    <!-- Overlay for mobile sidebar -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm" @click="toggleSidebar">
    </div>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-12 lg:p-20 overflow-y-auto w-full max-w-4xl mx-auto neu-scrollbar-thin">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Global Theme Configurator -->
    <ThemeConfigurator v-model="isThemeConfigOpen" />
  </div>
</template>




<style scoped>
.neumorphic-logo {
  filter:
    drop-shadow(3px 3px 6px var(--shadow-dark)) drop-shadow(-3px -3px 6px var(--shadow-light));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
