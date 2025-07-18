<template>
  <aside class="modern-sidebar">
    <div class="sidebar-content">
      <!-- 导航菜单 -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li v-for="item in menuItems" :key="item.id" class="nav-item">
            <router-link
              :to="item.path"
              :class="['nav-link', { 'active': activeItem === item.id }]"
              @click="$emit('select', item)"
            >
              <div class="nav-icon">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     v-html="getIconPath(item.icon)">
                </svg>
              </div>
              <span class="nav-text">{{ item.title }}</span>
              <!-- 活动指示器 -->
              <div v-if="activeItem === item.id" class="active-indicator"></div>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- 分隔线 -->
      <div class="sidebar-divider"></div>

      <!-- 快速操作 -->
      <div class="quick-actions">
        <h3 class="quick-actions-title">快速操作</h3>
        <div class="quick-actions-list"
          <button 
            v-for="action in quickActions" 
            :key="action.id"
            class="quick-action-btn"
            @click="handleQuickAction(action)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 v-html="getIconPath(action.icon)">
            </svg>
            <span class="quick-action-text">{{ action.title }}</span>
          </button>
        </div>
      </div>

      <!-- 项目信息 -->
      <div class="project-info">
        <div class="project-version">
          <span class="version-label">版本</span>
          <span class="version-value">v1.3.0</span>
        </div>
        <div class="project-status">
          <div class="status-indicator"></div>
          <span class="status-text">在线</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface MenuItem {
  id: string
  title: string
  icon: string
  path: string
}

interface QuickAction {
  id: string
  title: string
  icon: string
  action: () => void
}

const props = defineProps<{
  menuItems: MenuItem[]
  activeItem: string
}>()

const emit = defineEmits<{
  select: [item: MenuItem]
}>()

const quickActions = [
  {
    id: 'new-prompt',
    title: '新建提示词',
    icon: 'plus',
    action: () => console.log('新建提示词')
  },
  {
    id: 'import-history',
    title: '导入历史',
    icon: 'upload',
    action: () => console.log('导入历史')
  },
  {
    id: 'export-data',
    title: '导出数据',
    icon: 'download',
    action: () => console.log('导出数据')
  }
]

const getIconPath = (iconName: string) => {
  const icons: Record<string, string> = {
    home: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
    prompt: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    history: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    plus: 'M12 4v16m8-8H4',
    upload: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
    download: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }
  return icons[iconName] || icons.home
}

const handleQuickAction = (action: QuickAction) => {
  action.action()
}
</script>

<style scoped>
.modern-sidebar {
  @apply w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700;
}

.sidebar-content {
  @apply flex flex-col h-full;
}

.sidebar-nav {
  @apply flex-1 px-4 py-6;
}

.nav-list {
  @apply space-y-1;
}

.nav-item {
  @apply relative;
}

.nav-link {
  @apply flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden;
  @apply text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700;
}

.nav-link:hover {
  @apply transform translate-x-1;
}

.nav-link.active {
  @apply bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold;
}

.nav-icon {
  @apply mr-3 flex-shrink-0 w-5 h-5;
}

.nav-text {
  @apply flex-1;
}

.active-indicator {
  @apply absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-600 dark:bg-blue-400 rounded-r-full;
}

.sidebar-divider {
  @apply border-t border-gray-200 dark:border-gray-700 mx-4;
}

.quick-actions {
  @apply px-4 py-4;
}

.quick-actions-title {
  @apply text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3;
}

.quick-actions-list {
  @apply space-y-1;
}

.quick-action-btn {
  @apply w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors;
}

.quick-action-btn:hover {
  @apply transform translate-x-1;
}

.quick-action-text {
  @apply ml-3;
}

.project-info {
  @apply px-4 py-4 border-t border-gray-200 dark:border-gray-700;
}

.project-version {
  @apply flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2;
}

.version-label {
  @apply font-medium;
}

.version-value {
  @apply font-mono;
}

.project-status {
  @apply flex items-center space-x-2 text-xs;
}

.status-indicator {
  @apply w-2 h-2 bg-green-500 rounded-full animate-pulse;
}

.status-text {
  @apply text-gray-500 dark:text-gray-400;
}

/* 动画效果 */
.nav-link,
.quick-action-btn {
  transition: all 0.2s ease-in-out;
}

.nav-link:active,
.quick-action-btn:active {
  transform: scale(0.98);
}

/* 深色模式适配 */
[data-theme="dark"] .modern-sidebar {
  background: linear-gradient(to bottom, #1f2937, #111827);
}

[data-theme="dark"] .nav-link.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
}
</style>

<style>
/* 全局样式确保一致性 */
[data-theme="dark"] .modern-sidebar {
  --color-text: #f3f4f6;
  --color-bg: #1f2937;
  --color-border: #374151;
}
</style>