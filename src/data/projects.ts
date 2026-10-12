import type { Project } from '../types/portfolio';

export const projects: Project[] = [
{
  slug: 'singularity',
  name: 'Singularity',
  year: '2025',
  impactStatement: 'NASA. SpaceX. ISRO. One dashboard to rule them all.',
  description:
  'A full-stack space exploration platform with live mission telemetry, a Three.js orbital view and a Gemini-powered assistant that explains launches in plain language.',
  image: null,
  links: {
    github: 'https://github.com/Swarspage/Singularity.git',
    live: 'https://space-scope-93kx.vercel.app/',
    demo: 'https://www.youtube.com/watch?v=lDWuxWCVywc'
  },
  technologies: ['React', 'Three.js', 'Node.js', 'MongoDB', 'Gemini AI', 'Framer Motion']
},
{
  slug: 'sims',
  name: 'SIMS',
  year: '2025',
  impactStatement: 'Shipped to 500+ daily users. Still running.',
  description:
  'A student information management system built during my internship — attendance, records and reporting for an entire department, used every single day.',
  image: null,
  links: { github: null, live: null, demo: null },
  technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind']
},
{
  slug: 'recipe-ai',
  name: 'RecipeAI',
  year: '2025',
  impactStatement: "Tell it what's in your fridge. It tells you dinner.",
  description:
  'An AI recipe engine that turns leftover ingredients into step-by-step meals, with dietary filters and saved collections.',
  image: null,
  links: { github: null, live: null, demo: null },
  technologies: ['React', 'Gemini AI', 'Node.js', 'MongoDB']
},
{
  slug: 'skilltube',
  name: 'SkillTube',
  year: '2024',
  impactStatement: 'YouTube, minus the distractions. Plus a curriculum.',
  description:
  'Turns any YouTube playlist into a focused course with progress tracking, notes and zero recommended rabbit holes.',
  image: null,
  links: { github: null, live: null, demo: null },
  technologies: ['React', 'Express', 'MongoDB', 'YouTube API']
},
{
  slug: 'vayu',
  name: 'Vayu',
  year: '2024',
  impactStatement: 'Real-time air quality, readable at a glance.',
  description:
  'A live AQI dashboard that turns raw pollution data into clear, location-aware guidance on whether it is safe to head out.',
  image: null,
  links: { github: null, live: null, demo: null },
  technologies: ['React', 'Tailwind', 'REST APIs', 'Charts']
}];