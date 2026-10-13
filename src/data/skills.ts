import type { Skill, SkillCategory, StackLayer } from '../types/portfolio';
import { getAssetUrl } from '../utils/assets';
import skillsJson from '../All data/data/SkillsData.json';

export const skills: Skill[] = skillsJson.map((item) => ({
  name: item.skill,
  category: item.category as SkillCategory,
  glow: item.glow,
  icon: getAssetUrl(item.icon)
}));

export const stackLayers: StackLayer[] = [
  {
    kind: 'interface',
    label: 'Interface',
    title: 'The surface.',
    description: 'Interfaces that feel fast because they are. React, motion and WebGL - tuned until every frame earns its place.',
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
  }
];

export const skillCategoryOrder = ['Frontend', 'Backend', 'Database', 'Languages', 'Tools'] as const;