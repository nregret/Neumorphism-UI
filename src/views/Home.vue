<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { ArrowRight, Github, Palette, Pause, Play, SkipBack, SkipForward } from 'lucide-vue-next'
import NeuButton from '../components/neu/NeuButton.vue'
import NeuCard from '../components/neu/NeuCard.vue'
import ThemeConfigurator from '../components/ThemeConfigurator.vue'
import logo from '../assets/logo.png'

const isThemeConfigOpen = ref(false)

const durationSeconds = 3 * 60 + 42
const currentTimeSeconds = ref(0)
const isPlaying = ref(false)
const playbackTimer = ref<number | null>(null)

const progressPercent = computed(() => {
  return (currentTimeSeconds.value / durationSeconds) * 100
})

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const stopPlayback = () => {
  if (playbackTimer.value !== null) {
    window.clearInterval(playbackTimer.value)
    playbackTimer.value = null
  }
  isPlaying.value = false
}

const startPlayback = () => {
  if (isPlaying.value) return
  if (currentTimeSeconds.value >= durationSeconds) {
    currentTimeSeconds.value = 0
  }

  isPlaying.value = true
  playbackTimer.value = window.setInterval(() => {
    const next = currentTimeSeconds.value + 0.2
    if (next >= durationSeconds) {
      currentTimeSeconds.value = durationSeconds
      stopPlayback()
      return
    }
    currentTimeSeconds.value = next
  }, 200)
}

const togglePlayback = () => {
  if (isPlaying.value) {
    stopPlayback()
  } else {
    startPlayback()
  }
}

const seekBy = (deltaSeconds: number) => {
  const next = Math.min(durationSeconds, Math.max(0, currentTimeSeconds.value + deltaSeconds))
  currentTimeSeconds.value = next
}

onUnmounted(() => {
  stopPlayback()
})
</script>

<template>
  <div class="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] overflow-hidden">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md">
      <router-link to="/" class="flex items-center gap-4 group">
        <img :src="logo" alt="Logo" class="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110 neumorphic-logo" />
        <div class="flex flex-col leading-none">
          <span class="text-2xl font-bold tracking-tighter text-neu-text neumorphic-text-raised">Neumorphism <span class="text-neu-accent">UI</span></span>
          <span class="text-xs font-medium text-neu-text/40 tracking-wider mt-0.5">新拟态 UI</span>
        </div>
      </router-link>
      <div class="flex items-center space-x-6">
        <router-link to="/components" class="font-medium text-neu-text hover:text-neu-accent transition-colors">组件库</router-link>
        <a href="https://github.com" target="_blank" class="text-neu-text hover:text-neu-accent transition-colors">
          <Github class="w-6 h-6" />
        </a>
        <NeuButton variant="icon" shape="circle" @click="isThemeConfigOpen = true" title="Theme Config">
          <Palette class="w-5 h-5" />
        </NeuButton>
      </div>
    </nav>

    <!-- Hero Section -->

    <!-- Hero Section -->
    <main class="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[90vh]">
      <div class="lg:w-1/2 space-y-8 z-10">
        <h1 class="text-5xl md:text-7xl font-extrabold leading-[1.3] py-4">
          极简的新拟态 <br />
          <span class="text-neu-accent neumorphic-text-raised">
            UI组件库
          </span>
        </h1>
        <p class="text-lg md:text-xl text-neu-text/80 max-w-lg leading-relaxed">
          Neumorphism UI 提供了一套开箱即用、高度可定制的新拟态风格组件，完美支持响应式和暗黑模式，让你的应用界面独具物理质感与美学体验。目前已包含 32 个核心组件。
        </p>
        <div class="flex items-center space-x-6 pt-4">
          <router-link to="/components">
            <NeuButton size="lg" variant="primary" class="group">
              快速开始
              <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </NeuButton>
          </router-link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <NeuButton size="lg" class="group">
              <Github class="w-5 h-5 mr-2" />
              GitHub
            </NeuButton>
          </a>
        </div>
      </div>

      <!-- Hero Visual / Demo -->
      <div class="lg:w-1/2 mt-20 lg:mt-0 relative flex justify-center">
        <!-- Decorative background elements -->
        <div class="absolute w-96 h-96 bg-neu-accent/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        
        <NeuCard padding="lg" class="w-full max-w-md relative z-10">
          <div class="space-y-8">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold">音乐播放器示例</h3>
              <NeuButton variant="icon" shape="circle" size="sm">
                <div class="w-2 h-2 rounded-full bg-neu-accent"></div>
              </NeuButton>
            </div>
            
            <NeuCard pressed padding="lg" rounded="full" class="flex items-center justify-center aspect-square max-w-[240px] mx-auto">
              <div class="w-32 h-32 rounded-full shadow-neu-flat flex items-center justify-center">
                <div class="w-10 h-10 rounded-full shadow-neu-pressed"></div>
              </div>
            </NeuCard>

            <div class="space-y-4">
              <div class="h-2 bg-[var(--bg-color)] shadow-neu-pressed rounded-full overflow-hidden">
                <div class="h-full bg-neu-accent rounded-full transition-[width] duration-200 ease-linear" :style="{ width: `${progressPercent}%` }"></div>
              </div>
              <div class="flex justify-between text-sm font-medium text-neu-text/60">
                <span>{{ formatTime(currentTimeSeconds) }}</span>
                <span>{{ formatTime(durationSeconds) }}</span>
              </div>
            </div>

            <div class="flex justify-center space-x-6">
              <NeuButton variant="icon" shape="circle" @click="seekBy(-10)" title="后退 10 秒">
                <SkipBack class="w-5 h-5" />
              </NeuButton>
              <NeuButton variant="icon" shape="circle" size="lg" class="text-neu-accent" @click="togglePlayback" :title="isPlaying ? '暂停' : '播放'">
                <Pause v-if="isPlaying" class="w-6 h-6" />
                <Play v-else class="w-6 h-6" />
              </NeuButton>
              <NeuButton variant="icon" shape="circle" @click="seekBy(10)" title="前进 10 秒">
                <SkipForward class="w-5 h-5" />
              </NeuButton>
            </div>
          </div>
        </NeuCard>
      </div>
    </main>

    <ThemeConfigurator v-model="isThemeConfigOpen" />
  </div>
</template>

<style scoped>
.neumorphic-logo {
  filter: 
    drop-shadow(3px 3px 6px var(--shadow-dark))
    drop-shadow(-3px -3px 6px var(--shadow-light));
}

.neumorphic-text-raised {
  text-shadow: 
    3px 3px 6px var(--shadow-dark),
    6px 6px 12px var(--shadow-dark),
    -3px -3px 6px var(--shadow-light),
    -6px -6px 12px var(--shadow-light);
  transition: all 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
