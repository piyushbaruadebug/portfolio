import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  ExternalLink,
  Calendar,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface CertificateItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  issuerBadge: string;
  category: 'cyber' | 'ai';
  type: string;
  date: string;
  description: string;
  skills: string[];
  imageSrc: string;
  credentialUrl: string;
  accentHeadline: string;
}

const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'thiranex-cyber',
    number: '01',
    title: 'Cyber Security Internship',
    accentHeadline: 'Defensive Forensics & Resilience',
    issuer: 'Thiranex',
    issuerBadge: 'MSME Accredited',
    category: 'cyber',
    type: 'Certificate of Achievement',
    date: '27 Jul 2026 — 26 Aug 2026',
    description:
      'Certified practical internship in defensive cybersecurity, executing active network vulnerability scans, penetration diagnostics, and infrastructure security hardening.',
    skills: ['Defensive Forensics', 'Vulnerability Assessment', 'Network Telemetry', 'Security Protocols'],
    imageSrc: '/certificates/thiranex-cyber.jpg',
    credentialUrl: 'https://www.linkedin.com/in/piyush-barua-6aa983327/',
  },
  {
    id: 'tata-cybersecurity',
    number: '02',
    title: 'Cybersecurity Analyst Job Simulation',
    accentHeadline: 'Enterprise IAM Architecture',
    issuer: 'TATA · Forage',
    issuerBadge: 'Enterprise Defense',
    category: 'cyber',
    type: 'Certificate of Completion',
    date: 'July 14th, 2025',
    description:
      'Enterprise security simulation executing Identity & Access Management (IAM) architectures, threat vector analysis, access governance, and platform integration.',
    skills: ['IAM Fundamentals', 'Threat Assessment', 'Custom IAM Solutions', 'Platform Integration'],
    imageSrc: '/certificates/tata-cybersecurity.jpg',
    credentialUrl: 'https://www.theforage.com/',
  },
  {
    id: 'anthropic-claude-101',
    number: '03',
    title: 'Claude 101',
    accentHeadline: 'Advanced LLM Architecture & Safety',
    issuer: 'Anthropic',
    issuerBadge: 'AI & LLM Systems',
    category: 'ai',
    type: 'Certificate of Completion',
    date: 'August 2026',
    description:
      'Certified mastery of Anthropic Claude LLM architecture, prompt engineering frameworks, AI safety protocols, and autonomous conversational agent orchestration.',
    skills: ['Claude Architecture', 'Prompt Engineering', 'AI Safety', 'Conversational Systems'],
    imageSrc: '/certificates/anthropic-claude-101.jpg',
    credentialUrl: 'https://www.linkedin.com/in/piyush-barua-6aa983327/',
  },
  {
    id: 'deloitte-cyber',
    number: '04',
    title: 'Cyber Job Simulation',
    accentHeadline: 'Offensive & Defensive Security Operations',
    issuer: 'Deloitte · Forage',
    issuerBadge: 'Threat Forensics',
    category: 'cyber',
    type: 'Certificate of Completion',
    date: 'July 14th, 2025',
    description:
      'Hands-on corporate simulation tackling cyber defense operations, digital forensic investigation, adversary containment, and vulnerability remediation.',
    skills: ['Cybersecurity Operations', 'Incident Forensics', 'Threat Containment', 'Defensive Hardening'],
    imageSrc: '/certificates/deloitte-cyber.jpg',
    credentialUrl: 'https://www.theforage.com/',
  },
  {
    id: 'anthropic-ai-fluency',
    number: '05',
    title: 'AI Fluency: Framework & Foundations',
    accentHeadline: 'Foundational AI Literacy & Governance',
    issuer: 'Anthropic',
    issuerBadge: 'Academic Accreditation',
    category: 'ai',
    type: 'Certificate of Completion',
    date: 'August 2026',
    description:
      'Rigorous foundational AI literacy covering multi-modal reasoning models, ethical deployment governance, heuristic alignment, and responsible intelligence systems.',
    skills: ['AI Foundations', 'Multi-modal Reasoning', 'AI Ethics & Governance', 'Model Evaluation'],
    imageSrc: '/certificates/anthropic-ai-fluency.jpg',
    credentialUrl: 'https://www.linkedin.com/in/piyush-barua-6aa983327/',
  },
];

