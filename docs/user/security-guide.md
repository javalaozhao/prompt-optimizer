# 安全配置指南

PromptMaster Pro提供了多种安全机制，以保护您的部署和数据。本文档详细说明了如何配置和使用这些安全功能。

## 访问控制

### 密码保护

PromptMaster Pro默认启用密码保护功能，通过设置环境变量`ACCESS_PASSWORD`来控制。

#### 配置方法

1. **Docker部署**:
   ```bash
   docker run -d -p 80:80 \
     -e ACCESS_PASSWORD=your_secure_password \
     --name promptmaster-pro \
     promptmaster/promptmaster-pro
   ```

2. **Vercel部署**:
   - 在Vercel项目设置中，添加环境变量`ACCESS_PASSWORD`
   - 设置一个安全的密码作为其值
   - 重新部署项目以使设置生效

#### 工作原理

- 当用户访问您的部署时，会显示一个密码验证页面
- 用户需要输入正确的密码才能访问应用
- 系统会设置一个Cookie来记住用户的身份验证状态，有效期为7天
- 用户可以通过清除浏览器Cookie或点击退出按钮来注销

### 自定义用户名

您可以通过设置环境变量`ACCESS_USERNAME`来自定义访问用户名，默认为"admin"。

```bash
docker run -d -p 80:80 \
  -e ACCESS_USERNAME=your_username \
  -e ACCESS_PASSWORD=your_password \
  --name promptmaster-pro \
  promptmaster/promptmaster-pro
```

## API密钥安全

### 环境变量存储

所有API密钥都应通过环境变量进行配置，而不是硬编码在代码中。

#### 配置方法

1. **Docker部署**:
   ```bash
   docker run -d -p 80:80 \
     -e VITE_OPENAI_API_KEY=your_openai_key \
     -e ACCESS_PASSWORD=your_password \
     --name promptmaster-pro \
     promptmaster/promptmaster-pro
   ```

2. **Vercel部署**:
   - 在Vercel项目设置中，添加所需的API密钥环境变量
   - 这些环境变量在构建时被嵌入到应用中

### 客户端安全

PromptMaster Pro采用纯客户端架构，具有以下安全特性：

- API密钥仅存储在用户的浏览器本地存储中
- 所有API请求直接从用户浏览器发送到AI服务提供商
- 不经过任何中间服务器，减少了数据泄露的风险

## 跨域资源共享(CORS)安全

### Vercel代理功能

为了解决跨域问题，PromptMaster Pro提供了Vercel代理功能，可以安全地代理API请求。

#### 工作原理

1. 用户浏览器发送请求到Vercel Edge Function
2. Vercel Edge Function代理请求到AI服务提供商
3. 响应通过Vercel Edge Function返回给用户浏览器

#### 安全考虑

- Vercel代理功能使用Edge Runtime，提供更好的性能和安全性
- 所有代理请求都经过验证，确保只代理到有效的URL
- 代理功能仅用于解决跨域问题，不会存储或记录任何API密钥或请求内容

## 数据安全

### 本地存储

PromptMaster Pro将所有用户数据存储在浏览器的本地存储中，包括：

- 历史记录
- 模型配置
- 自定义模板
- 用户偏好设置

这意味着：

- 数据不会上传到任何服务器
- 数据在用户清除浏览器数据之前一直保留
- 不同用户之间的数据是隔离的

### 数据导出和备份

用户可以通过数据管理功能导出所有数据，以便备份或迁移：

1. 点击界面右上角的"💾数据管理"按钮
2. 选择"导出数据"选项
3. 保存导出的JSON文件到安全的位置

## 安全最佳实践

### 部署建议

1. **定期更新**:
   - 定期从GitHub拉取最新版本
   - 重新构建和部署应用，以获取安全修复和功能更新

2. **使用HTTPS**:
   - 确保您的部署使用HTTPS协议
   - Vercel部署默认启用HTTPS
   - 对于自托管部署，配置SSL证书

3. **限制访问**:
   - 始终设置强密码保护您的部署
   - 考虑使用IP白名单限制访问（如果您的托管平台支持）

### API密钥管理

1. **使用API密钥权限控制**:
   - 为OpenAI等服务创建具有最小必要权限的API密钥
   - 定期轮换API密钥

2. **监控API使用情况**:
   - 定期检查AI服务提供商的使用情况仪表板
   - 设置使用限制和预算警报

## 安全问题报告

如果您发现任何安全漏洞或问题，请通过以下方式联系我们：

- 发送电子邮件至：[security@example.com](mailto:security@example.com)
- 在GitHub上提交安全问题：[https://github.com/javalaozhao/promptmaster-pro/issues](https://github.com/javalaozhao/promptmaster-pro/issues)