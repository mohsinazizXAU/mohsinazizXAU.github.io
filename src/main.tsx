import { StrictMode, startTransition } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootEl = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootEl.dataset.ssr === 'true') {
  // Yield one paint frame so LCP/FCP finish before hydration, then hydrate concurrently via Suspense boundaries
  const schedule = typeof window.requestIdleCallback === 'function'
    ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 120 })
    : (cb: () => void) => setTimeout(cb, 0);

  schedule(() => {
    startTransition(() => {
      hydrateRoot(rootEl, app);
    });
  });
} else {
  createRoot(rootEl).render(app);
}
