# Astro Portfolio Scaffold — Design Spec

**Date:** 2026-06-05
**Branch:** Astro
**Status:** Approved

---

## Overview

Port the existing Next.js portfolio to Astro, establishing a clean scaffold with simple cards and a full multi-theme system. The visual redesign comes in a later iteration — this spec covers structure, theming architecture, and component breakdown only.

---

## Stack

- **Astro 6** with `@astrojs/react` for interactive islands
- **Tailwind v4** via `@tailwindcss/vite`
- **React 19** (islands only — ThemePicker)
- No additional UI library (no shadcn)

---

## Page Structure

Single-page with anchor links. Future routes (e.g. `/projects/:slug`) are out of scope here.

Sections in order:

| Section | Anchor | Notes |
|---------|--------|-------|
| Hero / About | `#about` | Full-viewport-height, first impression |
| Projects | `#projects` | Cards with image orientation handling |
| Experience | `#experience` | Stacked job cards |
| Education | `#education` | Stacked education cards |

---

## File Structure

```
src/
├── components/
│   ├── Header.astro          # Smart-sticky nav, imports ThemePicker
│   ├── Footer.astro          # Static
│   ├── Hero.astro            # Hero/About hybrid
│   ├── ProjectCard.astro     # Handles portrait vs landscape images
│   ├── ExperienceCard.astro  # Single work experience entry
│   ├── EducationCard.astro   # Single education entry
│   └── ThemePicker.tsx       # React island (client:load)
├── layouts/
│   └── Layout.astro          # html shell, theme init script, global CSS
├── pages/
│   └── index.astro           # Composes all sections
└── styles/
    └── global.css            # Tailwind import + all theme CSS variable definitions
```

---

## Theme System

### Approach

CSS custom properties on `[data-theme="name"]` attribute of `<html>`. All Tailwind colour usage in the project references these variables — no hardcoded colours anywhere.

### Token Set (per theme)

```css
[data-theme="..."] {
  --color-bg: ...;          /* page background */
  --color-bg-subtle: ...;   /* slightly elevated bg (cards) */
  --color-fg: ...;          /* primary text */
  --color-fg-muted: ...;    /* secondary text */
  --color-border: ...;      /* card/divider borders */
  --color-accent: ...;      /* primary accent colour */
  --color-accent-fg: ...;   /* text on accent backgrounds */
  --color-surface: ...;     /* hover states, badges */
}
```

### Theme List (20 total)

**Dark (10)**

| Slug | Theme |
|------|-------|
| `catppuccin-mocha` | Catppuccin Mocha |
| `nord-dark` | Nord Dark |
| `dracula` | Dracula |
| `gruvbox-dark` | Gruvbox Dark |
| `solarized-dark` | Solarized Dark |
| `tokyo-night` | Tokyo Night |
| `one-dark` | One Dark |
| `rose-pine` | Rosé Pine |
| `ayu-mirage` | Ayu Mirage |
| `monokai` | Monokai |

**Light (10)**

| Slug | Theme |
|------|-------|
| `catppuccin-latte` | Catppuccin Latte |
| `nord-light` | Nord Light |
| `github-light` | GitHub Light |
| `gruvbox-light` | Gruvbox Light |
| `solarized-light` | Solarized Light |
| `ayu-light` | Ayu Light |
| `one-light` | One Light |
| `rose-pine-dawn` | Rosé Pine Dawn |
| `tomorrow` | Tomorrow |
| `everforest-light` | Everforest Light |

### Init Behaviour

An inline `<script is:inline>` in `<head>` inside `Layout.astro` runs before paint:

1. Read `localStorage.getItem('theme')`
2. If present, apply it; otherwise pick a random theme from the full list
3. Set `document.documentElement.setAttribute('data-theme', theme)`

This prevents any flash of wrong theme on load.

### ThemePicker (React island)

- Reads current theme from `data-theme` attribute
- Displays all 20 themes grouped into Light / Dark sections
- Clicking a theme writes to `localStorage` and updates `data-theme`
- A "Randomise" button clears `localStorage` and picks a new random theme
- Rendered with `client:load` in the header

---

## Header

- `position: fixed`, full width, sits above content
- **Smart-sticky behaviour:** tracks scroll direction via a small inline `<script>` in `Header.astro`. Applies `translateY(-100%)` when scrolling down, `translateY(0)` when scrolling up. CSS `transition` for smooth slide.
- **Layout:** name/logo left · nav links centre · social icons + ThemePicker right
- **Mobile:** collapses to hamburger menu (toggle handled by inline script, no React needed)
- Nav links: Projects · Experience · Education

---

## Hero Section

- Full viewport height (`min-h-screen`)
- Contains: name, bio text, interest badges, social links (GitHub, LinkedIn, email)
- Social links use icon + label or icon-only — to be decided in redesign phase

---

## Project Cards

Each card reads `project.imageWidth` and `project.imageHeight` to determine orientation:

- **Landscape image:** image renders below the text content, full card width
- **Portrait image:** image renders to the right in a two-column layout
- **No image:** text-only card
- Hover state uses `--color-surface`
- Shows: title, description, tech badges, date range, GitHub + live links

---

## Experience Cards

Stacked cards, one per `WorkExperience` entry. Shows: title, company, location, date range, description, responsibilities list, skill badges.

---

## Education Cards

Stacked cards, one per `Education` entry. Shows: degree, institution, graduation year, GPA if present, notable achievements list.

---

## Footer

Static one-liner: `© {year} Brandon Wiedman. Built with Astro and Tailwind CSS.`

---

## Out of Scope

- Visual redesign (typography, spacing, layout aesthetics) — next iteration
- Project detail pages (`/vishub` etc.) — future routes
- Animations beyond header slide and card hover transitions
- Any backend or CMS integration
