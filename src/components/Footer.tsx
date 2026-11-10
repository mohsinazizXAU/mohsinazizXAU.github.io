import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Mail, Check, Copy } from 'lucide-react';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const WhatsappIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.15 12.4 9.74 14.85 12.19 15.91C12.78 16.16 13.24 16.32 13.6 16.43C14.19 16.62 14.73 16.59 15.16 16.53C15.64 16.46 16.63 15.93 16.84 15.34C17.05 14.75 17.05 14.24 16.99 14.14C16.93 14.04 16.76 13.98 16.51 13.86C16.26 13.74 15.03 13.13 14.81 13.05C14.58 12.97 14.41 12.93 14.25 13.18C14.08 13.42 13.61 13.98 13.46 14.14C13.32 14.31 13.17 14.33 12.93 14.21C12.68 14.08 11.87 13.82 10.91 12.97C10.17 12.31 9.66 11.49 9.52 11.24C9.37 11 9.5 10.86 9.63 10.74C9.74 10.63 9.87 10.45 10 10.31C10.12 10.16 10.17 10.06 10.25 9.9C10.33 9.73 10.29 9.59 10.23 9.46C10.17 9.34 9.68 8.13 9.47 7.64C9.27 7.15 9.07 7.22 8.92 7.21C8.77 7.21 8.61 7.21 8.44 7.21L8.53 7.33Z" />
  </svg>
);

const PKT_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Karachi',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

// Isolated clock leaf so 1s ticking never re-renders the Footer tree
const KarachiClock: React.FC = () => {
  const [timeString, setTimeString] = useState('--:--:--');

  useEffect(() => {
    const update = () => {
      try {
        setTimeString(PKT_FORMATTER.format(new Date()));
      } catch {
        // fallback
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg font-semibold text-black">
      {timeString} PKT
    </span>
  );
};

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('azizmohsin498@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="cv-auto relative z-20 w-full bg-white border-t border-gray-200 text-black select-none overflow-hidden"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingTop: 'clamp(3.5rem, 6vh, 5.5rem)',
        paddingBottom: '2.5rem',
      }}
    >
      {/* 1. Elite Editorial Headline & Direct Action */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-gray-200">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-[11px] font-mono font-medium text-gray-800 tracking-wider">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>AVAILABLE FOR SELECT COLLABORATIONS (2026)</span>
          </div>

          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.04em] text-black leading-[1.1]">
            LET’S CREATE SOMETHING REMARKABLE.
          </h2>

          <p className="font-jakarta text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl">
            Bridging brutalist visual discipline with modern web performance. Have a project, contract, or visionary role? My channels are open.
          </p>
        </div>

        {/* 1-Click Interactive Email Capsule */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group inline-flex items-center justify-between sm:justify-center gap-3 px-6 py-4 bg-black text-white hover:bg-gray-800 active:scale-[0.97] rounded-2xl transition-all cursor-pointer shadow-sm select-none"
          >
            <div className="flex items-center gap-2.5">
              <Mail size={16} aria-hidden="true" className="text-gray-300 group-hover:text-white transition-colors" />
              <span className="font-jakarta text-xs sm:text-sm font-semibold tracking-wide">
                azizmohsin498@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-1.5 pl-2 border-l border-gray-700 text-xs font-mono text-gray-300">
              {copied ? (
                <>
                  <Check size={14} aria-hidden="true" className="text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={13} aria-hidden="true" className="text-gray-300 group-hover:text-white" />
                  <span className="text-[11px] uppercase tracking-wider">COPY</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* 2. Dual-Wing Architectural Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 py-12 sm:py-16 border-b border-gray-100 items-start">
        {/* Left Side: Bio & Local Telemetry (7 cols) */}
        <div className="md:col-span-6 lg:col-span-7 space-y-4">
          <span className="font-mono text-[11px] font-bold tracking-widest text-gray-600 uppercase block">
            LOCATION &amp; SPECS
          </span>
          <p className="font-jakarta text-xs sm:text-sm text-gray-700 leading-relaxed max-w-md">
            Based in Clifton, Karachi, Pakistan. Engineering bespoke digital products with zero-slop discipline, precision typography, and strict 60fps interaction standards.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-gray-700">
            <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
              CLIFTON, KARACHI (UTC+5)
            </span>
            <KarachiClock />
          </div>
        </div>

        {/* Right Side: Verified Channels (5 cols) */}
        <div className="md:col-span-6 lg:col-span-5 space-y-4">
          <span className="font-mono text-[11px] font-bold tracking-widest text-gray-600 uppercase block">
            VERIFIED CHANNELS
          </span>
          <div className="flex flex-col gap-2.5">
            {/* GitHub Card */}
            <a
              href="https://github.com/mohsinazizXAU"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all flex items-center justify-between group active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-jakarta text-xs font-bold text-black uppercase tracking-wider">
                    GITHUB
                  </span>
                  <span className="font-mono text-[10px] text-gray-600">
                    @mohsinazizXAU
                  </span>
                </div>
              </div>
              <ArrowUpRight size={15} aria-hidden="true" className="text-gray-500 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/mohsin-aziz-42a648419"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all flex items-center justify-between group active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-black group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-jakarta text-xs font-bold text-black uppercase tracking-wider">
                    LINKEDIN
                  </span>
                  <span className="font-mono text-[10px] text-gray-600">
                    Mohsin Aziz
                  </span>
                </div>
              </div>
              <ArrowUpRight size={15} aria-hidden="true" className="text-gray-500 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/923013905314"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all flex items-center justify-between group active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-black group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <WhatsappIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-jakarta text-xs font-bold text-black uppercase tracking-wider">
                    WHATSAPP
                  </span>
                  <span className="font-mono text-[10px] text-gray-600">
                    +92 301 3905314
                  </span>
                </div>
              </div>
              <ArrowUpRight size={15} aria-hidden="true" className="text-gray-500 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Out-Of-The-Box Signature Watermark */}
      <div aria-hidden="true" className="py-6 sm:py-8 text-center select-none overflow-hidden">
        <span className="font-orbitron font-black text-[clamp(2.5rem,8vw,7.5rem)] text-gray-200/60 uppercase tracking-[0.15em] sm:tracking-[0.25em] leading-none block transition-colors hover:text-gray-300">
          MOHSIN AZIZ
        </span>
      </div>

      {/* 4. Colophon & Back-To-Top Anchor */}
      <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-jakarta text-gray-600">
        <div className="flex items-center gap-2">
          <span>© 2026 MOHSIN AZIZ.</span>
          <span aria-hidden="true" className="hidden sm:inline">•</span>
          <span className="font-mono text-[11px] text-gray-600">BUILT WITH PASSION &amp; CRAFT</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full font-mono text-[11px] font-semibold text-black uppercase tracking-wider hover:border-black hover:bg-black hover:text-white active:scale-[0.96] transition-all cursor-pointer"
          aria-label="Back to Top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp size={12} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};
