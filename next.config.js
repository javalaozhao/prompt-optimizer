/** @type {import('next').NextConfig} */
const nextConfig = {
  // 配置 i18n 支持
  // 注意：使用 next-intl 时，i18n 配置主要通过 middleware.ts 处理
  // 这里只需要确保其他配置正确
  experimental: {
    // 确保支持 App Router
    appDir: true,
  },
  // 确保 messages 目录中的 JSON 文件被正确处理
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
};

module.exports = nextConfig;
