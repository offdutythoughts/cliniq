// Pre-hydration anti-FOUC: set data-theme and data-font-size from localStorage
// before first paint. Loaded as a render-blocking <script src> in <head>.
try {
  document.documentElement.dataset.theme = localStorage.getItem('cliniq-theme') || 'light'
  const fs = localStorage.getItem('cliniq-font-size')
  if (fs) document.documentElement.dataset.fontSize = fs
} catch (e) {}
