# Graph Report - Portfolio V4  (2026-08-20)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 142 nodes · 289 edges · 12 communities (11 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7591a5c8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10

## God Nodes (most connected - your core abstractions)
1. `react` - 31 edges
2. `Card()` - 12 edges
3. `Badge()` - 10 edges
4. `SoundManager` - 8 edges
5. `Button()` - 8 edges
6. `scripts` - 5 edges
7. `SketchCircle()` - 4 edges
8. `SketchStar()` - 4 edges
9. `TapeStrip()` - 4 edges
10. `Thumbtack()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/layout/Navbar.jsx → src/context/ThemeContext.jsx

## Import Cycles
- None detected.

## Communities (12 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.21
Nodes (13): DashedArrow(), SketchCircle(), SketchStar(), TapeStrip(), Thumbtack(), getImageUrl(), icons, ProjectsSection() (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.16
Nodes (13): App(), PostItTag(), SquigglyUnderline(), Navbar(), AboutSection(), EducationSection(), ExperienceSection(), YoutubeSection() (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (17): oxlint, devDependencies, oxlint, sharp, tailwindcss, @tailwindcss/vite, @types/react, @types/react-dom (+9 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (15): axios, @emailjs/browser, gsap, lucide-react, dependencies, axios, @emailjs/browser, gsap (+7 more)

### Community 4 - "Community 4"
Cohesion: 0.33
Nodes (7): react, DarkBadge(), DarkButton(), DarkCard(), DarkInput(), DarkTextArea(), DarkModal()

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (6): HeroSection(), Button(), DraggableStickers(), initialStickers, MiniCodeSandbox(), Typewriter()

### Community 6 - "Community 6"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.25
Nodes (7): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, warn

### Community 9 - "Community 9"
Cohesion: 0.32
Nodes (6): AchievementsSection(), getImageUrl(), IconMap, imageMapping, imageModules, Modal()

### Community 10 - "Community 10"
Cohesion: 0.47
Nodes (4): ContactSection(), SOCIALS, Input(), TextArea()

## Knowledge Gaps
- **35 isolated node(s):** `icons`, `icons`, `ThemeContext`, `SOCIALS`, `oxlint` (+30 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Community 4` to `Community 0`, `Community 1`, `Community 5`, `Community 7`, `Community 8`, `Community 9`, `Community 10`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **Why does `plugins` connect `Community 8` to `Community 4`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 2` to `Community 6`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `icons`, `icons`, `ThemeContext` to the rest of the system?**
  _35 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._