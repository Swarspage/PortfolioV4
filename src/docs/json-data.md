# Audit & Schema Report: `src/All data`

This report provides a complete structural outline, data schema documentation, and usage audit for the folder:
**`D:\Code\Portfolio V4\src\All data`**

---

## 1. Executive Summary

| Category | Total Count | Active (Used in Code) | Unused / Redundant | Disk Space of Unused |
| :--- | :---: | :---: | :---: | :---: |
| **Root Directory** | 2 | 1 | 1 | ~2.39 MB |
| **Data JSON Files (`/data`)** | 8 | 8 | 0 | 0 KB |
| **Root Assets (`/assets`)** | 50 | 28 | 22 | ~1.30 MB |
| **Achievements Subfolder (`/assets/Achievements`)** | 10 | 9 | 1 | ~26.8 KB |
| **Backups (`/assets/backups`)** | 13 | 0 | 13 | ~1.28 MB |
| **Local Fonts (`/assets/fonts`)** | 4 | 0 | 4 | ~242 KB |
| **TOTAL** | **87 files** | **46 files** | **41 files** | **~5.24 MB waste** |

> [!IMPORTANT]
> Out of **87 total files** in `src/All data`, **46 files** are actively consumed by the portfolio UI. **41 files** (over 5.2 MB) are completely unused, orphaned, or duplicate backups.

---

## 2. Directory Tree (Active vs. Unused)

```text
src/All data/
├── Cloudy Face.webp                         [ACTIVE] Profile avatar in Hero & About
├── Cloudy Face.png                          [UNUSED] 2.4 MB uncompressed duplicate
│
├── data/                                    [ALL 8 ACTIVE]
│   ├── AboutData.json                       [ACTIVE] -> AboutSection.jsx
│   ├── AchievementsData.json                [ACTIVE] -> AchievementsSection.jsx
│   ├── EducationData.json                   [ACTIVE] -> EducationSection.jsx
│   ├── ExperienceData.json                  [ACTIVE] -> ExperienceSection.jsx
│   ├── HeroData.json                        [ACTIVE] -> HeroSection.jsx & Navbar.jsx
│   ├── ProjectsData.json                    [ACTIVE] -> ProjectsSection.jsx
│   ├── SkillsData.json                      [ACTIVE] -> SkillsSection.jsx
│   └── YoutubeData.json                     [ACTIVE] -> YoutubeSection.jsx
│
└── assets/
    ├── [Active Tech Stack Icons] (20 files via SkillsData.json):
    │   ├── C.webp, cpp.webp, css.webp, express.webp, framer-motion.svg
    │   ├── Git.webp, github.webp, gsap.svg, html.webp, java.webp
    │   ├── js.webp, MongoDB.webp, MySQL.webp, node-js.webp, postman.webp
    │   ├── Python.webp, react.webp, tailwind.svg, threejs.svg, vite.svg, VS.webp
    │
    ├── [Active Project Thumbnails] (5 files via ProjectsData.json):
    │   ├── RecipeAi.webp, sims.webp, Singularity.webp, Skilltube.webp, Vayu.webp
    │
    ├── [Active Social & Contact Icons] (5 files via ContactSection.jsx):
    │   ├── discord.webp, email.webp, github.webp, linkedin-logo.webp, X.webp
    │
    ├── [Active Documents & Media] (2 files):
    │   ├── Swar-Res.pdf                     [ACTIVE] Loaded by ContactSection & App.jsx
    │   └── utubebanner.webp                 [ACTIVE] Loaded by YoutubeSection.jsx
    │
    ├── Achievements/
    │   ├── CSITechLead.webp                 [ACTIVE]
    │   ├── soloInternHODPic.webp            [ACTIVE]
    │   ├── internshipGroupPhoto.webp        [ACTIVE]
    │   ├── InternCertificate.webp           [ACTIVE]
    │   ├── LOA.webp                         [ACTIVE]
    │   ├── LetterofAppreciationInternship.webp [ACTIVE]
    │   ├── CodeAThonehackthon.webp          [ACTIVE]
    │   ├── codeAThon2.0withTeam.webp        [ACTIVE]
    │   ├── Tabletennisdoubles2ndprize.webp  [ACTIVE]
    │   └── CSITechLeadEvent.webp            [UNUSED] Not mapped in AchievementsSection
    │
    ├── [Unused Orphaned/Duplicate Files] (13 files in assets/ root):
    │   ├── canva.webp, downloadicon.webp, image.webp, mobile.webp, problemsolving.webp
    │   ├── Swar-Resume.pdf                  [UNUSED] Superseded by Swar-Res.pdf
    │   ├── favicon.png, og-image.png, google15ae901a53a2309e.html, robots.txt, sitemap.xml
    │   └── Duplicate achievement files in root (codeAThon2.0withTeam.webp, InternCertificate.webp,
    │       internshipGroupPhoto.webp, LetterofAppreciationInternship.webp, LOA.webp,
    │       soloInternHODPic.webp, Tabletennisdoubles2ndprize.webp)
    │
    ├── backups/                             [ALL 13 UNUSED] .webp.bak files
    └── fonts/                               [ALL 4 UNUSED] Google Fonts CDN is used instead
```

