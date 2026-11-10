import React from 'react';
import { TopLeftBracket, BottomRightBracket } from './svgs/CornerBrackets';

export const ExpertiseSection: React.FC = () => {
  return (
    <section
      id="expertise"
      className="cv-auto relative z-10 w-full border-t border-gray-200 bg-white"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingBlock: 'clamp(4.5rem, 8.5vh, 7.5rem)',
      }}
    >
      {/* 1. Section Header */}
      <div className="flex flex-col items-start mb-16 lg:mb-20">
        <TopLeftBracket
          className="text-black mb-3"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
        <h2 className="font-orbitron font-extrabold uppercase tracking-[0.08em] text-black text-2xl sm:text-3xl lg:text-4xl">
          TECHNICAL EXPERTISE
        </h2>
        <p
          className="font-jakarta text-gray-600 uppercase tracking-widest mt-2"
          style={{ fontSize: 'var(--micro)' }}
        >
          COMPREHENSIVE SKILL PILLARS &amp; ARCHITECTURE
        </p>
      </div>

      {/* 2. Symmetrical 3-Column Architectural Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
        {/* Pillar 01: Frontend Architecture */}
        <article className="p-7 sm:p-8 border border-gray-300 rounded-2xl bg-white space-y-6 flex flex-col justify-between hover:border-black hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest font-semibold">
                  01 // ARCHITECTURE
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-black text-white text-[10px] font-mono tracking-wider uppercase rounded">
                CORE STACK
              </span>
            </div>

            <h3 className="font-orbitron font-bold text-black text-lg tracking-wide uppercase">
              FRONTEND ARCHITECTURE
            </h3>
            <p className="font-jakarta text-gray-700 text-xs sm:text-sm leading-relaxed">
              Engineering high-performance client applications with semantic HTML5 markup, strict TypeScript typing, modern Tailwind layout systems, and modular React 19 architecture.
            </p>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-gray-200">
            <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider block">
              TECHNOLOGIES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['HTML5', 'CSS3 / Tailwind', 'JavaScript (ES6+)', 'React 19', 'TypeScript', 'Canvas 2D API'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-black text-[11px] font-jakarta font-medium rounded-md hover:border-black hover:bg-black hover:text-white transition-all cursor-default select-none"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Pillar 02: AI & Creative Motion */}
        <article className="p-7 sm:p-8 border border-gray-300 rounded-2xl bg-white space-y-6 flex flex-col justify-between hover:border-black hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest font-semibold">
                  02 // MOTION &amp; SHADERS
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-black text-white text-[10px] font-mono tracking-wider uppercase rounded">
                60 FPS ENGINE
              </span>
            </div>

            <h3 className="font-orbitron font-bold text-black text-lg tracking-wide uppercase">
              AI &amp; CREATIVE MOTION
            </h3>
            <p className="font-jakarta text-gray-700 text-xs sm:text-sm leading-relaxed">
              Developing tactile user experiences with dynamic offscreen canvas masking, cursor-following shaders, interactive micro-transitions, and generative AI API integrations.
            </p>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-gray-200">
            <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider block">
              CAPABILITIES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['AI API Pipelines', 'Dynamic Canvas Mask', 'Cursor Spotlight Shaders', 'Fluid Micro-Motions', 'Autonomous Synthesis'].map((cap) => (
                <span
                  key={cap}
                  className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-black text-[11px] font-jakarta font-medium rounded-md hover:border-black hover:bg-black hover:text-white transition-all cursor-default select-none"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Pillar 03: Tooling & Deployment */}
        <article className="p-7 sm:p-8 border border-gray-300 rounded-2xl bg-white space-y-6 flex flex-col justify-between hover:border-black hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest font-semibold">
                  03 // PLATFORMS
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-black text-white text-[10px] font-mono tracking-wider uppercase rounded">
                PRODUCTION CI/CD
              </span>
            </div>

            <h3 className="font-orbitron font-bold text-black text-lg tracking-wide uppercase">
              PLATFORMS &amp; WORKFLOW
            </h3>
            <p className="font-jakarta text-gray-700 text-xs sm:text-sm leading-relaxed">
              Standardized modern developer workflow with fast Vite bundling, automated Netlify &amp; GitHub Actions continuous integration, Git versioning, and pixel-accurate viewport execution.
            </p>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-gray-200">
            <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider block">
              PLATFORMS &amp; TOOLS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Git & GitHub', 'GitHub Actions', 'Vite Bundler', 'RESTful APIs', 'Figma Sync'].map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-black text-[11px] font-jakarta font-medium rounded-md hover:border-black hover:bg-black hover:text-white transition-all cursor-default select-none"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* 3. Bottom Accent */}
      <div className="flex justify-end mt-16 lg:mt-20">
        <BottomRightBracket
          className="text-black"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
      </div>
    </section>
  );
};
