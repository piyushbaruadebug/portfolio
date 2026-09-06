import React, { useRef } from 'react';
import { ProjectItem } from '../../types';
import { ExternalLink, Github, Shield, Terminal, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

interface ProjectPlateProps {
  project: ProjectItem;
  index: number;
}

export const ProjectPlate: React.FC<ProjectPlateProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !visualRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotationY: x * 8,
      rotationX: -y * 8,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to(visualRef.current, {
      x: x * 15,
      y: y * 15,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !visualRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
    gsap.to(visualRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-composition group"
    >
      {/* Visual Plate Hologram Canvas */}
      <div ref={visualRef} className="project-plate-visual">
        {/* Film Background Texture & Gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06) 0%, #080808 80%)`,
          }}
        />

        {/* Center High-Tech Telemetry HUD */}
        <div className="relative z-10 p-8 text-center flex flex-col items-center">
          <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-2">
            COORD: {project.coordinates}
          </span>
          <h4 className="font-display text-2xl md:text-3xl text-white font-bold tracking-tight mb-3">
            {project.title}
          </h4>
          <span className="font-mono text-xs text-neutral-400">
            {project.securityRating || 'VERIFIED ARTIFACT'}
          </span>

          <div className="flex items-center gap-3 mt-6">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>LAUNCH MISSION</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs border border-white/10 transition-all"
                aria-label="View Source on GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span>SOURCE</span>
              </a>
            )}
          </div>
        </div>

        {/* Corner Brackets / Cinematic Framing */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/30 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/30 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/30 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/30 pointer-events-none" />
      </div>

      {/* Project Editorial Information */}
      <div className="project-info flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-white/90 font-bold tracking-widest">
            {project.year}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
          <span className="font-mono text-xs text-neutral-400 tracking-wider uppercase">
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-3xl md:text-4xl text-white font-bold mb-4 tracking-tight">
          {project.title}
        </h3>

        <p className="font-body text-sm md:text-base text-neutral-300 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Impact Callout */}
        <div className="p-4 rounded bg-neutral-900/60 border-l-2 border-white/30 mb-6">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-1">
            STRATEGIC IMPACT
          </span>
          <p className="font-body text-xs text-neutral-300">
            {project.impact}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-3 py-1 rounded bg-black/80 border border-white/10 text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
