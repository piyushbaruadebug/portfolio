# 🎬 Piyush Barua — Cinematic Interactive Short-Film Portfolio

A next-generation, high-performance **cinematic interactive portfolio** engineered as an interactive short film. Powered by **React 19, TypeScript, Three.js WebGL shaders, GSAP ScrollTrigger timelines, Lenis smooth scrolling, and tailored audio design**.

---

## 🌐 Live Experience & Local Server
- **Dev Server**: `http://localhost:3000/`
- **Production Build**: `npm run build` & `npm run preview`

---

## 🎥 The 7 Cinematic Film Scenes

1. **SCENE 01 // ABOUT (`THE DEVELOPER.`)**
   - Spatial multi-layer camera rig with foreground portrait parallax
   - Minimal film dossier with role, affiliation (`Student of GNIT`), and specializations
   - Film noir camera HUD telemetry, real-time timecodes, and aperture/lens metadata

2. **SCENE 02 // ACADEMIC FOUNDATIONS (`EDUCATION & QUALIFICATION`)**
   - 4-tier cinematic header with interactive milestone filters
   - Comprehensive academic credentials (B.Sc. Cybersecurity @ GNIT, ISC @ Little Star, ICSE @ Little Star)
   - 3D parallax hover tilt, corner framing, and curriculum highlights

3. **SCENE 03 // TOOL KITS (`THE CREATIVE UNIVERSE`)**
   - Interactive skill constellation & domain filters (`ALL DOMAINS`, `CORE`, `SECURITY`, `AI`)
   - 7 curated technical categories across AI/ML, Frontend, Backend, Data, DevOps, Database, and Automation

4. **SCENE 04 // TEMPORAL MATRIX (`JOURNEY THROUGH TIME`)**
   - Interactive 360° radial time dial (2021 &rarr; 2026)
   - Mouse & touch time-warp navigation tracking chronological milestones from Class 10 to advanced cyber systems

5. **SCENE 05 // CREDENTIALS & ACCREDITATIONS (`CERTIFIED EXPERTISE`)**
   - 3D curved holographic arc gallery
   - Verified professional accreditations (Anthropic AI, Deloitte Cyber, Tata Cybersecurity, Thiranex)

6. **SCENE 06 // ARTIFACT SHOWCASE (`PROJECT UNIVERSE`)**
   - Spatial 3D hover tilt compositions
   - Highlights: **CyperFlow** (Fintech Analytics), **Password Entropy Engine**, and security research tools

7. **SCENE 07 // THE CLOSING CUT (`FINAL TRANSMISSION`)**
   - Direct transmission terminal with Gmail web dispatch and copy email
   - Connect channels: WhatsApp, LinkedIn, and Instagram
   - Curtain call philosophical credits

---

## 📂 Project Architecture

```
portfolio/
├── public/                 # Static assets & media
│   ├── certificates/       # Active verified certificates (.jpg)
│   ├── fonts/              # Custom cinematic typography (.woff2)
│   ├── hero.jpg            # Hero portrait texture
│   ├── logo.svg            # PB vector monogram
│   └── the-kill-2.mp3      # Cinematic background audio
├── src/
│   ├── components/         # HUD, smooth scroll, music player, modals
│   ├── gl/                 # Three.js WebGL volumetric particle canvas
│   ├── scenes/             # 7 independent cinematic scenes
│   │   ├── Hero/           # Scene 01: Cold Open & About
│   │   ├── Education/      # Scene 02: Academic Foundations
│   │   ├── CreativeUniverse/# Scene 03: Technical Toolkits
│   │   ├── TimeJourney/    # Scene 04: 360° Chrono Matrix
│   │   ├── Certificates/   # Scene 05: 3D Holographic Gallery
│   │   ├── ProjectUniverse/# Scene 06: Artifact Showcase
│   │   └── Finale/         # Scene 07: Closing Transmission
│   ├── styles/             # Modular styling & cinematic animations
│   ├── types/              # TypeScript interface definitions
│   ├── App.tsx             # Root orchestrator & scene observer
│   └── main.tsx            # React application entry point
├── package.json            # Project dependencies & scripts
├── tailwind.config.js      # Tailwind styling configuration
├── tsconfig.json           # TypeScript compiler configuration
└── vite.config.ts          # Vite build & dev server configuration
```

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite
- **3D & Shaders**: Three.js, Custom WebGL volumetric particles & cosmic grids
- **Animation Choreography**: GSAP 3 + ScrollTrigger
- **Smooth Camera Scrolling**: Lenis Smooth Scroll
- **Audio & Sound**: Web Audio API with visualizer equalizer waveforms
- **Typography**: Anton, Syne, Oswald, JetBrains Mono, Onest

---

© 2026 Piyush Barua. All rights reserved.
