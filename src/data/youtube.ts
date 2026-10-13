import type { YoutubeChannel } from '../types/portfolio';
import youtubeJson from '../All data/data/YoutubeData.json';

export const youtube: YoutubeChannel = {
  channelName: 'Swar Shinde',
  channelLink: youtubeJson.featuredVideo.link,
  pitch: 'Short, direct breakdowns of the systems, tools and code I actually ship - no filler.',
  featured: {
    title: 'Singularity - Full Project Showcase & Telemetry Mission Control',
    link: youtubeJson.featuredVideo.link,
    thumbnail: `https://img.youtube.com/vi/${youtubeJson.featuredVideo.id}/maxresdefault.jpg`
  },
  recent: youtubeJson.recentVideos.map((v) => ({
    title: v.title,
    label: v.label,
    thumbnail: v.thumbnail,
    link: v.link,
    locked: 'isLocked' in v ? Boolean(v.isLocked) : false
  }))
};