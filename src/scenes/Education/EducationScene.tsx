import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, School, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  id: string;
  category: 'ug' | 'isc' | 'icse';
  period: string;
  degree: string;
  institution: string;
  location: string;
  scoreOrStream?: string;
  featured?: boolean;
  highlights: string[];
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'gnit',
    category: 'ug',
    period: '2024 — 2028',
    degree: 'B.Sc. in Cybersecurity',
    institution: 'Guru Nanak Institute Of Technology (GNIT)',
    location: 'Kolkata, India',
    featured: true,
    scoreOrStream: 'Undergraduate Degree',
    highlights: [
      'Offensive & Defensive Security',
      'Network Security Protocols',
      'Digital Forensics & Analysis',
      'Linux System Hardening',
      'Cryptographic Algorithms',
    ],
  },
  {
    id: 'isc',
    category: 'isc',
    period: '2024',
    degree: 'Higher Secondary Education (ISC)',
    institution: 'Little Star High School',
    location: 'Kolkata, India',
    scoreOrStream: 'Science Stream (Computer Science)',
    highlights: [
      'Council for the Indian School Certificate Examinations',
      'Computer Science & OOP',
      'Mathematics & Boolean Algebra',
      'Physics & Analytical Theory',
    ],
  },
  {
    id: 'icse',
    category: 'icse',
    period: '2022',
    degree: 'Secondary Education (ICSE)',
    institution: 'Little Star High School',
    location: 'Kolkata, India',
    scoreOrStream: 'Foundational Science & Tech',
    highlights: [
      'ICSE Examination Board',
      'Computer Applications (Java)',
      'Data Handling Fundamentals',
      'Mathematics & Core Sciences',
    ],
  },
];

const EducationCard: React.FC<{ item: EducationItem }> = ({ item }) => {
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
      className={`tools-card group ${item.featured ? 'featured-ai' : ''}`}
    >
      {/* Corner Brackets / Cinematic Framing */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-red-500/35 pointer-events-none group-hover:border-red-500/70 transition-colors" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-red-500/35 pointer-events-none group-hover:border-red-500/70 transition-colors" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-red-500/35 pointer-events-none group-hover:border-red-500/70 transition-colors" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-red-500/35 pointer-events-none group-hover:border-red-500/70 transition-colors" />

      {/* Top Header */}
      <div className="tools-card-top flex-wrap sm:flex-nowrap gap-3 items-start">
        <div className="tools-card-title-group items-start">
          <div className="tools-card-icon mt-0.5">
            <GraduationCap className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
          </div>
          <div>
            <div className="font-mono text-[11px] text-red-500 tracking-[0.16em] uppercase font-semibold">
              {item.period}
            </div>
            <h3 className="tools-card-name font-display text-lg sm:text-xl leading-tight mt-0.5 text-white">
              {item.degree}
            </h3>
          </div>
        </div>
      </div>

      {/* Institution & Location */}
      <div className="space-y-1.5 border-t border-neutral-800/80 pt-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
          <School className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{item.institution}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-500" />
            {item.location}
          </span>
          {item.scoreOrStream && (
            <span className="text-neutral-500 hidden sm:inline">{item.scoreOrStream}</span>
          )}
        </div>
      </div>

      {/* Highlight Pills */}
      <div className="tools-pills-wrap mt-1">
        {item.highlights.map((highlight) => (
          <span key={highlight} className="tech-pill">
            <BookOpen className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-400 transition-colors flex-shrink-0" />
            <span>{highlight}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export const EducationScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ug' | 'isc' | 'icse'>('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 1,
            },
            opacity: 1,
            y: 0,
          }
        );
      }

      const cards = containerRef.current.querySelectorAll('.tools-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            end: 'top 20%',
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredItems =
    activeFilter === 'all'
      ? EDUCATION_DATA
      : EDUCATION_DATA.filter((item) => item.category === activeFilter);

  return (
    <section id="education" ref={containerRef} className="scene-tools-universe relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="tools-ambient-glow" />
      <div className="tools-ambient-glow-2" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Scene Header (Matching Picture 2 style exactly) */}
        <div ref={headingRef} className="tools-header mb-12 text-left">
          <div className="font-mono text-xs sm:text-sm text-white/90 tracking-[0.22em] uppercase font-normal mb-1">
            SCENE 02 // ACADEMIC FOUNDATIONS
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase mb-2 leading-none">
            EDUCATION & QUALIFICATION
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-[0.18em] uppercase mb-4">
            CYBERSECURITY RESILIENCE · SCIENCE STREAM · ALGORITHMIC FOUNDATIONS
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`transition-colors cursor-pointer ${
                activeFilter === 'all' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              ALL MILESTONES
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ug')}
              className={`transition-colors cursor-pointer ${
                activeFilter === 'ug' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              UNDERGRADUATE (GNIT)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('isc')}
              className={`transition-colors cursor-pointer ${
                activeFilter === 'isc' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              HIGHER SECONDARY (ISC)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('icse')}
              className={`transition-colors cursor-pointer ${
                activeFilter === 'icse' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              SECONDARY (ICSE)
            </button>
          </div>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
