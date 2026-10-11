// Mirrors the TypeScript schemas in the "Audit & Schema Report" (sections 3.1 – 3.8).

export interface AboutData {
  paragraphs: string[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  name: string;
  availability: string;
  roles: string[];
  stats: HeroStat[];
  resumeLink: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  details: string;
  years: string;
  active: boolean;
}
export type EducationData = EducationItem[];

export interface ExperienceItem {
  role: string;
  org: string;
  duration: string;
  active: boolean;
  description: string;
}
export type ExperienceData = ExperienceItem[];

export interface ProjectItem {
  name: string;
  impactStatement: string;
  description: string;
  imageSrc: string;
  githubLink: string | null;
  liveLink: string | null;
  demoLink?: string;
  technologies: string[];
}
export interface ProjectsDataWrapper {
  projectsData: ProjectItem[];
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Languages" | "Tools";
export const SKILL_CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "Database", "Languages", "Tools"];

export interface SkillItem {
  skill: string;
  glow: string;
  category: SkillCategory;
  icon: string;
}
export type SkillsData = SkillItem[];

export type AchievementCategory = "Leadership" | "Deployment" | "Recognition" | "Sports" | "Competition";
export type AchievementIconName = "star" | "rocket" | "academic" | "trophy" | "volunteer";

export interface AchievementItem {
  title: string;
  category: AchievementCategory;
  date: string;
  description: string;
  iconName: AchievementIconName;
}
export type AchievementsData = AchievementItem[];

export interface FeaturedVideo {
  id: string;
  link: string;
}
export interface RecentVideo {
  title: string;
  label: string;
  thumbnail: string;
  link: string;
  isLocked?: boolean;
}
export interface YoutubeData {
  featuredVideo: FeaturedVideo;
  recentVideos: RecentVideo[];
}