import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Brain,
  Zap,
  Box,
  Eye,
  Bot,
  Layers,
  Server,
  Globe,
  Lock,
  Terminal,
  Database,
  Shield,
  GitBranch,
  FileCode,
  Monitor,
  Activity,
  Send,
  Sparkles,
  Flame,
  KeyRound,
  FileText,
  ScanText,
  Users,
  Code2,
  FileCode2,
  Layout,
  Palette,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Github,
  Package,
  Laptop,
  Table,
  Workflow,
  Cpu,
  Lightbulb,
} from 'lucide-react';

interface ToolItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  highlighted?: boolean;
}

interface ToolCategory {
  id: string;
  name: string;
  spec?: string;
  efficiency?: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: string;
  featured?: boolean;
  items: ToolItem[];
}

const TOOLKIT_CATEGORIES: ToolCategory[] = [
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    spec: 'LLM // NLP // HEURISTICS',
    efficiency: '96% EFFICIENCY',
    icon: Lightbulb,
    count: '7 TECHNOLOGIES',
    featured: true,
    items: [
      { name: 'LLMs', icon: Sparkles, highlighted: true },
      { name: 'Groq', icon: Zap, highlighted: true },
      { name: 'Llama 3.3 70B', icon: Box },
      { name: 'Tesseract OCR', icon: ScanText },
      { name: 'Computer Vision', icon: Eye },
      { name: 'AI Chatbots', icon: Bot },
      { name: 'AI Agents', icon: Users },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    spec: 'REACT // TS // VITE',
    efficiency: '95% EFFICIENCY',
    icon: Monitor,
    count: '7 TECHNOLOGIES',
    items: [
      { name: 'React', icon: Globe },
      { name: 'TypeScript', icon: Code2 },
      { name: 'JavaScript', icon: FileCode2 },
      { name: 'HTML5', icon: Layout },
      { name: 'CSS3', icon: Palette },
      { name: 'Vite', icon: Zap },
      { name: 'Tailwind CSS', icon: Layers },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    spec: 'REST // API // DISTRIBUTED',
    efficiency: '94% EFFICIENCY',
    icon: Server,
    count: '7 TECHNOLOGIES',
    items: [
      { name: 'Node.js', icon: Server },
      { name: 'Express.js', icon: Layers },
      { name: 'REST APIs', icon: Globe },
      { name: 'CORS', icon: Shield },
      { name: 'dotenv', icon: FileText },
      { name: 'JWT', icon: KeyRound },
      { name: 'bcrypt', icon: Lock },
    ],
  },
  {
    id: 'data',
    name: 'Data & Research',
    spec: 'SEC // FORENSICS // DATA',
    efficiency: '92% EFFICIENCY',
    icon: Activity,
    count: '5 TECHNOLOGIES',
    items: [
      { name: 'Python', icon: Terminal },
      { name: 'Kaggle', icon: TrendingUp },
      { name: 'Dataset Preprocessing', icon: Database },
      { name: 'Phishing URL Detection', icon: ShieldCheck },
      { name: 'Legitimate URL Datasets', icon: CheckCircle2 },
    ],
  },
  {
    id: 'devops',
    name: 'Dev & Deployment',
    spec: 'CI/CD // LINUX // PIPELINES',
    efficiency: '90% EFFICIENCY',
    icon: GitBranch,
    count: '7 TECHNOLOGIES',
    items: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: Github },
      { name: 'Vercel', icon: Flame },
      { name: 'npm', icon: Package },
      { name: 'VS Code', icon: Laptop },
      { name: 'macOS Terminal', icon: Terminal },
      { name: 'Postman', icon: Send },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    spec: 'STORAGE // SQL // RELATIONAL',
    efficiency: '91% EFFICIENCY',
    icon: Database,
    count: '1 TECHNOLOGY',
    items: [
      { name: 'SQL', icon: Table },
    ],
  },
  {
    id: 'automation',
    name: 'Automation & Integration',
    spec: 'WORKFLOWS // APIS',
    efficiency: '89% EFFICIENCY',
    icon: Workflow,
    count: '1 TECHNOLOGY',
    items: [
      { name: 'APIs', icon: Cpu },
    ],
  },
];

const ToolkitCard: React.FC<{ cat: ToolCategory }> = ({ cat }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = cat.icon;

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
      className={`tools-card group ${cat.featured ? 'featured-ai' : ''}`}
    >
      {/* Corner Brackets / Cinematic Framing (with subtle reddish tone) */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-red-500/35 pointer-events-none group-hover:border-red-500/70 transition-colors" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-red-500/35 pointer-events-none group-hover:border-red-500/70 transition-colors" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-red-500/35 pointer-events-none group-hover:border-red-500/70 transition-colors" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-red-500/35 pointer-events-none group-hover:border-red-500/70 transition-colors" />

      <div className="tools-card-top">
        <div className="tools-card-title-group">
          <div className="tools-card-icon">
            <Icon className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
          </div>
          <h3 className="tools-card-name font-display">{cat.name}</h3>
        </div>
      </div>

      <div className="tools-pills-wrap">
        {cat.items.map((item) => {
          const ItemIcon = item.icon;
          return (
            <span
              key={item.name}
              className={`tech-pill ${item.highlighted ? 'highlight-accent' : ''}`}
            >
              <ItemIcon className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400 group-hover:text-red-400 transition-colors" />
              <span>{item.name}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const CreativeUniverseScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'core' | 'security' | 'ai'>('all');

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

  const filteredCategories = TOOLKIT_CATEGORIES.filter((cat) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'core') return cat.id === 'frontend' || cat.id === 'backend' || cat.id === 'database';
    if (activeFilter === 'security') return cat.id === 'data' || cat.id === 'devops';
    if (activeFilter === 'ai') return cat.id === 'ai' || cat.id === 'automation';
    return true;
  });

  return (
    <section id="universe" ref={containerRef} className="scene-tools-universe relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="tools-ambient-glow" />
      <div className="tools-ambient-glow-2" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {/* Header Section (Matching Picture 2 style exactly) */}
        <div ref={headingRef} className="tools-header mb-12 text-left">
          <div className="font-mono text-xs sm:text-sm text-white/90 tracking-[0.22em] uppercase font-normal mb-1">
            SCENE 03 // TOOL KITS
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase mb-2 leading-none">
            THE CREATIVE UNIVERSE
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-[0.18em] uppercase mb-4">
            ENGINEERING SYSTEMS · THREAT RESILIENCE · HEURISTIC FRAMEWORKS
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-neutral-400">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`transition-colors cursor-pointer ${
                activeFilter === 'all' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              ALL DOMAINS
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('core')}
              className={`transition-colors cursor-pointer ${
                activeFilter === 'core' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              CORE
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('security')}
              className={`transition-colors cursor-pointer ${
                activeFilter === 'security' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              SECURITY
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ai')}
              className={`transition-colors cursor-pointer ${
                activeFilter === 'ai' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              AI
            </button>
          </div>
        </div>

        {/* Toolkit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <ToolkitCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};
