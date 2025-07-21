# 国际化 (i18n) 使用指南

## 概述

本项目使用 `next-intl` 库实现国际化 (i18n) 功能，支持中英文无缝切换。本文档提供了关于如何使用、扩展和维护国际化功能的指南。

## 目录结构

```
prompt-optimizer/
├── app/
│   ├── [locale]/           # 国际化路由
│   │   ├── getMessages.ts  # 消息加载器
│   │   ├── layout.tsx      # 国际化布局
│   │   └── page.tsx        # 国际化页面
├── components/
│   └── LanguageSwitcher.tsx # 语言切换组件
├── messages/
│   ├── en.json             # 英文翻译
│   └── zh.json             # 中文翻译
└── middleware.ts           # 国际化中间件
```

## 技术实现

### 1. 路由与中间件

本项目使用 Next.js App Router 的动态路由功能，通过 `[locale]` 参数实现国际化路由。中间件 (`middleware.ts`) 负责：

- 检测用户首选语言（URL路径、Cookie、浏览器设置）
- 重定向到正确的语言路径
- 处理语言切换请求

### 2. 翻译文件

翻译内容存储在 `messages/` 目录下的 JSON 文件中：

- `en.json`：英文翻译
- `zh.json`：中文翻译

翻译文件使用嵌套结构，按照功能模块组织内容，例如：

```json
{
  "Header": {
    "tools": "工具",
    "blog": "博客"
  },
  "Homepage": {
    "title": "AI 提示词工程工具箱"
  }
}
```

### 3. 消息加载

`getMessages.ts` 文件负责根据当前语言环境动态加载对应的翻译文件：

```typescript
export async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`加载语言文件失败: ${locale}`, error);
    return {};
  }
}
```

### 4. 语言切换

`LanguageSwitcher` 组件提供了语言切换功能，并将用户的语言偏好保存在 localStorage 中，以便在下次访问时自动应用。

## 使用指南

### 1. 添加新的翻译

要添加新的翻译内容，请按照以下步骤操作：

1. 在 `messages/en.json` 和 `messages/zh.json` 中添加相应的键值对
2. 遵循现有的嵌套结构和命名规范
3. 确保两个文件中的键保持一致

**示例：**

```json
// en.json
{
  "FeatureName": {
    "title": "Feature Title",
    "description": "Feature description in English"
  }
}

// zh.json
{
  "FeatureName": {
    "title": "功能标题",
    "description": "中文功能描述"
  }
}
```

### 2. 在组件中使用翻译

在 React 组件中使用翻译的方法：

```tsx
// 客户端组件
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('FeatureName');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

// 服务器组件
import { getTranslations } from 'next-intl/server';

export default async function MyServerComponent() {
  const t = await getTranslations('FeatureName');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### 3. 处理动态内容

对于包含变量的翻译内容，可以使用以下方法：

```tsx
// 翻译文件
{
  "greeting": "你好，{name}！"
}

// 组件中使用
const t = useTranslations('Namespace');
return <p>{t('greeting', { name: userName })}</p>;
```

### 4. 添加新语言

要添加新的语言支持，请按照以下步骤操作：

1. 在 `messages/` 目录下创建新的语言文件，例如 `ja.json`
2. 在 `middleware.ts` 中更新 `locales` 数组：

```typescript
const intlMiddleware = createMiddleware({
  locales: ['en', 'zh', 'ja'],
  defaultLocale: 'en',
});
```

3. 在 `LanguageSwitcher.tsx` 中添加新的语言选项

## 命名规范

为确保翻译内容的一致性和可维护性，请遵循以下命名规范：

1. **命名空间**：使用 PascalCase 格式，例如 `HomePage`、`UserProfile`
2. **键名**：使用 camelCase 格式，例如 `pageTitle`、`welcomeMessage`
3. **嵌套结构**：按照功能模块或页面组织内容，避免过深的嵌套（最多3层）

## 最佳实践

1. **避免硬编码文本**：所有面向用户的文本都应使用 i18n 框架
2. **保持翻译文件同步**：确保所有语言文件包含相同的键
3. **使用有意义的键名**：键名应反映其内容，便于理解和维护
4. **避免过长的翻译键**：使用合理的嵌套结构，避免过长的键名路径
5. **添加注释**：对于复杂或特殊的翻译内容，添加注释说明用途和上下文

## 测试

在添加或修改翻译内容后，请进行以下测试：

1. **切换语言测试**：确保语言切换功能正常工作
2. **内容显示测试**：确保所有翻译内容正确显示
3. **布局测试**：确保不同语言下的布局不会破坏
4. **回归测试**：确保现有功能不受影响

## 故障排除

常见问题及解决方法：

1. **翻译内容不显示**：检查键名是否正确，确保翻译文件已正确加载
2. **语言切换不生效**：检查中间件配置和路由设置
3. **布局问题**：某些语言的文本可能较长，确保UI布局能够适应不同长度的文本

## 参考资源

- [next-intl 官方文档](https://next-intl-docs.vercel.app/)
- [Next.js 国际化指南](https://nextjs.org/docs/advanced-features/i18n-routing)
