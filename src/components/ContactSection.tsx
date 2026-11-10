import React, { useState } from 'react';
import { Copy, Check, Send, ArrowUpRight, Loader2 } from 'lucide-react';
import { TopLeftBracket } from './svgs/CornerBrackets';

interface ContactSectionProps {
  onShowToast: (text: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('azizmohsin498@gmail.com');
    setCopiedEmail(true);
    onShowToast('Email copied to clipboard: azizmohsin498@gmail.com');
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/azizmohsin498@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim() || 'Anonymous Client',
          email: email.trim(),
          message: message.trim(),
          _subject: `New Portfolio Message from ${name.trim() || email.trim()}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        onShowToast('Message delivered directly to Mohsin! I will reach out soon.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        window.location.href = `mailto:azizmohsin498@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
        onShowToast('Opening your default email app to send message...');
      }
    } catch {
      window.location.href = `mailto:azizmohsin498@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
      onShowToast('Opening your email app to transmit message...');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="cv-auto relative z-10 w-full border-t border-gray-100 bg-white"
      style={{
        paddingInline: 'var(--pad-x)',
        paddingTop: 'clamp(4rem, 7.5vh, 6.5rem)',
        paddingBottom: 'clamp(3rem, 6vh, 5rem)',
      }}
    >
      {/* 1. Section Header */}
      <div className="flex flex-col items-start mb-10 lg:mb-12">
        <TopLeftBracket
          className="text-black mb-2.5"
          style={{ width: 'var(--corner)', height: 'var(--corner)' }}
        />
        <h2 className="font-orbitron font-extrabold uppercase tracking-[0.08em] text-black text-2xl sm:text-3xl lg:text-4xl">
          INITIATE CONTACT
        </h2>
        <p
          className="font-jakarta text-gray-600 uppercase tracking-widest mt-1.5"
          style={{ fontSize: 'var(--micro)' }}
        >
          LET&apos;S BUILD SOMETHING EXTRAORDINARY TOGETHER
        </p>
      </div>

      {/* 2. Dual Column Transmission Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column (5 Cols): Direct Dossier Card */}
        <div className="lg:col-span-5 p-7 sm:p-9 border border-gray-300 rounded-2xl bg-white space-y-6 flex flex-col justify-between hover:border-black transition-all shadow-2xs">
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest font-semibold block">
              // DIRECT INQUIRIES
            </span>

            <h3 className="font-orbitron font-bold text-black text-lg tracking-wide uppercase">
              START A CONVERSATION
            </h3>

            <p className="font-jakarta text-gray-700 text-xs sm:text-sm leading-relaxed">
              Whether you have an upcoming project, freelance contract, or flagship frontend engineering role, my inbox and channels are always open.
            </p>

            {/* 1-Click Copy Email Card */}
            <div className="pt-2">
              <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="font-jakarta font-semibold text-black text-xs select-all">
                  azizmohsin498@gmail.com
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 bg-black text-white hover:bg-gray-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] font-jakarta font-medium uppercase tracking-wider shrink-0"
                  aria-label="Copy Email Address"
                >
                  {copiedEmail ? (
                    <Check size={13} aria-hidden="true" className="text-emerald-400" />
                  ) : (
                    <Copy size={13} aria-hidden="true" />
                  )}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Channels Row Inside Card */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider block">
              CONNECTIVITY CHANNELS
            </span>
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              <a
                href="https://github.com/mohsinazizXAU"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all flex items-center justify-between text-xs font-jakarta font-semibold text-black group"
              >
                <span>GITHUB</span>
                <ArrowUpRight size={13} aria-hidden="true" className="text-gray-500 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.linkedin.com/in/mohsin-aziz-42a648419"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all flex items-center justify-between text-xs font-jakarta font-semibold text-black group"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight size={13} aria-hidden="true" className="text-gray-500 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://wa.me/923013905314"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all flex items-center justify-between text-xs font-jakarta font-semibold text-black group"
              >
                <span>WHATSAPP</span>
                <ArrowUpRight size={13} aria-hidden="true" className="text-gray-500 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Real Delivery Transmission Form */}
        <div className="lg:col-span-7 p-7 sm:p-9 border border-gray-300 rounded-2xl bg-white space-y-6 flex flex-col justify-between hover:border-black transition-all shadow-2xs">
          <form onSubmit={handleSendMessage} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[11px] font-mono text-gray-600 uppercase tracking-wider mb-2 font-semibold"
                >
                  01 // YOUR NAME
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="YOUR FULL NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full p-3.5 text-base sm:text-xs border border-gray-200 rounded-xl font-jakarta focus:outline-none focus:border-black uppercase tracking-wider transition-colors disabled:opacity-50 placeholder:text-gray-500"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[11px] font-mono text-gray-600 uppercase tracking-wider mb-2 font-semibold"
                >
                  02 // YOUR EMAIL *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="CLIENT@ORGANIZATION.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full p-3.5 text-base sm:text-xs border border-gray-200 rounded-xl font-jakarta focus:outline-none focus:border-black uppercase tracking-wider transition-colors disabled:opacity-50 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-[11px] font-mono text-gray-600 uppercase tracking-wider mb-2 font-semibold"
              >
                03 // PROJECT DETAILS / MESSAGE *
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="DESCRIBE YOUR PROJECT GOALS, TIMELINE, OR OPPORTUNITY..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
                className="w-full p-3.5 text-base sm:text-xs border border-gray-200 rounded-xl font-jakarta focus:outline-none focus:border-black uppercase tracking-wider resize-none transition-colors disabled:opacity-50 placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-black text-white font-jakarta font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-800 active:scale-[0.98] active:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 select-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} aria-hidden="true" className="animate-spin" />
                  <span>TRANSMITTING MESSAGE...</span>
                </>
              ) : (
                <>
                  <span>TRANSMIT MESSAGE</span>
                  <Send size={13} aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
