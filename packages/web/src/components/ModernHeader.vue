<template>
  <header class="modern-header">
    <div class="header-left">
      <div class="logo">
        <img src="/logo.png" alt="Prompt Generator" class="logo-img" />
        <span class="app-title">{{ appTitle }}</span>
      </div>
    </div>

    <div class="header-center">
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="搜索提示词..."
          class="search-input modern-input"
        />
        <button class="search-btn">
          🔍
        </button>
      </div>
    </div>

    <div class="header-right">
      <button 
        class="theme-toggle modern-button modern-button-ghost"
        @click="$emit('toggle-theme')"
        :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
      >
        {{ isDark ? '☀️' : '🌙' }}
      </button>
      
      <div class="user-menu">
        <button class="user-avatar modern-button modern-button-ghost">
          👤
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  appTitle: string
  isDark?: boolean
}

withDefaults(defineProps<Props>(), {
  isDark: false
})

defineEmits<{
  'toggle-theme': []
}>()
</script>

<style scoped>
.modern-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-img {
  height: 32px;
  width: auto;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.header-center {
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
}

.search-bar {
  display: flex;
  align-items: center;
  position: relative;
}

.search-input {
  padding-right: 2.5rem;
}

.search-btn {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--color-text-secondary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle {
  font-size: 1.2rem;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-avatar {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .modern-header {
    padding: 0.75rem 1rem;
  }
  
  .header-center {
    display: none;
  }
  
  .app-title {
    font-size: 1.125rem;
  }
}
</style>