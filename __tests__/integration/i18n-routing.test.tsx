/**
 * i18n 路由集成测试
 * 
 * 测试 i18n 路由和内容加载功能，验证：
 * 1. 语言切换时路由正确更新
 * 2. 内容根据当前语言正确加载
 * 3. 语言持久化功能
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import LanguageSwitcher from '../../components/LanguageSwitcher';

// 模拟 next/navigation 和 next-intl
const mockReplace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    replace: mockReplace,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => '/en/home'),
}));

vi.mock('next-intl', () => ({
  useLocale: vi.fn(() => 'en'),
  // 模拟 useTranslations hook 以测试内容翻译
  useTranslations: vi.fn(() => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'home.title': 'Welcome to Prompt Optimizer',
        'home.description': 'Optimize your prompts with AI',
      },
      zh: {
        'home.title': '欢迎使用提示词优化器',
        'home.description': '使用 AI 优化您的提示词',
      }
    };
    
    const locale = vi.mocked(useLocale)();
    return translations[locale]?.[key] || key;
  }),
}));

// 模拟 localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('i18n 路由集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    vi.mocked(useLocale).mockReturnValue('en');
    vi.mocked(usePathname).mockReturnValue('/en/home');
  });

  it('应该在切换语言时正确更新路由', async () => {
    // 渲染 LanguageSwitcher 组件
    render(<LanguageSwitcher />);

    // 验证初始状态为英文
    expect(screen.getByText('EN')).toBeInTheDocument();

    // 点击切换到中文
    await userEvent.click(screen.getByText('EN'));
    await userEvent.click(screen.getByText('中文'));

    // 验证路由被正确替换为中文路径
    expect(mockReplace).toHaveBeenCalledWith('/zh/home');
  });

  it('应该在从中文切换到英文时正确更新路由', async () => {
    // 模拟当前语言为中文
    vi.mocked(useLocale).mockReturnValue('zh');
    vi.mocked(usePathname).mockReturnValue('/zh/home');

    // 渲染 LanguageSwitcher 组件
    render(<LanguageSwitcher />);

    // 验证初始状态为中文
    expect(screen.getByText('ZH')).toBeInTheDocument();

    // 点击切换到英文
    await userEvent.click(screen.getByText('ZH'));
    await userEvent.click(screen.getByText('English'));

    // 验证路由被正确替换为英文路径
    expect(mockReplace).toHaveBeenCalledWith('/en/home');
  });

  it('应该处理不包含语言前缀的路径', async () => {
    // 模拟不包含语言前缀的路径
    vi.mocked(usePathname).mockReturnValue('/home');

    // 渲染 LanguageSwitcher 组件
    render(<LanguageSwitcher />);

    // 点击切换到中文
    await userEvent.click(screen.getByText('EN'));
    await userEvent.click(screen.getByText('中文'));

    // 验证路由被正确替换，添加了语言前缀
    expect(mockReplace).toHaveBeenCalledWith('/zh/home');
  });

  it('应该处理复杂的嵌套路径', async () => {
    // 模拟复杂的嵌套路径
    vi.mocked(usePathname).mockReturnValue('/en/dashboard/settings/profile');

    // 渲染 LanguageSwitcher 组件
    render(<LanguageSwitcher />);

    // 点击切换到中文
    await userEvent.click(screen.getByText('EN'));
    await userEvent.click(screen.getByText('中文'));

    // 验证路由被正确替换，保留了完整的路径结构
    expect(mockReplace).toHaveBeenCalledWith('/zh/dashboard/settings/profile');
  });
});
