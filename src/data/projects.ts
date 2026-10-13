import type { Project } from '../types/portfolio';
import { getAssetUrl } from '../utils/assets';
import projectsJson from '../All data/data/ProjectsData.json';

const yearMap: Record<string, string> = {
  singularity: '2026',
  sims: '2026',
  'recipe app': '2025',
  skilltube: '2024',
  vayu: '2024'
};

export const projects: Project[] = projectsJson.projectsData.map((p) => {
  const slug = p.name.toLowerCase().replace(/\s+/g, '-');
  return {
    slug,
    name: p.name,
    year: yearMap[p.name.toLowerCase()] || '2025',
    impactStatement: p.impactStatement,
    description: p.description,
    image: getAssetUrl(p.imageSrc),
    wip: 'wip' in p ? Boolean(p.wip) : false,
    links: {
      github: p.githubLink || null,
      live: p.liveLink || null,
      demo: 'demoLink' in p ? (p.demoLink as string) || null : null
    },
    technologies: p.technologies
  };
});