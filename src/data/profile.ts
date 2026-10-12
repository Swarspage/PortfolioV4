import type { Profile } from '../types/portfolio';

export const profile: Profile = {
  firstName: 'Swar',
  lastName: 'Shinde',
  location: 'Navi Mumbai, India',
  availability: 'Available for opportunities',
  roles: ['developer', 'builder', 'designer'],
  tagline: 'who ships full-stack products end to end.',
  stats: [
  { value: '500+', label: 'Daily users on a system I shipped' },
  { value: 'Top 8', label: 'Code-A-Thon 2.0 finalist' },
  { value: 'MERN', label: 'Full-stack, front to database' }],

  resumeLink: '/Swar-Res.pdf',
  email: 'hello@swarshinde.dev',
  portrait: null,
  about: {
    lead: "I'm Swar — a 20-year-old full-stack developer from Navi Mumbai. I build products people actually use, and I ship them before the idea goes cold.",
    paragraphs: [
    'I ship. A 3D space telemetry dashboard that pulls NASA, SpaceX and ISRO into one view. A student management system used by 500+ people every day. An AI recipe engine. Each one went live — not just to GitHub.',
    'I also teach. On YouTube I break down the tools I use daily, so the next developer gets there faster than I did. Outside the IDE: table tennis, design rabbit holes, and leading tech at CSI-CATT.']

  },
  socials: [
  { label: 'GitHub', handle: '@Swarspage', href: 'https://github.com/Swarspage', icon: null },
  { label: 'LinkedIn', handle: 'in/swarshinde', href: 'https://linkedin.com/in/swarshinde', icon: null },
  { label: 'X', handle: '@swarshinde', href: 'https://x.com/swarshinde', icon: null },
  { label: 'Discord', handle: 'swar.dev', href: 'https://discord.com', icon: null }]

};