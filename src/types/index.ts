export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  description: string;
  impact: string;
  tags: string[];
  link: string;
  github?: string;
  accentColor: string;
  image?: string;
  coordinates: string;
  securityRating?: string;
}

export interface TimelineYear {
  year: string;
  era: string;
  title: string;
  role: string;
  organization?: string;
  description: string;
  milestones: string[];
  techStack: string[];
  status: 'ACTIVE' | 'ARCHIVED' | 'CLASSIFIED';
  focus: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'CORE' | 'SECURITY' | 'AI' | 'SYSTEMS';
  level: number;
  description: string;
  tag: string;
}
