# How to Manage Content

A task-oriented guide on adding projects, research artifacts, and technical logs.

## Porting Content to the Unified Library

The "Swiss Journal" architecture uses a unified content engine. All your work lives in a single list, ensuring a high-density, cohesive user experience.

### Adding a New Project

1. **Locate Data Source**
   Open `src/lib/data.ts`.

2. **Add Your Record**
   Find `LIBRARY_CONTENT` (or the equivalent structure) and add a new object:
   ```typescript
   {
     id: "project-slug",
     title: "System Software Design",
     category: "Systems",
     description: "A deep-dive into binary persistence...",
     link: "/library/project-slug",
     date: "2024-03-26",
   }
   ```

3. **Content (.MDX) Creation**
   Add a new MDX file in `src/content/library/` with a matching filename: `project-slug.mdx`.

### Updating Site Bio & Experience

1. **Global Site Metadata**
   Navigate to `src/lib/data.ts`.

2. **Bio / Info Update**
   Modify the `INFO`, `EDUCATION`, and `EXPERIENCE` objects as needed.

## Pro-Tips

- **Image Assets**: Store high-resolution project thumbnails in `public/projects/`.
- **Category Filtering**: Update the `CATEGORIES` array in `src/lib/data.ts` to add or remove site-wide tags.
- **Project Detail**: Use the `ProjectCard` component (found in `src/components/home/`) for consistent editorial styling.
