# System Architecture

A technical map of the **Swiss Journal** portfolio project.

## Project Structure

```bash
├── src
│   ├── app                # Next.js App Router
│   │   ├── library/      # Unified contents route
│   │   ├── layout.tsx    # Root layout with global providers
│   │   └── page.tsx      # Landing page with stackable cards
│   ├── components
│   │   ├── common/       # Global UI components (FloatingDock, SmoothScroll)
│   │   ├── home/         # Homepage-specific components (ProjectCard)
│   │   ├── layout/       # General layout (Navbar, Footer)
│   │   └── ui/           # Radix/shadcn design primitives
│   ├── content           # MDX library contents
│   ├── lib/              # Utils, hooks, and static data engine
│   └── styles/           # Tailwind 4 CSS layers
```

## Component Interconnection

### The "Stackable" Scroll Engine
The portfolio's most distinctive feature is its stackable project card layout.
- **Scroll Tracking**: Uses standard browser scroll events, but integrates with **Lenis** for inertial smoothing.
- **Motion Animation**: Leverages **Framer Motion** `useScroll` and `useTransform` hooks to track the vertical position of each `ProjectCard`.
- **Shrink Logic**: As a card leaves the viewport, its `scale` and `opacity` are reduced, allowing the next card to "stack" on top of it.

### The Unified Content Engine
All project and blog content is unified into a single "Library" system.
- **Content Flow**: MDX data is parsed using `gray-matter` and rendered via `next-mdx-remote`.
- **Dynamic Routing**: The library uses Next.js dynamic segments (`/library/[slug]`) to serve content on-demand.

## Performance Optimization

- **Image Strategy**: Next.js `<Image>` component for automatic WebP conversion and lazy loading.
- **Scroll Hijacking**: The Lenis scroll wrapper is isolated at the root layout to maintain consistent performance across pages.
- **Tree-Shaking**: Tailwind 4 automatically removes unused CSS at build time.
