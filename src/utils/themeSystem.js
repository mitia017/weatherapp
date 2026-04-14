export function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function listenSystemThemeChange(callback) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', (e) => callback(e.matches));
}
