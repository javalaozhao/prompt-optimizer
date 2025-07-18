#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BMadModernizer {
  constructor() {
    this.projectRoot = process.cwd();
    this.packages = {
      web: path.join(this.projectRoot, 'packages/web'),
      ui: path.join(this.projectRoot, 'packages/ui')
    };
  }

  async start() {
    console.log('🚀 BMad Modernizer 启动...');
    console.log('📁 项目根目录:', this.projectRoot);
    
    await this.checkEnvironment();
    await this.showMenu();
  }

  async checkEnvironment() {
    console.log('🔍 检查开发环境...');
    
    // 检查必要的配置文件
    const checkFiles = [
      'package.json',
      'pnpm-workspace.yaml',
      'packages/web/package.json',
      'packages/ui/package.json'
    ];

    checkFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} 存在`);
      } else {
        console.log(`❌ ${file} 不存在`);
      }
    });
  }

  async showMenu() {
    console.log('\n📋 现代化改造菜单:');
    console.log('1. 安装现代UI依赖');
    console.log('2. 创建现代组件');
    console.log('3. 设置主题系统');
    console.log('4. 优化响应式布局');
    console.log('5. 添加动画系统');
    console.log('6. 完整现代化改造');
    console.log('7. 退出');

    // 在实际环境中，这里会读取用户输入
    console.log('💡 使用命令行参数选择操作，例如: node bmad-modernize.js --option 1');
  }

  async installModernUIDependencies() {
    console.log('📦 安装现代UI依赖...');
    
    const dependencies = [
      '@headlessui/vue',
      '@heroicons/vue',
      '@tailwindcss/typography',
      'tailwindcss-animate'
    ];

    try {
      execSync(`cd ${this.packages.web} && pnpm add ${dependencies.join(' ')}`, { stdio: 'inherit' });
      console.log('✅ 现代UI依赖安装完成');
    } catch (error) {
      console.error('❌ 依赖安装失败:', error.message);
    }
  }

  async createModernComponents() {
    console.log('🎨 创建现代组件...');
    
    const components = [
      {
        name: 'ModernLayout.vue',
        path: 'packages/ui/src/components/modern/ModernLayout.vue',
        content: this.getModernLayoutContent()
      },
      {
        name: 'ThemeToggle.vue',
        path: 'packages/ui/src/components/modern/ThemeToggle.vue',
        content: this.getThemeToggleContent()
      },
      {
        name: 'ModernButton.vue',
        path: 'packages/ui/src/components/modern/ModernButton.vue',
        content: this.getModernButtonContent()
      }
    ];

    components.forEach(component => {
      const fullPath = path.join(this.projectRoot, component.path);
      const dir = path.dirname(fullPath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, component.content);
      console.log(`✅ 创建组件: ${component.name}`);
    });
  }

  async setupThemeSystem() {
    console.log('🌓 设置主题系统...');
    
    const themeFiles = [
      {
        name: 'modern.css',
        path: 'packages/ui/src/styles/modern.css',
        content: this.getModernCSSContent()
      },
      {
        name: 'useTheme.ts',
        path: 'packages/ui/src/composables/useTheme.ts',
        content: this.getUseThemeContent()
      }
    ];

    themeFiles.forEach(file => {
      const fullPath = path.join(this.projectRoot, file.path);
      const dir = path.dirname(fullPath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, file.content);
      console.log(`✅ 创建主题文件: ${file.name}`);
    });
  }

  getModernLayoutContent() {
    return `<template>
  <div class="modern-layout" :class="{ 'dark': isDark }">
    <header class="modern-header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-text">PromptMaster</span>
        </div>
        <nav class="nav-menu">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/editor" class="nav-link">编辑器</router-link>
          <router-link to="/history" class="nav-link">历史</router-link>
        </nav>
        <div class="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
    
    <main class="modern-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'
import ThemeToggle from './ThemeToggle.vue'

const { isDark } = useTheme()
</script>

<style scoped>
.modern-layout {
  min-height: 100vh;
  background: var(--color-background);
  color: var(--color-text);
  transition: all 0.3s ease;
}

