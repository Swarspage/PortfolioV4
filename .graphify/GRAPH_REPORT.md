# Graph Report - .  (2026-10-09)

## Corpus Check
- 41 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 456 nodes · 1551 edges · 15 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `s()` - 56 edges
2. `ic()` - 52 edges
3. `hc()` - 31 edges
4. `ec()` - 29 edges
5. `wd()` - 26 edges
6. `Z()` - 25 edges
7. `xc()` - 23 edges
8. `hu()` - 23 edges
9. `C()` - 22 edges
10. `yl()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `se()` --calls--> `ae()`  [EXTRACTED]
  dist/assets/react-vendor-DfSeidf4.js → dist/assets/react-vendor-DfSeidf4.js  _Bridges community 0 → community 1_
- `le()` --calls--> `O()`  [EXTRACTED]
  dist/assets/react-vendor-DfSeidf4.js → dist/assets/react-vendor-DfSeidf4.js  _Bridges community 0 → community 6_
- `le()` --calls--> `ie()`  [EXTRACTED]
  dist/assets/react-vendor-DfSeidf4.js → dist/assets/react-vendor-DfSeidf4.js  _Bridges community 0 → community 3_
- `t()` --calls--> `i()`  [EXTRACTED]
  dist/assets/react-vendor-DfSeidf4.js → dist/assets/react-vendor-DfSeidf4.js  _Bridges community 1 → community 5_
- `r()` --calls--> `i()`  [EXTRACTED]
  dist/assets/react-vendor-DfSeidf4.js → dist/assets/react-vendor-DfSeidf4.js  _Bridges community 4 → community 5_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (91): $a(), aa(), ac(), Ao(), b(), bc(), be(), bi() (+83 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (68): ad(), ae(), an(), Ar(), as(), Bo(), cr(), de() (+60 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (1): SoundManager

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (48): ap(), Au(), bd(), bu(), cd(), cp(), ct(), Cu() (+40 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (44): ai(), at(), cs(), dd(), di(), Do(), es(), fi() (+36 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (43): Al(), bl(), cl(), dl(), ds(), el(), ep(), Et() (+35 more)

### Community 6 - "Community 6"
Cohesion: 0.23
Nodes (25): af(), cf(), df(), ef(), ff(), gf(), If(), jf() (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.16
Nodes (17): c(), d(), e(), g(), h(), init(), m(), n() (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.53
Nodes (4): e(), gi(), i(), o()

### Community 9 - "Community 9"
Cohesion: 0.67
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 1
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 1
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 1
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 1
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 1
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 10`** (2 nodes): `DarkBadge.jsx`, `DarkBadge()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (2 nodes): `vite.config.js`, `manualChunks()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (1 nodes): `rolldown-runtime-CbXtAM7H.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (1 nodes): `index.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `js()` connect `Community 1` to `Community 7`, `Community 5`, `Community 4`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `s()` connect `Community 0` to `Community 1`, `Community 5`, `Community 4`, `Community 3`, `Community 6`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `ic()` connect `Community 0` to `Community 1`, `Community 4`, `Community 5`, `Community 6`, `Community 3`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._