import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createI18n, type I18n } from 'vue-i18n';
import fs from 'fs';
import path from 'path';
import { ref } from 'vue';
import LanguageSwitch from '../../src/components/LanguageSwitch.vue';
import PromptPanel from '../../src/components/PromptPanel.vue';
import { UI_SETTINGS_KEYS } from '@prompt-optimizer/core';

describe('i18n Workflow Integration', () => {
  let wrapper: VueWrapper<any>;
  let i18n: I18n<any, any, any, any, false>;
  let preferenceServiceSetSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Manually read and parse translation files
    const enMessages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/locales/en.json'), 'utf-8'));
    const zhMessages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/locales/zh.json'), 'utf-8'));

    // Create a new i18n instance for each test
    i18n = createI18n({
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
      messages: {
        en: enMessages,
        zh: zhMessages,
      },
    });

    const mockServices = ref({
      preferenceService: {
        get: vi.fn(),
        set: vi.fn(),
      },
      templateManager: {
        listTemplatesByType: vi.fn().mockResolvedValue([]),
      },
      compareService: {
        diff: vi.fn(),
      },
    });

    // Spy on the set method of the preferenceService
    preferenceServiceSetSpy = vi.spyOn(mockServices.value.preferenceService, 'set');

    const versions = ref([
      { id: '1', version: '1.0', optimizedPrompt: '... a ...', reasoning: '...' },
    ]);
    const currentVersionId = ref('1');

    // Mount a container with both components
    const AppContainer = {
      template: `<div><LanguageSwitch /><PromptPanel :versions="versions" :currentVersionId="currentVersionId" :optimizationMode="'user'" /></div>`,
      components: { LanguageSwitch, PromptPanel },
      setup() {
        return { versions, currentVersionId };
      },
    };

    wrapper = mount(AppContainer, {
      global: {
        plugins: [i18n],
        provide: {
          services: mockServices,
        },
      },
    });
  });

  it('should update text in other components when language is switched', async () => {
    // 1. Check initial state in English
    const versionButton = wrapper.find('.version-container button');
    expect(versionButton.text()).toBe('V1.0');
    const switchButton = wrapper.findComponent(LanguageSwitch).find('button');
    expect(switchButton.attributes('aria-label')).toBe('Switch to Chinese');

    // 2. Click the button to switch to Chinese
    await switchButton.trigger('click');

    // 3. Verify text updated in PromptPanel
    const updatedVersionButton = wrapper.find('.version-container button');
    expect(updatedVersionButton.text()).toBe('版本1.0');

    // 4. Verify aria-label updated in LanguageSwitch
    expect(switchButton.attributes('aria-label')).toBe('切换到英文');
  });

  it('should persist the new language preference', async () => {
    const switchButton = wrapper.findComponent(LanguageSwitch).find('button');

    // Click to switch language
    await switchButton.trigger('click');

    // Verify that the preference was saved
    expect(preferenceServiceSetSpy).toHaveBeenCalledTimes(1);
    expect(preferenceServiceSetSpy).toHaveBeenCalledWith(UI_SETTINGS_KEYS.PREFERRED_LANGUAGE, 'zh');
  });
});
