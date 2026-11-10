import { Suspense, useCallback, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { AboutSection } from './components/AboutSection';
import { DualIdentitySplit } from './components/DualIdentitySplit';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ToastMessage } from './types';

export function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Add notification toast
  const addToast = useCallback((text: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const handleSelectPath = useCallback(
    (path: 'code' | 'design') => {
      const pathName = path === 'code' ? 'Code & Architecture' : 'Design & Aesthetics';
      addToast(`Selected: ${pathName} — Directing to Contact`);
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [addToast]
  );

  return (
    <div className="min-h-screen bg-white text-black font-jakarta flex flex-col relative selection:bg-black selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* 1. Sticky Top Navigation Header */}
      <Header />

      <main id="main-content">
        {/* 2. Unified Hero Section */}
        <HeroSection />

        {/* Below-the-fold sections wrapped in Suspense boundaries for non-blocking selective hydration */}
        <Suspense fallback={null}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={null}>
          <ExpertiseSection />
        </Suspense>

        <Suspense fallback={null}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={null}>
          <DualIdentitySplit onSelectPath={handleSelectPath} />
        </Suspense>

        <Suspense fallback={null}>
          <ContactSection onShowToast={addToast} />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* 9. Toast Notifications Container */}
      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
