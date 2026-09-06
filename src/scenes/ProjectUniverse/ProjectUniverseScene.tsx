import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ProjectPlate } from './ProjectPlate';
import { ProjectItem } from '../../types';

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'cyperflow',
    number: '01',
    title: 'CyperFlow — Finance Checker',
    subtitle: 'Intelligent Real-time Capital Analytics',
    year: '2026',
    category: 'FINTECH & FULL STACK',
    description:
      'An intelligent financial analytics platform engineered for dynamic capital tracking, expenditure forecasting, and cryptographic security protocols.',
    impact: 'Processes high-throughput transaction flows with instantaneous budget balancing and zero latency.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vercel', 'Fintech', 'Full Stack'],
    link: 'https://cyperflow.vercel.app/',
    github: 'https://github.com/piyushbaruadebug',
    accentColor: '#e50914',
    coordinates: '22.5726° N, 88.3639° E',
    securityRating: 'ENCRYPTION: AES-256 GCM',
  },
  {
    id: 'password-checker',
    number: '02',
    title: 'Password Strength & Entropy Analyzer',
    subtitle: 'Cryptographic Breach Resilience Engine',
    year: '2026',
    category: 'CYBERSECURITY UTILITY',
    description:
      'Real-time cryptographic entropy evaluator that computes brute-force time complexity, character space diversity, and dictionary attack resistance.',
    impact: 'Evaluates password entropy against NIST Special Publication 800-63B standards in real time.',
    tags: ['Cybersecurity', 'Entropy Analysis', 'JavaScript', 'NIST Standards'],
    link: 'https://piyushbaruadebug.github.io/password-strength-checker/',
    github: 'https://github.com/piyushbaruadebug/password-strength-checker',
    accentColor: '#e50914',
    coordinates: 'GNIT SEC LAB // 0x4F',
    securityRating: 'CRITICALITY: TIER 1 UTILITY',
  },
  {
    id: 'phishing-detector',
    number: '03',
    title: 'Phishing Threat Defense Engine',
    subtitle: 'Heuristic Header & Payload Analyzer',
    year: '2026',
    category: 'THREAT DEFENSE & NLP',
    description:
      'Heuristic threat classification engine designed to detect deceptive domain spoofing, suspicious header anomalies, and social engineering vectors.',
    impact: 'Identifies multi-vector phishing attempts with deep lexical and header inspection before execution.',
    tags: ['Threat Defense', 'Email Security', 'Heuristics', 'NLP', 'Python'],
    link: 'https://piyushbaruadebug.github.io/phising-emails/',
    github: 'https://github.com/piyushbaruadebug/phising-emails',
    accentColor: '#e50914',
    coordinates: 'THREAT LAB // HEURISTICS',
    securityRating: 'INTELLIGENCE: ACTIVE SHIELD',
  },
  {
    id: 'cyber-lab',
    number: '04',
    title: 'GNIT Cybersecurity Research Lab',
    subtitle: 'Penetration Testing & Network Forensics',
    year: '2025',
    category: 'NETWORK DEFENSE & RESEARCH',
    description:
      'Comprehensive network packet dissection, protocol vulnerability research, malware sandbox isolation, and security auditing tools developed at GNIT.',
    impact: 'Documented threat mitigation strategies and hardened distributed network configurations.',
    tags: ['Kali Linux', 'Wireshark', 'Metasploit', 'Packet Analysis', 'GNIT'],
    link: 'https://github.com/piyushbaruadebug',
    github: 'https://github.com/piyushbaruadebug',
    accentColor: '#e50914',
    coordinates: 'GNIT LABS // SECTOR 7',
    securityRating: 'CLASSIFICATION: RESEARCH DOSSIER',
  },
  {
    id: 'calc-app',
    number: '05',
    title: 'Precision Arithmetic Web Core',
    subtitle: 'Keyboard-Accelerated Computation',
    year: '2026',
    category: 'WEB APPLICATION',
    description:
      'A precision arithmetic calculator built with instantaneous AST evaluation, fluid keyboard shortcuts, and dark tactile interface.',
    impact: 'Optimized for high-speed mathematical operations with zero layout shift.',
    tags: ['JavaScript', 'UI Engineering', 'Web App', 'Responsive'],
    link: 'https://piyushbaruadebug.github.io/calculator/',
    github: 'https://github.com/piyushbaruadebug/calculator',
    accentColor: '#e50914',
    coordinates: 'LOCAL CORE // 0x01',
    securityRating: 'RUNTIME: PURE CLIENT-SIDE',
  },
];

export const ProjectUniverseScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll('.project-composition');
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
            opacity: 1,
            y: 0,
            scale: 1,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="scene-projects">
      <div className="max-w-7xl mx-auto">
        {/* Scene Header (Matching Scene 02 reference style) */}
        <div className="mb-12 text-left">
          <div className="font-mono text-xs sm:text-sm text-white/90 tracking-[0.22em] uppercase font-normal mb-1">
            SCENE 06 // ARTIFACT SHOWCASE
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase mb-2 leading-none">
            PROJECT UNIVERSE
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-[0.18em] uppercase mb-2">
            EXPLORE MISSION ARTIFACTS · LIVE DEPLOYMENTS · SOURCE REPOSITORIES
          </p>

          <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400">
            <span className="text-white font-semibold cursor-pointer">ALL MISSIONS</span>
            <span className="hover:text-white cursor-pointer transition-colors">FINTECH</span>
            <span className="hover:text-white cursor-pointer transition-colors">CYBERSECURITY</span>
            <span className="hover:text-white cursor-pointer transition-colors">AI SYSTEMS</span>
          </div>


        </div>

        {/* Cinematic Compositions List */}
        <div className="project-composition-list">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectPlate key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
