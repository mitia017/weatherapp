import { ref, watch } from 'vue';
import { applyTheme } from '@/utils/themeDom';
import { getStoredTheme, setStoredTheme } from '@/utils/storage';
import {
  getSystemPreference,
  listenSystemThemeChange,
} from '@/utils/themeSystem';

const isDark = ref(false);
let initialized = false;

function init() {
  if (initialized) return;

  const savedTheme = getStoredTheme();
  const system = getSystemPreference();

  isDark.value = savedTheme ? savedTheme === 'dark' : system;

  applyTheme(isDark.value);

  watch(isDark, (val) => {
    applyTheme(val);
    setStoredTheme(val);
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      isDark.value = e.newValue === 'dark';
    }
  });

  listenSystemThemeChange((isDarkSystem) => {
    if (!getStoredTheme()) {
      isDark.value = isDarkSystem;
    }
  });

  initialized = true;
}

export function useDarkMode() {
  init();

  const toggleDarkMode = () => {
    console.log('Toggling dark mode');
    isDark.value = !isDark.value;
  };

  return { isDark, toggleDarkMode };
}
