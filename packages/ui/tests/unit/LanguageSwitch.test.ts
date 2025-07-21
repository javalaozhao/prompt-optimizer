import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { i18n } from '../../src/plugins/i18n';
import LanguageSwitch from '../../src/components/LanguageSwitch.vue';
import { UI_SETTINGS_KEYS } from '@prompt-optimizer/core';

// Mock the composable
const mockSetPreference = vi.fn();
vi.mock('../../src/composables/usePreferenceManager', () => ({
  usePreferences: () => ({ setPreference: mockSetPreference }),
}));

describe('LanguageSwitch.vue', () => {
  let wrapper: VueWrapper<any>;

  // Helper to mount the component
  const mountComponent = () => {
    // Manually add the translations needed for the test to avoid type errors
    i18n.global.mergeLocaleMessage('en-US', { languageSwitch: { toggle: { ariaLabel: 'Switch to Chinese' } } });
    i18n.global.mergeLocaleMessage('zh-CN', { languageSwitch: { toggle: { ariaLabel: '切换到英文' } } });

    wrapper = mount(LanguageSwitch, {
      global: {
        plugins: [i18n], // Use the actual i18n instance
        provide: {
          services: {
            settings: {
              get: vi.fn(),
              set: vi.fn(),
            },
          },
        },
      },
    });
  };

  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    // Reset state before each test
    i18n.global.locale.value = 'en-US';
    mockSetPreference.mockClear();
  });

  it('renders the switch button', () => {
    mountComponent();
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('toggles language from en-US to zh-CN on click', async () => {
    mountComponent();
    expect(i18n.global.locale.value).toBe('en-US');

    await wrapper.find('button').trigger('click');

    expect(i18n.global.locale.value).toBe('zh-CN');
  });

  it('toggles language from zh-CN to en-US on click', async () => {
    i18n.global.locale.value = 'zh-CN'; // Set initial state for this test
    mountComponent();
    expect(i18n.global.locale.value).toBe('zh-CN');

    await wrapper.find('button').trigger('click');

    expect(i18n.global.locale.value).toBe('en-US');
  });

  it('calls setPreference to save the new language setting', async () => {
    mountComponent();
    await wrapper.find('button').trigger('click');

    expect(mockSetPreference).toHaveBeenCalledTimes(1);
    expect(mockSetPreference).toHaveBeenCalledWith(UI_SETTINGS_KEYS.PREFERRED_LANGUAGE, 'zh-CN');
  });

  it('updates the aria-label when the language changes', async () => {
    mountComponent();
    const button = wrapper.find('button');

    expect(button.attributes('aria-label')).toBe('Switch to Chinese');

    await button.trigger('click');

    expect(button.attributes('aria-label')).toBe('切换到英文');
  });

  it('handles errors when saving preferences gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockSetPreference.mockRejectedValueOnce(new Error('Failed to save'));

    mountComponent();
    await wrapper.find('button').trigger('click');

    expect(i18n.global.locale.value).toBe('zh-CN'); // UI should still update
    expect(console.error).toHaveBeenCalledWith('保存语言设置失败:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
