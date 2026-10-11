# Placeholders to replace

Everything below was invented because the schema report truncated it ("...") or had no data.
Field names and types match the report exactly, so swapping in real values needs no code changes.

## 1. JSON data — `src/All data/data/`

| File | Field(s) | What's there now |
| :--- | :--- | :--- |
| `AboutData.json` | `paragraphs[0..3]` | The report's real opening words, completed with invented endings after the "..." |
| `ExperienceData.json` | `[0].description` | Invented text after "Built and maintained features across the stack" |
| `ProjectsData.json` | `projectsData[0].description` | The real opening ("A full-stack space exploration platform") with an invented ending |
| `ProjectsData.json` | `projectsData[1..4]` (SIMS, RecipeAi, Skilltube, Vayu): `impactStatement`, `description`, `githubLink`, `liveLink`, `technologies` | All invented. `imageSrc` follows the real file names. Some links are `null` on purpose to show the "Source private" / "Not deployed" states |
| `AchievementsData.json` | `category`, `date`, `description`, `iconName` for all 9 | Invented. The 9 titles are real (report 4.6) |
| `YoutubeData.json` | `featuredVideo` | Uses the Singularity demo video ID (`lDWuxWCVywc`). Replace with your featured video |
| `YoutubeData.json` | `recentVideos[0..3]` (all fields) | Invented. Thumbnails point to non-existent files (`yt-*.webp`) so they show placeholder plates |

Real and unchanged: all of `HeroData.json`, `EducationData.json`, all 21 skills in `SkillsData.json`, Singularity's name / impact / links / tech, and the Experience entry's role / org / duration / active.

## 2. Config — `data/siteConfig.ts`

| Field | What's there now |
| :--- | :--- |
| `email` | `hello@example.com` |
| `resumeFallbackUrl` | Only used while `src/All data/assets/Swar-Res.pdf` is missing |
| `socials[*].url` / `handle` | `your-handle` placeholders for GitHub, LinkedIn, X, Discord, Email |
| `location` | "Navi Mumbai, India" |

## 3. Section copy — `data/sectionCopy.ts`

Section labels and headings, like "Proof, in order." or "Let's build the next thing.", aren't part of the schemas. They're all in this one file, so you can edit them in one place.

## 4. Assets — drop files at these exact paths and they appear automatically

The resolver (`utils/assets.ts`) scans `/src/All data/**` with `import.meta.glob`. A designed placeholder renders for any file that's missing.

- `src/All data/Cloudy Face.webp`: hero and about portrait. Any aspect ratio works (cover, top-anchored, soft bottom mask)
- `src/All data/assets/Swar-Res.pdf`: résumé (nav, contact)
- `src/All data/assets/utubebanner.webp`: YouTube banner
- Project images: `Singularity.webp`, `sims.webp`, `RecipeAi.webp`, `Skilltube.webp`, `Vayu.webp`
- 21 skill icons: `react.webp`, `js.webp`, `html.webp`, `css.webp`, `tailwind.svg`, `gsap.svg`, `framer-motion.svg`, `threejs.svg`, `node-js.webp`, `express.webp`, `Python.webp`, `java.webp`, `MongoDB.webp`, `MySQL.webp`, `cpp.webp`, `C.webp`, `Git.webp`, `github.webp`, `vite.svg`, `postman.webp`, `VS.webp`
- Social icons: `discord.webp`, `email.webp`, `github.webp`, `linkedin-logo.webp`, `X.webp`
- `src/All data/assets/Achievements/`: the 9 files mapped in `data/achievementImages.ts`

Lookup is case-insensitive and accepts `../assets/x.webp`, `/x.pdf` or a bare file name. `assets/backups/` is ignored.

## 5. Accent

`--accent` in `index.css` is the only accent value. Light and dark derive their text-safe versions from it, and the 3D rim light and telemetry nodes read it at runtime.