---

## 3. Data Schemas (The 8 Active JSON Files)

### 3.1. `AboutData.json`
- **Consumer**: `src/components/sections/AboutSection.jsx`
- **TypeScript Schema**:
```typescript
interface AboutData {
  paragraphs: string[];
}
```
- **Structure**:
```json
{
  "paragraphs": [
    "I'm Swar - a 20-year-old developer from Navi Mumbai...",
    "I ship. A 3D space telemetry dashboard...",
    "I also teach...",
    "Outside the IDE..."
  ]
}
```

---

### 3.2. `HeroData.json`
- **Consumers**: `src/components/sections/HeroSection.jsx`, `src/components/layout/Navbar.jsx`
- **TypeScript Schema**:
```typescript
interface HeroStat {
  value: string;
  label: string;
}

interface HeroData {
  name: string;
  availability: string;
  roles: string[];
  stats: HeroStat[];
  resumeLink: string;
}
```
- **Structure**:
```json
{
  "name": "Swar Shinde",
  "availability": "Available for Opportunities",
  "roles": ["Developer", "Builder", "Designer"],
  "stats": [
    { "value": "500+", "label": "Daily Users" },
    { "value": "Top 8", "label": "Hackathon" },
    { "value": "MERN", "label": "Full-Stack" }
  ],
  "resumeLink": "/Swar-Res.pdf"
}
```

---

### 3.3. `EducationData.json`
- **Consumer**: `src/components/sections/EducationSection.jsx`
- **TypeScript Schema**:
```typescript
interface EducationItem {
  institution: string;
  degree: string;
  details: string;
  years: string;
  active: boolean;
}

type EducationData = EducationItem[];
```
- **Structure**:
```json
[
  {
    "institution": "Datta Meghe College of Eng.",
    "degree": "B.Tech Computer Engineering",
    "details": "GPA: 8.365 / 10 · Ongoing",
    "years": "2023 – Present",
    "active": true
  }
]
```

---

### 3.4. `ExperienceData.json`
- **Consumer**: `src/components/sections/ExperienceSection.jsx`
- **TypeScript Schema**:
```typescript
interface ExperienceItem {
  role: string;
  org: string;
  duration: string;
  active: boolean;
  description: string;
}

type ExperienceData = ExperienceItem[];
```
- **Structure**:
```json
[
  {
    "role": "Frontend Intern",
    "org": "Datta Meghe College",
    "duration": "Aug 2025 - Mar 2026",
    "active": false,
    "description": "Built and maintained features across the stack..."
  }
]
```

---

### 3.5. `ProjectsData.json`
- **Consumer**: `src/components/sections/ProjectsSection.jsx`
- **TypeScript Schema**:
```typescript
interface ProjectItem {
  name: string;
  impactStatement: string;
  description: string;
  imageSrc: string; // Relative path, e.g. "../assets/Singularity.webp"
  githubLink: string | null;
  liveLink: string | null;
  demoLink?: string;
  technologies: string[];
}

interface ProjectsDataWrapper {
  projectsData: ProjectItem[];
}
```
- **Structure**:
```json
{
  "projectsData": [
    {
      "name": "Singularity",
      "impactStatement": "NASA. SpaceX. ISRO. One dashboard to rule them all.",
      "description": "A full-stack space exploration platform...",
      "imageSrc": "../assets/Singularity.webp",
      "githubLink": "https://github.com/Swarspage/Singularity.git",
      "liveLink": "https://space-scope-93kx.vercel.app/",
      "demoLink": "https://www.youtube.com/watch?v=lDWuxWCVywc",
      "technologies": ["React", "Three.js", "Node.js", "MongoDB", "Gemini AI", "Framer Motion"]
    }
  ]
}
```

---

