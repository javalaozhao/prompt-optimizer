# 环境变量配置指南

PromptMaster Pro支持通过环境变量进行配置，这在Docker部署和Vercel部署中特别有用。本文档详细说明了所有支持的环境变量及其用途。

## API密钥配置

以下环境变量用于配置各AI服务提供商的API密钥：

| 环境变量 | 描述 | 示例 |
|---------|------|------|
| `VITE_OPENAI_API_KEY` | OpenAI API密钥 | `sk-abcdefg123456789` |
| `VITE_GEMINI_API_KEY` | Google Gemini API密钥 | `AIzaSyA1B2C3D4E5F6G7H8I9J0K` |
| `VITE_DEEPSEEK_API_KEY` | DeepSeek API密钥 | `dsapi-abcdefg123456789` |
| `VITE_ZHIPU_API_KEY` | 智谱AI API密钥 | `zhipu-abcdefg123456789` |
| `VITE_SILICONFLOW_API_KEY` | SiliconFlow API密钥 | `sf-abcdefg123456789` |

## 自定义API配置

如果您使用的是OpenAI兼容的API（如私有部署的LLM服务），可以使用以下环境变量进行配置：

| 环境变量 | 描述 | 示例 |
|---------|------|------|
| `VITE_CUSTOM_API_KEY` | 自定义API密钥 | `your-custom-api-key` |
| `VITE_CUSTOM_API_BASE_URL` | 自定义API基础URL | `https://your-api-server.com/v1` |
| `VITE_CUSTOM_API_MODEL` | 自定义API模型名称 | `your-model-name` |

## 访问控制配置

以下环境变量用于配置访问控制，保护您的部署：

| 环境变量 | 描述 | 默认值 | 示例 |
|---------|------|-------|------|
| `ACCESS_USERNAME` | 访问用户名 | `admin` | `your-username` |
| `ACCESS_PASSWORD` | 访问密码（强烈建议设置） | 无 | `your-secure-password` |

## 在Docker中使用环境变量

### 方法1：通过命令行参数

```bash
docker run -d -p 80:80 \
  -e VITE_OPENAI_API_KEY=your_key \
  -e ACCESS_PASSWORD=your_password \
  --name promptmaster-pro \
  promptmaster/promptmaster-pro
```

### 方法2：通过.env文件

1. 创建.env文件：

```bash
cat > .env << EOF
# API密钥配置
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key

# 访问控制配置
ACCESS_USERNAME=your_username
ACCESS_PASSWORD=your_password
EOF
```

2. 使用docker-compose：

```bash
docker compose up -d
```

## 在Vercel中使用环境变量

1. 在Vercel项目设置中，点击"Environment Variables"
2. 添加所需的环境变量，如`VITE_OPENAI_API_KEY`和`ACCESS_PASSWORD`
3. 保存设置并重新部署项目

## 注意事项

- 环境变量的值在构建时被嵌入到应用中，因此更改环境变量后需要重新构建或重新部署应用
- 对于Docker部署，可以通过重启容器使新的环境变量生效
- 对于Vercel部署，需要在更改环境变量后手动触发重新部署
- 强烈建议设置`ACCESS_PASSWORD`以保护您的部署，特别是在公共网络上