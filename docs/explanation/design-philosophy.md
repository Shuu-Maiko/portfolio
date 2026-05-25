# Design Philosophy

The underlying conceptual framework behind the **Swiss Journal** portfolio.

## The Swiss Journal Aesthetic

The aesthetic of the portfolio follows a **Neo-Minimalist** look, emphasizing:
- **Museum-Grade Layout**: Large whitespace, centered columns, and prominent typography.
- **Architectural Rules**: Dividers are 0.1px or 0.5px thin, creating a structural, grid-based aesthetic.
- **Micro-Animations**: Transitions are subtle—never "bouncy"—to ensure a premium, editorial feel.

## The Shift to Unified Content

The decision to eliminate redundant routes (projects, writing, etc.) and consolidate into a single "Library" is intentional.
- **Content-First Thinking**: By unifying all technical artifacts, the portfolio behaves like a technical journal, rather than a fragmented marketing site.
- **Information Density**: Users can quickly scan through a high-density list of work without context-switching between "projects" and "blog posts."

## Human-Written Codebase

A strict design choice: keep the code as clean as the UI.
- **Comment-Free Philosophy**: Logic should be self-documenting. If it needs a comment, it might need a refactor (unless it's a critical technical note).
- **Type-Safety by Default**: TypeScript and Zod ensure that the content engine is as robust as the codebase's visual representation.

## Ultra-High Contrast

The dark mode isn't just "gray"—it's high contrast.
- **Accessibility**: Pure black (#000000) and off-white (#FAFAFA) deliver maximum clarity for reading code and technical logs.
- **Visual Impact**: This mimics the feeling of white paper in an ink-heavy journal, but flipped for the digital age.
