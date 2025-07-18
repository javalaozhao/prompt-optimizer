<template>
  <div class="modern-layout">
    <!-- 顶部导航栏 -->
    <ModernHeader 
      :app-title="appTitle"
      :is-dark="isDark"
      @toggle-theme="$emit('toggle-theme')"
    />

    <div class="layout-container">
      <!-- 侧边栏 -->
      <ModernSidebar 
        :menu-items="menuItems" 
        :active-menu="activeMenu"
        :is-collapsed="sidebarCollapsed"
        @menu-select="$emit('menu-select', $event)"
        @toggle-collapse="sidebarCollapsed = !sidebarCollapsed"
      />

      <!-- 主内容区域 -->
      <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <div class="content-wrapper">
          <slot></slot>
        </div>
      </main>
    </div>

    <!-- 底部栏 -->
    <ModernFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModernHeader from './ModernHeader.vue'
import ModernSidebar from './ModernSidebar.vue'
import ModernFooter from './ModernFooter.vue'

interface MenuItem {
  id: string
  label: string
  icon: string
  badge?: number
}

interface Props {
  appTitle: string
  menuItems: MenuItem[]
  activeMenu: string
  isDark?: boolean
}

withDefaults(defineProps<Props>(), {
  isDark: false
})

defineEmits<{
  'menu-select': [menuId: string]
  'toggle-theme': []
}>()

const sidebarCollapsed = ref(false)
</script>

<style scoped>
.modern-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text-primary);
}

.layout-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  transition: margin-left var(--transition-normal);
  margin-left: 250px;
}

.main-content.sidebar-collapsed {
  margin-left: 60px;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
}
</style>