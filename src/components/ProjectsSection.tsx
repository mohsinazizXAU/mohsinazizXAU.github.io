import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';
import { ProjectMedia } from './ProjectMedia';
import { TopLeftBracket, BottomRightBracket } from './svgs/CornerBrackets';

const FEATURED_PROJECTS: (ProjectItem & { width: number; height: number })[] = [
  {
    id: '01',
    title: 'MARKETLINK',
    description:
      'Full-stack weekend farmers market pre-order platform connecting households with verified local growers. Features digital stall pickup passes, inventory sync, interactive market maps, and Gemini AI assistant.',
    tags: ['React 19', 'Node.js', 'Express', 'MySQL', 'Gemini AI', 'Leaflet Maps'],
    image: '/assets/projects/marketlink.webp',
    video: '/assets/projects/marketlinkvideo.mp4',
    netlifyUrl: 'https://marketlinewh.clftechwiz.online/',
    width: 1280,
    height: 720,
  },
  {
    id: '02',
    title: 'FUTUREFUND-AI',
    description:
      'Interactive financial intelligence platform featuring wealth comparison simulations, real-time market insights, and personalized AI advisory tools.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'AI Advice API', 'Market Services'],
    image: '/assets/projects/project1img.webp',
    video: '/assets/projects/project1video.mp4',
    netlifyUrl: 'https://futurefund-al.vercel.app/',
    width: 1280,
    height: 714,
  },
  {
    id: '03',
    title: 'AURA WATCHES',
    description:
      'High-end luxury timepiece showcase featuring editorial product presentations, smooth interactions, and precision minimalist aesthetics.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Luxury Design'],
    image: '/assets/projects/projectimg2.webp',
    video: '/assets/projects/project2video.mp4',
    netlifyUrl: 'https://aura-watches-beta.vercel.app/',
    width: 1280,
    height: 714,
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="cv-auto relative z-10 w-full border-t border-gray-200 bg-[#f8f8f8]"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingBlock: 'clamp(3.5rem, 7vh, 5.5rem)',
      }}
    >
      {/* 1. Section Header */}
      <div className="flex flex-col items-start mb-12 lg:mb-16">
        <TopLeftBracket
          className="text-black mb-3"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
        <h2 className="font-orbitron font-extrabold uppercase tracking-[0.08em] text-black text-2xl sm:text-3xl lg:text-4xl">
          SELECTED WORKS
        </h2>
        <p
          className="font-jakarta text-gray-600 uppercase tracking-widest mt-2"
          style={{ fontSize: 'var(--micro)' }}
        >
          FEATURED WEB APPLICATIONS &amp; INTERFACES
        </p>
      </div>

      {/* 2. Editorial Alternating Showcase */}
      <div className="space-y-12 lg:space-y-16">
        {FEATURED_PROJECTS.map((project, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <article
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Media Player Container (7 cols) */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <ProjectMedia
                  image={project.image}
                  video={project.video}
                  title={project.title}
                  width={project.width}
                  height={project.height}
                />
              </div>

              {/* Content Container (5 cols) */}
              <div className={`lg:col-span-5 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div
                  aria-hidden="true"
                  className="font-orbitron font-extrabold text-neutral-500 text-3xl sm:text-4xl select-none"
                >
                  {project.id}
                </div>

                <h3 className="font-orbitron font-bold text-black text-xl sm:text-2xl tracking-wide">
                  {project.title}
                </h3>

                <p className="font-jakarta text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-white border border-gray-200 text-black text-[10px] font-jakarta font-medium rounded-md shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3">
                  <a
                    href={project.netlifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live site for ${project.title}`}
                    className="inline-flex items-center justify-center py-2.5 px-5 bg-black text-white font-jakarta font-semibold text-xs tracking-wider uppercase rounded-lg hover:bg-gray-800 active:scale-[0.96] active:opacity-90 transition-all gap-2 cursor-pointer shadow-2xs select-none w-full sm:w-auto min-h-[44px]"
                  >
                    <span>VIEW LIVE SITE</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Corner Accent */}
      <div className="flex justify-end mt-12 lg:mt-16">
        <BottomRightBracket
          className="text-black"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
      </div>
    </section>
  );
};
