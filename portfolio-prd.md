# Product Requirements Document
## Personal Software Developer Portfolio & Blog
**Document Version:** 1.0  
**Status:** Definitive Blueprint  
**Roles:** Senior TPM · Lead Frontend Architect · Expert UX Designer

---

## Table of Contents

1. [Project Overview & Philosophy](#1-project-overview--philosophy)
2. [Architecture & Tech Stack](#2-architecture--tech-stack)
3. [UX/UI & Visual Design System](#3-uxui--visual-design-system)
4. [Responsive Design Strategy](#4-responsive-design-strategy)
5. [Site Architecture & Section Breakdown](#5-site-architecture--section-breakdown)
6. [Blog CMS & Content Strategy](#6-blog-cms--content-strategy)
7. [Performance Engineering](#7-performance-engineering)
8. [Security Architecture](#8-security-architecture)
9. [Accessibility (a11y)](#9-accessibility-a11y)
10. [SEO Strategy](#10-seo-strategy)
11. [Development Workflow](#11-development-workflow)
12. [Analytics & Observability](#12-analytics--observability)
13. [Deployment & Infrastructure](#13-deployment--infrastructure)
14. [Definition of Done Checklist](#14-definition-of-done-checklist)

---

## 1. Project Overview & Philosophy

### 1.1 Purpose Statement

This portfolio is not a resume with a domain name. It is a **living proof-of-work artifact** — the first and most important project a recruiter or engineering manager will evaluate you on. Every architectural decision, animation curve, and line of copy must communicate engineering taste, attention to detail, and product thinking simultaneously.

### 1.2 Target Audience Profiles

**Primary: Technical Recruiters**
- Time on site: 30–90 seconds on first pass
- Decision mode: Pattern-matching (keywords, logos, project quality)
- Pain point: Every portfolio looks identical — they are exhausted by hero sections with `Hello, I'm a [Full Stack Developer]`
- What they need to see *instantly*: Your specialization, your current level (junior/mid/senior/staff), and at least one impressive project

**Secondary: Engineering Managers & CTOs**
- Time on site: 2–5 minutes if interested
- Decision mode: Deep evaluation (project depth, code quality signals, blog writing quality)
- What they need to see: Evidence of systems thinking, communication ability, and technical depth beyond the surface

**Tertiary: Peers & The Developer Community**
- Arrive via blog posts, Twitter/X links, GitHub
- Decision mode: Do they write something worth bookmarking?

### 1.3 The "Personality Principle"

> A portfolio that tries to appeal to everyone appeals to no one.

Choose **one** distinct personality archetype and commit to it fully in design language, copy voice, and interaction design. Examples:

| Archetype | Design Signal | Copy Voice |
|---|---|---|
| **The Craftsperson** | Refined minimalism, texture, warm neutrals | Precise, deliberate, never hyperbolic |
| **The Systems Thinker** | Data-dense, structured, monospace accents | Technical, confident, architecture-first |
| **The Creative Engineer** | Bold color, editorial layouts, unexpected type | Playful but sharp, anti-corporate |
| **The Deep-Focus Specialist** | Nearly austere, high prose quality | Long-form, essayistic, expert-voiced |

> **Requirement:** Pick your archetype *before* writing a single line of code. Every subsequent decision flows from this choice.

---

## 2. Architecture & Tech Stack

### 2.1 Core Framework

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | React 18+ | Component model, ecosystem depth, recruiter familiarity |
| **Build Tool** | Vite 5+ | Sub-100ms HMR, native ESM, superior DX over CRA/Next for SPAs |
| **Language** | TypeScript 5+ (strict mode) | Non-negotiable signal of code quality |
| **Package Manager** | pnpm | Disk-efficient, strict hoisting prevents phantom dependency bugs |

**Vite config must include:**
```
// vite.config.ts — non-negotiables
- react() plugin with Babel for emotion/styled support if needed
- vite-plugin-checker (TypeScript + ESLint in parallel)
- vite-plugin-pwa for service worker / offline shell
- rollupOptions.output.manualChunks for vendor splitting
- build.sourcemap: true for production debugging
```

### 2.2 Routing

**Library:** `React Router v6.x` (Data Router pattern)

**Why not TanStack Router?** It is excellent but adds conceptual overhead for a portfolio. React Router v6's loader/action pattern is sufficient and more recognizable in code reviews.

**Route Structure:**
```
/                     → Home (SPA shell entry)
/projects             → Projects index
/projects/:slug       → Individual project case study
/blog                 → Blog index (paginated)
/blog/:slug           → Individual post
/uses                 → Tools & setup page (optional but high-value)
/about                → Extended about (optional)
404                   → Custom not-found with personality
```

**Implementation Notes:**
- Use `createBrowserRouter` with `RouterProvider` (not `<BrowserRouter>`)
- Implement route-level code splitting with `React.lazy()` and `<Suspense>`
- Use route loaders for blog post metadata prefetching
- Add `<ScrollRestoration />` component for correct scroll behavior

### 2.3 State Management

**Keep this ruthlessly simple.** A portfolio is not a SaaS app.

| Need | Solution |
|---|---|
| Global UI state (theme, nav open) | `Zustand` — minimal boilerplate, no Provider hell |
| Server/async state (blog posts, project data) | `TanStack Query v5` — caching, loading states, error boundaries |
| Form state (contact form) | `React Hook Form v7` — zero re-renders, excellent validation |
| URL state (blog filters, search) | `nuqs` — type-safe URL search params |

> **Do NOT use Redux.** It signals poor problem-fit judgment to engineering managers reviewing your code.

### 2.4 Styling Architecture

**Primary:** CSS Modules + CSS Custom Properties (Design Tokens)

**Why not Tailwind?** Tailwind is fine but it produces portfolios that look like Tailwind portfolios. CSS Modules with a custom design token system signals deeper CSS knowledge and produces more distinctive results.

**Supplementary:** `vanilla-extract` for truly zero-runtime type-safe CSS if you want extra engineering credibility.

**Design Token Structure:**
```css
/* tokens.css — the single source of truth */
:root {
  /* Primitives */
  --color-ink-900: #0f0f0f;
  --color-ink-500: #6b6b6b;
  --color-paper-100: #fafaf8;
  --color-accent-primary: /* your chosen accent */;
  
  /* Semantic Tokens */
  --color-text-primary: var(--color-ink-900);
  --color-background: var(--color-paper-100);
  
  /* Typography Scale (fluid, clamp-based) */
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
  --font-mono: 'Your Mono Font', monospace;
  
  --text-xs:   clamp(0.75rem,  0.7rem + 0.25vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem,     0.9rem + 0.5vw,   1.125rem);
  --text-lg:   clamp(1.125rem, 1rem + 0.625vw,   1.375rem);
  --text-xl:   clamp(1.375rem, 1.2rem + 0.875vw, 1.875rem);
  --text-2xl:  clamp(1.75rem,  1.5rem + 1.25vw,  2.5rem);
  --text-3xl:  clamp(2.25rem,  1.8rem + 2.25vw,  3.5rem);
  --text-hero: clamp(3rem,     2rem + 5vw,        7rem);
  
  /* Spacing (8pt grid) */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-24: 6rem;    /* 96px */
  --space-32: 8rem;    /* 128px */
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 600ms;
  --duration-entrance: 900ms;
}

[data-theme="dark"] {
  --color-text-primary: var(--color-paper-100);
  --color-background: var(--color-ink-900);
  /* override all semantic tokens here */
}
```

### 2.5 Animation Stack

**Primary Layer: Framer Motion v11**

Use for: Component entrance animations, page transitions, layout animations, gesture-driven interactions (drag, hover), scroll-driven reveals.

```
Key Framer Motion APIs to master:
- <motion.div> with variants for orchestrated sequences
- AnimatePresence for route transition exit animations
- useScroll + useTransform for parallax / scroll effects
- useInView for triggering entrance animations
- LayoutGroup for shared element transitions between routes
- motion.create() for custom motion components
```

**Secondary Layer: GSAP (with ScrollTrigger)**

Use *only* for: Complex canvas/SVG animations on the hero, scroll-driven timeline animations that require precise scrubbing, text-reveal character animations.

> **Rule:** Do not use GSAP and Framer Motion for the same element. Pick the right tool per use case. GSAP excels at timeline scrubbing and SVG morphing. Framer Motion excels at React state-driven UI animation.

**Tertiary: CSS Animations**

Use for: All micro-interactions that don't require JS (hover states, button presses, loading spinners, skeleton screens). CSS is always faster than JS for these.

**Performance Contract:**
- All animations must respect `prefers-reduced-motion`
- No animation should block interactivity (use `will-change` sparingly and correctly)
- Avoid animating `width`, `height`, `top`, `left` — animate `transform` and `opacity` only

### 2.6 Additional Libraries

| Library | Version | Purpose |
|---|---|---|
| `@radix-ui/react-*` | latest | Accessible headless UI primitives (Dialog, Tooltip, etc.) |
| `react-helmet-async` | latest | Dynamic `<head>` management per page |
| `date-fns` | v3+ | Lightweight date formatting for blog posts |
| `zod` | v3+ | Runtime schema validation for MDX frontmatter |
| `shiki` | latest | Server-side syntax highlighting for blog code blocks |
| `@vercel/og` | latest | Dynamic OG image generation |
| `fuse.js` | latest | Client-side fuzzy search for blog |
| `react-intersection-observer` | latest | Scroll-triggered animation triggers |

---

## 3. UX/UI & Visual Design System

### 3.1 Recruiter-Optimized Visual Hierarchy

**The F-Pattern is Dead. Use the Z/Gutenberg Pattern on Hero.**

Technical recruiters scan in a Z-pattern on hero sections:
1. **Top-left** → Your name/logo (anchor identity)
2. **Top-right** → CTA or availability badge (action/status)
3. **Center diagonal** → Your tagline (the hook)
4. **Bottom-right** → Primary CTA button (conversion)

Below the fold, switch to **single-column vertical scanning** — the eye follows a center-weighted spine down the page.

**The 3-Second Test:** A recruiter must be able to answer these three questions within 3 seconds of landing:
1. Who are you? (Name + role)
2. What do you specialize in? (Not "full stack developer" — something specific)
3. Are you available? (Availability badge)

If they cannot, the layout has failed, regardless of visual quality.

### 3.2 Typography System

**The Font Pairing Principle:** Use maximum 3 typefaces. One display, one body, one mono. They must create contrast, not compete.

**Recommended Pairing Examples (choose one direction):**

```
Direction A — Editorial Precision:
  Display: "Instrument Serif" or "Cormorant" (thin, elegant, editorial)  
  Body: "Geist" or "Neue Haas Grotesk" (clean Swiss grotesque)
  Mono: "Geist Mono" or "Berkeley Mono" (premium, distinctive)

Direction B — Technical Authority:
  Display: "Space Grotesk" (structured, geometric)
  Body: "Söhne" or "Neue Montreal" (readable, neutral)
  Mono: "Fira Code" with ligatures

Direction C — Warm Craft:
  Display: "Fraunces" (optical size variable, unique)
  Body: "Source Serif 4" (reading-optimized)
  Mono: "Commit Mono" or "iA Writer Mono"
```

> Load fonts via `@fontsource` packages (npm) to avoid CORS issues and enable subsetting. Never use Google Fonts CDN in production — it's a privacy liability and a render-blocking resource.

**Typographic Scale Rules:**
- Use fluid typography (`clamp()`) — never fixed pixel sizes
- Minimum body text: `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`
- Line height for body: `1.7` — never less than `1.6` for reading comfort
- Heading line height: `1.1–1.2` — tighter is more editorial
- Maximum line length (measure): `65ch` for body text, `45ch` for narrow columns
- Letter-spacing: `-0.02em` to `-0.04em` on large headings (optical correction)

### 3.3 Color Philosophy

**Choose a dominant neutral base + one hero accent + one functional accent.**

```
Structure:
  - Background: Near-white or near-black (not pure — optically softer)
  - Surface: Slightly lighter/darker than background (4-8% shift)
  - Border: Subtle (8-12% opacity of ink color)
  - Text Primary: High contrast (min 7:1 for AAA)
  - Text Secondary: Medium contrast (min 4.5:1 for AA)
  - Accent Primary: Your personality color (used sparingly — max 10% of visual surface)
  - Accent Functional: For links, code, tags (can be accent primary variant)
```

**Dark Mode:** Build it from day one. Use CSS custom properties. Toggle via `data-theme` attribute on `<html>`. Persist preference in `localStorage` and respect `prefers-color-scheme` media query on first visit.

### 3.4 Spacing & Layout Grid

**Grid System:** 12-column CSS Grid with named template areas.

```css
.page-grid {
  display: grid;
  grid-template-columns: 
    [full-start] minmax(var(--space-4), 1fr)
    [content-start] min(100% - var(--space-8), 1280px)
    [content-end] minmax(var(--space-4), 1fr)
    [full-end];
}

/* Usage */
.section { grid-column: content; }
.full-bleed { grid-column: full; }
.narrow { grid-column: content; max-width: 720px; margin-inline: auto; }
```

**Vertical Rhythm:** Use a baseline grid of `8px`. All spacing values must be multiples of `4px` minimum, `8px` preferred. Section padding: `clamp(4rem, 8vw, 10rem)`.

### 3.5 Interaction Design Principles

**The Premium Feel Equation:**
> Premium = Fast Response + Intentional Delay + Satisfying Resolution

Every interactive element needs all three:
1. **Fast Response** (<100ms visual acknowledgment): Hover state, cursor change, color shift
2. **Intentional Delay** (if applicable): A button press that completes in `150ms` feels instant; one that completes in `300ms` with a satisfying easing feels *premium*
3. **Satisfying Resolution**: The end state must feel "landed" — use `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) for entrance, never linear

**Micro-interaction Catalogue (Required):**

| Element | Interaction | Implementation |
|---|---|---|
| Nav links | Underline slides in from left | CSS `scaleX` transform on `::after` pseudo |
| Buttons (primary) | Subtle lift + shadow intensification | `transform: translateY(-2px)` + box-shadow |
| Project cards | Tilt with mouse parallax + image zoom | Framer Motion `useMotionValue` + `useSpring` |
| Blog cards | Reveal metadata on hover | CSS opacity + translateY |
| Availability badge | Breathing pulse on the green dot | CSS `@keyframes` scale pulse |
| Theme toggle | Icon morphs between sun/moon | Framer Motion `layoutId` shared element |
| Code blocks | Line highlight on hover | CSS background-color transition |
| Scroll progress | Thin accent-colored bar at top | Framer Motion `useScroll` + `scaleX` |

---

## 4. Responsive Design Strategy

### 4.1 Breakpoint System

Use **content-first, not device-first** breakpoints. Add a breakpoint when the *content* breaks, not when a device spec changes.

```css
/* Breakpoint tokens — use with @container where possible */
--bp-sm:  480px;   /* Large phones */
--bp-md:  768px;   /* Tablets */
--bp-lg:  1024px;  /* Small laptops */
--bp-xl:  1280px;  /* Desktops */
--bp-2xl: 1536px;  /* Large monitors */
--bp-3xl: 1920px;  /* Ultrawide */
```

### 4.2 Mobile Strategy (320px–767px)

- **Single column**, edge-to-edge content
- Nav collapses to hamburger → full-screen overlay (animated with Framer Motion `AnimatePresence`)
- Hero: Name + tagline only. CTA button prominent. Project previews hidden or stacked vertically
- Typography scales down via `clamp()` — no additional mobile overrides needed if fluid type is set correctly
- Touch targets: minimum `44×44px` (Apple HIG) for all interactive elements
- Remove parallax and mouse-tracking effects entirely on touch devices (detect via `pointer: coarse` media query)
- Project cards: Full-width, 16:9 image ratio, minimal info
- Bottom navigation bar (optional but high-conversion): Fixed bar with 3 core actions

### 4.3 Tablet Strategy (768px–1023px)

- 2-column grid for project cards
- Sidebar layout for blog index (filters left, posts right)
- Navigation: Still hamburger or a condensed horizontal nav (decide based on your archetype)
- Hover effects begin here but use `@media (hover: hover)` guard

### 4.4 Desktop Strategy (1024px–1535px)

- Full layout: Multi-column project grid, expanded navigation
- All micro-interactions active
- Blog: 2-column or sidebar layout
- Max content width: `1280px` centered

### 4.5 Ultrawide Strategy (1536px+)

**This is the most commonly ignored breakpoint and it is where premium portfolios separate themselves.**

```css
@media (min-width: 1536px) {
  /* Increase max-width OR use wider grid */
  .page-grid {
    grid-template-columns: 
      [full-start] 1fr
      [content-start] 1440px
      [content-end] 1fr
      [full-end];
  }
  
  /* Use the freed whitespace intentionally */
  /* Option A: Pull decorative elements into the margin */
  /* Option B: Increase section padding */
  /* Option C: Enable a wider, magazine-style layout for blog posts */
}
```

> **Never let content stretch to full-width on ultrawide.** Cap it. Use the margins for decorative elements, sidenotes, or simply generous breathing room.

### 4.6 Container Queries

Use CSS Container Queries for component-level responsiveness. This makes your project cards and blog cards truly portable:

```css
.card-grid { container-type: inline-size; container-name: card-grid; }

@container card-grid (min-width: 600px) {
  .project-card { flex-direction: row; }
}
```

---

## 5. Site Architecture & Section Breakdown

### 5.1 Navigation

**Behavior:**
- Transparent on scroll-top, transitions to frosted-glass/solid on scroll-down
- Hides on scroll-down, re-appears on scroll-up (the "smart nav" pattern — reduces visual noise)
- Active state for current route
- Keyboard navigable, ARIA landmarks applied

**Items (minimal):**
```
[Logo/Name]   [Work]  [Blog]  [About]  [Résumé ↗]  [Contact or Availability Badge]
```

**The Résumé Link:** Open in new tab. Use an `↗` icon. Track clicks as a conversion event.

---

### 5.2 Hero Section

**Goal:** Make a technically-opinionated first impression in 3 seconds.

**Layout Anatomy:**

```
┌─────────────────────────────────────────────────┐
│  [Availability Pill — top right or top left]    │
│                                                 │
│  [Eyebrow: e.g., "Software Engineer • Open to  │
│   Roles"]                                       │
│                                                 │
│  [HEADLINE — Large display type]                │
│                                                 │
│  [Subhead — 2 lines max, clarifies specialty]   │
│                                                 │
│  [CTA Button: "See my work" / "View Projects"]  │
│  [Secondary: "Read the blog" / "Get in touch"]  │
│                                                 │
│  [Scroll indicator / animated arrow]            │
└─────────────────────────────────────────────────┘
```

**Guide Text — Headline:**
- DO NOT write: `"Hi, I'm [Name], a Full Stack Developer"`
- The headline should answer **what problem you solve** or **what you build**, not what your job title is
- Framework: `"I build [specific thing] for [context/outcome]"` or a bold declarative statement about your craft
- Tone should match your chosen archetype
- Length: 3–7 words for display impact (longer statements lose scanning speed)

**Guide Text — Subhead:**
- Clarify: Your technology focus (be specific — not "React and Node" but the *context* in which you use them)
- Clarify: Your seniority signal without using the word "senior"
- Clarify: What kind of problems you find energizing (this is a differentiator — most subheads skip this)
- Length: 1–2 sentences. Maximum `180` characters.

**Guide Text — Availability Badge:**
- If open to work: `● Available for new roles` or `● Open to opportunities — [Month Year]`
- If employed: `● Currently at [Company]` (with company logo if possible)
- This badge is the single highest-value conversion signal on the page — do not skip it

**Animation Strategy:**
- Staggered entrance: Eyebrow → Headline → Subhead → CTAs (each with `100ms` delay)
- Headline: Character-by-character reveal OR word-by-word slide-up (use GSAP SplitText or a custom solution)
- Background: A subtle, slow-moving texture, gradient mesh, or noise canvas — never static white/black
- No autoplay video — it destroys performance and accessibility

---

### 5.3 Skills / Tech Stack Strip

**What it is:** A compact horizontal strip (not a section) that appears just below the hero or after the intro statement. It communicates your technical breadth at a glance.

**Layout:** Horizontal scroll of technology logos with text labels on desktop. Vertically stacked categories on mobile.

**Guide Text:** Do not just list technologies. Organize by category:
```
Core: [React, TypeScript, Node.js, ...]
Cloud: [AWS, GCP, ...]
Tools: [Docker, Postgres, Redis, ...]
Currently Learning: [Rust, Zig, ...]  ← This last category is a powerful signal of growth mindset
```

**Animation:** Infinite auto-scroll marquee for logos (CSS animation, not JS). Pause on hover.

---

### 5.4 Featured Work / Projects Section

**This is the highest-stakes section of the portfolio.** Most portfolios list projects with screenshots and a GitHub link. Yours must demonstrate *engineering judgment* in *how* you present your work.

**Number of featured projects:** 3 (quality over quantity, ruthlessly). Additional projects live on `/projects`.

**Project Card Requirements:**

Each project card must answer the recruiter's implicit questions:
1. What does this *do*? (One sentence)
2. What problem did it *solve*? (Context)
3. What tech is *powering* it? (Badge list)
4. What's the *scale*? (Users, requests, data volume — even if small, include it)
5. Where can I *see* it? (Live link + GitHub link)

**Card Anatomy:**

```
┌──────────────────────────────────┐
│  [Project Image/Video Preview]   │
│  [Hover: subtle zoom + overlay]  │
├──────────────────────────────────┤
│  [Tag: e.g., "SaaS • 2024"]      │
│  [Project Title]                 │
│  [One-line description]          │
│  [Tech badges: React TypeScript] │
│  [→ Case Study]  [GitHub ↗]      │
└──────────────────────────────────┘
```

**Guide Text for Each Project:**
- **Project Title:** Real name, not a description
- **One-liner:** Lead with the outcome, not the technology. `"A real-time collaboration tool for distributed design teams"` > `"A React app with WebSockets"`
- **Tech Badges:** Maximum 5. The most distinctive ones, not an exhaustive list.

**Project Case Study Page (`/projects/:slug`):**

This is where engineering managers are converted. The case study must follow this narrative arc:

```
1. The Problem — What was broken or missing? Who was affected?
2. The Constraints — Time, team size, technical limitations
3. The Decision — What approach did you choose and WHY (the critical part)
4. The Architecture — Diagram or visual of the system
5. The Build — Key technical challenges and how you solved them
6. The Outcome — Metrics, impact, what you'd do differently
7. Code Snippet — One well-chosen, annotated excerpt that shows taste
```

---

### 5.5 About / Who I Am Section

**Common Mistake:** Writing a professional biography in third person or reciting your resume. Recruiters are reading because they want to know *who they'd be hiring*, not what your resume says.

**Guide Text — Opening:**
- Begin with your **origin story** in engineering: the first thing you built, the moment you knew this was your path. Be specific, be human. 1–2 sentences.

**Guide Text — The Middle:**
- What kind of engineer are you in a team setting? Do you lean toward architecture? Mentorship? Rapid prototyping? Shipping?
- What are you unreasonably interested in within your field? (This is a trust signal — it shows you have genuine curiosity, not just employment motivation)

**Guide Text — The Close:**
- Where you are now, what you're looking for, and a non-cringe human note (what you do outside of engineering — 1 sentence, specific)

**Photo:** Required. A real, high-quality photo (not a headshot on a plain background — choose something that has personality and matches your archetype). Recruiter trust increases measurably with a photo.

---

### 5.6 Blog Section (Homepage Preview)

**On the homepage:** A `3-card` or `2-card + list` preview of recent posts. Links to `/blog`.

**Each preview card must show:**
- Title (compelling, not "Introduction to X")
- Category/Tag
- Read time estimate (`X min read`)
- Publication date (relative: "3 days ago")
- One-sentence description or subtitle

**Guide Text — Blog Positioning:**
Your blog has one job: prove you can think clearly and communicate technical concepts to multiple audiences. A recruiter reads the first paragraph. An engineering manager reads the whole post. Your blog SEO brings in organic technical readers.

---

### 5.7 Blog Index (`/blog`)

**Layout:**
- Desktop: 3-column grid (or large featured post + 2-column below)
- Mobile: Single column cards
- Filter by category (via URL params: `/blog?tag=react`)
- Client-side fuzzy search (Fuse.js — no backend required)
- Pagination: Load more button preferred over numbered pages (reduces layout shift)

**Blog Post Anatomy (Individual post `/blog/:slug`):**
```
- Progress bar (top of viewport — Framer Motion scaleX)
- Breadcrumb: Home > Blog > [Post Title]
- Title (H1 — the only H1 on the page)
- Metadata row: Author photo, date, reading time, category tags
- Table of contents (sticky on desktop, collapsible on mobile)
- Article body (MDX rendered)
- Code blocks (Shiki-highlighted, copy button, line numbers)
- Callout components (info, warning, tip, danger — custom MDX components)
- Image captions with lazy loading
- Related posts (3 recommendations)
- Author card (brief bio + social links)
- Comments (optional: use Giscus — GitHub Discussions based, zero-backend)
```

---

### 5.8 Uses Page (`/uses`)

**High-value, low-effort.** A curated list of your hardware, software, tools, and services. This page:
- Ranks well for `"[Your Name] uses"` searches
- Gives the developer community a relatable touchpoint
- Demonstrates your opinions and taste

**Sections:** Workstation, Editor & Terminal, macOS Apps, CLI Tools, Services/APIs, Learning Resources.

---

### 5.9 Contact / CTA Section

**The final section.** Most portfolios have a minimal contact section. Yours should close with momentum.

**Layout:**
```
┌────────────────────────────────────────┐
│  [Large display text: "Let's Build     │
│   Something Together" or equivalent]   │
│                                        │
│  [Guide text subhead — see below]      │
│                                        │
│  [Email button: large, prominent]      │
│  [Social links: GitHub, LinkedIn,      │
│   Twitter/X, RSS feed for blog]        │
│                                        │
│  [Optional: Response time note         │
│   "I typically reply within 48h"]      │
└────────────────────────────────────────┘
```

**Guide Text — CTA Headline:**
- Don't write `"Get In Touch"` — it's passive and weak
- Write something that creates energy and matches your archetype
- It should invite a *specific kind of conversation*, not a general contact

**Guide Text — Subhead:**
- What are you interested in being contacted about? (roles, freelance projects, speaking, collaboration?) — being specific increases response quality dramatically

**Contact Form vs. Email Link:**
- If using a form: React Hook Form + Zod + a serverless function (Vercel/Cloudflare Worker) → forward to your email
- Never expose your email directly in HTML — use `mailto:` only as a fallback or obfuscate it

---

### 5.10 Footer

**Minimal. Not an afterthought.**
```
[Logo/Name]   [© 2025 Your Name]   [Made with ↗ links]   [RSS ↗]   [Back to top ↑]
```
- Back-to-top: smooth scroll, animated
- Include a "built with" note linking to your GitHub repo for the portfolio itself — this is a subtle flex

---

## 6. Blog CMS & Content Strategy

### 6.1 Content Architecture: MDX

**Use MDX (Markdown + JSX).** This is the industry standard for developer blogs for three reasons:
1. Files live in your Git repo — version controlled, portable, no vendor lock-in
2. You can embed interactive React components directly in posts
3. Static at build time = maximum performance, zero database latency

**File Structure:**
```
content/
├── posts/
│   ├── post-slug/
│   │   ├── index.mdx          ← Article content
│   │   └── images/            ← Post-specific images (co-located)
│   └── another-post/
├── projects/
│   └── project-slug.mdx       ← Project case study content
└── pages/
    └── uses.mdx               ← Static page content
```

### 6.2 Frontmatter Schema (Zod-validated)

```typescript
const PostFrontmatter = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(300),  // Used for SEO meta + card preview
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  tags: z.array(z.string()).min(1).max(5),
  category: z.enum(['tutorial', 'opinion', 'case-study', 'tools', 'career']),
  readingTime: z.number().optional(),  // Auto-calculated, can be overridden
  coverImage: z.string().optional(),
  coverImageAlt: z.string().optional(),
  featured: z.boolean().default(false),
  seo: z.object({
    ogImage: z.string().optional(),  // Overrides auto-generated OG image
    noIndex: z.boolean().default(false),
  }).optional(),
});
```

### 6.3 MDX Processing Pipeline

```
.mdx file → Vite Plugin MDX → 
  → remark-gfm (GitHub Flavored Markdown)
  → remark-math → rehype-katex (LaTeX support)
  → rehype-shiki (syntax highlighting)
  → rehype-slug (auto-IDs for headings → TOC)
  → rehype-autolink-headings (anchor links on headings)
  → Custom rehype-reading-time
  → React component
```

**Libraries:**
- `@mdx-js/rollup` — Vite integration
- `remark-gfm` — Tables, strikethrough, task lists
- `rehype-shiki` — Syntax highlighting
- `rehype-slug` + `rehype-autolink-headings` — TOC generation
- `reading-time` — Auto reading time calculation

### 6.4 Custom MDX Components

Build a component library for your blog. These live in `components/mdx/` and are injected via `MDXProvider`:

```
<Callout type="info|warning|tip|danger">
<CodeBlock filename="App.tsx" showLineNumbers highlightLines={[3,4,5]}>
<Figure src="" alt="" caption="">
<Tweet id="">  ← Embed tweets statically (no Twitter JS bundle)
<Comparison before="" after="">  ← For before/after code comparisons
<Aside>  ← Sidenote/aside content
<TableOfContents>
<EmailCapture>  ← Newsletter signup (optional)
```

---

## 7. Performance Engineering

### 7.1 Performance Budget

**Non-negotiable targets:**

| Metric | Target | Critical |
|---|---|---|
| Lighthouse Performance | ≥ 95 | ≥ 90 |
| First Contentful Paint (FCP) | < 1.2s | < 1.8s |
| Largest Contentful Paint (LCP) | < 2.0s | < 2.5s |
| Total Blocking Time (TBT) | < 150ms | < 300ms |
| Cumulative Layout Shift (CLS) | < 0.05 | < 0.1 |
| Interaction to Next Paint (INP) | < 100ms | < 200ms |
| JS Bundle (initial) | < 100KB gzipped | < 150KB |
| Total page weight (home) | < 500KB | < 1MB |

### 7.2 Bundle Optimization

**Code Splitting Strategy:**
```javascript
// vite.config.ts — manual chunk splitting
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        'vendor-animation': ['framer-motion'],
        'vendor-query': ['@tanstack/react-query'],
        // GSAP only loads on pages that need it
      }
    }
  }
}
```

**Route-level lazy loading (all routes except Home):**
```typescript
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Projects = lazy(() => import('./pages/Projects'));
```

**Tree-shaking checklist:**
- Import only what you use from `date-fns` (it's tree-shakable)
- Import Framer Motion hooks individually, not the whole package
- Use `@radix-ui/react-[component]` individually, never `@radix-ui/react`

### 7.3 Image Optimization

**Use `vite-imagetools` for static images:**
```javascript
import heroImage from './hero.jpg?format=webp&quality=85&width=1400';
```

**Use a custom `<OptimizedImage>` component:**
- Automatically generates `srcSet` with multiple sizes
- Adds `loading="lazy"` (with `loading="eager"` override for hero image)
- Adds explicit `width` and `height` to prevent CLS
- Falls back gracefully on browsers without WebP support
- Uses CSS `object-fit: cover` with `aspect-ratio` to prevent layout shift

**Video (project previews):**
- Use `<video autoplay muted loop playsinline>` with `prefers-reduced-motion` check
- Encode in WebM (primary) + MP4 (fallback)
- Maximum 3MB for any autoplay video
- Use `poster` attribute to show first frame while video loads

### 7.4 Font Optimization

```html
<!-- Preload critical fonts in index.html -->
<link rel="preload" href="/fonts/DisplayFont.woff2" as="font" 
      type="font/woff2" crossorigin>

<!-- font-display: swap prevents invisible text during load -->
@font-face {
  font-family: 'DisplayFont';
  src: url('/fonts/DisplayFont.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
  unicode-range: U+0000-00FF; /* Latin subset only */
}
```

**Rules:**
- Subset fonts to only the characters you use
- Use `woff2` only (95%+ browser support)
- Preload only the fonts used above-the-fold
- Limit to 2 font files in critical path (display + body regular weight)
- Load bold weights and mono font on demand

### 7.5 Caching Strategy

```javascript
// Service Worker (via vite-plugin-pwa) — Workbox config
{
  strategies: {
    // Static assets — Cache First (year-long cache)
    '/assets/**': 'CacheFirst',
    '/fonts/**': 'CacheFirst',
    
    // Pages — Stale While Revalidate  
    '/': 'StaleWhileRevalidate',
    '/blog/**': 'StaleWhileRevalidate',
    
    // No cache for API calls if any
  }
}
```

**HTTP Headers (set in Vercel/Netlify config):**
```
/assets/*    → Cache-Control: public, max-age=31536000, immutable
/fonts/*     → Cache-Control: public, max-age=31536000, immutable
/            → Cache-Control: public, max-age=0, must-revalidate
/blog/*      → Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

### 7.6 Rendering Strategy

For a portfolio with a blog, use **Static Site Generation (SSG)** where possible:
- All blog posts pre-rendered at build time (content is in MDX files, not a database)
- Dynamic OG images generated per post via a Vercel Edge Function
- Contact form submission handled by a lightweight serverless function

Consider **Vite + vite-plugin-ssg** or migrating to **Astro** for the blog section specifically if you need maximum static performance. Astro's Islands Architecture lets you keep React components interactive while shipping zero JS for purely static content.

---

## 8. Security Architecture

### 8.1 Content Security Policy (CSP)

Implement a strict CSP via HTTP headers (not `<meta>` tags — headers are more reliable):

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'nonce-{generated}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://images.your-cdn.com;
  font-src 'self';
  connect-src 'self' https://api.your-analytics.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

> **Note:** `unsafe-inline` in `style-src` may be required for CSS-in-JS libraries. If using CSS Modules (as recommended), you can remove it. Use nonces for any inline scripts.

### 8.2 Security Headers Checklist

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

Verify with: [securityheaders.com](https://securityheaders.com)

### 8.3 Blog XSS Prevention

MDX is compiled at build time into React, not runtime-evaluated HTML. This means:
- Raw HTML injection is not possible through MDX content
- Do NOT use `dangerouslySetInnerHTML` anywhere in the blog renderer
- If using a runtime MDX renderer (not recommended), use `DOMPurify` to sanitize

**Additional measures:**
- Sanitize all user inputs on the contact form (client-side with Zod, server-side with a serverless function)
- Validate contact form submissions with CAPTCHA (Turnstile by Cloudflare — privacy-friendly, no accessibility issues like reCAPTCHA)
- Rate-limit contact form submissions at the serverless function level

### 8.4 Dependency Security

```bash
# Add to CI pipeline
pnpm audit --audit-level=moderate
npx better-npm-audit

# Automated PRs for dependency updates
# Use: Renovate Bot (better than Dependabot — more configurable)
```

### 8.5 Environment Variables

- Never commit `.env` files
- Use `VITE_` prefix for client-side variables (with awareness that they are public in the bundle)
- Sensitive keys (analytics secrets, email API keys) must live in serverless function environment variables only — never in the frontend bundle

---

## 9. Accessibility (a11y)

### 9.1 Standards Target

**WCAG 2.2 Level AA** as the minimum. Aim for AAA on color contrast (7:1 ratio).

### 9.2 Semantic HTML Checklist

```html
<!-- Required landmarks -->
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main" id="main-content">
<footer role="contentinfo">

<!-- Skip navigation link (first element in body) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Heading hierarchy: exactly one H1 per page -->
<!-- H2 for sections, H3 for subsections — never skip levels -->

<!-- Images: meaningful images need alt text, decorative images need alt="" -->
<img src="project.jpg" alt="Screenshot of the dashboard showing real-time analytics" />
<img src="decorative-swirl.svg" alt="" role="presentation" />

<!-- Buttons vs. Links: buttons trigger actions, links navigate -->
<!-- Never use <div> or <span> as interactive elements -->
```

### 9.3 Keyboard Navigation

- All interactive elements must be focusable and have visible focus indicators
- Focus ring: Never `outline: none` without a custom replacement
- Modal dialogs trap focus (use Radix UI Dialog — it handles this correctly)
- Keyboard shortcuts (optional but impressive): `g + h` → home, `g + b` → blog, `/` → search

```css
/* Custom focus ring — visible and on-brand */
:focus-visible {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

### 9.4 Animation Accessibility

```css
/* Required in your globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

In Framer Motion:
```typescript
const shouldReduceMotion = useReducedMotion();
const animationVariants = {
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
  visible: { opacity: 1, y: 0 },
};
```

### 9.5 Testing Tools

| Tool | Use |
|---|---|
| `axe-core` + `@axe-core/react` | Dev-time automated a11y scanning |
| `eslint-plugin-jsx-a11y` | Lint-time a11y rule enforcement |
| Chrome DevTools Accessibility Tree | Manual inspection |
| NVDA (Windows) / VoiceOver (macOS) | Manual screen reader testing |
| [wave.webaim.org](https://wave.webaim.org) | Visual a11y report |

---

## 10. SEO Strategy

### 10.1 Technical SEO Foundation

**Meta tags per page (via `react-helmet-async`):**
```typescript
// BlogPost.tsx
<Helmet>
  <title>{post.title} | [Your Name]</title>
  <meta name="description" content={post.description} />
  <meta name="author" content="[Your Name]" />
  <link rel="canonical" href={`https://yoursite.com/blog/${post.slug}`} />
  
  {/* Open Graph */}
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.description} />
  <meta property="og:image" content={`https://yoursite.com/og/${post.slug}`} />
  <meta property="og:url" content={`https://yoursite.com/blog/${post.slug}`} />
  
  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@yourtwitterhandle" />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.description} />
  <meta name="twitter:image" content={`https://yoursite.com/og/${post.slug}`} />
  
  {/* JSON-LD Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify(blogPostSchema(post))}
  </script>
</Helmet>
```

### 10.2 JSON-LD Schemas

Implement these structured data schemas:

1. **Person schema** (on homepage) — Links your name to your social profiles
2. **BlogPosting schema** (on each post) — Enables rich results in Google Search
3. **BreadcrumbList schema** (on nested pages) — Shows breadcrumbs in search results
4. **WebSite schema** (site-wide) — Enables sitelinks search box

### 10.3 Sitemap & Robots

```typescript
// Auto-generate /sitemap.xml at build time
// Include: all blog post routes, all project routes, static pages
// Exclude: /404, any draft posts

// /robots.txt
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://yoursite.com/sitemap.xml
```

### 10.4 Blog SEO Content Strategy

**The "Rare but Authoritative" approach beats "frequent but shallow":**

- Target **long-tail technical keywords** that developers search (e.g., `"react useEffect cleanup typescript"` not `"react hooks"`)
- Write **problem → solution** formatted posts — this matches search intent exactly
- **Internal linking:** Every post should link to 2–3 other posts and 1–2 project case studies
- **Update cadence:** One deeply-researched post per month > four shallow posts per month
- **Post titles:** Use formats that signal specificity: `"How I reduced [metric] by [%] using [technology]"` outperforms `"A guide to [topic]"`

### 10.5 Performance as SEO

Google's Core Web Vitals are a ranking factor. Meeting the performance targets in Section 7 is directly an SEO requirement. A perfect Lighthouse score is a competitive SEO advantage for developer blogs, where the competition is often terrible on performance.

---

## 11. Development Workflow

### 11.1 Stitch MCP Integration

**What Stitch MCP enables for this project:**
- Design-to-code workflow: Generate React component scaffolding from design descriptions
- Component iteration: Rapidly prototype layout variations
- Style refinement: Adjust design token values with AI assistance
- Accessibility audit: Run a11y checks against generated components

**Recommended Stitch MCP Workflow:**
```
1. Design phase: Use Stitch to generate initial component structures
   → Review output critically — treat as scaffolding, not final code
   
2. Iteration: Use Stitch for quick variants of layout options
   → Always implement design tokens via CSS custom properties for maintainability
   
3. Polish phase: Hand-refine all animations and micro-interactions manually
   → Stitch output rarely captures nuanced easing curves — override these
   
4. Audit phase: Use Stitch MCP to verify component accessibility markup
```

**Prompt Engineering for Stitch MCP:**
- Always specify your design token system in the prompt context
- Specify your chosen archetype and aesthetic direction
- Request TypeScript with explicit prop interfaces
- Specify CSS Modules as the styling approach

### 11.2 Project Scaffolding Script

Create a `scripts/new-post.sh` (or `.ts`) to eliminate friction when creating blog posts:

```bash
#!/bin/bash
# scripts/new-post.sh
# Usage: ./scripts/new-post.sh "My Post Title"

TITLE="$1"
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | tr -cd '[:alnum:]-')
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
DIR="content/posts/$SLUG"

mkdir -p "$DIR/images"

cat > "$DIR/index.mdx" << EOF
---
title: "$TITLE"
description: ""
publishedAt: "$DATE"
status: "draft"
tags: []
category: "tutorial"
---

## Introduction

Write your post here.
EOF

echo "✓ Created: $DIR/index.mdx"
code "$DIR/index.mdx"  # Opens in VS Code
```

**Similarly for project case studies:**
```bash
./scripts/new-project.sh "Project Name"
```

### 11.3 NPM Scripts (package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx --max-warnings 0",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "a11y": "axe http://localhost:5173 --exit",
    "new:post": "bash scripts/new-post.sh",
    "new:project": "bash scripts/new-project.sh",
    "lighthouse": "lhci autorun",
    "analyze": "vite-bundle-visualizer"
  }
}
```

### 11.4 Git Workflow

**Branch Strategy:** Trunk-based development (main → feature branches → PR → main)

**Commit Convention:** Conventional Commits (`feat:`, `fix:`, `content:`, `perf:`, `a11y:`)

**Husky + lint-staged (pre-commit hooks):**
```json
// .husky/pre-commit
lint-staged

// lint-staged.config.js
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{css,json,md,mdx}": ["prettier --write"],
  "*.mdx": ["bash scripts/validate-frontmatter.sh"]
}
```

**Commitizen:** Optionally add `commitizen` + `cz-conventional-changelog` for guided commit message formatting.

### 11.5 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm format:check
      - run: pnpm build
      
  lighthouse:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - run: pnpm lighthouse
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### 11.6 VS Code Configuration

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "css.customData": [".vscode/css-custom-data.json"],
  "emmet.includeLanguages": { "typescriptreact": "html" }
}

// .vscode/extensions.json — Recommended extensions
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",    // Only if using Tailwind
    "unifiedjs.vscode-mdx",
    "ms-vscode.vscode-typescript-next",
    "csstools.postcss",
    "eamodio.gitlens",
    "GitHub.copilot"
  ]
}
```

---

## 12. Analytics & Observability

### 12.1 Privacy-First Analytics

**Use Umami (self-hosted) or Plausible (cloud).** Do not use Google Analytics. Reasons:
1. GA requires a cookie consent banner → hurts UX and conversion
2. GA is blocked by ~40% of developer audiences (who use ad blockers)
3. GA is a privacy liability under GDPR
4. Plausible/Umami are GDPR-compliant out of the box — no consent required

**Track these events:**

| Event | Signal |
|---|---|
| `resume_click` | Highest-value conversion |
| `project_view` | Interest level indicator |
| `github_click` | Developer audience engagement |
| `blog_post_read` | Content effectiveness (>60s dwell time) |
| `contact_form_submit` | Bottom-funnel conversion |
| `email_copy` | High-intent contact attempt |

### 12.2 Error Monitoring

**Use Sentry (free tier) for client-side error tracking:**
- Track JavaScript errors in production
- Track failed contact form submissions
- Alert on any spike in 404 errors (broken links from external sites)

---

## 13. Deployment & Infrastructure

### 13.1 Recommended Hosting

**Primary: Vercel**
- Zero-config Vite deployment
- Edge network (global CDN)
- Serverless functions for contact form + OG image generation
- Preview deployments on every PR (share with clients/recruiters before going live)
- Free tier sufficient for a personal portfolio

**Alternatives:**
- Cloudflare Pages: Slightly better performance, more generous free tier, Cloudflare Workers for serverless
- Netlify: Equivalent to Vercel, slightly weaker DX for Vite projects

### 13.2 Domain & DNS

- Register your domain on Cloudflare Registrar (no markup on wholesale price)
- Use Cloudflare's nameservers even if hosting on Vercel (for DNS management, DDoS protection, additional caching)
- Set up `www` redirect to apex domain (or apex to `www` — pick one, be consistent)
- Enable DNSSEC

### 13.3 Environment Configuration

```
Production:     yourname.dev (or .com)
Staging:        staging.yourname.dev (Vercel preview URL)
Development:    localhost:5173
```

---

## 14. Definition of Done Checklist

### Phase 1 — Foundation

- [ ] Repo initialized with pnpm, Vite, React 18, TypeScript strict mode
- [ ] Design token system (CSS custom properties) defined and documented
- [ ] Font files hosted locally, preloaded correctly
- [ ] Dark mode system implemented (respects OS preference, persists in localStorage)
- [ ] Global CSS reset and base styles applied
- [ ] ESLint + Prettier + Husky + lint-staged configured
- [ ] React Router v6 with data router pattern set up
- [ ] Route-level code splitting with Suspense implemented

### Phase 2 — Core Sections

- [ ] Navigation: transparent/solid scroll behavior, mobile hamburger, keyboard nav
- [ ] Hero: staggered entrance animation, availability badge, responsive type
- [ ] Skills strip: marquee animation, organized by category
- [ ] Featured projects: 3 cards with hover micro-interactions
- [ ] About section: photo, personality-driven copy
- [ ] Contact section: React Hook Form + Zod + serverless function
- [ ] Footer: minimal, back-to-top

### Phase 3 — Blog

- [ ] MDX processing pipeline configured (remark/rehype plugins)
- [ ] Frontmatter schema validated with Zod
- [ ] Blog index with filtering + fuzzy search
- [ ] Individual post layout: TOC, progress bar, code blocks, related posts
- [ ] All custom MDX components built (Callout, CodeBlock, Figure, etc.)
- [ ] Dynamic OG image generation per post

### Phase 4 — Quality Gates

- [ ] Lighthouse Performance ≥ 95 on all pages
- [ ] Lighthouse Accessibility ≥ 95 on all pages
- [ ] Lighthouse Best Practices = 100
- [ ] Lighthouse SEO = 100
- [ ] WCAG 2.2 AA verified (axe-core + manual screen reader test)
- [ ] All security headers configured (verified on securityheaders.com)
- [ ] CSP configured and tested
- [ ] `prefers-reduced-motion` respected on all animations
- [ ] All images have alt text
- [ ] All forms keyboard navigable
- [ ] Sitemap.xml generated and submitted to Google Search Console
- [ ] robots.txt configured
- [ ] JSON-LD structured data validated (Google Rich Results Test)
- [ ] RSS feed generated for blog

### Phase 5 — Polish & Launch

- [ ] All 3 project case studies written and published
- [ ] At least 2 blog posts published (not drafts) before launch
- [ ] Uses page completed
- [ ] 404 page has personality and a navigation path out
- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge
- [ ] Cross-device testing: iPhone, Android, iPad, MacBook, Ultrawide
- [ ] Analytics configured and tracking key events
- [ ] Sentry error monitoring active
- [ ] GitHub repo for portfolio made public (optional flex — link in footer)

---

*This document is a living blueprint. Version it alongside your code. Major UX or architectural pivots should be reflected here before implementation — the PRD is your decision log.*

---

**Document Prepared By:** Senior TPM + Lead Frontend Architect + Expert UX Designer  
**Last Updated:** 2025  
**Status:** Ready for Development
