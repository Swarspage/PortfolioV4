import aboutJson from "../All data/data/AboutData.json";
import heroJson from "../All data/data/HeroData.json";
import educationJson from "../All data/data/EducationData.json";
import experienceJson from "../All data/data/ExperienceData.json";
import projectsJson from "../All data/data/ProjectsData.json";
import skillsJson from "../All data/data/SkillsData.json";
import achievementsJson from "../All data/data/AchievementsData.json";
import youtubeJson from "../All data/data/YoutubeData.json";
import type {
  AboutData,
  AchievementsData,
  EducationData,
  ExperienceData,
  HeroData,
  ProjectsDataWrapper,
  SkillsData,
  YoutubeData } from
"../types/content";

// Typed views over the 8 JSON files. All UI content flows from here.
export const aboutData = aboutJson as AboutData;
export const heroData = heroJson as HeroData;
export const educationData = educationJson as EducationData;
export const experienceData = experienceJson as ExperienceData;
export const projectsData = projectsJson as ProjectsDataWrapper;
export const skillsData = skillsJson as SkillsData;
export const achievementsData = achievementsJson as AchievementsData;
export const youtubeData = youtubeJson as YoutubeData;