export const CertificatesScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(2); // Start centered on Claude 101
  const [filter, setFilter] = useState<'all' | 'cyber' | 'ai'>('all');
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const filteredCerts =
    filter === 'all'
      ? CERTIFICATES_DATA
      : CERTIFICATES_DATA.filter((c) => c.category === filter);

  // Clamp active index when filtered list changes
  useEffect(() => {
    if (activeIndex >= filteredCerts.length) {
      setActiveIndex(Math.max(0, Math.floor((filteredCerts.length - 1) / 2)));
    }
  }, [filter, filteredCerts.length, activeIndex]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredCerts.length - 1));
  }, [filteredCerts.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < filteredCerts.length - 1 ? prev + 1 : 0));
  }, [filteredCerts.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalCert) {
        if (e.key === 'Escape') setActiveModalCert(null);
        return;
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalCert, handlePrev, handleNext]);

  // Touch Swipe Handlers for mobile & touch interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  // 3D Card mouse-tilt on hover
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotationY: x * 10,
      rotationX: -y * 10,
      transformPerspective: 1000,
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="cert-gallery-section py-16 sm:py-24 relative select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient Red Studio Backlights */}
      <div className="cert-ambient-glow" />
      <div className="cert-ambient-glow-subtle" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Scene Header (Matching Scene 05 / 2nd picture reference style) */}
        <div className="mb-10 sm:mb-12 text-left">
          <div className="font-mono text-xs sm:text-sm text-white/90 tracking-[0.22em] uppercase font-normal mb-1">
            SCENE 05 // CREDENTIALS & ACCREDITATIONS
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase mb-2 leading-none">
            CERTIFIED EXPERTISE
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-[0.18em] uppercase mb-2">
            CYBER DEFENSE · ANTHROPIC AI ARCHITECTURE · ENTERPRISE RESILIENCE
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400">
            <span
              onClick={() => setFilter('all')}
              className={`${filter === 'all' ? 'text-white font-semibold' : 'hover:text-white'} cursor-pointer transition-colors`}
            >
              ALL CREDENTIALS
            </span>
            <span
              onClick={() => setFilter('cyber')}
              className={`${filter === 'cyber' ? 'text-white font-semibold' : 'hover:text-white'} cursor-pointer transition-colors`}
            >
              CYBER DEFENSE
            </span>
            <span
              onClick={() => setFilter('ai')}
              className={`${filter === 'ai' ? 'text-white font-semibold' : 'hover:text-white'} cursor-pointer transition-colors`}
            >
              AI SYSTEMS
            </span>
          </div>
        </div>

        {/* ==========================================================
            3D HOLOGRAPHIC CURVED AMPHITHEATER ARENA (MATCHES REFERENCE)
        ========================================================== */}
        <div
          ref={stageRef}
          className="cert-3d-stage overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Side HUD Annotation Typography (Matching Reference UI) */}
          <div className="hidden xl:flex flex-col justify-start absolute left-0 top-12 bottom-12 z-20 pointer-events-none">
            <div className="font-mono text-left">
              <span className="text-[11px] text-red-500/90 tracking-[0.28em] font-semibold block mb-2">
                CREDENTIALS
              </span>
              <div className="w-6 h-[1px] bg-red-600/70 mb-4" />
              <p className="text-[10px] text-neutral-400 tracking-[0.2em] leading-relaxed uppercase">
                IDEAS<br />
                ARCHITECTURES<br />
                EXPERIENCES<br />
                <span className="text-white font-medium">REAL DEFENSE</span>
              </p>
            </div>
          </div>


          {/* Glowing Concentric Floor Rings (Reflective Stage Floor) */}
          <div className="cert-floor-container">
            <div className="cert-floor-ring ring-1" />
            <div className="cert-floor-ring ring-2" />
            <div className="cert-floor-ring ring-3" />
            <div className="cert-floor-ring ring-4" />
          </div>

          {/* Silhouette Figure looking at the curved arena (Reference Match) */}
          <div className="cert-stage-silhouette">
            <div className="cert-silhouette-body">
              <div className="cert-silhouette-rim" />
            </div>
          </div>

          {/* 3D Curved Arc of Floating Holographic Cards */}
          <div className="cert-3d-arc">
            {filteredCerts.map((cert, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;

              // 3D Cylindrical Arc Math
              // Cards curve radially around the viewer with progressive rotation and depth
              const rotateY = offset * 26; // Curved arc angle
              const translateX = offset * 320; // Horizontal distribution
              const translateZ = -Math.abs(offset) * 120 + (isActive ? 45 : 0); // Center card steps forward
              const scale = 1 - Math.abs(offset) * 0.08;
              const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.18;
              const zIndex = 20 - Math.abs(offset) * 2;

              return (
                <div
                  key={cert.id}
                  onClick={() => {
                    if (isActive) {
                      setActiveModalCert(cert);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className={`cert-curved-card p-6 flex flex-col justify-between ${
                    isActive ? 'is-active-card' : ''
                  }`}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    pointerEvents: opacity === 0 ? 'none' : 'auto',
                  }}
                >
                  {/* Neon Red Corner Brackets */}
                  <div className="cert-card-spec-corner top-2.5 left-2.5 border-t border-l" />
                  <div className="cert-card-spec-corner top-2.5 right-2.5 border-t border-r" />
                  <div className="cert-card-spec-corner bottom-2.5 left-2.5 border-b border-l" />
                  <div className="cert-card-spec-corner bottom-2.5 right-2.5 border-b border-r" />

                  {/* Card Header Spec */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-red-400 border-b border-red-900/40 pb-2 mb-3">
                      <span className="text-red-400/90 font-medium tracking-widest uppercase flex items-center">
                        {cert.issuer}
                      </span>
                      <span className="text-neutral-400 font-mono text-[10px]">
                        {cert.number} // {cert.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Certificate Document Thumbnail Preview */}
                    <div className="relative w-full h-44 rounded-lg overflow-hidden mb-4 bg-black/80 border border-red-900/40 group-hover:border-red-500/60 transition-all flex items-center justify-center p-1 shadow-inner">
                      <img
                        src={cert.imageSrc}
                        alt={cert.title}
                        className="w-full h-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Badge on Thumbnail */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/80 border border-red-500/40 text-red-300 uppercase tracking-wider backdrop-blur-md">
                          {cert.issuerBadge}
                        </span>
                      </div>

                      <div className="absolute bottom-2 right-2 font-mono text-[9px] text-neutral-300 flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                        <Calendar className="w-2.5 h-2.5 text-red-400" />
                        <span>{cert.date}</span>
                      </div>
                    </div>

                    {/* Title & Headline */}
                    <h3 className="font-display text-xl text-white font-bold tracking-tight leading-snug group-hover:text-red-100 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-[11px] text-red-400/90 tracking-wide mt-1">
                      {cert.accentHeadline}
                    </p>

                    {/* Description */}
                    <p className="font-body text-xs text-neutral-300 leading-relaxed mt-2 line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  {/* Card Bottom: Skills & Inspect Action */}
                  <div className="mt-4 pt-3 border-t border-red-950/60">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/70 border border-red-900/30 text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalCert(cert);
                        }}
                        className="flex-1 font-mono text-xs py-2 px-3 rounded-lg bg-red-950/40 hover:bg-red-600/80 border border-red-700/50 hover:border-red-500 text-white transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(229,9,20,0.2)] cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>INSPECT DOCUMENT</span>
                      </button>

                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-black/60 hover:bg-red-950/60 border border-red-900/40 hover:border-red-500/70 text-neutral-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                        title="Verify Credential"
                      >
                        <ExternalLink className="w-4 h-4 text-red-400" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sleek Floating Arc Chevrons (Prev / Next) */}
          <button
            onClick={handlePrev}
            aria-label="Previous Certificate"
            className="absolute left-2 sm:left-6 md:left-12 z-30 w-11 h-11 rounded-full bg-black/80 hover:bg-red-950/80 border border-red-500/40 hover:border-red-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:scale-110 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-red-400" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Certificate"
            className="absolute right-2 sm:right-6 md:right-12 z-30 w-11 h-11 rounded-full bg-black/80 hover:bg-red-950/80 border border-red-500/40 hover:border-red-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:scale-110 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-red-400" />
          </button>
        </div>

        {/* Bottom Holographic Dials & Navigation Nodes */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
            {filteredCerts.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer border ${
                  i === activeIndex
                    ? 'bg-red-600 border-red-500 text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.6)] scale-105'
                    : 'bg-black/60 border-white/10 text-neutral-400 hover:border-red-500/40 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span>0{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* High-Resolution Document Lightbox Modal (Red & Black Theme) */}
      {activeModalCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalCert(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-gradient-to-b from-[#180406] to-[#0a0102] border border-red-600/50 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_60px_rgba(229,9,20,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-red-950/70 bg-black/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-500">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-base sm:text-lg text-white font-bold leading-none">
                    {activeModalCert.title}
                  </h4>
                  <span className="font-mono text-[11px] text-red-400/90">
                    {activeModalCert.issuer} · {activeModalCert.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeModalCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex font-mono text-xs px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white items-center gap-1.5 transition-colors shadow-[0_0_12px_rgba(229,9,20,0.4)]"
                >
                  <span>VERIFY ONLINE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveModalCert(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-600 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Certificate Document Image */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-black/80 flex items-center justify-center">
              <img
                src={activeModalCert.imageSrc}
                alt={activeModalCert.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg border border-red-900/40 shadow-2xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-red-950/70 bg-black/60 flex items-center justify-between gap-3 text-xs font-mono">
              <div className="text-neutral-400 flex items-center gap-2">
                <span className="text-white font-medium">{activeModalCert.issuer}</span>
                <span>·</span>
                <span className="text-red-400">{activeModalCert.date}</span>
              </div>

              <a
                href={activeModalCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-red-400 hover:text-white hover:underline flex items-center gap-1.5"
              >
                <span>Verify Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
