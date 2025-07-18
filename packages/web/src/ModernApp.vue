<template>
  <div id="app" :class="{ 'dark': isDark }">
    <!-- 加载界面 -->
    <div v-if="isInitializing || !services" class="loading-overlay">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">{{ loadingMessage }}</p>
        <div class="loading-progress">
          <div class="loading-progress-bar" :style="{ width: `${loadProgress}%` }"></div>
        </div>
      </div>
    </div>

    <!-- 主应用界面 -->
    <ModernLayout
      v-else
      app-title="Prompt Generator"
      :menu-items="menuItems"
      :active-menu="activeMenu"
      @menu-select="handleMenuSelect"
      @back="handleBack"
    >
      <!-- 主内容区域 -->
      <div class="modern-dashboard">
        <!-- 欢迎区域 -->
        <div class="welcome-section">
          <div class="welcome-card modern-card">
            <h1 class="welcome-title">欢迎使用 Prompt Generator</h1>
            <p class="welcome-subtitle">专业的AI提示词生成器，提升您的AI交互体验</p>
            
            <div class="quick-stats">
              <div class="stat-item">
                <span class="stat-number">{{ stats.promptCount }}</span>
                <span class="stat-label">提示词</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ stats.templateCount }}</span>
                <span class="stat-label">模板</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ stats.modelCount }}</span>
                <span class="stat-label">模型</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 功能区域 -->
        <div class="features-grid">
          <!-- 提示词优化 -->
          <div class="feature-card modern-card">
            <div class="feature-header">
              <h3 class="feature-title">🎯 提示词优化</h3>
              <p class="feature-description">一键优化您的提示词，获得更好的AI响应</p>
            </div>
            <ModernPromptOptimizer @optimize="handleOptimize" />
          </div>

          <!-- 模板库 -->
          <div class="feature-card modern-card">
            <div class="feature-header">
              <h3 class="feature-title">📋 模板库</h3>
              <p class="feature-description">丰富的提示词模板，快速开始您的创作</p>
            </div>
            <ModernTemplateGallery @select="handleTemplateSelect" />
          </div>

          <!-- 模型管理 -->
          <div class="feature-card modern-card">
            <div class="feature-header">
              <h3 class="feature-title">🤖 模型管理</h3>
              <p class="feature-description">配置和管理您的AI模型设置</p>
            </div>
            <ModernModelManager @config="openModelConfig" />
          </div>

          <!-- 历史记录 -->
          <div class="feature-card modern-card">
            <div class="feature-header">
              <h3 class="feature-title">📜 历史记录</h3>
              <p class="feature-description">查看和管理您的优化历史</p>
            </div>
            <ModernHistoryView @reuse="handleHistoryReuse" />
          </div>
        </div>
      </div>
    </ModernLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@prompt-optimizer/ui'
import { usePerformance } from '@prompt-optimizer/ui'
import { useAppInitializer } from '@prompt-optimizer/ui'

// 导入现代化组件
import ModernLayout from './components/ModernLayout.vue'
import ModernPromptOptimizer from './components/ModernPromptOptimizer.vue'
import ModernTemplateGallery from './components/ModernTemplateGallery.vue'
import ModernModelManager from './components/ModernModelManager.vue'
import ModernHistoryView from './components/ModernHistoryView.vue'

const { t } = useI18n()
const { initTheme, isDark } = useTheme()
const { state: performanceState } = usePerformance()
const { services, isInitializing } = useAppInitializer()

// 菜单项
const menuItems = [
  { id: 'dashboard', title: '控制台', icon: 'home', path: '/' },
  { id: 'optimizer', title: '提示词优化', icon: 'prompt', path: '/optimizer' },
  { id: 'templates', title: '模板库', icon: 'template', path: '/templates' },
  { id: 'history', title: '历史记录', icon: 'history', path: '/history' },
  { id: 'settings', title: '设置', icon: 'settings', path: '/settings' }
]

// 状态
const activeMenu = ref('dashboard')
const stats = ref({
  promptCount: 0,
  templateCount: 0,
  modelCount: 0
})

// 计算属性
const loadProgress = computed(() => performanceState.value.loadProgress)
const loadingMessage = computed(() => {
  if (isInitializing.value) return '正在初始化应用...'
  if (!services.value) return '正在加载服务...'
  return '正在准备界面...'
})

// 方法
const handleMenuSelect = (item: any) => {
  activeMenu.value = item.id
  console.log('菜单选择:', item.title)
}

const handleBack = () => {
  activeMenu.value = 'dashboard'
}

const handleOptimize = (prompt: string) => {
  console.log('优化提示词:', prompt)
  // 跳转到优化器页面
  activeMenu.value = 'optimizer'
}

const handleTemplateSelect = (template: any) => {
  console.log('选择模板:', template.name)
  // 使用模板
}

const openModelConfig = () => {
  console.log('打开模型配置')
}

const handleHistoryReuse = (item: any) => {
  console.log('重用历史:', item)
}

// 生命周期
onMounted(() => {
  initTheme()
  
  // 模拟统计数据
  setTimeout(() => {
    stats.value = {
      promptCount: 156,
      templateCount: 24,
      modelCount: 8
    }
  }, 1000)
})
</script>

<style scoped>
.modern-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  max-width: 300px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-text {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.loading-progress {
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
}

.loading-progress-bar {
  height: 100%;
  background: var(--color-primary);
  transition: width 0.3s ease;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.welcome-section {
  margin-bottom: 2rem;
}

.welcome-card {
  padding: 2rem;
  text-align: center;
}

.welcome-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.quick-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  padding: 1.5rem;
  height: 100%;
}

.feature-header {
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.feature-description {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .modern-dashboard {
    padding: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-title {
    font-size: 1.5rem;
  }
  
  .quick-stats {
    gap: 1rem;
  }
}
</style>