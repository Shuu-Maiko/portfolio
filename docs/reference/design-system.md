# Design System Reference

A reference for the styling mechanics and design tokens of **Swiss Journal**.

## Typography Trio

The portfolio uses a high-contrast combination of three modern Google Fonts:

1. **Inter** (Variable Sans): Standard body typography. Focus on readability.
2. **IBM Plex Mono**: Technical metadata, dates, and navigation links.
3. **Silkscreen**: Retro-styled titles and UI elements (buttons, Navbar links).

## Keyboard Shortcuts Dictionary

Shortcut system logic is housed in `src/components/common/KeyboardShortcuts.tsx`.

| Key | Action | Confirmation |
|-----|--------|--------------|
| `[h]` | Go to **Home** | Instant Route |
| `[l]` | Go to **Library** | Instant Route |
| `[c]` | **Copy Email** | "Email Copied" Toast |
| `[m]` | Go to **Mail** client | Browser `mailto:` handler |
| `[t]` | Scroll **Top** | Smooth scroll animation |

## Animation Tokens

Framer Motion configuration is standardized across components to ensure an editorial, "museum-grade" feel.

- **Damping**: 15 (Slightly snappier, less bounce)
- **Stiffness**: 100
- **Duration**: 0.4s to 0.6s (Medium pace)

## Color Palette

Minimalist, ultra-high contrast dark mode:

- **Background**: `hsl(var(--background))` — Deep black / midnight.
- **Foreground**: `hsl(var(--foreground))` — Off-white / pure white.
- **Muted**: `hsl(var(--muted))` — Charcoal / deep gray for secondary metadata.
- **Accent**: `hsl(var(--accent))` — Subtle glassy effect (`rgba(255,255,255,0.05)`).
