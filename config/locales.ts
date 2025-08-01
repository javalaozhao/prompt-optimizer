/**
 * 应用程序支持的语言配置
 * 
 * 集中管理所有可用的语言选项，方便扩展和维护
 */

export const locales = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
];

export const localeCodes = locales.map(locale => locale.code);

export const defaultLocale = 'en';
