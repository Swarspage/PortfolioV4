export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Languages' | 'Tools';

export interface Stat {
  value: string;
  label: string;
}

export interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: string | null;
  copyValue?: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  location: string;
  availability: string;
  roles: string[];
  tagline: string;
  stats: Stat[];
  resumeLink: string;
  email: string;
  portrait: string | null;
  about: {
    lead: string;
    paragraphs: string[];
    image?: string | null;
  };
  socials: SocialLink[];
}

export interface Skill {
  name: string;
  category: SkillCategory;
  glow: string;
  icon: string | null;
}

export type LayerKind = 'interface' | 'api' | 'data' | 'infra';

export interface StackLayer {
  kind: LayerKind;
  label: string;
  title: string;
  description: string;
  categories: SkillCategory[];
}

export interface Project {
  slug: string;
  name: string;
  year: string;
  impactStatement: string;
  description: string;
  image: string | null;
  links: {
    github: string | null;
    live: string | null;
    demo: string | null;
  };
  technologies: string[];
}

export interface CareerItem {
  kind: 'experience' | 'education';
  title: string;
  org: string;
  period: string;
  active: boolean;
  summary: string;
  highlights: string[];
}

export type AchievementCategory = 'Leadership' | 'Deployment' | 'Recognition' | 'Sports' | 'Competition';

export interface Achievement {
  title: string;
  category: AchievementCategory;
  date: string;
  description: string;
  image: string | null;
  featured?: boolean;
}

export interface Video {
  title: string;
  label: string;
  thumbnail: string | null;
  link: string;
  locked?: boolean;
}

export interface YoutubeChannel {
  channelName: string;
  channelLink: string;
  pitch: string;
  featured: {
    title: string;
    link: string;
    thumbnail: string | null;
  };
  recent: Video[];
}

export interface NavLink {
  id: string;
  label: string;
}