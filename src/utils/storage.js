export function getStoredTheme() {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
}

export function setStoredTheme(isDark) {
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch {}
}

export const storage = {
  get(key, fallback = []) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};
