import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WireframeGlobeSvg } from './svgs/WireframeGlobeSvg';
import { ImageRevealBackground } from './ImageRevealBackground';
import {
  TopLeftBracket,
  TopRightBracket,
  BottomLeftBracket,
  BottomRightBracket,
} from './svgs/CornerBrackets';

interface HeroSectionProps {
  onShopClick?: () => void;
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onContactClick,
}) => {
  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else if (onShopClick) {
      onShopClick();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between lg:flex-row items-start lg:items-center w-full overflow-hidden"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingTop: 'clamp(5.5rem, 11vh, 7.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vh, 4rem)',
      }}
    >
      {/* 1. Soft Ambient Cyan Edge Glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 shadow-[inset_0_0_120px_rgba(59,130,246,0.18)]" />

      {/* 2. Desktop Interactive Spotlight Image Reveal Background (hidden on < lg) */}
      <ImageRevealBackground
        baseImage="/assets/before-hover.webp"
        revealImage="/assets/after-hover-no-glasses.webp"
        className="hidden lg:block absolute inset-0 z-0"
      />

      {/* 3. Headline & CTA Block (Top on Mobile / Left on Desktop) */}
      <div className="relative z-10 flex flex-col items-start max-w-2xl lg:self-start lg:mt-8">
        {/* Top-Left L-Corner Bracket */}
        <TopLeftBracket
          className="text-black mb-3"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />

        {/* Headline */}
        <h1
          className="hero-headline font-orbitron font-extrabold uppercase tracking-[0.08em] text-black leading-[1.05]"
          style={{ fontSize: 'var(--headline)' }}
        >
          <span className="sr-only">Mohsin Aziz — </span>
          <div>FUTURE</div>
          <div>FORWARD</div>
          <div>DEVELOPER</div>
        </h1>

        {/* Bottom-Left L-Corner Bracket */}
        <BottomLeftBracket
          className="text-black mt-3 mb-6"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleContactClick}
          className="group inline-flex items-center justify-center uppercase font-jakarta font-semibold tracking-[0.18em] border border-black rounded-md transition-all duration-200 hover:bg-black hover:text-white active:scale-[0.96] active:opacity-90 cursor-pointer bg-transparent text-black select-none"
          style={{
            fontSize: 'var(--body)',
            paddingInline: 'var(--btn-px)',
            paddingBlock: 'var(--btn-py)',
            gap: 'var(--btn-gap)',
          }}
        >
          <span>CONTACT ME</span>
          <ArrowUpRight
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            size={16}
          />
        </button>
      </div>

      {/* 4. Mobile Seamless Studio Portrait Stage (Borderless & Full-Scale on < lg) */}
      <div className="relative z-10 lg:hidden w-full my-6 flex justify-center">
        <div className="relative w-full max-w-md h-[480px] sm:h-[530px] overflow-hidden">
          <ImageRevealBackground
            baseImage="/assets/before-hover.webp"
            revealImage="/assets/after-hover-no-glasses.webp"
            className="absolute inset-0 w-full h-full"
            isMobileInline={true}
          />
        </div>
      </div>

      {/* 5. Right Lower Feature Block (Desk: Bottom Aligned / Mobile: Bottom Stacked) */}
      <div
        className="relative z-10 self-start lg:self-end mt-2 lg:mt-0 flex items-center gap-4 border border-transparent"
        style={{
          minWidth: 'var(--feature-min)',
          padding: 'var(--feature-pad)',
        }}
      >
        {/* Four Corner Brackets */}
        <TopLeftBracket
          className="absolute top-0 left-0 text-black"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
        <TopRightBracket
          className="absolute top-0 right-0 text-black"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
        <BottomLeftBracket
          className="absolute bottom-0 left-0 text-black"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
        <BottomRightBracket
          className="absolute bottom-0 right-0 text-black"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />

        {/* Wireframe Globe */}
        <WireframeGlobeSvg className="text-black shrink-0" />

        {/* Tagline */}
        <div
          className="font-jakarta font-semibold uppercase tracking-[0.18em] text-black leading-snug"
          style={{ fontSize: 'var(--body)' }}
        >
          <div>BEYOND TRENDS.</div>
          <div>BUILT FOR TOMORROW.</div>
        </div>
      </div>
    </section>
  );
};
