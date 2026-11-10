# Asif Al Masud – Personal Developer Portfolio

A modern, high-performance developer portfolio built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**, featuring real-time competitive programming & GitHub statistics, dark/light theme toggle, interactive charts, and an event photo gallery with lightbox.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production build will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🛠️ Configuration Guide

The entire website is centrally configurable:

### 1. Personal Information & Education
Edit [`src/config/personal.ts`](./src/config/personal.ts):
- Name, bio, title, university, graduation year, location, email.
- Education timeline entries (degrees, institutions, GPAs, statuses).
- Profile picture: save your photo to `public/images/profile.jpg`.

### 2. Social Links & Coding Platform Usernames
Edit [`src/config/social.ts`](./src/config/social.ts):
- `platformUsernames.github`: GitHub username (`Asif-1217`)
- `platformUsernames.codeforces`: Codeforces handle (`ASIF_17`)
- `platformUsernames.vjudge`: VJudge username (`Asif1217`)
- Profile URLs for GitHub, Codeforces, VJudge, and LinkedIn.

### 3. Projects Showcase
Edit [`src/config/projects.ts`](./src/config/projects.ts):
- Add your real projects with title, description, tech stack, GitHub repo link, and live demo link.

### 4. Achievements & Contest Event Galleries
Edit [`src/config/achievements.ts`](./src/config/achievements.ts):
- **Spring 2026 Take Off Contest (Featured)**: Mock Round Setter, Contributor, Volunteer. Photos in `public/images/achievements/spring-2026/`.
- **Summer 2026 UNLOCK THE ALGORITHM**: Contest Participant. Photos in `public/images/achievements/summer-2026/`.
- **Fall 2025 Take Off Contest**: Contest Participant. Photos in `public/images/achievements/fall-2025/`.
- **Problem-Solving Milestones**: 500+ Problems Solved and Competitive Programming Journey.

### 5. Technical Skills
Edit [`src/config/skills.ts`](./src/config/skills.ts):
- Add or reorganize skill categories, programming languages, and tools.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar/            # Responsive navbar with section spy & theme toggle
│   ├── Hero/              # Hero with profile picture, typewriter animation & quick stats
│   ├── About/             # Biography, profile card, key highlights
│   ├── Education/         # Academic timeline with credentials & GPA
│   ├── Skills/            # Categorized skills without fake percentages
│   ├── CodingProfiles/    # Unified dashboard (Codeforces & VJudge)
│   │   ├── CodeforcesCard # Live CF API data, rating history graph
│   │   └── VJudgeCard     # Real VJudge statistics, activity & progress
│   ├── Projects/          # Project cards with tech tags and demo links
│   ├── Achievements/      # Featured contest & milestones showcase
│   │   └── PhotoGallery   # Event photo gallery with keyboard-navigable lightbox
│   ├── Contact/           # Validated contact form and direct links
│   ├── Footer/            # Clean footer with site navigation & social links
│   └── UI/                # Reusable UI elements (BackToTop, SVG Icons)
├── config/                # Centralized configuration files
├── services/              # API clients for Codeforces and VJudge
├── hooks/                 # Custom React hooks (useApi, useTheme, useScrollReveal)
└── types/                 # Comprehensive TypeScript type definitions
```

---

## 🌟 Key Features

- **Unified Coding Profiles Dashboard**: Focused competitive programming section containing **Codeforces** and **VJudge** with interactive tabs.
- **Live Codeforces Integration**: Real-time rating, max rating, rank, problems solved count, and interactive contest rating history chart.
- **VJudge Integration**: Real statistics for `Asif1217` including total solved, total submissions, accepted count, solve efficiency rate, solving activity breakdown, and a clean fallback button.
- **Achievement Gallery & Lightbox**: Responsive photo gallery with click-to-expand modal, prev/next arrows, keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`), and automatic hiding of missing images.
- **Modern Dark + Blue Theme**: Premium `#080D1A` dark aesthetic with `#3B82F6` and `#22D3EE` accents, with instant Light Mode toggle.
- **Mobile Responsive**: Fully responsive layout tested for mobile, tablet, and desktop screens.
- **SEO & Social Cards**: Pre-configured Open Graph, Twitter Cards, meta tags, and custom SVG favicon.
