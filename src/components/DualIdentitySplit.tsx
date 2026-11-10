import React, { useState } from 'react';
import { CornerDownLeft } from 'lucide-react';

interface DualIdentitySplitProps {
  onSelectPath?: (path: 'code' | 'design') => void;
}

export const DualIdentitySplit: React.FC<DualIdentitySplitProps> = ({ onSelectPath }) => {
  const [hoveredSide, setHoveredSide] = useState<'code' | 'design' | null>(null);

  const handleAction = (path: 'code' | 'design') => {
    if (onSelectPath) {
      onSelectPath(path);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="dual-identity"
      aria-label="Engineering and Design Disciplines"
      className="cv-auto relative w-full overflow-hidden bg-[#fafaf8] border-t border-b border-black/10 pt-16 pb-0 sm:pt-20 lg:py-14 select-none min-h-[500px] sm:min-h-[540px] lg:min-h-[530px] xl:min-h-[580px] flex flex-col justify-between lg:justify-center lg:items-center"
    >
      {/* ── 1. Left Anchored Portrait — White Technical Jacket (Bottom Anchored) ── */}
      <div
        className={`absolute left-[-35px] sm:left-[-20px] lg:left-[-50px] xl:left-[-25px] 2xl:left-2 bottom-0 h-[88%] sm:h-[90%] lg:h-full w-auto aspect-[896/1200] max-w-[68vw] sm:max-w-[58vw] lg:max-w-[40vw] pointer-events-none transition-all duration-500 ease-out z-10 ${
          hoveredSide === 'code'
            ? 'scale-[1.02] filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.14)]'
            : 'opacity-95'
        }`}
      >
        <picture className="block w-full h-full">
          <source
            type="image/avif"
            srcSet="/assets/comparisionimg1-560.avif 560w, /assets/comparisionimg1.avif 896w"
            sizes="(max-width: 639px) 68vw, (max-width: 1023px) 58vw, 40vw"
          />
          <source
            type="image/webp"
            srcSet="/assets/comparisionimg1-560.webp 560w, /assets/comparisionimg1.webp 896w"
            sizes="(max-width: 639px) 68vw, (max-width: 1023px) 58vw, 40vw"
          />
          <img
            src="/assets/comparisionimg1.webp"
            alt="Mohsin Aziz — Technical Engineering & Code"
            width={896}
            height={1200}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain object-bottom select-none"
          />
        </picture>
      </div>

      {/* ── 2. Right Anchored Portrait — Black Technical Jacket (Bottom Anchored) ── */}
      <div
        className={`absolute right-[-35px] sm:right-[-20px] lg:right-[-50px] xl:left-auto xl:right-[-25px] 2xl:right-2 bottom-0 h-[88%] sm:h-[90%] lg:h-full w-auto aspect-[896/1200] max-w-[68vw] sm:max-w-[58vw] lg:max-w-[40vw] pointer-events-none transition-all duration-500 ease-out z-10 ${
          hoveredSide === 'design'
            ? 'scale-[1.02] filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.14)]'
            : 'opacity-95'
        }`}
      >
        <picture className="block w-full h-full">
          <source
            type="image/avif"
            srcSet="/assets/comparisionimg2-560.avif 560w, /assets/comparisionimg2.avif 896w"
            sizes="(max-width: 639px) 68vw, (max-width: 1023px) 58vw, 40vw"
          />
          <source
            type="image/webp"
            srcSet="/assets/comparisionimg2-560.webp 560w, /assets/comparisionimg2.webp 896w"
            sizes="(max-width: 639px) 68vw, (max-width: 1023px) 58vw, 40vw"
          />
          <img
            src="/assets/comparisionimg2.webp"
            alt="Mohsin Aziz — Creative Direction & Design"
            width={896}
            height={1200}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain object-bottom select-none"
          />
        </picture>
      </div>

      {/* ── 3. Centered Content Area (Compact, Refined & Centered on Mobile) ── */}
      <div className="relative z-20 w-full max-w-[250px] sm:max-w-[290px] lg:max-w-lg xl:max-w-xl mx-auto px-1 sm:px-4 lg:px-6 pt-1 sm:pt-4 lg:pt-10 mb-auto lg:my-auto">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-14 items-center">
          {/* ── LEFT: CODE (White Jacket Connection) ── */}
          <button
            type="button"
            onMouseEnter={() => setHoveredSide('code')}
            onMouseLeave={() => setHoveredSide(null)}
            onFocus={() => setHoveredSide('code')}
            onBlur={() => setHoveredSide(null)}
            onClick={() => handleAction('code')}
            className="flex flex-col items-center text-center cursor-pointer group bg-transparent border-none p-0"
          >
            <h2
              className={`font-orbitron font-black text-[17px] sm:text-2xl lg:text-5xl xl:text-6xl tracking-tight uppercase leading-none mb-1.5 sm:mb-3 lg:mb-4 transition-all duration-300 ${
                hoveredSide === 'code'
                  ? 'text-black scale-102'
                  : hoveredSide === 'design'
                  ? 'text-transparent [-webkit-text-stroke:1.2px_rgba(0,0,0,0.35)] lg:[-webkit-text-stroke:1.5px_rgba(0,0,0,0.35)]'
                  : 'text-black lg:text-transparent lg:[-webkit-text-stroke:1.8px_#000000] group-hover:text-black group-hover:[-webkit-text-stroke:0px]'
              }`}
            >
              CODE
            </h2>
            <span className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 rounded-lg sm:rounded-xl bg-white text-black border border-black/50 lg:bg-black lg:text-white lg:border-black text-[8px] sm:text-[9.5px] lg:text-xs font-mono tracking-wider sm:tracking-widest uppercase shadow-sm group-hover:bg-black group-hover:text-white active:scale-95 active:opacity-90 transition-all select-none w-full max-w-[115px] sm:max-w-[135px] lg:max-w-none">
              <span className="truncate lg:hidden">START BUILD</span>
              <span className="hidden lg:inline">START A BUILD</span>
              <CornerDownLeft size={9} aria-hidden="true" className="shrink-0 transition-transform group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
            </span>
          </button>

          {/* ── RIGHT: DESIGN (Black Jacket Connection) ── */}
          <button
            type="button"
            onMouseEnter={() => setHoveredSide('design')}
            onMouseLeave={() => setHoveredSide(null)}
            onFocus={() => setHoveredSide('design')}
            onBlur={() => setHoveredSide(null)}
            onClick={() => handleAction('design')}
            className="flex flex-col items-center text-center cursor-pointer group bg-transparent border-none p-0"
          >
            <h2
              className={`font-orbitron font-black text-[17px] sm:text-2xl lg:text-5xl xl:text-6xl tracking-tight uppercase leading-none mb-1.5 sm:mb-3 lg:mb-4 transition-all duration-300 ${
                hoveredSide === 'design'
                  ? 'text-black scale-102'
                  : hoveredSide === 'code'
                  ? 'text-transparent [-webkit-text-stroke:1.2px_rgba(0,0,0,0.35)] lg:[-webkit-text-stroke:1.5px_rgba(0,0,0,0.35)]'
                  : 'text-black lg:text-transparent lg:[-webkit-text-stroke:1.8px_#000000] group-hover:text-black group-hover:[-webkit-text-stroke:0px]'
              }`}
            >
              DESIGN
            </h2>
            <span className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 rounded-lg sm:rounded-xl bg-black text-white border border-black text-[8px] sm:text-[9.5px] lg:text-xs font-mono tracking-wider sm:tracking-widest uppercase shadow-sm group-hover:bg-white group-hover:text-black active:scale-95 active:opacity-90 transition-all select-none w-full max-w-[115px] sm:max-w-[135px] lg:max-w-none">
              <span className="truncate lg:hidden">CONSULT</span>
              <span className="hidden lg:inline">CREATIVE CONSULT</span>
              <CornerDownLeft size={9} aria-hidden="true" className="shrink-0 transition-transform group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
