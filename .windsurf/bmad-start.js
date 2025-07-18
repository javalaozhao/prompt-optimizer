#!/usr/bin/env node

/**
 * Windsurf IDE 中的 BMad 启动器
 * 这个脚本提供了一个简化的方式来在Windsurf中使用BMad代理
 */

const fs = require('fs');
const path = require('path');

class WindsurfBMad {
  constructor() {
    this.projectRoot = process.cwd();
  }

  start() {
    console.log(`
🎯 Windsurf BMad 启动器

在 Windsurf 的 Claude Code 对话框中，你可以直接使用以下代理：

📋 可用代理：
- @pm - 产品经理：需求分析和用户故事
- @architect - 架构师：技术架构和设计
- @dev - 开发工程师：代码实现和最佳实践  
- @sm - Scrum Master：项目管理和计划

🔧 快捷命令：
- /analyze - 分析当前项目
- /modernize - 开始现代化改造
- /help - 显示所有可用命令

💡 使用示例：
在 Claude Code 对话框中输入：
"@pm 分析PromptMaster Pro的UI现代化需求"
"@architect 设计现代单页面应用的组件架构"
"@dev 实现响应式布局的最佳实践"

📁 项目配置已就绪：
- 文档结构：docs/bmad/
- 代理配置：.bmad-core/
- 架构文档：docs/bmad/architecture.md

🚀 现在你可以在 Windsurf 中使用 BMad 了！
    `);
  }

  showHelp() {
    console.log(`
Windsurf BMad 使用帮助

## 代理说明

@pm - 产品经理
负责：需求分析、用户故事、功能优先级
使用："@pm 分析提示词优化功能需求"

@architect - 架构师  
负责：技术架构、组件设计、性能优化
使用："@architect 设计现代单页面架构"

@dev - 开发工程师
负责：代码实现、最佳实践、调试方案
使用："@dev 实现响应式布局组件"

@sm - Scrum Master
负责：项目计划、任务分解、风险管理
使用："@sm 制定现代化改造计划"

## 工作流

1. 需求分析 → @pm
2. 架构设计 → @architect
3. 代码实现 → @dev  
4. 项目管理 → @sm

## 快速开始

在 Windsurf 中：
1. 打开 Claude Code 对话框
2. 输入：@pm 开始UI现代化需求分析
3. 按照代理建议逐步执行
    `);
  }
}

// 命令行处理
const args = process.argv.slice(2);
const bmad = new WindsurfBMad();

if (args.includes('--help') || args.includes('-h')) {
  bmad.showHelp();
} else {
  bmad.start();
}