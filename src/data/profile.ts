import type { Profile } from '../types/portfolio';
import { getAssetUrl } from '../utils/assets';
import heroData from '../All data/data/HeroData.json';
import aboutData from '../All data/data/AboutData.json';

const [first, ...rest] = heroData.name.split(' ');

export const profile: Profile = {
  firstName: first || 'Swar',
  lastName: rest.join(' ') || 'Shinde',
  location: 'Navi Mumbai, India',
  availability: heroData.availability || 'Available for Opportunities',
  roles: heroData.roles || ['Developer', 'Builder', 'Designer'],
  tagline: 'who ships full-stack products end to end.',
  stats: heroData.stats || [
    { value: '500+', label: 'Daily Users' },
    { value: 'Top 8', label: 'Hackathon Finalist' },
    { value: 'MERN', label: 'Full-Stack Developer' }
  ],
  resumeLink: heroData.resumeLink || '/Swar-Res.pdf',
  email: 'swarshinde.work@gmail.com',
  portrait: getAssetUrl('image.webp') || getAssetUrl('Cloudy Face.webp'),
  about: {
    lead: aboutData.paragraphs[0] || "I'm Swar - a 20-year-old developer from Navi Mumbai. I ship full-stack MERN apps that look cinematic and don't fall apart under real users.",
    paragraphs: aboutData.paragraphs.slice(1)
  },
  socials: [
    {
      label: 'GitHub',
      handle: '@Swarspage',
      href: 'https://github.com/Swarspage',
      icon: getAssetUrl('github.webp')
    },
    {
      label: 'LinkedIn',
      handle: 'in/swar-shinde',
      href: 'https://www.linkedin.com/in/swar-shinde-093a89279/',
      icon: getAssetUrl('linkedin-logo.webp')
    },
    {
      label: 'X',
      handle: '@swarshinde',
      href: 'https://x.com',
      icon: getAssetUrl('X.webp')
    },
    {
      label: 'Discord',
      handle: 'swarspage',
      href: 'https://discord.com',
      icon: getAssetUrl('discord.webp')
    }
  ]
};