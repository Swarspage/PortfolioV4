import type { Achievement, AchievementCategory } from '../types/portfolio';
import { getAssetUrl } from '../utils/assets';
import achievementsJson from '../All data/data/AchievementsData.json';

const achievementImages: Record<string, string> = {
  'Technical Co-Lead · CSI-CATT': 'CSITechLead.webp',
  'Shipped to 500+ Users · SIMS': 'soloInternHODPic.webp',
  'Internship · Full Dev Team': 'internshipGroupPhoto.webp',
  'Internship Certificate · DMCE': 'InternCertificate.webp',
  'Letter of Appreciation': 'LetterofAppreciationInternship.webp',
  'Official Certificate · TT Doubles': 'Tabletennisdoubles2ndprize.webp',
  'Top 8 Finalist · Code-A-Thon 2.0': 'CodeAThonehackthon.webp',
  'The Team Behind Singularity': 'codeAThon2.0withTeam.webp',
  '2nd Place · Table Tennis Doubles': 'Tabletennisdoubles2ndprize.webp'
};

export const achievements: Achievement[] = achievementsJson.map((a) => {
  const imgName = achievementImages[a.title];
  const isFeatured = a.title === 'Shipped to 500+ Users · SIMS';

  return {
    title: a.title,
    category: a.category as AchievementCategory,
    date: a.date,
    description: a.description,
    image: getAssetUrl(imgName),
    featured: isFeatured
  };
});