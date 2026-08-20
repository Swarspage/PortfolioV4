# Graph Report - Portfolio V4  (2026-08-21)

## Corpus Check
- 56 files · ~259,410 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 206 nodes · 342 edges · 20 communities (14 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b3b18ed7`
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

## God Nodes (most connected - your core abstractions)
1. `react` - 31 edges
2. `What You Must Do When Invoked` - 12 edges
3. `Card()` - 12 edges
4. `/graphify` - 10 edges
5. `Badge()` - 10 edges
6. `graphify reference: extra exports and benchmark` - 8 edges
7. `SoundManager` - 8 edges
8. `Button()` - 8 edges
9. `graphify reference: query, path, explain` - 5 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/layout/Navbar.jsx → src/context/ThemeContext.jsx

## Import Cycles
- None detected.

## Communities (20 total, 6 thin omitted)

### Community 0 - "react"
Cohesion: 0.14
Nodes (22): react, DashedArrow(), SketchCircle(), SketchStar(), TapeStrip(), Thumbtack(), AboutSection(), AchievementsSection() (+14 more)

### Community 1 - "App.jsx"
Cohesion: 0.13
Nodes (17): App(), PostItTag(), SquigglyUnderline(), Navbar(), EducationSection(), ExperienceSection(), HeroSection(), getImageUrl() (+9 more)

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

## Knowledge Gaps
- **78 isolated node(s):** `graphify`, `Usage`, `What graphify is for`, `Step 0 - GitHub repos and multi-path merge (only if a URL or several paths)`, `Step 1 - Ensure graphify is installed` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `App.jsx`, `index.js`, `SoundManager`, `.oxlintrc.json`, `ContactSection.jsx`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `plugins` connect `.oxlintrc.json` to `react`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `dependencies`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **What connects `graphify`, `Usage`, `What graphify is for` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.14358974358974358 - nodes in this community are weakly interconnected._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12648221343873517 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._