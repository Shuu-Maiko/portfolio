# Swiss Journal

**An editorial, museum-grade portfolio built with Next.js and Framer Motion.**

Swiss Journal is a neo-minimalist digital space designed for high-density technical artifacts. It prioritizes typography (Inter, IBM Plex Mono, Silkscreen) and fluid motion over traditional UI abstractions.

---

## What Is This?

A "text-first" interactive portfolio that functions like a living technical journal. It implements:

- **Stackable Project Cards** — Progressive scroll-linked layout using Framer Motion
- **Unified Library** — A single-route content engine for projects, research, and logs
- **Keyboard-First Navigation** — Integrated shortcut system for rapid jumping
- **Smooth Scroll Architecture** — Lenis-powered inertial scrolling with scroll-jacking for card stacking
- **Neo-Minimalist Aesthetic** — High contrast dark mode with 0.5px architectural rules

---

### Tech Stack

| Layer           | Technology                                      |
| ----------------| ----------------------------------------------- |
| **Framework**   | Next.js 15 (App Router)                         |
| **Animation**   | Framer Motion 12 + Lenis                        |
| **Styling**     | Tailwind CSS 4                                  |
| **Components**  | Radix UI + shadcn/ui                            |
| **Typography**  | Inter, IBM Plex Mono, Silkscreen (Google Fonts) |

---

## Keyboard Shortcuts

The interface is designed for rapid navigation. Use these keys anywhere:

- `[h]` — Jump to **Home**
- `[l]` — Open the **Library**
- `[c]` — **Copy email** to clipboard (with toast confirmation)
- `[m]` — Open **Mail** client
- `[t]` — Smooth scroll to **Top**

---

## Building Locally

**Requirements:** Node.js 18+, npm/pnpm

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Content Management

All site data and content metadata is centralized for ease of update.

- **Site Metadata**: Edit `src/lib/data.ts` to update Bio, Experience, and Skills.
- **Library Content**: Add `.mdx` files to `src/content/` (or update the library data array in `src/lib/data.ts`).

---

## Detailed Docs

For deep dives into specific implementations:

- [Design Philosophy](docs/explanation/design-philosophy.md) — The "Swiss Journal" aesthetic
- [Animation Engine](docs/reference/architecture.md) — Framer Motion & Lenis integration
- [Shortcut System](docs/reference/design-system.md) — Dictionary and behavior
