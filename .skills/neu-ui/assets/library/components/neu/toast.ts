import { createApp, h, render } from 'vue'
import type { App } from 'vue'
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-vue-next'
import NeuToastComponent from './NeuToastComponent.vue'

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default'

export interface ToastOptions {
  message: string
  type?: ToastType
  duration?: number
}

// Store active toast instances
let toastApp: App | null = null
let mountNode: HTMLElement | null = null
let currentOptions: ToastOptions | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const createToast = (options: ToastOptions) => {
  // If there's an existing toast, unmount it first
  if (toastApp && mountNode) {
    if (hideTimer) clearTimeout(hideTimer)
    render(null, mountNode)
    mountNode.remove()
    toastApp = null
  }

  mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  currentOptions = { duration: 3000, type: 'default', ...options }

  const destroyToast = () => {
    if (mountNode) {
      render(null, mountNode)
      mountNode.remove()
      toastApp = null
      mountNode = null
    }
  }

  // Create a wrapper component to handle the Transition
  toastApp = createApp({
    data() {
      return { show: false }
    },
    mounted() {
      // Trigger the transition
      setTimeout(() => { this.show = true }, 10)
      
      // Auto close
      if (currentOptions?.duration && currentOptions.duration > 0) {
        hideTimer = setTimeout(() => {
          this.close()
        }, currentOptions.duration)
      }
    },
    methods: {
      close() {
        this.show = false
        // Wait for transition to finish before destroying
        setTimeout(destroyToast, 300) 
      }
    },
    render() {
      return h(NeuToastComponent, {
        show: this.show,
        message: currentOptions?.message || '',
        type: currentOptions?.type || 'default',
        onClose: this.close
      })
    }
  })

  toastApp.mount(mountNode)
}

export const NeuToast = {
  show(options: ToastOptions | string) {
    if (typeof options === 'string') {
      createToast({ message: options })
    } else {
      createToast(options)
    }
  },
  success(message: string, duration?: number) {
    createToast({ message, type: 'success', duration })
  },
  error(message: string, duration?: number) {
    createToast({ message, type: 'error', duration })
  },
  warning(message: string, duration?: number) {
    createToast({ message, type: 'warning', duration })
  },
  info(message: string, duration?: number) {
    createToast({ message, type: 'info', duration })
  }
}
