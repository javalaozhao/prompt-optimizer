# PromptMaster Pro (提示词大师专业版) 🚀

<div align="center">

[English](README_EN.md) | [中文](README.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker Pulls](https://img.shields.io/docker/pulls/promptmaster/promptmaster-pro)](https://hub.docker.com/r/promptmaster/promptmaster-pro)
[![Deploy with Vercel](https://img.shields.io/badge/Vercel-indigo?style=flat&logo=vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjavalaozhao%2Fpromptmaster-pro)

[在线体验](#) | [快速开始](#快速开始) | [常见问题](#常见问题) | [部署指南](docs/user/deployment/vercel.md)

</div>

> **归属声明**: 本项目基于 [Prompt Optimizer](https://github.com/linshenkx/prompt-optimizer) 开源项目进行商业化改造，遵循MIT许可证。感谢原作者的贡献！

## 📖 项目简介

PromptMaster Pro是一个专为企业和专业用户设计的AI提示词优化工具，帮助您编写更好的AI提示词，提升AI输出质量。作为一个专注于Web服务的解决方案，它提供了简单的部署方式和强大的功能，适合团队协作和企业级应用。

### 🎥 功能演示

<div align="center">
  <p><b>1. 角色扮演对话：激发小模型潜力</b></p>
  <p>在追求成本效益的生产或注重隐私的本地化场景中，结构化的提示词能让小模型稳定地进入角色，提供沉浸式、高一致性的角色扮演体验，有效激发其潜力。</p>
  <img src="images/demo/cat-maid-roleplay.png" alt="猫女仆角色扮演演示" width="85%">
  <br>
  <p><b>2. 知识图谱提取：保障生产环境的稳定性</b></p>
  <p>在需要程序化处理的生产环境中，高质量的提示词能显著降低对模型智能程度的要求，使得更经济的小模型也能稳定输出可靠的指定格式。本工具旨在辅助开发者快速达到此目的，从而加速开发、保障稳定，实现降本增效。</p>
  <img src="images/demo/knowledge-graph-extractor.png" alt="知识图谱提取演示" width="85%">
  <br>
  <p><b>3. 诗歌写作：辅助创意探索与需求定制</b></p>
  <p>当面对一个强大的AI，我们的目标不只是得到一个"好"答案，而是得到一个"我们想要的"独特答案。本工具能帮助用户将一个模糊的灵感（如"写首诗"）细化为具体的需求（关于什么主题、何种意象、何种情感），辅助您探索、发掘并精确表达自己的创意，与AI共创独一无二的作品。</p>
  <img src="images/demo/poetry-writing.png" alt="诗歌创作演示" width="85%">
</div>

## ✨ 核心特性

- 🎯 **智能优化**：一键优化提示词，支持多轮迭代改进，提升AI回复准确度
- 📝 **双模式优化**：支持系统提示词优化和用户提示词优化，满足不同使用场景
- 🔄 **对比测试**：支持原始提示词和优化后提示词的实时对比，直观展示优化效果
- 🤖 **多模型集成**：支持OpenAI、Gemini、DeepSeek、智谱AI、SiliconFlow等主流AI模型
- 🔒 **安全架构**：纯客户端处理，数据直接与AI服务商交互，不经过中间服务器
- 🔐 **企业级访问控制**：默认启用密码保护功能，保障企业部署安全
- 🌐 **专业Web服务**：专为云服务器部署优化，提供稳定可靠的Web服务体验

## 快速开始

### 1. Docker部署（推荐）

```bash
# 运行容器（配置API密钥和访问密码）
docker run -d -p 80:80 \
  -e VITE_OPENAI_API_KEY=your_key \
  -e ACCESS_USERNAME=your_username \  # 可选，默认为"admin"
  -e ACCESS_PASSWORD=your_password \  # 设置访问密码
  --restart unless-stopped \
  --name promptmaster-pro \
  promptmaster/promptmaster-pro
```

### 2. Docker Compose部署

```bash
# 1. 克隆仓库
git clone https://github.com/javalaozhao/promptmaster-pro.git
cd promptmaster-pro

# 2. 创建.env文件配置API密钥和访问认证
cat > .env << EOF
# API密钥配置
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
VITE_ZHIPU_API_KEY=your_zhipu_api_key
VITE_SILICONFLOW_API_KEY=your_siliconflow_api_key

# Basic认证配置（密码保护）
ACCESS_USERNAME=your_username  # 可选，默认为"admin"
ACCESS_PASSWORD=your_password  # 设置访问密码
EOF

# 3. 启动服务
docker compose up -d

# 4. 查看日志
docker compose logs -f
```

你还可以直接编辑docker-compose.yml文件，自定义配置：

```yaml
services:
  promptmaster-pro:
    image: promptmaster/promptmaster-pro:latest
    container_name: promptmaster-pro
    restart: unless-stopped
    ports:
      - "8081:80"  # 修改端口映射
    environment:
      - VITE_OPENAI_API_KEY=your_key_here  # 直接在配置中设置密钥
      - ACCESS_PASSWORD=your_password_here  # 设置访问密码
```

### 3. Vercel部署

方式1：一键部署到自己的Vercel(方便，但后续无法自动更新)：
   [![部署到 Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjavalaozhao%2Fpromptmaster-pro)

方式2: Fork项目后在Vercel中导入（推荐，但需参考部署文档进行手动设置）：
   - 先Fork项目到自己的GitHub
   - 然后在Vercel中导入该项目
   - 可跟踪项目更新，便于同步最新功能和修复
- 配置环境变量：
  - `ACCESS_PASSWORD`：设置访问密码，启用访问限制
  - `VITE_OPENAI_API_KEY`等：配置各AI服务商的API密钥

更多详细的部署步骤和注意事项，请查看：
- [Vercel部署指南](docs/user/deployment/vercel.md)

## ⚙️ API密钥配置

### 方式一：通过界面配置（推荐）
1. 点击界面右上角的"⚙️设置"按钮
2. 选择"模型管理"选项卡
3. 点击需要配置的模型（如OpenAI、Gemini、DeepSeek等）
4. 在弹出的配置框中输入对应的API密钥
5. 点击"保存"即可

支持的模型：OpenAI、Gemini、DeepSeek、Zhipu智谱、SiliconFlow、自定义API（OpenAI兼容接口）

除了API密钥，您还可以在模型配置界面为每个模型单独设置高级LLM参数。这些参数通过一个名为 `llmParams` 的字段进行配置，它允许您以键值对的形式指定LLM SDK支持的任何参数，从而更精细地控制模型行为。

**高级LLM参数配置示例：**
- **OpenAI/兼容API**: `{"temperature": 0.7, "max_tokens": 4096, "timeout": 60000}`
- **Gemini**: `{"temperature": 0.8, "maxOutputTokens": 2048, "topP": 0.95}`
- **DeepSeek**: `{"temperature": 0.5, "top_p": 0.9, "frequency_penalty": 0.1}`

### 方式二：通过环境变量配置
Docker部署时通过 `-e` 参数配置环境变量：

```bash
-e VITE_OPENAI_API_KEY=your_key
-e VITE_GEMINI_API_KEY=your_key
-e VITE_DEEPSEEK_API_KEY=your_key
-e VITE_ZHIPU_API_KEY=your_key
-e VITE_SILICONFLOW_API_KEY=your_key
-e VITE_CUSTOM_API_KEY=your_custom_api_key
-e VITE_CUSTOM_API_BASE_URL=your_custom_api_base_url
-e VITE_CUSTOM_API_MODEL=your_custom_model_name
```

## 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/javalaozhao/promptmaster-pro.git
cd promptmaster-pro

# 2. 安装依赖
pnpm install

# 3. 启动开发服务
pnpm dev               # 主开发命令：构建core/ui并运行web应用
pnpm dev:web          # 仅运行web应用
```

## 常见问题

### API连接问题

#### Q1: 为什么配置好API密钥后仍然无法连接到模型服务？
**A**: 大多数连接失败是由**跨域问题**（CORS）导致的。由于本项目是纯前端应用，浏览器出于安全考虑会阻止直接访问不同源的API服务。模型服务如未正确配置CORS策略，会拒绝来自浏览器的直接请求。

#### Q2: 如何解决本地Ollama的连接问题？
**A**: Ollama完全支持OpenAI标准接口，只需配置正确的跨域策略：
1. 设置环境变量 `OLLAMA_ORIGINS=*` 允许任意来源的请求
2. 如仍有问题，设置 `OLLAMA_HOST=0.0.0.0:11434` 监听任意IP地址

#### Q3: 如何解决商业API（如Nvidia的DS API、字节跳动的火山API）的跨域问题？
**A**: 这些平台通常有严格的跨域限制，推荐以下解决方案：

1. **使用Vercel代理**（便捷方案）
   - 在模型设置中勾选"使用Vercel代理"选项
   - 请求流向：浏览器→Vercel→模型服务提供商
   - 详细步骤请参考 [Vercel部署指南](docs/user/deployment/vercel.md)

2. **使用自部署的API中转服务**（可靠方案）
   - 部署如OneAPI等开源API聚合/代理工具
   - 在设置中配置为自定义API端点
   - 请求流向：浏览器→中转服务→模型服务提供商

## 📄 开源协议

本项目基于 [MIT](LICENSE) 协议开源，源自 [Prompt Optimizer](https://github.com/linshenkx/prompt-optimizer) 项目。

---

## 👥 联系我们

- 商务合作：[联系邮箱](#)
- 技术支持：[支持邮箱](#)
- 官方网站：[网站链接](#)