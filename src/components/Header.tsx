import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

type SectionId = 'hero' | 'projects' | 'expertise' | 'about' | 'contact';

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'projects', label: 'PROJECTS' },
  { id: 'expertise', label: 'EXPERTISE' },
  { id: 'about', label: 'ABOUT' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Threshold check without reading DOM layout metrics on every scroll tick
    let threshold = window.innerHeight * 0.75;
    let rafPending = false;

    const updateScrollState = () => {
      rafPending = false;
      const scrolled = window.scrollY > threshold;
      setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
    };

    const onScroll = () => {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(updateScrollState);
      }
    };

    const onResize = () => {
      threshold = window.innerHeight * 0.75;
      updateScrollState();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    updateScrollState();

    // 2. Zero-layout-thrash IntersectionObserver scroll spy
    const sectionIds: SectionId[] = ['hero', 'projects', 'expertise', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActiveSection(id);
          }
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0,
      }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: SectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between w-full transition-all duration-400 ${
          isScrolled || isMobileMenuOpen
            ? 'translate-y-0 opacity-100 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs'
            : 'translate-y-0 opacity-100 bg-transparent border-b border-transparent'
        }`}
        style={{
          paddingInline: 'var(--pad-x)',
          paddingTop: isScrolled ? 'clamp(0.75rem, 1.8vh, 1.15rem)' : 'var(--header-pt)',
          paddingBottom: isScrolled ? 'clamp(0.75rem, 1.8vh, 1.15rem)' : 'clamp(0.75rem, 1.8vh, 1.15rem)',
        }}
      >
        {/* Brand Logo (Left) */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, 'hero')}
          className="font-orbitron font-black text-black tracking-[0.14em] flex items-center hover:opacity-75 transition-opacity cursor-pointer uppercase z-50 no-underline"
          style={{ fontSize: 'var(--logo)' }}
          aria-label="Mohsin Aziz Home"
        >
          MOHSIN AZIZ
        </a>

        {/* Desktop Nav Menu with Active Scroll Spy (Hidden on Mobile) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center"
          style={{ gap: 'var(--gap-nav)' }}
        >
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => scrollToSection(e, id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative font-jakarta uppercase tracking-[0.2em] transition-all cursor-pointer flex flex-col items-center no-underline ${
                  isActive
                    ? 'text-black font-bold opacity-100'
                    : 'text-gray-600 font-medium hover:text-black opacity-80 hover:opacity-100'
                }`}
                style={{ fontSize: 'var(--nav)' }}
              >
                <span>{label}</span>
                {isActive && (
                  <span aria-hidden="true" className="absolute -bottom-1.5 w-1 h-1 bg-black rounded-full" />
                )}
              </a>
            );
          })}

          {/* Gray Divider */}
          <span aria-hidden="true" className="text-gray-300 select-none">|</span>

          {/* CONTACT */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            aria-current={activeSection === 'contact' ? 'location' : undefined}
            className={`relative font-jakarta font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer flex flex-col items-center no-underline ${
              activeSection === 'contact'
                ? 'text-black font-bold opacity-100'
                : 'text-gray-600 hover:text-black opacity-80 hover:opacity-100'
            }`}
            style={{ fontSize: 'var(--nav)' }}
          >
            <span>CONTACT</span>
            {activeSection === 'contact' && (
              <span aria-hidden="true" className="absolute -bottom-1.5 w-1 h-1 bg-black rounded-full" />
            )}
          </a>
        </nav>

        {/* Mobile Hamburger Toggle Button (Visible only on Mobile) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-50 p-2 text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white/98 backdrop-blur-xl flex flex-col justify-between pt-28 pb-10 px-8 md:hidden transition-all duration-300">
          {/* Navigation Links */}
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-6">
            <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest block">
              // NAVIGATION DIRECTORY
            </span>

            {(
              [
                ['hero', '00 / HOME'],
                ['projects', '01 / PROJECTS'],
                ['expertise', '02 / EXPERTISE'],
                ['about', '03 / ABOUT'],
                ['contact', '04 / CONTACT'],
              ] as [SectionId, string][]
            ).map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => scrollToSection(e, id)}
                className={`text-left font-orbitron font-extrabold text-2xl uppercase tracking-wider transition-colors flex items-center justify-between no-underline ${
                  activeSection === id ? 'text-black' : 'text-gray-500'
                }`}
              >
                <span>{label}</span>
                <ArrowUpRight size={20} aria-hidden="true" className={activeSection === id ? 'text-black' : 'text-gray-400'} />
              </a>
            ))}
          </nav>

          {/* Bottom Mobile Channels */}
          <div className="pt-6 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between text-xs font-jakarta font-semibold text-black uppercase tracking-wider">
              <a href="https://github.com/mohsinazizXAU" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                GITHUB ↗
              </a>
              <a href="https://www.linkedin.com/in/mohsin-aziz-42a648419" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                LINKEDIN ↗
              </a>
              <a href="https://wa.me/923013905314" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                WHATSAPP ↗
              </a>
            </div>

            <p className="font-jakarta text-[10px] text-gray-600 uppercase tracking-widest text-center">
              MOHSIN AZIZ © 2026 — FUTURE FORWARD DEVELOPER
            </p>
          </div>
        </div>
      )}
    </>
  );
};
