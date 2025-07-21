import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

// Mock dependencies
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
  usePathname: vi.fn(() => '/en/some-page'),
}));

vi.mock('next-intl', () => ({
  useLocale: vi.fn(() => 'en'),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the current locale', () => {
    vi.mocked(useLocale).mockReturnValue('en');
    render(<LanguageSwitcher />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('switches to Chinese when the option is clicked', async () => {
    vi.mocked(useLocale).mockReturnValue('en');
    render(<LanguageSwitcher />);

    await userEvent.click(screen.getByText('EN'));
    await userEvent.click(screen.getByText('中文'));

    expect(mockReplace).toHaveBeenCalledWith('/zh/some-page');
  });

  it('switches to English when the option is clicked', async () => {
    // Arrange: Set the initial locale to 'zh' and path accordingly
    vi.mocked(useLocale).mockReturnValue('zh');
    vi.mocked(usePathname).mockReturnValue('/zh/some-page');
    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      push: vi.fn(),
      prefetch: vi.fn(),
    });

    render(<LanguageSwitcher />);

    await userEvent.click(screen.getByText('ZH'));
    await userEvent.click(screen.getByText('English'));

    expect(mockReplace).toHaveBeenCalledWith('/en/some-page');
  });
});
