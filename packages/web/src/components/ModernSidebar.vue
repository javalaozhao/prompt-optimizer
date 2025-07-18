<template>
  <aside class="modern-sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-toggle" @click="$emit('toggle-collapse')">
      <button class="toggle-btn modern-button modern-button-ghost">
        {{ isCollapsed ? '▶' : '◀' }}
      </button>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-items">
          <button
            v-for="item in menuItems"
            :key="item.id"
            class="nav-item modern-button modern-button-ghost"
            :class="{ active: activeMenu === item.id }"
            @click="$emit('menu-select', item.id)"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span v-if="!isCollapsed" class="nav-label">{{ item.label }}</span>
            <span v-if="!isCollapsed && item.badge" class="nav-badge">{{ item.badge }}</span>
          </button>
        </div>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-info" v-if="!isCollapsed">
        <div class="app-info">
          <span class="version">v1.3.0</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface MenuItem {
  id: string
  label: string
  icon: string
  badge?: number
}

interface Props {
  menuItems: MenuItem[]
  activeMenu: string
  isCollapsed: boolean
}

withDefaults(defineProps<Props>(), {
  isCollapsed: false
})

defineEmits<{
  'menu-select': [menuId: string]
  'toggle-collapse': []
}>()
</script>

<style scoped>
.modern-sidebar {
  width: 250px;
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  transition: width var(--transition-normal);
  padding-top: 70px;
}

.modern-sidebar.collapsed {
  width: 60px;
}

.sidebar-toggle {
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  z-index: 201;
}

.toggle-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 1rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
}

.nav-item:hover {
  background-color: var(--color-surface-hover);
}

.nav-item.active {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.nav-icon {
  font-size: 1.2rem;
  width: 20px;
  text-align: center;
}

.nav-label {
  flex: 1;
  font-weight: 500;
}

.nav-badge {
  background-color: var(--color-error);
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.75rem;
  min-width: 18px;
  text-align: center;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

.sidebar-info {
  text-align: center;
}

.version {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .modern-sidebar {
    position: fixed;
    left: -250px;
    transition: left var(--transition-normal);
  }
  
  .modern-sidebar.collapsed {
    left: -60px;
  }
}
</style>

<style>
.modern-sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 0.75rem 0;
}

.modern-sidebar.collapsed .nav-icon {
  margin: 0;
}
</style>