import React from "react";
import { GraduationCapIcon, HandHeartIcon, RocketIcon, StarIcon, TrophyIcon } from "lucide-react";
import type { AchievementIconName } from "../../types/content";

const ICONS: Record<AchievementIconName, typeof StarIcon> = {
  star: StarIcon,
  rocket: RocketIcon,
  academic: GraduationCapIcon,
  trophy: TrophyIcon,
  volunteer: HandHeartIcon
};

export function AchievementIcon({ name, className = "h-4 w-4" }: {name: AchievementIconName;className?: string;}) {
  const Icon = ICONS[name] ?? StarIcon;
  return <Icon aria-hidden className={className} strokeWidth={1.75} />;
}