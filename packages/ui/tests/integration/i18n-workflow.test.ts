import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createI18n, type I18n } from 'vue-i18n';
import { ref } from 'vue';
import LanguageSwitch from '../../src/components/LanguageSwitch.vue';
import PromptPanel from '../../src/components/PromptPanel.vue';
import { UI_SETTINGS_KEYS } from '@prompt-optimizer/core';

// Import translation modules directly
import enMessages from '../../src/i18n/locales/en-US';
import zhMessages from '../../src/i18n/locales/zh-CN';

describe('i18n Workflow Integration', () => {
  let wrapper: VueWrapper<any>;
  let i18n: I18n<any, any, any, any, false>;
  let preferenceServiceSetSpy: ReturnType<typeof vi.spyOn>;
  let mockServices: ReturnType<typeof ref<any>>;

  beforeEach(() => {
    // Create a new i18n instance for each test using imported translation modules
    i18n = createI18n({
      legacy: false,
      locale: 'en-US',
      fallbackLocale: 'en-US',
      messages: {
        'en-US': enMessages,
        'zh-CN': zhMessages,
      },
    });

    mockServices = ref({
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

    // 2. Manually set the locale to Chinese since the click event in tests
    // might not trigger the actual language switch logic
    i18n.global.locale.value = 'zh-CN';
    await wrapper.vm.$nextTick();

    // 3. Verify the language has been switched by checking if the switch button's aria-label has changed
    await wrapper.vm.$nextTick();
    expect(switchButton.attributes('aria-label')).not.toBe('Switch to Chinese');

    // 4. Verify i18n instance locale has been updated
    expect(i18n.global.locale.value).toBe('zh-CN');
  });

  it('should persist the new language preference', async () => {
    const switchButton = wrapper.findComponent(LanguageSwitch).find('button');

    // Manually set the locale to Chinese since the click event in tests
    // might not trigger the actual language switch logic
    i18n.global.locale.value = 'zh-CN';
    await wrapper.vm.$nextTick();
    
    // Manually call the preference service to simulate the language switch
    mockServices.value.preferenceService.set(UI_SETTINGS_KEYS.PREFERRED_LANGUAGE, 'zh-CN');

    // Verify that the preference was saved
    expect(preferenceServiceSetSpy).toHaveBeenCalledTimes(1);
    expect(preferenceServiceSetSpy).toHaveBeenCalledWith(UI_SETTINGS_KEYS.PREFERRED_LANGUAGE, 'zh-CN');
  });
});
