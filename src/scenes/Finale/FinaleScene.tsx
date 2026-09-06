import React, { useState } from 'react';
import { Mail, Linkedin, Github, Instagram } from 'lucide-react';
import { DispatchModal } from '../../components/DispatchModal';

interface FinaleSceneProps {
  onResetScene: () => void;
}

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const FinaleScene: React.FC<FinaleSceneProps> = ({ onResetScene }) => {
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  return (
    <section id="finale" className="scene-finale">
      <div className="max-w-7xl mx-auto w-full">
        {/* Scene Header (Matching Scene 02 reference style) */}
        <div className="mb-12 text-left">
          <div className="font-mono text-xs sm:text-sm text-white/90 tracking-[0.22em] uppercase font-normal mb-1">
            SCENE 07 // THE CLOSING CUT
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase mb-2 leading-none">
            FINAL TRANSMISSION
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-[0.18em] uppercase mb-2">
            {`"I'm gonna make an offer you can't refuse."`}
          </p>

          <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400">
            <span className="text-white font-semibold cursor-pointer">DIRECT DISPATCH</span>
            <span className="hover:text-white cursor-pointer transition-colors">CREDITS</span>
            <span className="hover:text-white cursor-pointer transition-colors">CHANNELS</span>
            <span className="hover:text-white cursor-pointer transition-colors">END OF REEL</span>
          </div>


        </div>



        {/* Action Direct Channels */}
        <div className="my-10 p-8 md:p-12 rounded-2xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="font-mono text-xs text-red-500 uppercase tracking-widest block mb-2">
              INITIATE TRANSMISSION
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
              {`"Want me?"`}
            </h3>
          </div>

          <div className="flex flex-col items-start sm:items-start gap-3.5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDispatchModalOpen(true)}
                className="interactive inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-[0_0_24px_rgba(229,9,20,0.5)] cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>SEND DISPATCH</span>
              </button>
            </div>

            {/* Direct Connect: CONNECT: placed directly above WhatsApp */}
            <div className="flex flex-col items-start gap-1.5 pt-1 w-full">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest text-left">
                CONNECT:
              </span>
              <div className="flex flex-wrap items-center justify-start gap-2">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/916289840736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-emerald-950/60 border border-white/10 hover:border-emerald-500/60 text-neutral-300 hover:text-emerald-400 font-mono text-xs whitespace-nowrap transition-all cursor-pointer group"
                  aria-label="WhatsApp +91 6289840736"
                  title="WhatsApp: +91 6289840736"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span>WHATSAPP</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/piyush-barua-6aa983327/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-sky-950/60 border border-white/10 hover:border-sky-500/60 text-neutral-300 hover:text-sky-400 font-mono text-xs whitespace-nowrap transition-all cursor-pointer group"
                  aria-label="LinkedIn"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>LINKEDIN</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/cherry.piyush/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-pink-950/60 border border-white/10 hover:border-pink-500/60 text-neutral-300 hover:text-pink-400 font-mono text-xs whitespace-nowrap transition-all cursor-pointer group"
                  aria-label="Instagram"
                  title="Instagram Profile"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>INSTAGRAM</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Transmission Terminal Modal */}
        <DispatchModal
          isOpen={isDispatchModalOpen}
          onClose={() => setIsDispatchModalOpen(false)}
        />

        {/* Film Credits Grid */}
        <div className="finale-credits-grid">
          <div>
            <span className="font-mono text-[10px] text-neutral-500 tracking-widest block mb-2">
              EXECUTIVE PRODUCER
            </span>
            <p className="font-editorial text-base text-white tracking-wider">
              PIYUSH BARUA
            </p>
            <span className="font-mono text-xs text-neutral-400">Full Stack & Security</span>
          </div>

          <div>
            <span className="font-mono text-[10px] text-neutral-500 tracking-widest block mb-2">
              TECHNICAL STACK
            </span>
            <p className="font-mono text-xs text-neutral-300 leading-relaxed">
              React 19 · TypeScript · GSAP · Three.js · Lenis · WebGL · Tailored Audio
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] text-neutral-500 tracking-widest block mb-2">
              TRANSMISSION CHANNELS
            </span>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://github.com/piyushbaruadebug"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive w-9 h-9 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-red-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/piyush-barua-6aa983327/"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive w-9 h-9 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-red-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/cherry.piyush/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive w-9 h-9 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-red-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] text-neutral-500 tracking-widest block mb-2">
              LOCATION & TIME
            </span>
            <p className="font-mono text-xs text-neutral-300">
              Kolkata, India // MMXXVI
            </p>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-10 mt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[11px] text-neutral-600">
            © 2026 PIYUSH BARUA. ALL RIGHTS RESERVED. CINEMATIC INTERACTIVE EDITION.
          </p>
        </div>
      </div>
    </section>
  );
};
