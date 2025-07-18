import { ref, onMounted, onUnmounted } from 'vue'

export interface PerformanceMetrics {
  loadTime: number
  firstPaint: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  timeToInteractive: number
  totalBlockingTime: number
  cumulativeLayoutShift: number
}

export interface PerformanceState {
  metrics: PerformanceMetrics
  isLoading: boolean
  isFirstVisit: boolean
  loadProgress: number
}

export function usePerformance() {
  const state = ref<PerformanceState>({
    metrics: {
      loadTime: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      timeToInteractive: 0,
      totalBlockingTime: 0,
      cumulativeLayoutShift: 0
    },
    isLoading: true,
    isFirstVisit: false,
    loadProgress: 0
  })

  // 性能观察器
  const observer = ref<PerformanceObserver | null>(null)

  // 开始性能监控
  const startPerformanceMonitoring = () => {
    if (typeof window === 'undefined') return

    // 检查是否是首次访问
    const firstVisit = !localStorage.getItem('visited_before')
    state.value.isFirstVisit = firstVisit
    if (firstVisit) {
      localStorage.setItem('visited_before', 'true')
    }

    // 模拟加载进度
    simulateLoadingProgress()

    // 设置性能观察器
    setupPerformanceObserver()

    // 监听页面加载完成
    if (document.readyState === 'complete') {
      onPageLoad()
    } else {
      window.addEventListener('load', onPageLoad)
    }
  }

  // 模拟加载进度
  const simulateLoadingProgress = () => {
    const steps = [
      { progress: 20, delay: 100 },
      { progress: 40, delay: 200 },
      { progress: 65, delay: 300 },
      { progress: 85, delay: 200 },
      { progress: 95, delay: 100 },
      { progress: 100, delay: 50 }
    ]

    let currentStep = 0
    
    const updateProgress = () => {
      if (currentStep < steps.length) {
        state.value.loadProgress = steps[currentStep].progress
        setTimeout(updateProgress, steps[currentStep].delay)
        currentStep++
      } else {
        setTimeout(() => {
          state.value.isLoading = false
        }, 300)
      }
    }

    updateProgress()
  }

  // 设置性能观察器
  const setupPerformanceObserver = () => {
    if (!('PerformanceObserver' in window)) return

    // 监听LCP
    try {
      observer.value = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry
        
        if (lastEntry && lastEntry.name === 'largest-contentful-paint') {
          state.value.metrics.largestContentfulPaint = lastEntry.startTime
        }
      })

      observer.value.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (error) {
      console.warn('LCP observer not supported:', error)
    }

    // 监听FID
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-input') {
            state.value.metrics.totalBlockingTime = entry.processingStart - entry.startTime
          }
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (error) {
      console.warn('FID observer not supported:', error)
    }

    // 监听CLS
    try {
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        state.value.metrics.cumulativeLayoutShift = clsValue
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('CLS observer not supported:', error)
    }
  }

  // 页面加载完成
  const onPageLoad = () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      state.value.metrics = {
        ...state.value.metrics,
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        firstPaint: getFirstPaint(),
        firstContentfulPaint: getFirstContentfulPaint(),
        timeToInteractive: navigation.domInteractive - navigation.fetchStart
      }
    }

    // 发送性能数据（可以发送到分析服务）
    sendPerformanceData()
  }

  // 获取First Paint
  const getFirstPaint = (): number => {
    const paintEntries = performance.getEntriesByType('paint')
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')
    return firstPaint?.startTime || 0
  }

  // 获取First Contentful Paint
  const getFirstContentfulPaint = (): number => {
    const paintEntries = performance.getEntriesByType('paint')
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
    return fcp?.startTime || 0
  }

  // 发送性能数据
  const sendPerformanceData = () => {
    // 这里可以发送到分析服务
    console.log('Performance metrics:', state.value.metrics)
    
    // 示例：发送到Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_performance', {
        load_time: Math.round(state.value.metrics.loadTime),
        fcp: Math.round(state.value.metrics.firstContentfulPaint),
        lcp: Math.round(state.value.metrics.largestContentfulPaint),
        cls: state.value.metrics.cumulativeLayoutShift.toFixed(3),
        tti: Math.round(state.value.metrics.timeToInteractive)
      })
    }
  }

  // 预加载关键资源
  const preloadCriticalResources = () => {
    const criticalResources = [
      '/logo.png',
      '/fonts/inter-var.woff2'
    ]

    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = resource.endsWith('.woff2') ? 'font' : 'image'
      link.href = resource
      if (resource.endsWith('.woff2')) {
        link.crossOrigin = 'anonymous'
      }
      document.head.appendChild(link)
    })
  }

  // 懒加载图片
  const lazyLoadImages = () => {
    if (!('IntersectionObserver' in window)) return

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.classList.remove('lazy')
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }

  // 优化字体加载
  const optimizeFontLoading = () => {
    const fontLink = document.createElement('link')
    fontLink.rel = 'preconnect'
    fontLink.href = 'https://fonts.googleapis.com'
    document.head.appendChild(fontLink)

    const fontStaticLink = document.createElement('link')
    fontStaticLink.rel = 'preconnect'
    fontStaticLink.href = 'https://fonts.gstatic.com'
    fontStaticLink.crossOrigin = 'anonymous'
    document.head.appendChild(fontStaticLink)
  }

  // 清理性能观察器
  const cleanup = () => {
    if (observer.value) {
      observer.value.disconnect()
    }
    window.removeEventListener('load', onPageLoad)
  }

  // 获取性能报告
  const getPerformanceReport = () => {
    return {
      ...state.value.metrics,
      performance: calculatePerformanceScore(),
      recommendations: getPerformanceRecommendations()
    }
  }

  // 计算性能评分
  const calculatePerformanceScore = (): number => {
    const { 
      firstContentfulPaint, 
      largestContentfulPaint, 
      totalBlockingTime, 
      cumulativeLayoutShift 
    } = state.value.metrics

    let score = 100

    // FCP评分
    if (firstContentfulPaint > 3000) score -= 20
    else if (firstContentfulPaint > 1800) score -= 10

    // LCP评分
    if (largestContentfulPaint > 4000) score -= 25
    else if (largestContentfulPaint > 2500) score -= 12

    // TBT评分
    if (totalBlockingTime > 300) score -= 25
    else if (totalBlockingTime > 200) score -= 12

    // CLS评分
    if (cumulativeLayoutShift > 0.25) score -= 25
    else if (cumulativeLayoutShift > 0.1) score -= 12

    return Math.max(0, score)
  }

  // 获取性能建议
  const getPerformanceRecommendations = (): string[] => {
    const recommendations: string[] = []
    const { 
      firstContentfulPaint, 
      largestContentfulPaint, 
      totalBlockingTime, 
      cumulativeLayoutShift 
    } = state.value.metrics

    if (firstContentfulPaint > 1800) {
      recommendations.push('优化首次内容绘制时间')
    }

    if (largestContentfulPaint > 2500) {
      recommendations.push('优化最大内容绘制时间')
    }

    if (totalBlockingTime > 200) {
      recommendations.push('减少主线程阻塞时间')
    }

    if (cumulativeLayoutShift > 0.1) {
      recommendations.push('减少布局偏移')
    }

    return recommendations
  }

  onMounted(() => {
    startPerformanceMonitoring()
    preloadCriticalResources()
    lazyLoadImages()
    optimizeFontLoading()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    state,
    getPerformanceReport,
    calculatePerformanceScore,
    getPerformanceRecommendations,
    preloadCriticalResources,
    lazyLoadImages,
    optimizeFontLoading
  }
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 懒加载组件
export function lazyImport<T extends new (...args: any[]) => any>(
  importFn: () => Promise<{ default: T }>
): () => Promise<T> {
  let component: T | null = null
  
  return async () => {
    if (!component) {
      const module = await importFn()
      component = module.default
    }
    return component
  }
}

// 虚拟滚动优化
export function useVirtualScroll(
  itemHeight: number,
  containerHeight: number,
  totalItems: number
) {
  const startIndex = ref(0)
  const endIndex = ref(0)
  const scrollTop = ref(0)

  const visibleItems = computed(() => {
    const itemsPerPage = Math.ceil(containerHeight / itemHeight)
    const buffer = 5
    
    startIndex.value = Math.max(0, Math.floor(scrollTop.value / itemHeight) - buffer)
    endIndex.value = Math.min(
      totalItems,
      Math.ceil((scrollTop.value + containerHeight) / itemHeight) + buffer
    )

    return {
      start: startIndex.value,
      end: endIndex.value,
      offset: startIndex.value * itemHeight
    }
  })

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
  }

  return {
    visibleItems,
    handleScroll,
    scrollTop
  }
}