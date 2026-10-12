import type { CareerItem } from '../types/portfolio';
import experienceJson from '../All data/data/ExperienceData.json';
import educationJson from '../All data/data/EducationData.json';

const expHighlights: Record<string, string[]> = {
  'Technical Co-Lead': ['Workshops & Hackathons', 'Chapter Dev Projects'],
  'Frontend Intern': ['Shipped to 500+ Daily Users', 'Letter of Appreciation'],
  'Freelance Developer': ['Full-Stack Ownership', 'MERN Stack & Deployment']
};

export const career: CareerItem[] = [
  ...experienceJson.map((item) => ({
    kind: 'experience' as const,
    title: item.role,
    org: item.org,
    period: item.duration,
    active: item.active,
    summary: item.description,
    highlights: expHighlights[item.role] || []
  })),
  ...educationJson.map((item) => ({
    kind: 'education' as const,
    title: item.degree,
    org: item.institution,
    period: item.years,
    active: item.active,
    summary: item.details,
    highlights: []
  }))
];