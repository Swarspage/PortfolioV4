import type { Skill, StackLayer } from '../types/portfolio';

export const skills: Skill[] = [
{ name: 'React', category: 'Frontend', glow: '#61DAFB', icon: null },
{ name: 'JavaScript', category: 'Frontend', glow: '#F7DF1E', icon: null },
{ name: 'HTML', category: 'Frontend', glow: '#E34F26', icon: null },
{ name: 'CSS', category: 'Frontend', glow: '#1572B6', icon: null },
{ name: 'Tailwind', category: 'Frontend', glow: '#38BDF8', icon: null },
{ name: 'GSAP', category: 'Frontend', glow: '#88CE02', icon: null },
{ name: 'Framer Motion', category: 'Frontend', glow: '#BB4FFF', icon: null },
{ name: 'Three.js', category: 'Frontend', glow: '#FFFFFF', icon: null },
{ name: 'Node.js', category: 'Backend', glow: '#339933', icon: null },
{ name: 'Express', category: 'Backend', glow: '#AAAAAA', icon: null },
{ name: 'Python', category: 'Backend', glow: '#4B8BBE', icon: null },
{ name: 'Java', category: 'Backend', glow: '#ED8B00', icon: null },
{ name: 'MongoDB', category: 'Database', glow: '#47A248', icon: null },
{ name: 'MySQL', category: 'Database', glow: '#00618A', icon: null },
{ name: 'C++', category: 'Languages', glow: '#00599C', icon: null },
{ name: 'C', category: 'Languages', glow: '#A8B9CC', icon: null },
{ name: 'Git', category: 'Tools', glow: '#F05032', icon: null },
{ name: 'GitHub', category: 'Tools', glow: '#D0D0D0', icon: null },
{ name: 'Vite', category: 'Tools', glow: '#BD34FE', icon: null },
{ name: 'Postman', category: 'Tools', glow: '#FF6C37', icon: null },
{ name: 'VS Code', category: 'Tools', glow: '#007ACC', icon: null }];


export const stackLayers: StackLayer[] = [
{
  kind: 'interface',
  label: 'Interface',
  title: 'The surface.',
  description: 'Interfaces that feel fast because they are. React, motion and WebGL — tuned until every frame earns its place.',
  categories: ['Frontend']
},
{
  kind: 'api',
  label: 'API',
  title: 'The engine.',
  description: 'APIs, auth and business logic in Node and Express. Clean contracts, predictable responses, no surprises in production.',
  categories: ['Backend']
},
{
  kind: 'data',
  label: 'Data',
  title: 'The memory.',
  description: 'Schemas designed for the queries that actually run. MongoDB for flexibility, MySQL when relations matter.',
  categories: ['Database']
},
{
  kind: 'infra',
  label: 'Tooling',
  title: 'The toolkit.',
  description: 'Version control, testing and the languages underneath it all. The unglamorous layer that keeps everything shipping.',
  categories: ['Languages', 'Tools']
}];


export const skillCategoryOrder = ['Frontend', 'Backend', 'Database', 'Languages', 'Tools'] as const;