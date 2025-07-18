<template>
  <div class="modern-layout" :class="{ 'dark': isDark }">
    <!-- 顶部导航 -->
    <ModernHeader
      :title="appTitle"
      :show-back="showBack"
      @back="handleBack"
      @toggle-theme="toggleTheme"
    />

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 侧边栏 -->
      <ModernSidebar
        v-if="!isMobile"
        :menu-items="menuItems"
        :active-item="activeMenu"
        @select="handleMenuSelect"
      />

      <!-- 内容区域 -->
      <div class="content-area" :class="{ 'full-width': isMobile }">
        <!-- 移动端顶部导航 -->
        <div v-if="isMobile" class="mobile-nav">
          <button @click="showMobileMenu = !showMobileMenu" class="mobile-menu-btn">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 class="mobile-title">{{ currentPageTitle }}</h1>
        </div>

        <!-- 页面内容 -->
        <div class="page-content">
          <slot></slot>
        </div>
      </div>
    </main>

    <!-- 移动端侧边菜单 -->
    <ModernMobileMenu
      v-if="showMobileMenu && isMobile"
      :menu-items="menuItems"
      :active-item="activeMenu"
      @select="handleMobileMenuSelect"
      @close="showMobileMenu = false"
    />

    <!-- 底部信息 -->
    <ModernFooter v-if="!isMobile" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ModernHeader from './ModernHeader.vue'
import ModernSidebar from './ModernSidebar.vue'
import ModernMobileMenu from './ModernMobileMenu.vue'
import ModernFooter from './ModernFooter.vue'

interface MenuItem {
  id: string
  title: string
  icon: string
  path: string
}

const props = defineProps<{
  appTitle?: string
  showBack?: boolean
  menuItems: MenuItem[]
  activeMenu: string
}>()

const emit = defineEmits<{
  back: []
  menuSelect: [item: MenuItem]
}>()

const isDark = ref(false)
const isMobile = ref(false)
const showMobileMenu = ref(false)

const currentPageTitle = computed(() => {
  const current = props.menuItems.find(item => item.id === props.activeMenu)
  return current?.title || 'Prompt Generator'
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const handleMenuSelect = (item: MenuItem) => {
  emit('menuSelect', item)
}

const handleMobileMenuSelect = (item: MenuItem) => {
  emit('menuSelect', item)
  showMobileMenu.value = false
}

const handleBack = () => {
  emit('back')
}

const updateLayout = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  updateLayout()
  window.addEventListener('resize', updateLayout)
  
  // 初始化主题
  const savedTheme = localStorage.getItem('theme') || 'light'
  isDark.value = savedTheme === 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
})
</script>

<style scoped>
.modern-layout {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300;
}

.main-content {
  @apply flex h-[calc(100vh-4rem)];
}

.content-area {
  @apply flex-1 flex flex-col overflow-hidden;
}

.content-area.full-width {
  @apply w-full;
}

.page-content {
  @apply flex-1 overflow-y-auto p-4 md:p-6 lg:p-8;
}

.mobile-nav {
  @apply flex items-center p-4 border-b border-gray-200 dark:border-gray-700;
}

.mobile-menu-btn {
  @apply p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors;
}

.mobile-title {
  @apply ml-4 text-lg font-semibold text-gray-900 dark:text-white;
}

/* 滚动条样式 */
.page-content::-webkit-scrollbar {
  @apply w-2;
}

.page-content::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.page-content::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

.page-content::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>