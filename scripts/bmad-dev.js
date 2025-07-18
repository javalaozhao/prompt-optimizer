#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BMAD_CONFIG = {
  project: 'prompt-optimizer',
  rootDir: process.cwd(),
  packages: [
    { name: 'core', path: 'packages/core' },
    { name: 'ui', path: 'packages/ui' },
    { name: 'web', path: 'packages/web' }
  ]
};

class BMadDev {
  constructor() {
    this.config = BMAD_CONFIG;
  }

  async init() {
    console.log('🚀 BMad Dev 辅助工具启动...');
    console.log(`项目: ${this.config.project}`);
    console.log(`根目录: ${this.config.rootDir}`);
    
    this.checkEnvironment();
    this.setupDevelopment();
  }

  checkEnvironment() {
    console.log('🔍 检查开发环境...');
    
    // 检查 Node.js 版本
    try {
      const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
      console.log(`✅ Node.js: ${nodeVersion}`);
    } catch (error) {
      console.error('❌ Node.js 未安装');
      process.exit(1);
    }

    // 检查 pnpm
    try {
      const pnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim();
      console.log(`✅ pnpm: ${pnpmVersion}`);
    } catch (error) {
      console.error('❌ pnpm 未安装');
      process.exit(1);
    }
  }

  setupDevelopment() {
    console.log('⚙️  设置开发环境...');
    
    // 检查每个包的状态
    this.config.packages.forEach(pkg => {
      const pkgPath = path.join(this.config.rootDir, pkg.path);
      if (fs.existsSync(pkgPath)) {
        console.log(`✅ ${pkg.name}: ${pkg.path}`);
      } else {
        console.log(`❌ ${pkg.name}: ${pkg.path} 不存在`);
      }
    });
  }

  async dev() {
    console.log('🔄 启动开发模式...');
    execSync('npm run dev', { stdio: 'inherit' });
  }

  async build() {
    console.log('🔨 构建项目...');
    execSync('npm run build', { stdio: 'inherit' });
  }

  async test() {
    console.log('🧪 运行测试...');
    execSync('npm run test', { stdio: 'inherit' });
  }

  async clean() {
    console.log('🧹 清理项目...');
    execSync('npm run clean', { stdio: 'inherit' });
  }
}

// CLI 命令处理
const command = process.argv[2];
const bmad = new BMadDev();

switch (command) {
  case 'dev':
    bmad.dev();
    break;
  case 'build':
    bmad.build();
    break;
  case 'test':
    bmad.test();
    break;
  case 'clean':
    bmad.clean();
    break;
  case 'init':
    bmad.init();
    break;
  default:
    console.log('BMad Dev 工具使用说明:');
    console.log('  node scripts/bmad-dev.js init    - 初始化开发环境');
    console.log('  node scripts/bmad-dev.js dev     - 启动开发模式');
    console.log('  node scripts/bmad-dev.js build   - 构建项目');
    console.log('  node scripts/bmad-dev.js test    - 运行测试');
    console.log('  node scripts/bmad-dev.js clean   - 清理项目');
}