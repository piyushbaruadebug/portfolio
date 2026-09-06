import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChronoClock } from './ChronoClock';
import { TimelineYear } from '../../types';
import { Calendar, Shield, Sparkles, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

const TIMELINE_DATA: TimelineYear[] = [
  {
    year: '2021',
    era: 'ERA I // GENESIS',
    title: 'Python, OOP & Class 10 Journey',
    role: 'Class 10 Student & Python Explorer',
    description:
      'Commenced Class 10 academic studies while diving into programming fundamentals, actively studying Python syntax, logic building, and object-oriented programming (OOP).',
    milestones: [
      'Started Class 10 secondary school curriculum',
      'Studied Python programming fundamentals and core syntax',
      'Learned object-oriented programming (OOP) principles and structures',
    ],
    techStack: ['Python', 'OOP', 'Logic Building', 'Class 10'],
    status: 'ARCHIVED',
    focus: 'Python, OOP & Class 10',
  },
  {
    year: '2022',
    era: 'ERA II // INTELLIGENCE',
    title: 'Completing Class 10 & AI Explorations',
    role: 'Class 10 Graduate & AI Explorer',
    description:
      'Successfully completed and passed Class 10 (ICSE board) and expanded technical horizons by gaining foundational knowledge in Artificial Intelligence.',
    milestones: [
      'Successfully finished and passed Class 10 (ICSE) examinations',
      'Began gaining foundational knowledge in Artificial Intelligence',
      'Explored core AI concepts, algorithms, and intelligent systems',
    ],
    techStack: ['Class 10 ICSE', 'Artificial Intelligence', 'Machine Learning', 'Python'],
    status: 'ARCHIVED',
    focus: 'Class 10 Completion & AI Knowledge',
  },
  {
    year: '2023',
    era: 'ERA III // WEB DEV & UI',
    title: 'UI Design & Frontend Web Development',
    role: 'Aspiring Web & Frontend Developer',
    description:
      'Gained core knowledge in UI design and frontend development, earning practical, hands-on knowledge in web development fundamentals.',
    milestones: [
      'Gained foundational knowledge in modern web development',
      'Learned UI design principles and responsive layouts',
      'Built frontend projects using HTML5, CSS3, and JavaScript',
    ],
    techStack: ['UI Design', 'Frontend Dev', 'HTML5', 'CSS3', 'JavaScript'],
    status: 'ARCHIVED',
    focus: 'UI & Frontend Web Development',
  },
  {
    year: '2024',
    era: 'ERA IV // FORTIFICATION',
    title: 'Cybersecurity Immersion & GNIT Labs',
    role: 'Cybersecurity Researcher @ GNIT',
    description:
      'Specialized in cybersecurity at Guru Nanak Institute of Technology (GNIT). Penetration testing, network packet forensics, threat intelligence, and sandboxing.',
    milestones: [
      'Hands-on network defense & Wireshark protocol dissection',
      'Penetration testing labs & ethical vulnerability discovery',
      'Developed research tools for threat detection and posture auditing',
    ],
    techStack: ['Kali Linux', 'Wireshark', 'Metasploit', 'Nmap', 'Bash Scripting'],
    status: 'ACTIVE',
    focus: 'Threat Modeling & Network Security',
  },
  {
    year: '2025',
    era: 'ERA V // INTELLIGENCE',
    title: 'AI Integration & Heuristic Threat Defense',
    role: 'AI & Security Systems Engineer',
    description:
      'Combined machine learning, LLMs (Groq, Llama 3.3), and heuristic threat classification. Built the Phishing Email Detector and Password Entropy Engine.',
    milestones: [
      'Engineered real-time Cryptographic Password Entropy Analyzer',
      'Deployed heuristic Phishing Email Detector with spoofing analysis',
      'Integrated LLM pipelines for automated threat triage and code review',
    ],
    techStack: ['Llama 3.3', 'Groq API', 'Computer Vision', 'Heuristics', 'Python ML'],
    status: 'ACTIVE',
    focus: 'AI-Powered Security & Automation',
  },
  {
    year: '2026',
    era: 'ERA VI // HIGH PERFORMANCE',
    title: 'CyperFlow & Next-Gen Creative Tech',
    role: 'Lead Systems & Creative Engineer',
    description:
      'Launched CyperFlow fintech platform and interactive short-film web experiences. Merging WebGL shaders, Three.js, GSAP, and military-grade resilience.',
    milestones: [
      'Architected CyperFlow smart finance tracker & analytics platform',
      'Engineered cinematic short-film portfolio with 3D WebGL scenes',
      'Building ultra-fast, hardened, production-grade applications',
    ],
    techStack: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Vite', 'Tailwind'],
    status: 'ACTIVE',
    focus: 'Next-Gen Interactive & Fintech Systems',
  },
];

export const TimeJourneyScene: React.FC = () => {
  const [activeYear, setActiveYear] = useState<string>('2026');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentData =
    TIMELINE_DATA.find((t) => t.year === activeYear) || TIMELINE_DATA[TIMELINE_DATA.length - 1];

  const handleSelectYear = (year: string) => {
    setActiveYear(year);
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 30, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
      );
    }
  };

  return (
    <section id="chrono" ref={containerRef} className="scene-chrono">
      <div className="max-w-7xl mx-auto">
        {/* Scene Header (Matching Scene 02 reference style) */}
        <div className="mb-12 text-left">
          <div className="font-mono text-xs sm:text-sm text-white/90 tracking-[0.22em] uppercase font-normal mb-1">
            SCENE 04 // TEMPORAL MATRIX
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase mb-2 leading-none">
            JOURNEY THROUGH TIME
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-[0.18em] uppercase mb-2">
            ROTATE THE CLOCK TO NAVIGATE CHRONOLOGICAL ERAS (2021 — 2026)
          </p>

          <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400">
            <span className="text-white font-semibold cursor-pointer">ALL ERAS</span>
            <span className="hover:text-white cursor-pointer transition-colors">2021—2023</span>
            <span className="hover:text-white cursor-pointer transition-colors">2024—2025</span>
            <span className="hover:text-white cursor-pointer transition-colors">2026 CURRENT</span>
          </div>


        </div>

        {/* Interactive Chrono Dual Column */}
        <div className="chrono-container">
          {/* Column 1: Interactive 360° Radial Clock */}
          <div className="flex flex-col items-center justify-center">
            <ChronoClock
              years={TIMELINE_DATA.map((t) => t.year)}
              activeYear={activeYear}
              onSelectYear={handleSelectYear}
            />
          </div>

          {/* Column 2: Active Era Dossier Card */}
          <div
            ref={cardRef}
            className="p-8 md:p-10 rounded-xl bg-neutral-950/90 border border-white/10 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Top Status Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="font-mono text-xs text-red-500 font-bold tracking-widest">
                {currentData.era}
              </span>
              <div className="flex items-center gap-2 font-mono text-[11px] px-3 py-1 rounded-full bg-neutral-900 border border-white/5">
                <Calendar className="w-3 h-3 text-red-500" />
                <span className="text-white font-bold">{currentData.year}</span>
              </div>
            </div>

            {/* Title & Role */}
            <h3 className="font-display text-2xl md:text-3xl text-white mt-6 mb-2">
              {currentData.title}
            </h3>
            <p className="font-mono text-xs text-neutral-400 tracking-wider mb-6">
              {currentData.role}
            </p>

            {/* Description */}
            <p className="font-body text-sm md:text-base text-neutral-300 leading-relaxed mb-6">
              {currentData.description}
            </p>

            {/* Key Milestones */}
            <div className="mb-6">
              <span className="font-editorial text-xs text-neutral-400 tracking-widest uppercase block mb-3">
                Key Operations & Breakthroughs:
              </span>
              <ul className="space-y-2.5">
                {currentData.milestones.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
              {currentData.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-3 py-1 rounded bg-neutral-900 border border-white/10 text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