.modern-header {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  backdrop-filter: blur(10px);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-primary);
}

.modern-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>`;
  }

  getThemeToggleContent() {
    return `<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :aria-label="isDark ? '切换到亮色主题' : '切换到暗色主题'"
  >
    <svg v-if="isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
    </svg>
    <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background: var(--color-surface-hover);
  transform: translateY(-1px);
}
</style>`;
  }

  getModernButtonContent() {
    return `<template>
  <button 
    :class="buttonClasses"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const buttonClasses = computed(() => [
  'modern-button',
  \`modern-button--\${props.variant}\`,
  \`modern-button--\${props.size}\`
])
</script>

<style scoped>
.modern-button {
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.modern-button--primary {
  background: var(--color-primary);
  color: white;
}

.modern-button--primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}

.modern-button--secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.modern-button--secondary:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

.modern-button--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.modern-button--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.modern-button--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.modern-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>`;
  }

  getModernCSSContent() {
    return `/* 现代CSS变量系统 */
:root {
  /* 主色调 */
  --color-primary: #3b82f6;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #2563eb;
  
  /* 成功色 */
  --color-success: #10b981;
  --color-success-light: #34d399;
  --color-success-dark: #059669;
  
  /* 警告色 */
  --color-warning: #f59e0b;
  --color-warning-light: #fbbf24;
  --color-warning-dark: #d97706;
  
  /* 错误色 */
  --color-error: #ef4444;
  --color-error-light: #f87171;
  --color-error-dark: #dc2626;
  
  /* 中性色 */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  
  /* 背景色 */
  --color-background: #ffffff;
  --color-background-secondary: #f9fafb;
  --color-background-tertiary: #f3f4f6;
  
  /* 前景色 */
  --color-foreground: #111827;
  --color-foreground-secondary: #4b5563;
  --color-foreground-tertiary: #9ca3af;
  
  /* 边框色 */
  --color-border: #e5e7eb;
  --color-border-hover: #d1d5db;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* 圆角 */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  
  /* 间距 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  
  /* 字体大小 */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
}

/* 深色主题 */
[data-theme="dark"] {
  --color-background: #0f172a;
  --color-background-secondary: #1e293b;
  --color-background-tertiary: #334155;
  
  --color-foreground: #f1f5f9;
  --color-foreground-secondary: #cbd5e1;
  --color-foreground-tertiary: #94a3b8;
  
  --color-border: #334155;
  --color-border-hover: #475569;
}

/* 现代动画 */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in {
  animation: fade-in 0.2s ease-out;
}

.slide-up {
  animation: slide-up 0.2s ease-out;
}

.slide-in {
  animation: slide-in 0.2s ease-out;
}`;
  }

  getUseThemeContent() {
    return `import { ref, watch, onMounted } from 'vue';

export interface ThemeConfig {
  isDark: boolean;
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export function useTheme(): ThemeConfig {
  const isDark = ref(false);
  const currentTheme = ref<'light' | 'dark'>('light');

  const setTheme = (theme: 'light' | 'dark') => {
    currentTheme.value = theme;
    isDark.value = theme === 'dark';
    
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  };

  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark');
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    }
  });

  return {
    isDark,
    currentTheme,
    toggleTheme,
    setTheme
  };
}`;
  }

  async runFullModernization() {
    console.log('🎨 执行完整现代化改造...');
    
    await this.createModernComponents();
    await this.setupThemeSystem();
    
    console.log('✅ 现代化改造完成！');
    console.log('📋 下一步:');
    console.log('1. 运行: npm run dev');
    console.log('2. 访问: http://localhost:18182');
    console.log('3. 查看效果并开始使用新的现代UI');
  }
}

// 命令行处理
const args = process.argv.slice(2);
const modernizer = new BMadModernizer();

if (args.includes('--install')) {
  modernizer.installModernUIDependencies();
} else if (args.includes('--components')) {
  modernizer.createModernComponents();
} else if (args.includes('--theme')) {
  modernizer.setupThemeSystem();
} else if (args.includes('--full')) {
  modernizer.runFullModernization();
} else {
  modernizer.start();
}