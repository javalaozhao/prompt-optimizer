import { ref, computed, watchEffect } from 'vue'

export interface ThemeConfig {
  isDark: boolean
  currentTheme: 'light' | 'dark' | 'auto'
  accentColor: string
  customColors: Record<string, string>
}

export function useTheme() {
  const theme = ref<ThemeConfig>({
    isDark: false,
    currentTheme: 'light',
    accentColor: '#3b82f6',
    customColors: {}
  })

  // 检测系统主题偏好
  const systemTheme = ref<'light' | 'dark'>('light')
  
  const updateSystemTheme = () => {
    if (typeof window !== 'undefined') {
      systemTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  }

  // 计算实际主题
  const actualTheme = computed(() => {
    if (theme.value.currentTheme === 'auto') {
      return systemTheme.value
    }
    return theme.value.currentTheme
  })

  // 设置主题
  const setTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    theme.value.currentTheme = newTheme
    
    if (newTheme === 'auto') {
      theme.value.isDark = systemTheme.value === 'dark'
    } else {
      theme.value.isDark = newTheme === 'dark'
    }
    
    applyTheme()
  }

  // 切换主题
  const toggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(theme.value.currentTheme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // 设置强调色
  const setAccentColor = (color: string) => {
    theme.value.accentColor = color
    applyTheme()
  }

  // 应用主题到DOM
  const applyTheme = () => {
    if (typeof document === 'undefined') return
    
    const root = document.documentElement
    
    // 设置主题属性
    root.setAttribute('data-theme', actualTheme.value)
    
    // 设置CSS变量
    const colors = theme.value.isDark ? darkThemeColors : lightThemeColors
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    
    // 设置自定义强调色
    root.style.setProperty('--color-accent', theme.value.accentColor)
    
    // 保存到本地存储
    localStorage.setItem('theme-config', JSON.stringify({
      currentTheme: theme.value.currentTheme,
      accentColor: theme.value.accentColor,
      customColors: theme.value.customColors
    }))
  }

  // 从本地存储加载主题
  const loadTheme = () => {
    if (typeof localStorage === 'undefined') return
    
    try {
      const saved = localStorage.getItem('theme-config')
      if (saved) {
        const config = JSON.parse(saved)
        theme.value.currentTheme = config.currentTheme || 'light'
        theme.value.accentColor = config.accentColor || '#3b82f6'
        theme.value.customColors = config.customColors || {}
        
        if (config.currentTheme === 'auto') {
          theme.value.isDark = systemTheme.value === 'dark'
        } else {
          theme.value.isDark = config.currentTheme === 'dark'
        }
      }
    } catch (error) {
      console.error('Failed to load theme:', error)
    }
  }

  // 监听系统主题变化
  const observeSystemTheme = () => {
    if (typeof window === 'undefined') return
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', updateSystemTheme)
    updateSystemTheme()
    
    // 如果当前是自动主题，需要重新应用
    if (theme.value.currentTheme === 'auto') {
      watchEffect(() => {
        theme.value.isDark = systemTheme.value === 'dark'
        applyTheme()
      })
    }
  }

  // 初始化主题
  const initTheme = () => {
    loadTheme()
    observeSystemTheme()
    applyTheme()
  }

  return {
    theme,
    systemTheme,
    actualTheme,
    setTheme,
    toggleTheme,
    setAccentColor,
    initTheme,
    applyTheme
  }
}

// 主题颜色配置
const lightThemeColors = {
  '--color-background': '#ffffff',
  '--color-surface': '#f9fafb',
  '--color-surface-hover': '#f3f4f6',
  '--color-border': '#e5e7eb',
  '--color-border-hover': '#d1d5db',
  '--color-text-primary': '#111827',
  '--color-text-secondary': '#6b7280',
  '--color-text-muted': '#9ca3af',
  '--color-primary': '#3b82f6',
  '--color-primary-hover': '#2563eb',
  '--color-primary-light': '#dbeafe',
  '--color-success': '#10b981',
  '--color-warning': '#f59e0b',
  '--color-error': '#ef4444',
  '--color-shadow': 'rgba(0, 0, 0, 0.1)',
  '--color-shadow-lg': 'rgba(0, 0, 0, 0.25)'
}

const darkThemeColors = {
  '--color-background': '#111827',
  '--color-surface': '#1f2937',
  '--color-surface-hover': '#374151',
  '--color-border': '#374151',
  '--color-border-hover': '#4b5563',
  '--color-text-primary': '#f9fafb',
  '--color-text-secondary': '#d1d5db',
  '--color-text-muted': '#9ca3af',
  '--color-primary': '#3b82f6',
  '--color-primary-hover': '#60a5fa',
  '--color-primary-light': 'rgba(59, 130, 246, 0.1)',
  '--color-success': '#34d399',
  '--color-warning': '#fbbf24',
  '--color-error': '#f87171',
  '--color-shadow': 'rgba(0, 0, 0, 0.3)',
  '--color-shadow-lg': 'rgba(0, 0, 0, 0.5)'
}

// 主题预设
export const themePresets = [
  { name: '蓝色', value: '#3b82f6' },
  { name: '绿色', value: '#10b981' },
  { name: '紫色', value: '#8b5cf6' },
  { name: '橙色', value: '#f97316' },
  { name: '粉色', value: '#ec4899' },
  { name: '青色', value: '#06b6d4' }
]