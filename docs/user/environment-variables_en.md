# Environment Variables Configuration Guide

Prompt Generator supports configuration through environment variables, which is particularly useful in Docker and Vercel deployments. This document details all supported environment variables and their purposes.

## API Key Configuration

The following environment variables are used to configure API keys for various AI service providers:

| Environment Variable | Description | Example |
|---------|------|------|
| `VITE_OPENAI_API_KEY` | OpenAI API key | `sk-abcdefg123456789` |
| `VITE_GEMINI_API_KEY` | Google Gemini API key | `AIzaSyA1B2C3D4E5F6G7H8I9J0K` |
| `VITE_DEEPSEEK_API_KEY` | DeepSeek API key | `dsapi-abcdefg123456789` |
| `VITE_ZHIPU_API_KEY` | Zhipu AI API key | `zhipu-abcdefg123456789` |
| `VITE_SILICONFLOW_API_KEY` | SiliconFlow API key | `sf-abcdefg123456789` |

## Custom API Configuration

If you are using an OpenAI-compatible API (such as a privately deployed LLM service), you can configure it using the following environment variables:

| Environment Variable | Description | Example |
|---------|------|------|
| `VITE_CUSTOM_API_KEY` | Custom API key | `your-custom-api-key` |
| `VITE_CUSTOM_API_BASE_URL` | Custom API base URL | `https://your-api-server.com/v1` |
| `VITE_CUSTOM_API_MODEL` | Custom API model name | `your-model-name` |

## Access Control Configuration

The following environment variables are used to configure access control, protecting your deployment:

| Environment Variable | Description | Default Value | Example |
|---------|------|-------|------|
| `ACCESS_USERNAME` | Access username | `admin` | `your-username` |
| `ACCESS_PASSWORD` | Access password (strongly recommended) | None | `your-secure-password` |

## Using Environment Variables in Docker

### Method 1: Via Command Line Arguments

```bash
docker run -d -p 80:80 \
  -e VITE_OPENAI_API_KEY=your_key \
  -e ACCESS_PASSWORD=your_password \
  --name prompt-generator \
  prompt-generator/prompt-generator
```

### Method 2: Via .env File

1. Create an .env file:

```bash
cat > .env << EOF
# API Key Configuration
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key

# Access Control Configuration
ACCESS_USERNAME=your_username
ACCESS_PASSWORD=your_password
EOF
```

2. Use docker-compose:

```bash
docker compose up -d
```

## Using Environment Variables in Vercel

1. In your Vercel project settings, click "Environment Variables"
2. Add the required environment variables, such as `VITE_OPENAI_API_KEY` and `ACCESS_PASSWORD`
3. Save the settings and redeploy the project

## Important Notes

- Environment variable values are embedded in the application at build time, so changing environment variables requires rebuilding or redeploying the application
- For Docker deployments, you can restart the container to make new environment variables effective
- For Vercel deployments, you need to manually trigger a redeployment after changing environment variables
- It is strongly recommended to set `ACCESS_PASSWORD` to protect your deployment, especially on public networks