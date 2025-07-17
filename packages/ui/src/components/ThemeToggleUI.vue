<template>
  <div class="relative">
    <button
      @click="toggleThemeMenu" 
      class="theme-icon-button"
    >
      <span class="text-base sm:text-lg inline-flex items-center align-middle">
        <svg v-if="currentTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="currentTheme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>

      </span>
      <span class="text-sm max-md:hidden truncate">{{ getThemeDisplayName }}</span>
    </button>

    <!-- Theme Selection Dropdown Menu -->
    <div v-if="showThemeMenu" class="absolute right-0 mt-2 min-w-[132px] theme-dropdown z-50">
      <div class="py-1">
        <button 
          v-for="theme in availableThemes" 
          :key="theme.id"
          @click="selectTheme(theme.id)"
          class="w-full text-left px-4 py-2 flex items-center gap-2 theme-dropdown-item"
          :class="currentTheme === theme.id ? 'theme-dropdown-item-active' : 'theme-dropdown-item-inactive'"
        >
          <span class="w-5 h-5 flex-shrink-0" :class="theme.iconClass">
            <svg v-if="theme.id === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else-if="theme.id === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>

          </span>
          <span>{{ theme.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePreferences } from '../composables/usePreferenceManager';
import { UI_SETTINGS_KEYS } from '@prompt-optimizer/core';
import type { Ref } from 'vue';
import type { AppServices } from '../types/services';

const { t } = useI18n();
const services = inject<Ref<AppServices | null>>('services')!;
const { getPreference, setPreference } = usePreferences(services);

// Available themes list
const availableThemes = computed(() => [
  {
    id: 'light',
    name: t('theme.light'),
    iconClass: 'text-yellow-500',
    cssClass: ''
  },
  {
    id: 'dark',
    name: t('theme.dark'),
    iconClass: 'text-gray-400',
    cssClass: 'dark'
  }
]);

const currentTheme = ref('light');
const showThemeMenu = ref(false);

// Toggle theme menu display state
const toggleThemeMenu = () => {
  showThemeMenu.value = !showThemeMenu.value;
};

// Select theme
const selectTheme = async (themeId: string) => {
  currentTheme.value = themeId;
  showThemeMenu.value = false;
  await updateTheme();
};

// Update theme
const updateTheme = async () => {
  // Get current theme
  const theme = availableThemes.value.find(t => t.id === currentTheme.value);
  if (!theme) return;
  
  // Get current active theme class
  const activeThemeClass = Array.from(document.documentElement.classList)
    .find(cls => ['dark'].includes(cls));
  
  // Remove current theme class if exists
  if (activeThemeClass) {
    document.documentElement.classList.remove(activeThemeClass);
  }
  
  // Add new theme class if exists
  if (theme.cssClass) {
    document.documentElement.classList.add(theme.cssClass);
  }

  // Update data-theme attribute
  document.documentElement.setAttribute('data-theme', theme.id);
  
  try {
    await setPreference(UI_SETTINGS_KEYS.THEME_ID, theme.id);
  } catch (error) {
    console.error('保存主题设置失败:', error);
  }

  // Trigger re-render
  nextTick(() => {
    window.dispatchEvent(new Event('theme-changed'));
  });
};

// Get theme display name
const getThemeDisplayName = computed(() => {
  const theme = availableThemes.value.find(t => t.id === currentTheme.value);
  return theme ? theme.name : t('theme.title');
});

// Close dropdown menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (showThemeMenu.value && target && !target.closest('.relative')) {
    showThemeMenu.value = false;
  }
};

// Initialize theme
onMounted(async () => {
  // Ensure DOM is loaded before applying theme
  requestAnimationFrame(async () => {
    try {
      const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const themeId = await getPreference(UI_SETTINGS_KEYS.THEME_ID, defaultTheme);
      
      // Set current theme
      if (availableThemes.value.find(t => t.id === themeId)) {
        currentTheme.value = themeId;
      } else {
        currentTheme.value = defaultTheme;
      }
      
      // Apply theme
      await updateTheme();
    } catch (error) {
      console.error('初始化主题失败:', error);
      // Fallback to default theme
      currentTheme.value = 'light';
      await updateTheme();
    }
  });
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = async (e: MediaQueryListEvent) => {
    // Only respond to system theme changes when no user theme is set
    try {
      const userTheme = await getPreference(UI_SETTINGS_KEYS.THEME_ID, null);
      if (!userTheme) {
        currentTheme.value = e.matches ? 'dark' : 'light';
        await updateTheme();
      }
    } catch (error) {
      console.error('处理系统主题变化失败:', error);
    }
  };
  
  // Add event listener
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
  } else if (mediaQuery.addListener) { // Compatibility for older browsers
    mediaQuery.addListener(handleChange);
  }
  
  // Add click outside event listener to close dropdown menu
  document.addEventListener('click', handleClickOutside);
});

// Remove event listener before component unmount
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>