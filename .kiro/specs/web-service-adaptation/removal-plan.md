# 项目组件移除计划

## 需要移除的组件

### 1. packages/desktop 目录
桌面应用相关的代码和配置，包括：
- Electron主进程代码 (main.js)
- 预加载脚本 (preload.js)
- 桌面应用配置 (config/)
- 应用图标 (icons/)
- 构建配置 (package.json中的build配置)
- 自动更新相关代码

### 2. packages/extension 目录
Chrome插件相关的代码和配置，包括：
- 插件清单文件 (public/manifest.json)
- 插件特定的UI代码 (src/)
- 插件构建配置 (vite.config.ts)
- 插件权限说明文档

### 3. 主项目package.json中的相关脚本和依赖
需要移除的脚本：
- `build:ext`: Chrome插件构建脚本
- `build:desktop-only`: 桌面应用构建脚本
- `build:desktop`: 桌面应用完整构建脚本
- `dev:ext`: Chrome插件开发脚本
- `dev:desktop`: 桌面应用开发脚本
- `dev:desktop:fresh`: 桌面应用开发脚本（清理版）
- `dev:desktop:parallel`: 桌面应用并行开发脚本

需要移除的依赖：
- `electron`: 桌面应用框架
- 其他仅用于桌面应用或Chrome插件的依赖

### 4. 核心包中的Electron相关代码
虽然不需要完全移除核心包，但需要移除或修改以下内容：
- `packages/core/src/services/*/electron-proxy.ts`: 各服务的Electron代理
- `packages/core/src/services/model/electron-config.ts`: Electron配置管理
- `packages/core/src/utils/environment.ts`: 环境检测工具中的Electron相关代码

## 需要保留的核心组件

### 1. packages/core
核心业务逻辑，包括：
- 模板管理
- 历史记录管理
- LLM服务
- 模型管理
- 存储服务
- 提示词服务
- 对比服务
- 数据管理
- 偏好设置服务

### 2. packages/ui
UI组件库，包括：
- 各种UI组件
- 组合式API (composables)
- 样式和主题

### 3. packages/web
Web应用入口，包括：
- 主应用组件
- 路由配置
- 构建配置

### 4. api
API代理功能，包括：
- 代理服务
- 认证服务
- 流式处理

### 5. docker
Docker配置，包括：
- Nginx配置
- 环境变量处理脚本
- 认证配置脚本

## 依赖关系分析

1. **packages/desktop** 依赖于 **packages/core** 和 **packages/web**
   - 桌面应用使用core包中的服务
   - 桌面应用嵌入了web包构建的前端界面

2. **packages/extension** 依赖于 **packages/ui**
   - Chrome插件使用ui包中的组件

3. **packages/core** 包含Electron相关代码，但这些代码是有条件执行的
   - 通过环境检测工具判断是否在Electron环境中
   - 非Electron环境下会使用Web版本的实现

4. **packages/ui** 不直接依赖于桌面应用或Chrome插件特定代码

## 移除策略

1. **保持核心功能完整**
   - 移除组件时确保不影响Web应用的核心功能
   - 保留环境检测工具，但修改为始终返回非Electron环境

2. **处理条件代码**
   - 对于包含条件逻辑的代码（如环境检测），修改为始终使用Web版本的实现
   - 保留Electron相关的接口定义，但实现为空函数或返回默认值

3. **更新构建配置**
   - 移除package.json中与桌面应用和Chrome插件相关的构建脚本
   - 优化构建流程，专注于Web应用构建

4. **优化Docker配置**
   - 保留并优化Docker配置，专注于Web服务部署
   - 确保环境变量配置适用于Web服务

## 风险评估

1. **功能依赖风险**
   - 风险：某些Web功能可能依赖于Electron特定API
   - 缓解：确保所有Electron API都有Web版本的替代实现

2. **构建流程风险**
   - 风险：移除构建脚本可能影响整体构建流程
   - 缓解：仔细检查构建依赖，确保Web应用构建不受影响

3. **代码质量风险**
   - 风险：移除代码可能导致未使用的导入或死代码
   - 缓解：移除后进行全面代码检查，确保代码质量

## 执行计划

1. 移除packages/desktop目录
2. 移除packages/extension目录
3. 更新package.json，移除相关脚本和依赖
4. 修改核心包中的Electron相关代码
5. 优化Docker配置
6. 全面测试Web应用功能