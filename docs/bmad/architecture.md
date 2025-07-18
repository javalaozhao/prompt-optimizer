# Prompt Generator - 系统架构文档

## 架构概览

Prompt Generator 采用现代化的前端架构，基于 Monorepo 设计，支持模块化开发和独立部署。

### 技术架构

#### 前端架构
```
┌─────────────────────────────────────────┐
│              Web层 (SPA)                │
│  ┌─────────────────────────────────────┐ │
│  │        Vue3 + TypeScript           │ │
│  │  ┌─────────────┐ ┌─────────────┐   │ │
│  │  │   页面组件   │ │   业务逻辑   │   │ │
│  │  └─────────────┘ └─────────────┘   │ │
│  │  ┌─────────────┐ ┌─────────────┐   │ │
│  │  │   UI组件库   │ │   状态管理   │   │ │
│  │  └─────────────┘ └─────────────┘   │ │
│  └─────────────────────────────────────┘ │
│              Vite构建                    │
└─────────────────────────────────────────┘
```

#### 组件架构
```
┌──────────────────────────────────────────────┐
│              组件层次结构                    │
├──────────────────────────────────────────────┤
│  页面层 (Pages)                              │
│  ├── Dashboard.vue                          │
│  ├── PromptEditor.vue                       │
│  ├── Settings.vue                           │
│  └── History.vue                            │
├──────────────────────────────────────────────┤
│  业务组件层 (Features)                       │
│  ├── PromptOptimizer                        │
│  ├── ModelSelector                          │
│  ├── TemplateGallery                        │
│  └── HistoryManager                         │
├──────────────────────────────────────────────┤
│  基础组件层 (UI Components)                  │
│  ├── ModernButton.vue                       │
│  ├── ModernCard.vue                         │
│  ├── ModernInput.vue                        │
│  └── ModernLayout.vue                       │
├──────────────────────────────────────────────┤
│  工具层 (Utils/Composables)                  │
│  ├── useTheme.ts                           │
│  ├── useAnimations.ts                      │
│  ├── useResponsive.ts                      │
│  └── usePromptOptimizer.ts                 │
└──────────────────────────────────────────────┘
```

### 数据流架构

#### 状态管理
```typescript
// 全局状态结构
interface AppState {
  theme: ThemeState
  prompts: PromptState
  models: ModelState
  settings: SettingsState
  ui: UIState
}

// 模块化状态
const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'light',
    isDark: false,
    customColors: {}
  })
})

const usePromptStore = defineStore('prompts', {
  state: () => ({
    items: [],
    current: null,
    history: [],
    templates: []
  })
})
```

#### 数据持久化
```typescript
// IndexedDB 结构
interface DatabaseSchema {
  prompts: {
    id: string
    content: string
    optimized: string
    model: string
    createdAt: Date
    updatedAt: Date
  }
  templates: {
    id: string
    name: string
    content: string
    category: string
    tags: string[]
  }
  settings: {
    theme: string
    apiKeys: Record<string, string>
    preferences: Record<string, any>
  }
}
```

### 性能优化架构

#### 构建优化
- **代码分割**: 基于路由的代码分割
- **懒加载**: 组件和路由懒加载
- **Tree Shaking**: 移除未使用代码
- **压缩**: Gzip/Brotli压缩

#### 运行时优化
- **虚拟滚动**: 大量数据列表优化
- **防抖/节流**: 输入和滚动事件优化
- **缓存策略**: API响应缓存
- **图片优化**: WebP格式 + 懒加载

### 响应式架构

#### 断点设计
```css
/* 响应式断点 */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

#### 响应式组件
```typescript
// 响应式组合式函数
export function useResponsive() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true)

  const updateLayout = () => {
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 1024
    isDesktop.value = width >= 1024
  }

  return { isMobile, isTablet, isDesktop }
}
```

### 主题系统架构

#### CSS变量系统
```css
:root {
  /* 现代色彩系统 */
  --color-primary: hsl(220 90% 56%);
  --color-primary-light: hsl(220 90% 66%);
  --color-primary-dark: hsl(220 90% 46%);
  
  /* 中性色 */
  --color-gray-50: hsl(220 20% 99%);
  --color-gray-100: hsl(220 20% 96%);
  --color-gray-200: hsl(220 20% 92%);
  --color-gray-300: hsl(220 20% 86%);
  --color-gray-400: hsl(220 20% 76%);
  --color-gray-500: hsl(220 20% 66%);
  --color-gray-600: hsl(220 20% 56%);
  --color-gray-700: hsl(220 20% 46%);
  --color-gray-800: hsl(220 20% 36%);
  --color-gray-900: hsl(220 20% 26%);
}

[data-theme="dark"] {
  --color-background: hsl(220 20% 8%);
  --color-surface: hsl(220 20% 12%);
  --color-text: hsl(220 20% 96%);
  --color-text-secondary: hsl(220 20% 76%);
}
```

### 安全架构

#### API安全
- **密钥管理**: 客户端加密存储
- **请求验证**: API密钥验证
- **速率限制**: API调用频率限制
- **错误处理**: 安全的错误信息

#### 数据安全
- **本地存储**: 敏感数据加密
- **传输安全**: HTTPS强制使用
- **XSS防护**: 输入验证和转义
- **CSRF防护**: 令牌验证

### 部署架构

#### 构建配置
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['element-plus'],
          utils: ['axios', 'dayjs']
        }
      }
    }
  }
})
```

#### 环境配置
- **开发环境**: 本地开发服务器
- **测试环境**: 功能测试环境
- **预生产**: 预发布环境
- **生产环境**: CDN部署

### 监控架构

#### 性能监控
- **Core Web Vitals**: LCP, FID, CLS
- **自定义指标**: 页面加载时间, API响应时间
- **错误监控**: 前端错误收集
- **用户行为**: 用户交互追踪

#### 日志系统
- **前端日志**: 用户操作日志
- **性能日志**: 页面性能数据
- **错误日志**: 错误信息和堆栈
- **分析日志**: 用户行为分析

### 扩展架构

#### 插件系统
```typescript
interface PluginSystem {
  register: (plugin: Plugin) => void
  unregister: (pluginId: string) => void
  execute: (pluginId: string, params: any) => Promise<any>
}

interface Plugin {
  id: string
  name: string
  version: string
  dependencies: string[]
  activate: () => void
  deactivate: () => void
}
```

#### 微前端准备
- **模块联邦**: Webpack模块联邦配置
- **路由整合**: 主应用路由管理
- **状态共享**: 全局状态管理
- **样式隔离**: CSS隔离方案

## 技术决策记录

### 1. 为什么选择Vue3 + TypeScript?
- **开发效率**: 组合式API提升开发体验
- **类型安全**: TypeScript提供编译时类型检查
- **生态丰富**: 完善的生态系统和社区支持
- **性能优秀**: 编译时优化和运行时性能

### 2. 为什么选择Vite?
- **快速启动**: 秒级冷启动
- **模块热更新**: 快速HMR
- **优化的构建**: 基于Rollup的高效构建
- **TypeScript支持**: 开箱即用的TS支持

### 3. 为什么选择TailwindCSS?
- **开发效率**: 原子化CSS类
- **一致性**: 设计系统一致性
- **可维护性**: 易于维护和修改
- **性能**: 按需生成CSS