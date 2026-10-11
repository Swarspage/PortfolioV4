import React from "react";
import type { SkillItem } from "../../types/content";
import { resolveSkillIcon } from "../../utils/assets";
import { glowTone } from "../../utils/color";
import { AssetImage } from "./AssetImage";

/** Glow on dark, tinted plate + outline on light (see .skill-chip in index.css). */
export function SkillChip({ skill }: {skill: SkillItem;}) {
  const icon = resolveSkillIcon(skill);
  return (
    <span
      className="skill-chip"
      data-glow-tone={glowTone(skill.glow)}
      style={{ "--glow": skill.glow } as React.CSSProperties}>
      
      <span className="skill-chip__icon">
        <AssetImage asset={icon} alt="" />
      </span>
      {skill.skill}
    </span>);

}