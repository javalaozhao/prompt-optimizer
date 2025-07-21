/**
 * i18n 内容加载集成测试
 * 
 * 测试 i18n 内容加载功能，验证：
 * 1. 不同语言环境下内容正确显示
 * 2. 动态内容（如变量插值）在不同语言中正确工作
 * 3. 复杂的翻译场景（如复数形式）正确处理
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useLocale, useTranslations } from 'next-intl';

// 定义翻译数据类型
type TranslationsType = {
  [locale: string]: {
    [key: string]: string;
  };
};

// 定义参数类型
type TranslationParams = {
  name?: string;
  count?: number;
  [key: string]: any;
};

// 定义全局变量来存储当前语言
let currentLocale = 'en';

// 创建翻译数据
const translations: TranslationsType = {
  en: {
    'common.welcome': 'Welcome',
    'common.hello': 'Hello, {name}!',
    'common.items': '{count, plural, =0{No items} one{# item} other{# items}}',
    'dashboard.title': 'Dashboard',
    'dashboard.description': 'View your statistics and analytics',
  },
  zh: {
    'common.welcome': '欢迎',
    'common.hello': '你好，{name}！',
    'common.items': '{count, plural, =0{没有项目} other{# 个项目}}',
    'dashboard.title': '仪表盘',
    'dashboard.description': '查看您的统计数据和分析',
  }
};

// 语言切换函数
function setLocale(locale: string) {
  currentLocale = locale;
}

// 模拟 next-intl
vi.mock('next-intl', () => {
  return {
    useLocale: vi.fn(() => currentLocale),
    useTranslations: vi.fn((namespace?: string) => {
      return (key: string, params: TranslationParams = {}) => {
        const fullKey = namespace ? `${namespace}.${key}` : key;
        let message = translations[currentLocale]?.[fullKey] || fullKey;
        
        // 简单的参数替换
        if (params) {
          Object.entries(params).forEach(([param, value]) => {
            if (param !== 'count') {
              message = message.replace(`{${param}}`, String(value));
            }
          });
        }
        
        // 简单的复数形式处理
        if (params.count !== undefined && message.includes('{count, plural')) {
          const count = params.count;
          if (count === 0 && message.includes('=0{')) {
            message = message.match(/=0\{([^}]+)\}/)?.[1] || message;
          } else if (count === 1 && message.includes('one{')) {
            message = message.match(/one\{([^}]+)\}/)?.[1] || message;
          } else if (message.includes('other{')) {
            message = message.match(/other\{([^}]+)\}/)?.[1] || message;
          }
          
          message = message.replace('#', String(count));
        }
        
        return message;
      };
    })
  };
});

// 测试组件
interface TranslatedContentProps {
  name?: string;
  itemCount?: number;
}

const TranslatedContent = ({ name = 'User', itemCount = 0 }: TranslatedContentProps) => {
  const t = useTranslations('common');
  const dashboardT = useTranslations('dashboard');
  
  return (
    <div>
      <h1 data-testid="welcome">{t('welcome')}</h1>
      <p data-testid="hello">{t('hello', { name })}</p>
      <p data-testid="items">{t('items', { count: itemCount })}</p>
      <h2 data-testid="dashboard-title">{dashboardT('title')}</h2>
      <p data-testid="dashboard-description">{dashboardT('description')}</p>
    </div>
  );
};

describe('i18n 内容加载集成测试', () => {
  beforeEach(() => {
    // 重置为英文
    setLocale('en');
    // 清除之前的渲染结果
    document.body.innerHTML = '';
  });

  it('应该在英文环境下正确显示内容', () => {
    render(<TranslatedContent name="John" itemCount={5} />);
    
    expect(screen.getByTestId('welcome')).toHaveTextContent('Welcome');
    expect(screen.getByTestId('hello')).toHaveTextContent('Hello, John!');
    expect(screen.getByTestId('items')).toHaveTextContent('5 items');
    expect(screen.getByTestId('dashboard-title')).toHaveTextContent('Dashboard');
    expect(screen.getByTestId('dashboard-description')).toHaveTextContent('View your statistics and analytics');
  });

  it('应该在中文环境下正确显示内容', () => {
    // 切换到中文
    setLocale('zh');
    
    render(<TranslatedContent name="张三" itemCount={5} />);
    
    expect(screen.getByTestId('welcome')).toHaveTextContent('欢迎');
    expect(screen.getByTestId('hello')).toHaveTextContent('你好，张三！');
    expect(screen.getByTestId('items')).toHaveTextContent('5 个项目');
    expect(screen.getByTestId('dashboard-title')).toHaveTextContent('仪表盘');
    expect(screen.getByTestId('dashboard-description')).toHaveTextContent('查看您的统计数据和分析');
  });

  it('应该正确处理复数形式', () => {
    // 清除之前的渲染结果
    document.body.innerHTML = '';
    
    // 测试英文复数形式
    setLocale('en');
    
    // 测试零个项目
    render(<TranslatedContent itemCount={0} />);
    expect(screen.getByTestId('items')).toHaveTextContent('No items');
    
    // 清除之前的渲染结果
    document.body.innerHTML = '';
    
    // 测试单数形式
    render(<TranslatedContent itemCount={1} />);
    expect(screen.getByTestId('items')).toHaveTextContent('1 item');
    
    // 清除之前的渲染结果
    document.body.innerHTML = '';
    
    // 切换到中文测试复数形式
    setLocale('zh');
    
    // 测试零个项目
    render(<TranslatedContent itemCount={0} />);
    expect(screen.getByTestId('items')).toHaveTextContent('没有项目');
    
    // 清除之前的渲染结果
    document.body.innerHTML = '';
    
    // 测试单数形式
    render(<TranslatedContent itemCount={1} />);
    expect(screen.getByTestId('items')).toHaveTextContent('1 个项目');
  });
});
