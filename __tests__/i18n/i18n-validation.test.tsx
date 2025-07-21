import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Header from '../../components/Header';
import enMessages from '../../messages/en.json';
import zhMessages from '../../messages/zh.json';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => '/en',
}));

// Mock useTransition
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('i18n Integration Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  describe('LanguageSwitcher Component', () => {
    it('renders with current locale', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      );

      expect(screen.getByText('EN')).toBeInTheDocument();
    });

    it('stores locale in localStorage when mounted', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      );

      expect(window.localStorage.getItem('preferredLanguage')).toBe('en');
    });

    it('updates localStorage when language is changed', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <LanguageSwitcher />
        </NextIntlClientProvider>
      );

      // Open dropdown
      fireEvent.click(screen.getByText('EN'));
      
      // Click on Chinese option
      fireEvent.click(screen.getByText('中文'));

      expect(window.localStorage.getItem('preferredLanguage')).toBe('zh');
    });
  });

  describe('Header Component with i18n', () => {
    it('displays English content when locale is en', () => {
      render(
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <Header />
        </NextIntlClientProvider>
      );

      // Check that the brand name is displayed in English
      expect(screen.getByText('Prompt Optimizer')).toBeInTheDocument();
    });

    it('displays Chinese content when locale is zh', () => {
      render(
        <NextIntlClientProvider locale="zh" messages={zhMessages}>
          <Header />
        </NextIntlClientProvider>
      );

      // Check that the brand name is displayed in Chinese
      expect(screen.getByText('提示词优化器')).toBeInTheDocument();
    });
  });

  describe('Translation Completeness', () => {
    /**
     * Helper function to recursively check if all keys in the English messages
     * are also present in the Chinese messages
     */
    function checkKeysExist(enObj: any, zhObj: any, path = '') {
      let missingKeys: string[] = [];
      
      Object.keys(enObj).forEach(key => {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (!(key in zhObj)) {
          missingKeys.push(currentPath);
        } else if (typeof enObj[key] === 'object' && enObj[key] !== null) {
          missingKeys = [
            ...missingKeys,
            ...checkKeysExist(enObj[key], zhObj[key], currentPath)
          ];
        }
      });
      
      return missingKeys;
    }

    it('ensures all English keys exist in Chinese translations', () => {
      const missingKeys = checkKeysExist(enMessages, zhMessages);
      
      // If there are missing keys, the test will fail with a helpful message
      expect(missingKeys).toEqual([]);
    });

    it('ensures all Chinese keys exist in English translations', () => {
      const missingKeys = checkKeysExist(zhMessages, enMessages);
      
      // If there are missing keys, the test will fail with a helpful message
      expect(missingKeys).toEqual([]);
    });
  });
});
