<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun, ArrowRight, Github } from 'lucide-vue-next'
import NeuButton from '../components/neu/NeuButton.vue'
import NeuCard from '../components/neu/NeuCard.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] overflow-hidden">
    <!-- Navbar -->
    <nav class="fixed top-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md">
      <div class="text-2xl font-bold tracking-tighter text-neu-text">Neu<span class="text-neu-accent">UI</span></div>
      <div class="flex items-center space-x-6">
        <router-link to="/components" class="font-medium text-neu-text hover:text-neu-accent transition-colors">组件库</router-link>
        <a href="https://github.com" target="_blank" class="text-neu-text hover:text-neu-accent transition-colors">
          <Github class="w-6 h-6" />
        </a>
        <NeuButton variant="icon" shape="circle" @click="toggleDark()">
          <Moon v-if="!isDark" class="w-5 h-5" />
          <Sun v-else class="w-5 h-5" />
        </NeuButton>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[90vh]">
      <div class="lg:w-1/2 space-y-8 z-10">
        <h1 class="text-5xl md:text-7xl font-extrabold leading-tight">
          极简的新拟态 <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-neu-accent to-purple-500">UI组件库</span>
        </h1>
        <p class="text-lg md:text-xl text-neu-text/80 max-w-lg leading-relaxed">
          NeuUI 提供了一套开箱即用、高度可定制的新拟态风格组件，完美支持响应式和暗黑模式，让你的应用界面独具物理质感与美学体验。目前已包含 32 个核心组件。
        </p>
        <div class="flex items-center space-x-6 pt-4">
          <router-link to="/components">
            <NeuButton size="lg" variant="primary" class="group">
              快速开始
              <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </NeuButton>
          </router-link>
          <NeuButton size="lg">查看文档</NeuButton>
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
                <div class="h-full bg-neu-accent w-1/3 rounded-full"></div>
              </div>
              <div class="flex justify-between text-sm font-medium text-neu-text/60">
                <span>1:24</span>
                <span>3:42</span>
              </div>
            </div>

            <div class="flex justify-center space-x-6">
              <NeuButton variant="icon" shape="circle">⏮</NeuButton>
              <NeuButton variant="icon" shape="circle" size="lg" class="text-neu-accent">▶</NeuButton>
              <NeuButton variant="icon" shape="circle">⏭</NeuButton>
            </div>
          </div>
        </NeuCard>
      </div>
    </main>
  </div>
</template>
