import React from 'react';
import { TopLeftBracket, BottomRightBracket } from './svgs/CornerBrackets';
import { ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="cv-auto relative z-10 w-full border-t border-gray-100 bg-white"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingBlock: 'clamp(4rem, 7.5vh, 6.5rem)',
      }}
    >
      {/* 1. Section Header */}
      <div className="flex flex-col items-start mb-8 lg:mb-10">
        <TopLeftBracket
          className="text-black mb-3"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
        <h2 className="font-orbitron font-extrabold uppercase tracking-[0.08em] text-black text-2xl sm:text-3xl lg:text-4xl">
          ABOUT MOHSIN
        </h2>
        <p
          className="font-jakarta text-gray-600 uppercase tracking-widest mt-2"
          style={{ fontSize: 'var(--micro)' }}
        >
          PROFILE, PHILOSOPHY &amp; ENGINEERING VISION
        </p>
      </div>

      {/* 2. Typographic Manifesto Content */}
      <div className="space-y-10 lg:space-y-12 max-w-5xl">
        {/* Kinetic Statement */}
        <p className="about-manifesto font-orbitron font-extrabold text-black text-xl sm:text-2xl lg:text-3xl leading-relaxed uppercase tracking-wide">
          I AM MOHSIN AZIZ — A FRONTEND DEVELOPER BRIDGING{' '}
          <span className="inline-block px-3.5 py-1 bg-black text-white rounded-md text-xs sm:text-sm font-jakarta font-medium tracking-widest align-middle mx-1 my-1 hover:bg-neutral-800 hover:scale-[1.02] transition-all duration-200 cursor-default select-none shadow-2xs">
            HAUTE-COUTURE DESIGN
          </span>{' '}
          AND{' '}
          <span className="inline-block px-3.5 py-1 bg-black text-white rounded-md text-xs sm:text-sm font-jakarta font-medium tracking-widest align-middle mx-1 my-1 hover:bg-neutral-800 hover:scale-[1.02] transition-all duration-200 cursor-default select-none shadow-2xs">
            HIGH-PERFORMANCE CODE
          </span>
          . CRAFTING DIGITAL EXPERIENCES DRIVEN BY{' '}
          <span className="inline-block px-3.5 py-1 bg-black text-white rounded-md text-xs sm:text-sm font-jakarta font-medium tracking-widest align-middle mx-1 my-1 hover:bg-neutral-800 hover:scale-[1.02] transition-all duration-200 cursor-default select-none shadow-2xs">
            CANVAS MOTION
          </span>
          , BESPOKE TYPOGRAPHY, AND{' '}
          <span className="inline-block px-3.5 py-1 bg-black text-white rounded-md text-xs sm:text-sm font-jakarta font-medium tracking-widest align-middle mx-1 my-1 hover:bg-neutral-800 hover:scale-[1.02] transition-all duration-200 cursor-default select-none shadow-2xs">
            AI AUGMENTATION
          </span>
          .
        </p>

        {/* Minimalist Numbered Hairline Rows (Tactile Ambient Hover Highlight) */}
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          {/* Row 01 */}
          <div className="py-5 px-4 -mx-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-neutral-50 transition-all duration-300">
            <div className="flex items-baseline gap-6 sm:gap-8">
              <span
                aria-hidden="true"
                className="font-orbitron font-extrabold text-neutral-500 group-hover:text-black transition-colors text-xl sm:text-2xl select-none shrink-0"
              >
                01
              </span>
              <div>
                <h3 className="font-orbitron font-bold text-black text-sm sm:text-base tracking-wide uppercase">
                  RAW COMPUTATIONAL SPEED
                </h3>
                <p className="font-jakarta text-gray-700 text-xs sm:text-sm mt-0.5 max-w-2xl leading-relaxed">
                  Zero-bloat architecture engineered for sub-second rendering, semantic SEO standards, and instant responsiveness.
                </p>
              </div>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              size={18}
              className="text-gray-500 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 shrink-0 self-end sm:self-center"
            />
          </div>

          {/* Row 02 */}
          <div className="py-5 px-4 -mx-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-neutral-50 transition-all duration-300">
            <div className="flex items-baseline gap-6 sm:gap-8">
              <span
                aria-hidden="true"
                className="font-orbitron font-extrabold text-neutral-500 group-hover:text-black transition-colors text-xl sm:text-2xl select-none shrink-0"
              >
                02
              </span>
              <div>
                <h3 className="font-orbitron font-bold text-black text-sm sm:text-base tracking-wide uppercase">
                  TACTILE CANVAS MOTION
                </h3>
                <p className="font-jakarta text-gray-700 text-xs sm:text-sm mt-0.5 max-w-2xl leading-relaxed">
                  Every scroll, cursor spotlight shader, and micro-transition feels alive, smooth, and purposefully responsive.
                </p>
              </div>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              size={18}
              className="text-gray-500 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 shrink-0 self-end sm:self-center"
            />
          </div>

          {/* Row 03 */}
          <div className="py-5 px-4 -mx-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-neutral-50 transition-all duration-300">
            <div className="flex items-baseline gap-6 sm:gap-8">
              <span
                aria-hidden="true"
                className="font-orbitron font-extrabold text-neutral-500 group-hover:text-black transition-colors text-xl sm:text-2xl select-none shrink-0"
              >
                03
              </span>
              <div>
                <h3 className="font-orbitron font-bold text-black text-sm sm:text-base tracking-wide uppercase">
                  AI-POWERED ARCHITECTURE
                </h3>
                <p className="font-jakarta text-gray-700 text-xs sm:text-sm mt-0.5 max-w-2xl leading-relaxed">
                  Integrating generative AI models, smart API pipelines, and autonomous synthesis into high-utility web applications.
                </p>
              </div>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              size={18}
              className="text-gray-500 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 shrink-0 self-end sm:self-center"
            />
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-3 pt-1">
          <span aria-hidden="true" className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="font-jakarta font-semibold text-xs tracking-widest uppercase text-black">
            STATUS: AVAILABLE FOR SELECT CLIENTS &amp; WORLDWIDE ROLES
          </span>
        </div>
      </div>

      {/* 3. Bottom Accent */}
      <div className="flex justify-end mt-12 lg:mt-16">
        <BottomRightBracket
          className="text-black"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
      </div>
    </section>
  );
};