### 3.6. `SkillsData.json`
- **Consumer**: `src/components/sections/SkillsSection.jsx`
- **TypeScript Schema**:
```typescript
interface SkillItem {
  skill: string;
  glow: string; // CSS hex color code, e.g. "#61DAFB"
  category: "Frontend" | "Backend" | "Database" | "Languages" | "Tools";
  icon: string; // Filename located in src/All data/assets/
}

type SkillsData = SkillItem[];
```
- **Structure**:
```json
[
  {
    "skill": "React",
    "glow": "#61DAFB",
    "category": "Frontend",
    "icon": "react.webp"
  }
]
```

---

### 3.7. `AchievementsData.json`
- **Consumer**: `src/components/sections/AchievementsSection.jsx`
- **TypeScript Schema**:
```typescript
interface AchievementItem {
  title: string;
  category: "Leadership" | "Deployment" | "Recognition" | "Sports" | "Competition";
  date: string;
  description: string;
  iconName: "star" | "rocket" | "academic" | "trophy" | "volunteer";
}

type AchievementsData = AchievementItem[];
```
> [!NOTE]
> The associated photo is **not** stored inside the JSON. `AchievementsSection.jsx` maps `achievement.title` directly to files in `src/All data/assets/Achievements/` via an internal `imageMapping` object.

---

### 3.8. `YoutubeData.json`
- **Consumer**: `src/components/sections/YoutubeSection.jsx`
- **TypeScript Schema**:
```typescript
interface FeaturedVideo {
  id: string;
  link: string;
}

interface RecentVideo {
  title: string;
  label: string;
  thumbnail: string;
  link: string;
  isLocked?: boolean;
}

interface YoutubeData {
  featuredVideo: FeaturedVideo;
  recentVideos: RecentVideo[];
}
```

---

## 4. Complete Inventory of Active Assets (46 Files)

### 4.1. Core Media & Avatars (2 files)
| File Name | Path | Consumer |
| :--- | :--- | :--- |
| `Cloudy Face.webp` | `src/All data/Cloudy Face.webp` | `HeroSection.jsx`, `AboutSection.jsx` |
| `utubebanner.webp` | `src/All data/assets/utubebanner.webp` | `YoutubeSection.jsx` |

### 4.2. Document (1 file)
| File Name | Path | Consumer |
| :--- | :--- | :--- |
| `Swar-Res.pdf` | `src/All data/assets/Swar-Res.pdf` | `ContactSection.jsx`, `App.jsx` |

### 4.3. Social Icons (5 files)
| File Name | Consumer |
| :--- | :--- |
| `discord.webp` | `ContactSection.jsx` |
| `email.webp` | `ContactSection.jsx` |
| `github.webp` | `ContactSection.jsx` & `SkillsSection.jsx` |
| `linkedin-logo.webp` | `ContactSection.jsx` |
| `X.webp` | `ContactSection.jsx` |

### 4.4. Project Previews (5 files)
| File Name | Referenced In |
| :--- | :--- |
| `Singularity.webp` | `ProjectsData.json` -> `ProjectsSection.jsx` |
| `sims.webp` | `ProjectsData.json` -> `ProjectsSection.jsx` |
| `RecipeAi.webp` | `ProjectsData.json` -> `ProjectsSection.jsx` |
| `Skilltube.webp` | `ProjectsData.json` -> `ProjectsSection.jsx` |
| `Vayu.webp` | `ProjectsData.json` -> `ProjectsSection.jsx` |

### 4.5. Tech Stack Icons (20 files)
| File Name | Skill | Category | Glow Color |
| :--- | :--- | :--- | :--- |
| `react.webp` | React | Frontend | `#61DAFB` |
| `js.webp` | JavaScript | Frontend | `#F7DF1E` |
| `html.webp` | HTML | Frontend | `#E34F26` |
| `css.webp` | CSS | Frontend | `#1572B6` |
| `tailwind.svg` | Tailwind | Frontend | `#38BDF8` |
| `gsap.svg` | GSAP | Frontend | `#88CE02` |
| `framer-motion.svg` | Framer Motion | Frontend | `#BB4FFF` |
| `threejs.svg` | Three.js | Frontend | `#FFFFFF` |
| `node-js.webp` | Node.js | Backend | `#339933` |
| `express.webp` | Express | Backend | `#AAAAAA` |
| `Python.webp` | Python | Backend | `#4B8BBE` |
| `java.webp` | Java | Backend | `#ED8B00` |
| `MongoDB.webp` | MongoDB | Database | `#47A248` |
| `MySQL.webp` | MySQL | Database | `#00618A` |
| `cpp.webp` | C++ | Languages | `#00599C` |
| `C.webp` | C | Languages | `#A8B9CC` |
| `Git.webp` | Git | Tools | `#F05032` |
| `github.webp` | GitHub | Tools | `#D0D0D0` |
| `vite.svg` | Vite | Tools | `#BD34FE` |
| `postman.webp` | Postman | Tools | `#FF6C37` |
| `VS.webp` | VS Code | Tools | `#007ACC` |

