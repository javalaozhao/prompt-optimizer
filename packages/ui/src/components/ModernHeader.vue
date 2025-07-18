<template>
  <header class="modern-header">
    <div class="header-content">
      <!-- 左侧区域 -->
      <div class="header-left">
        <button v-if="showBack" @click="$emit('back')" class="back-btn">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span class="ml-2">返回</span>
        </button>
        
        <div v-else class="brand">
          <img src="/logo.png" alt="Prompt Generator" class="brand-logo" />
          <h1 class="brand-title">{{ title }}</h1>
        </div>
      </div>

      <!-- 中间区域 - 桌面端搜索 -->
      <div v-if="!isMobile" class="header-center">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索提示词模板..."
            class="search-input"
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- 右侧区域 -->
      <div class="header-right">
        <!-- 主题切换 -->
        <button @click="toggleTheme" class="theme-btn" title="切换主题">
          <svg v-if="isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
        </button>

        <!-- 设置按钮 -->
        <button @click="openSettings" class="settings-btn" title="设置">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>

        <!-- 用户头像 -->
        <div class="user-avatar">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E" 
               alt="用户" 
               class="avatar-image" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  title: string
  showBack?: boolean
}>()

const emit = defineEmits<{
  back: []
  toggleTheme: []
}>()

const searchQuery = ref('')
const isDark = ref(false)
const isMobile = ref(false)

const updateLayout = () => {
  isMobile.value = window.innerWidth < 768
}

const toggleTheme = () => {
  emit('toggleTheme')
  isDark.value = !isDark.value
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 搜索逻辑
    console.log('搜索:', searchQuery.value)
  }
}

const openSettings = () => {
  console.log('打开设置')
  // 打开设置模态框
}

onMounted(() => {
  updateLayout()
  window.addEventListener('resize', updateLayout)
  
  // 初始化主题状态
  const savedTheme = localStorage.getItem('theme') || 'light'
  isDark.value = savedTheme === 'dark'
})

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
})
</script>

<style scoped>
.modern-header {
  @apply bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm;
}

.header-content {
  @apply flex items-center justify-between px-4 py-3 md:px-6 md:py-4;
}

.header-left {
  @apply flex items-center;
}

.brand {
  @apply flex items-center space-x-3;
}

.brand-logo {
  @apply w-8 h-8 rounded-lg;
}

.brand-title {
  @apply text-xl font-bold text-gray-900 dark:text-white;
}

.back-btn {
  @apply flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors;
}

.header-center {
  @apply flex-1 max-w-md mx-4;
}

.search-container {
  @apply relative;
}

.search-input {
  @apply w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500;
}

.search-input::placeholder {
  @apply text-gray-500 dark:text-gray-400;
}

.search-btn {
  @apply absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300;
}

.header-right {
  @apply flex items-center space-x-2;
}

.theme-btn,
.settings-btn {
  @apply p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all;
}

.user-avatar {
  @apply ml-2;
}

.avatar-image {
  @apply w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-center {
    @apply hidden;
  }
  
  .brand-title {
    @apply text-base;
  }
}
</style>

<style>
/* 全局样式确保一致性 */
[data-theme="dark"] .modern-header {
  --color-text: #f3f4f6;
  --color-bg: #1f2937;
  --color-border: #374151;
}
</style>