# Prompt Generator 🚀

<div align="center">

[English](README_EN.md) | [中文](README.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker Pulls](https://img.shields.io/docker/pulls/prompt-generator/prompt-generator)](https://hub.docker.com/r/prompt-generator/prompt-generator)
[![Deploy with Vercel](https://img.shields.io/badge/Vercel-indigo?style=flat&logo=vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjavalaozhao%2Fprompt-generator)

[Live Demo](#) | [Quick Start](#quick-start) | [FAQ](#faq) | [Deployment Guide](docs/user/deployment/vercel_en.md)

</div>

> **Attribution Statement**: This project is a commercial adaptation of the [Prompt Optimizer](https://github.com/linshenkx/prompt-optimizer) open source project, following the MIT license. Thanks to the original author for their contribution!

## 📖 Project Introduction

Prompt Generator is an AI prompt optimization tool specifically designed for enterprises and professional users, helping you write better AI prompts and improve AI output quality. As a solution focused on web services, it provides simple deployment methods and powerful features, suitable for team collaboration and enterprise-level applications.

### 🎥 Feature Demonstration

<div align="center">
  <p><b>1. Role-playing Dialogue: Unleashing the Potential of Small Models</b></p>
  <p>In cost-effective production scenarios or privacy-focused local deployments, structured prompts enable small models to consistently enter character roles, providing immersive and highly consistent role-playing experiences that effectively unleash their potential.</p>
  <img src="images/demo/cat-maid-roleplay.png" alt="Cat Maid Role-playing Demo" width="85%">
  <br>
  <p><b>2. Knowledge Graph Extraction: Ensuring Production Environment Stability</b></p>
  <p>In production environments requiring programmatic processing, high-quality prompts can significantly reduce requirements for model intelligence, enabling more economical small models to stably output reliable specified formats. This tool aims to assist developers in quickly achieving this goal, thereby accelerating development, ensuring stability, and achieving cost reduction and efficiency improvement.</p>
  <img src="images/demo/knowledge-graph-extractor.png" alt="Knowledge Graph Extraction Demo" width="85%">
  <br>
  <p><b>3. Poetry Writing: Assisting Creative Exploration and Requirement Customization</b></p>
  <p>When facing a powerful AI, our goal is not just to get a "good" answer, but to get a "desired" unique answer. This tool can help users refine vague inspiration (like "write a poem") into specific requirements (about what theme, what imagery, what emotions), assisting you in exploring, discovering, and precisely expressing your creativity to co-create unique works with AI.</p>
  <img src="images/demo/poetry-writing.png" alt="Poetry Writing Demo" width="85%">
</div>

## ✨ Core Features

- 🎯 **Intelligent Optimization**: One-click prompt optimization with multi-round iterative improvements to enhance AI response accuracy
- 📝 **Dual Mode Optimization**: Support for both system prompt optimization and user prompt optimization to meet different usage scenarios
- 🔄 **Comparison Testing**: Real-time comparison between original and optimized prompts for intuitive demonstration of optimization effects
- 🤖 **Multi-model Integration**: Support for mainstream AI models including OpenAI, Gemini, DeepSeek, Zhipu AI, SiliconFlow, etc.
- 🔒 **Secure Architecture**: Pure client-side processing with direct data interaction with AI service providers, bypassing intermediate servers
- 🔐 **Enterprise-grade Access Control**: Password protection enabled by default to secure enterprise deployments
- 🌐 **Professional Web Service**: Optimized for cloud server deployment, providing stable and reliable web service experience

## Quick Start

### 1. Docker Deployment (Recommended)

```bash
# Run container (with API key and access password configuration)
docker run -d -p 80:80 \
  -e VITE_OPENAI_API_KEY=your_key \
  -e ACCESS_USERNAME=your_username \  # Optional, defaults to "admin"
  -e ACCESS_PASSWORD=your_password \  # Set access password
  --restart unless-stopped \
  --name prompt-generator \
  prompt-generator/prompt-generator
```

### 2. Docker Compose Deployment

```bash
# 1. Clone the repository
git clone https://github.com/javalaozhao/prompt-generator.git
cd prompt-generator

# 2. Create .env file for API keys and authentication
cat > .env << EOF
# API Key Configuration
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
VITE_ZHIPU_API_KEY=your_zhipu_api_key
VITE_SILICONFLOW_API_KEY=your_siliconflow_api_key

# Basic Authentication (Password Protection)
ACCESS_USERNAME=your_username  # Optional, defaults to "admin"
ACCESS_PASSWORD=your_password  # Set access password
EOF

# 3. Start the service
docker compose up -d

# 4. View logs
docker compose logs -f
```

You can also directly edit the docker-compose.yml file to customize your configuration:

```yaml
services:
  prompt-generator:
    image: prompt-generator/prompt-generator:latest
    container_name: prompt-generator
    restart: unless-stopped
    ports:
      - "8081:80"  # Modify port mapping
    environment:
      - VITE_OPENAI_API_KEY=your_key_here  # Set API key directly in config
      - ACCESS_PASSWORD=your_password_here  # Set access password
```

### 3. Vercel Deployment

Method 1: One-click deployment to your own Vercel (convenient but without automatic updates):
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjavalaozhao%2Fprompt-generator)

Method 2: Fork the project and import to Vercel (recommended, but requires manual setup according to deployment docs):
   - First fork the project to your GitHub account
   - Then import the project to Vercel
   - This allows tracking project updates for easy syncing of new features and fixes
- Configure environment variables:
  - `ACCESS_PASSWORD`: Set access password to enable access restriction
  - `VITE_OPENAI_API_KEY` etc.: Configure API keys for various AI service providers

For more detailed deployment steps and important notes, please check:
- [Vercel Deployment Guide](docs/user/deployment/vercel_en.md)

## ⚙️ API Key Configuration

### Method 1: Via Interface (Recommended)
1. Click the "⚙️Settings" button in the upper right corner
2. Select the "Model Management" tab
3. Click on the model you need to configure (such as OpenAI, Gemini, DeepSeek, etc.)
4. Enter the corresponding API key in the configuration box
5. Click "Save"

Supported models: OpenAI, Gemini, DeepSeek, Zhipu AI, SiliconFlow, Custom API (OpenAI compatible interface)

In addition to API keys, you can configure advanced LLM parameters for each model individually. These parameters are configured through a field called `llmParams`, which allows you to specify any parameters supported by the LLM SDK in key-value pairs for fine-grained control over model behavior.

**Advanced LLM Parameter Configuration Examples:**
- **OpenAI/Compatible APIs**: `{"temperature": 0.7, "max_tokens": 4096, "timeout": 60000}`
- **Gemini**: `{"temperature": 0.8, "maxOutputTokens": 2048, "topP": 0.95}`
- **DeepSeek**: `{"temperature": 0.5, "top_p": 0.9, "frequency_penalty": 0.1}`

### Method 2: Via Environment Variables
Configure environment variables through the `-e` parameter when deploying with Docker:

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

## Local Development

```bash
# 1. Clone the project
git clone https://github.com/javalaozhao/prompt-generator.git
cd prompt-generator

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev               # Main development command: build core/ui and run web app
pnpm dev:web          # Run web app only
```

## FAQ

### API Connection Issues

#### Q1: Why can't I connect to the model service after configuring the API key?
**A**: Most connection failures are caused by **Cross-Origin Resource Sharing (CORS)** issues. As this project is a pure frontend application, browsers block direct access to API services from different origins for security reasons. Model services will reject direct requests from browsers if CORS policies are not correctly configured.

#### Q2: How to solve Ollama connection issues?
**A**: Ollama fully supports the OpenAI standard interface, just configure the correct CORS policy:
1. Set environment variable `OLLAMA_ORIGINS=*` to allow requests from any origin
2. If issues persist, set `OLLAMA_HOST=0.0.0.0:11434` to listen on any IP address

#### Q3: How to solve CORS issues with commercial APIs (such as Nvidia's DS API, ByteDance's Volcano API)?
**A**: These platforms typically have strict CORS restrictions. Recommended solutions:

1. **Use Vercel Proxy** (Convenient solution)
   - Check "Use Vercel Proxy" option in model settings
   - Request flow: Browser → Vercel → Model service provider
   - For detailed steps, please refer to the [Vercel Deployment Guide](docs/user/deployment/vercel_en.md)

2. **Use self-deployed API proxy service** (Reliable solution)
   - Deploy open-source API aggregation/proxy tools like OneAPI
   - Configure as custom API endpoint in settings
   - Request flow: Browser → Proxy service → Model service provider

## 📄 License

This project is licensed under the [MIT](LICENSE) License, derived from the [Prompt Optimizer](https://github.com/linshenkx/prompt-optimizer) project.

---

## 👥 Contact Us

- Business Cooperation: [Contact Email](#)
- Technical Support: [Support Email](#)
- Official Website: [Website Link](#)