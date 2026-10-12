import type { YoutubeChannel } from '../types/portfolio';

export const youtube: YoutubeChannel = {
  channelName: 'Swar Shinde',
  channelLink: 'https://youtube.com/@yourchannel',
  pitch: 'Short, direct breakdowns of the tools I actually use — no 40-minute intros.',
  featured: {
    title: 'Building a 3D space dashboard with React & Three.js',
    link: 'https://www.youtube.com/watch?v=lDWuxWCVywc',
    thumbnail: null
  },
  recent: [
  { title: 'MERN auth in 15 minutes, done right', label: 'Tutorial', thumbnail: null, link: 'https://youtube.com/@yourchannel' },
  { title: 'Framer Motion patterns I use everywhere', label: 'Deep dive', thumbnail: null, link: 'https://youtube.com/@yourchannel' },
  { title: 'Shipping my first app to 500 users', label: 'Story', thumbnail: null, link: 'https://youtube.com/@yourchannel' },
  { title: 'Three.js for React developers', label: 'Coming soon', thumbnail: null, link: 'https://youtube.com/@yourchannel', locked: true }]

};