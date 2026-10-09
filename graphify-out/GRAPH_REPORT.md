# Graph Report - Portfolio V4  (2026-09-22)

## Corpus Check
- 58 files · ~267,523 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 216 nodes · 355 edges · 22 communities (16 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1c16c2ad`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- App.jsx
- devDependencies
- dependencies
- index.js
- What You Must Do When Invoked
- graphify reference: extra exports and benchmark
- SoundManager
- .oxlintrc.json
- graphify reference: query, path, explain
- ContactSection.jsx
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- rules/graphify.md
- extraction-spec.md
- workflows/graphify.md
- HeroSection.jsx
- AchievementsSection.jsx

## God Nodes (most connected - your core abstractions)
1. `react` - 33 edges
2. `Card()` - 12 edges
3. `What You Must Do When Invoked` - 12 edges
4. `Badge()` - 10 edges
5. `/graphify` - 10 edges
6. `SoundManager` - 8 edges
7. `Button()` - 8 edges
8. `graphify reference: extra exports and benchmark` - 8 edges
9. `scripts` - 5 edges
10. `graphify reference: query, path, explain` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/layout/Navbar.jsx → src/context/ThemeContext.jsx

## Import Cycles
- None detected.

## Communities (22 total, 6 thin omitted)

### Community 0 - "react"
Cohesion: 0.24
Nodes (13): react, SketchCircle(), SketchStar(), TapeStrip(), Thumbtack(), getImageUrl(), icons, ProjectsSection() (+5 more)

### Community 1 - "App.jsx"
Cohesion: 0.10
Nodes (15): App(), PostItTag(), SquigglyUnderline(), Footer(), navLinks, socials, Navbar(), AboutSection() (+7 more)

### Community 2 - "devDependencies"
Cohesion: 0.12
Nodes (17): oxlint, devDependencies, oxlint, sharp, tailwindcss, @tailwindcss/vite, @types/react, @types/react-dom (+9 more)

### Community 3 - "dependencies"
Cohesion: 0.08
Nodes (24): axios, @emailjs/browser, gsap, lucide-react, dependencies, axios, @emailjs/browser, gsap (+16 more)

### Community 4 - "index.js"
Cohesion: 0.32
Nodes (6): DarkBadge(), DarkButton(), DarkCard(), DarkInput(), DarkTextArea(), DarkModal()

### Community 5 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 6 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 8 - ".oxlintrc.json"
Cohesion: 0.25
Nodes (7): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, warn

### Community 9 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 10 - "ContactSection.jsx"
Cohesion: 0.47
Nodes (4): ContactSection(), SOCIALS, Input(), TextArea()

### Community 12 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 13 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 14 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 20 - "HeroSection.jsx"
Cohesion: 0.22
Nodes (8): DashedArrow(), HeroSection(), Button(), DraggableStickers(), initialStickers, MiniCodeSandbox(), ResumeModal(), Typewriter()

### Community 21 - "AchievementsSection.jsx"
Cohesion: 0.31
Nodes (7): AchievementsSection(), getImageUrl(), IconMap, imageMapping, imageModules, ImageWithSkeleton(), Modal()

## Knowledge Gaps
- **80 isolated node(s):** `navLinks`, `socials`, `imageModules`, `imageMapping`, `IconMap` (+75 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `App.jsx`, `index.js`, `SoundManager`, `.oxlintrc.json`, `ContactSection.jsx`, `HeroSection.jsx`, `AchievementsSection.jsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `plugins` connect `.oxlintrc.json` to `react`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `SoundManager` connect `SoundManager` to `react`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `navLinks`, `socials`, `imageModules` to the rest of the system?**
  _80 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10461538461538461 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._