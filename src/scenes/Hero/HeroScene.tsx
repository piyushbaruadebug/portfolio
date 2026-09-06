import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutCardProps {
  title: string;
  role?: string;
  description: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
}

const AboutCard: React.FC<AboutCardProps> = ({
  title,
  role,
  description,
  metrics,
  tags,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotationY: x * 8,
      rotationX: -y * 8,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tools-card group relative p-6 sm:p-8 rounded-2xl bg-neutral-950/85 border border-white/10 backdrop-blur-xl transition-colors duration-300 hover:border-white/30"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Corner Brackets / Cinematic Framing (Clean Monochrome) */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/25 pointer-events-none group-hover:border-white/50 transition-colors" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/25 pointer-events-none group-hover:border-white/50 transition-colors" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/25 pointer-events-none group-hover:border-white/50 transition-colors" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/25 pointer-events-none group-hover:border-white/50 transition-colors" />

      {/* Header Title */}
      <div className="mb-4">
        <h3 className="font-display text-2xl sm:text-3xl text-white font-bold tracking-tight">
          {title}
        </h3>
        {role && (
          <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase">
            {role}
          </span>
        )}
      </div>

      {/* Description Text */}
      <p className="font-body text-sm text-neutral-300 leading-relaxed mb-4">
        {description}
      </p>

      {/* Metrics List (if present) */}
      {metrics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4 p-3 rounded-lg bg-black/60 border border-white/5 font-mono text-xs">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{m.label}</span>
              <span className="text-neutral-200 font-medium">{m.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech Tags matching Pic 2 structure (Monochrome) */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] px-3 py-1.5 rounded-md bg-black/80 border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-1.5 cursor-default select-none"
          >
            <span className="w-1 h-1 rounded-full bg-neutral-500" />
            <span>{tag}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textTopRef = useRef<HTMLHeadingElement>(null);
  const textBotRef = useRef<HTMLHeadingElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const subjectImgRef = useRef<HTMLImageElement>(null);
  const studioLightRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial smooth entrance with semi-transparent layered look
      gsap.fromTo(
        subjectRef.current,
        { scale: 0.95, opacity: 0.78 },
        { scale: 1, opacity: 0.78, duration: 1.2, ease: 'power2.out' }
      );

      // 2. SCROLL REVEAL: When user scrolls down, smoothly elevate and dissolve subject
      if (containerRef.current && subjectRef.current) {
        gsap.to(subjectRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '40% top',
            scrub: 0.2,
          },
          y: -50,
          scale: 0.9,
          opacity: 0,
          ease: 'power1.out',
        });

        // Giant typography slightly expands and comes forward in 3D
        if (textTopRef.current && textBotRef.current) {
          gsap.to([textTopRef.current, textBotRef.current], {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '40% top',
              scrub: 0.3,
            },
            scale: 1.08,
            ease: 'none',
          });
        }
      }

      // 3. ScrollTrigger for About Dossier Cards
      if (aboutSectionRef.current) {
        const cards = aboutSectionRef.current.querySelectorAll('.tools-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: 'top 80%',
              end: 'top 35%',
              scrub: 1,
            },
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
          }
        );
      }
    }, containerRef);

    // Subtle 3D mouse parallax on portrait (applied to inner img to never displace the centered wrapper)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 10;

      if (subjectImgRef.current) {
        gsap.to(subjectImgRef.current, { x: -x, y: -y, duration: 0.8, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="scene-hero"
      style={{ perspective: '1200px' }}
    >
      {/* ----------------------------------------------------
          FOLD 1: CINEMATIC OPENER (STAGE & PORTRAIT)
      ---------------------------------------------------- */}
      <div className="hero-stage">
        {/* Radiant Studio Backlight - Illuminates the background */}
        <div
          ref={studioLightRef}
          className="hero-studio-backlight"
          style={{
            position: 'absolute',
            inset: '10%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229, 9, 20, 0.4) 0%, rgba(180, 15, 25, 0.2) 40%, transparent 75%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.75,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Giant Typography Layer (Brilliant, Crisp & Unmissable) */}
        <div className="hero-giant-typography" style={{ zIndex: 2 }}>
          <h1
            ref={textTopRef}
            className="hero-giant-text-top font-cinema select-none tracking-tight"
          >
            PIYUSH
          </h1>
          <h2
            ref={textBotRef}
            className="hero-giant-text-bot font-cinema select-none tracking-tight"
          >
            BARUA
          </h2>
        </div>

        {/* Foreground Subject Figure with Clean Lighting */}
        <div ref={subjectRef} className="hero-subject-wrap" style={{ zIndex: 5 }}>
          <img
            ref={subjectImgRef}
            src="/hero.jpg"
            alt="Piyush Barua — Cinematic Subject"
            className="hero-subject-img"
            loading="eager"
          />
        </div>

        {/* Bottom Grounding Glow */}
        <div
          className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, rgba(2,2,2,0.95) 10%, rgba(229,9,20,0.15) 60%, transparent 100%)',
          }}
        />


      </div>

      {/* ----------------------------------------------------
          FOLD 2: SCENE 01 // ABOUT SECTION & DOSSIER
      ---------------------------------------------------- */}
      <div
        ref={aboutSectionRef}
        className="max-w-7xl mx-auto relative z-20 px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
      >
        {/* Section Header matching Scene 02 reference style */}
        <div className="tools-header mb-12 text-left">
          <div className="font-mono text-xs sm:text-sm text-white/90 tracking-[0.22em] uppercase font-normal mb-1">
            SCENE 01 // ABOUT
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase mb-2 leading-none">
            THE DEVELOPER.
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-[0.18em] uppercase mb-2">
            FULL STACK ENGINEERING · CYBER DEFENSE AT GNIT
          </p>

          <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400">
            <span className="text-white font-semibold cursor-pointer">BIOGRAPHY</span>
            <span className="hover:text-white cursor-pointer transition-colors">RESEARCH LABS</span>
            <span className="hover:text-white cursor-pointer transition-colors">SYSTEM ARCHITECTURE</span>
          </div>
        </div>

        {/* About Dossier - Focused Single Feature Card */}
        <div className="max-w-4xl">
          <AboutCard
            title="Piyush Barua"
            role="Full Stack Developer"
            description="I am a Full Stack Systems Engineer and Cybersecurity Researcher based at Guru Nanak Institute of Technology (GNIT). My work unites uncompromising distributed backend stability with defensive network forensics, heuristic machine learning, and cinematic design systems."
            metrics={[
              { label: 'AFFILIATION', value: 'Student of GNIT' },
              { label: 'SPECIALIZATION', value: 'Full Stack & Threat Resilience' },
              { label: 'LOCATION', value: 'Kolkata, IN (22.57°N, 88.36°E)' },
            ]}
            tags={['Full Stack', 'Cybersecurity', 'GNIT Student', 'Fintech Systems', 'Network Forensics']}
          />
        </div>
      </div>
    </section>
  );
};