### 4.6. Achievement Photos (9 files in `assets/Achievements/`)
| File Name | Mapped Achievement Title |
| :--- | :--- |
| `CSITechLead.webp` | "Technical Co-Lead · CSI-CATT" |
| `soloInternHODPic.webp` | "Shipped to 500+ Users · SIMS" |
| `internshipGroupPhoto.webp` | "Internship · Full Dev Team" |
| `InternCertificate.webp` | "Internship Certificate · DMCE" |
| `LOA.webp` | "Letter of Appreciation" |
| `LetterofAppreciationInternship.webp` | "Official Certificate · TT Doubles" |
| `CodeAThonehackthon.webp` | "Top 8 Finalist · Code-A-Thon 2.0" |
| `codeAThon2.0withTeam.webp` | "The Team Behind Singularity" |
| `Tabletennisdoubles2ndprize.webp` | "2nd Place · Table Tennis Doubles" |

---

## 5. Exhaustive List of Unused / Redundant Files (41 Files)

These files can be safely deleted or ignored without breaking any feature in the application:

### A. Uncompressed / Superseded Media (2 files)
- `src/All data/Cloudy Face.png` (2,393,637 bytes) — Uncompressed copy of `Cloudy Face.webp`.
- `src/All data/assets/Swar-Resume.pdf` (82,113 bytes) — Superseded by `Swar-Res.pdf`.

### B. Unused Icons & Graphics in `assets/` (5 files)
- `canva.webp` (1,286 bytes) — Not listed in `SkillsData.json` or imported anywhere.
- `downloadicon.webp` (190 bytes) — Never referenced.
- `image.webp` (287,886 bytes) — Never referenced.
- `mobile.webp` (5,436 bytes) — Never referenced.
- `problemsolving.webp` (10,510 bytes) — Not in `SkillsData.json`.

### C. Unused Achievement Image (1 file)
- `assets/Achievements/CSITechLeadEvent.webp` (26,836 bytes) — Excluded from `imageMapping` in `AchievementsSection.jsx`.

### D. Duplicate Root Copies of Achievement Photos (7 files)
*These exact files exist in `assets/Achievements/` where they are actually loaded from:*
- `assets/codeAThon2.0withTeam.webp`
- `assets/InternCertificate.webp`
- `assets/internshipGroupPhoto.webp`
- `assets/LetterofAppreciationInternship.webp`
- `assets/LOA.webp`
- `assets/soloInternHODPic.webp`
- `assets/Tabletennisdoubles2ndprize.webp`

### E. Public/Root Web Files Misplaced in `assets/` (5 files)
*These belong in (and already exist in) `/public`:*
- `assets/google15ae901a53a2309e.html`
- `assets/robots.txt`
- `assets/sitemap.xml`
- `assets/og-image.png`
- `assets/favicon.png`

### F. Backup Files in `assets/backups/` (13 files)
*All `.bak` files are completely unreferenced:*
- `codeAThon2.0withTeam.webp.bak`
- `image.webp.bak`
- `InternCertificate.webp.bak`
- `internshipGroupPhoto.webp.bak`
- `LetterofAppreciationInternship.webp.bak`
- `LOA.webp.bak`
- `RecipeAi.webp.bak`
- `sims.webp.bak`
- `Singularity.webp.bak`
- `Skilltube.webp.bak`
- `soloInternHODPic.webp.bak`
- `Tabletennisdoubles2ndprize.webp.bak`
- `Vayu.webp.bak`

### G. Local Font Files in `assets/fonts/` (4 files)
*The app loads fonts (`Kalam`, `Patrick Hand`) via Google Fonts in `index.html`. These local font files are never imported in `index.css`:*
- `NCLGasdrifo-Demo.otf`
- `NCLGasdrifo-Demo.woff2`
- `Outfit-VariableFont_wght.ttf`
- `Outfit-VariableFont_wght.woff2`
