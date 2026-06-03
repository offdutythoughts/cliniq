// Pre-hydration anti-FOUC: set data-theme from localStorage before first paint.
// Loaded as a render-blocking <script src> in <head> (see app/layout.tsx) so it
// runs before the body renders — dark-mode users never see a light flash.
try { document.documentElement.dataset.theme = localStorage.getItem('cliniq-theme') || 'light' } catch (e) {}
