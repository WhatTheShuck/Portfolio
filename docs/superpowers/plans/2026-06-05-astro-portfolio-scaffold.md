# Astro Portfolio Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Astro portfolio with a smart-sticky header, hero/about section, project/experience/education cards, and a 20-theme CSS variable system with random-on-load and lock-to-preference support.

**Architecture:** All colour tokens are CSS custom properties set on `[data-theme]` on `<html>`. Tailwind v4 `@theme` registers them as utility classes (`bg-bg`, `text-fg`, etc.). A tiny inline script in `<head>` applies the saved or random theme before paint. The only React island is `ThemePicker.tsx`; everything else is static Astro.

**Tech Stack:** Astro 6, Tailwind v4 (`@tailwindcss/vite`), React 19 (`@astrojs/react`), lucide-react, TypeScript

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/styles/global.css` | Tailwind import + all 20 `[data-theme]` variable blocks |
| Create | `src/lib/themes.ts` | Theme metadata array, `DARK_THEMES`, `LIGHT_THEMES`, `THEME_SLUGS` |
| Modify | `src/layouts/Layout.astro` | HTML shell, `<head>` meta, theme init inline script, CSS import, Header + Footer slots |
| Create | `src/components/ThemePicker.tsx` | React island — theme dropdown, randomise button, localStorage read/write |
| Create | `src/components/Header.astro` | Fixed nav, smart-sticky scroll script, mobile hamburger, imports ThemePicker |
| Create | `src/components/Footer.astro` | Static copyright footer |
| Create | `src/components/Hero.astro` | Full-height hero: name, bio, interest badges, social links |
| Create | `src/components/ProjectCard.astro` | Project card with portrait/landscape image handling |
| Create | `src/components/ExperienceCard.astro` | Work experience card |
| Create | `src/components/EducationCard.astro` | Education card with achievements list |
| Modify | `src/pages/index.astro` | Compose all sections |
| Delete | `src/components/Welcome.astro` | Replaced by the scaffold |
| Move | `src/assets/{images}` → `public/` | Serve images at paths matching data.ts strings |

---

## Task 1: Install lucide-react and move images to public/

**Files:**
- Run: `pnpm add lucide-react`
- Move: `src/assets/vishub.png` → `public/vishub.png`
- Move: `src/assets/nextHRT.png` → `public/nextHRT.png`
- Move: `src/assets/rwpro.png` → `public/rwpro.png`
- Move: `src/assets/td2.png` → `public/td2.png`
- Move: `src/assets/VISHub-Video.mp4` → `public/VISHub-Video.mp4`

- [ ] **Step 1: Install lucide-react**

```bash
cd /Users/umbreon/repos/Portfolio && pnpm add lucide-react
```

Expected: `devDependencies` or `dependencies` updated in `package.json`.

- [ ] **Step 2: Move project images to public/**

```bash
mv src/assets/vishub.png public/vishub.png
mv src/assets/nextHRT.png public/nextHRT.png
mv src/assets/rwpro.png public/rwpro.png
mv src/assets/td2.png public/td2.png
mv src/assets/VISHub-Video.mp4 public/VISHub-Video.mp4
```

- [ ] **Step 3: Verify files are in place**

```bash
ls public/
```

Expected output includes: `vishub.png nextHRT.png rwpro.png td2.png VISHub-Video.mp4 favicon.ico favicon.svg`

---

## Task 2: Theme definitions — global.css and themes.ts

**Files:**
- Modify: `src/styles/global.css`
- Create: `src/lib/themes.ts`

- [ ] **Step 1: Write src/lib/themes.ts**

```typescript
export type ThemeMode = 'dark' | 'light';

export interface Theme {
  slug: string;
  name: string;
  mode: ThemeMode;
}

export const DARK_THEMES: Theme[] = [
  { slug: 'catppuccin-mocha', name: 'Catppuccin Mocha', mode: 'dark' },
  { slug: 'nord-dark',        name: 'Nord Dark',        mode: 'dark' },
  { slug: 'dracula',          name: 'Dracula',          mode: 'dark' },
  { slug: 'gruvbox-dark',     name: 'Gruvbox Dark',     mode: 'dark' },
  { slug: 'solarized-dark',   name: 'Solarized Dark',   mode: 'dark' },
  { slug: 'tokyo-night',      name: 'Tokyo Night',      mode: 'dark' },
  { slug: 'one-dark',         name: 'One Dark',         mode: 'dark' },
  { slug: 'rose-pine',        name: 'Rosé Pine',        mode: 'dark' },
  { slug: 'ayu-mirage',       name: 'Ayu Mirage',       mode: 'dark' },
  { slug: 'monokai',          name: 'Monokai',          mode: 'dark' },
];

export const LIGHT_THEMES: Theme[] = [
  { slug: 'catppuccin-latte', name: 'Catppuccin Latte', mode: 'light' },
  { slug: 'nord-light',       name: 'Nord Light',       mode: 'light' },
  { slug: 'github-light',     name: 'GitHub Light',     mode: 'light' },
  { slug: 'gruvbox-light',    name: 'Gruvbox Light',    mode: 'light' },
  { slug: 'solarized-light',  name: 'Solarized Light',  mode: 'light' },
  { slug: 'ayu-light',        name: 'Ayu Light',        mode: 'light' },
  { slug: 'one-light',        name: 'One Light',        mode: 'light' },
  { slug: 'rose-pine-dawn',   name: 'Rosé Pine Dawn',   mode: 'light' },
  { slug: 'tomorrow',         name: 'Tomorrow',         mode: 'light' },
  { slug: 'everforest-light', name: 'Everforest Light', mode: 'light' },
];

export const THEMES: Theme[] = [...DARK_THEMES, ...LIGHT_THEMES];

export const THEME_SLUGS: string[] = THEMES.map(t => t.slug);
```

- [ ] **Step 2: Write src/styles/global.css**

Replace the file entirely with:

```css
@import "tailwindcss";

@theme {
  --color-bg:         #1e1e2e;
  --color-bg-subtle:  #313244;
  --color-fg:         #cdd6f4;
  --color-fg-muted:   #a6adc8;
  --color-border:     #45475a;
  --color-accent:     #cba6f7;
  --color-accent-fg:  #1e1e2e;
  --color-surface:    #585b70;
}

/* ─── Dark themes ─────────────────────────────────────────── */

[data-theme="catppuccin-mocha"] {
  --color-bg:         #1e1e2e;
  --color-bg-subtle:  #313244;
  --color-fg:         #cdd6f4;
  --color-fg-muted:   #a6adc8;
  --color-border:     #45475a;
  --color-accent:     #cba6f7;
  --color-accent-fg:  #1e1e2e;
  --color-surface:    #585b70;
}

[data-theme="nord-dark"] {
  --color-bg:         #2e3440;
  --color-bg-subtle:  #3b4252;
  --color-fg:         #eceff4;
  --color-fg-muted:   #d8dee9;
  --color-border:     #4c566a;
  --color-accent:     #88c0d0;
  --color-accent-fg:  #2e3440;
  --color-surface:    #434c5e;
}

[data-theme="dracula"] {
  --color-bg:         #282a36;
  --color-bg-subtle:  #44475a;
  --color-fg:         #f8f8f2;
  --color-fg-muted:   #6272a4;
  --color-border:     #44475a;
  --color-accent:     #bd93f9;
  --color-accent-fg:  #282a36;
  --color-surface:    #44475a;
}

[data-theme="gruvbox-dark"] {
  --color-bg:         #282828;
  --color-bg-subtle:  #3c3836;
  --color-fg:         #ebdbb2;
  --color-fg-muted:   #bdae93;
  --color-border:     #504945;
  --color-accent:     #d79921;
  --color-accent-fg:  #282828;
  --color-surface:    #504945;
}

[data-theme="solarized-dark"] {
  --color-bg:         #002b36;
  --color-bg-subtle:  #073642;
  --color-fg:         #839496;
  --color-fg-muted:   #657b83;
  --color-border:     #073642;
  --color-accent:     #268bd2;
  --color-accent-fg:  #fdf6e3;
  --color-surface:    #073642;
}

[data-theme="tokyo-night"] {
  --color-bg:         #1a1b26;
  --color-bg-subtle:  #24283b;
  --color-fg:         #c0caf5;
  --color-fg-muted:   #565f89;
  --color-border:     #292e42;
  --color-accent:     #7aa2f7;
  --color-accent-fg:  #1a1b26;
  --color-surface:    #292e42;
}

[data-theme="one-dark"] {
  --color-bg:         #282c34;
  --color-bg-subtle:  #21252b;
  --color-fg:         #abb2bf;
  --color-fg-muted:   #5c6370;
  --color-border:     #3e4451;
  --color-accent:     #61afef;
  --color-accent-fg:  #282c34;
  --color-surface:    #3e4451;
}

[data-theme="rose-pine"] {
  --color-bg:         #191724;
  --color-bg-subtle:  #1f1d2e;
  --color-fg:         #e0def4;
  --color-fg-muted:   #908caa;
  --color-border:     #26233a;
  --color-accent:     #c4a7e7;
  --color-accent-fg:  #191724;
  --color-surface:    #26233a;
}

[data-theme="ayu-mirage"] {
  --color-bg:         #1f2430;
  --color-bg-subtle:  #242936;
  --color-fg:         #cbccc6;
  --color-fg-muted:   #707a8c;
  --color-border:     #353a45;
  --color-accent:     #ffcc66;
  --color-accent-fg:  #1f2430;
  --color-surface:    #353a45;
}

[data-theme="monokai"] {
  --color-bg:         #272822;
  --color-bg-subtle:  #3e3d32;
  --color-fg:         #f8f8f2;
  --color-fg-muted:   #75715e;
  --color-border:     #49483e;
  --color-accent:     #a6e22e;
  --color-accent-fg:  #272822;
  --color-surface:    #49483e;
}

/* ─── Light themes ────────────────────────────────────────── */

[data-theme="catppuccin-latte"] {
  --color-bg:         #eff1f5;
  --color-bg-subtle:  #e6e9ef;
  --color-fg:         #4c4f69;
  --color-fg-muted:   #6c6f85;
  --color-border:     #ccd0da;
  --color-accent:     #8839ef;
  --color-accent-fg:  #eff1f5;
  --color-surface:    #bcc0cc;
}

[data-theme="nord-light"] {
  --color-bg:         #eceff4;
  --color-bg-subtle:  #e5e9f0;
  --color-fg:         #2e3440;
  --color-fg-muted:   #4c566a;
  --color-border:     #d8dee9;
  --color-accent:     #5e81ac;
  --color-accent-fg:  #eceff4;
  --color-surface:    #d8dee9;
}

[data-theme="github-light"] {
  --color-bg:         #ffffff;
  --color-bg-subtle:  #f6f8fa;
  --color-fg:         #24292f;
  --color-fg-muted:   #57606a;
  --color-border:     #d0d7de;
  --color-accent:     #0969da;
  --color-accent-fg:  #ffffff;
  --color-surface:    #f6f8fa;
}

[data-theme="gruvbox-light"] {
  --color-bg:         #fbf1c7;
  --color-bg-subtle:  #f2e5bc;
  --color-fg:         #3c3836;
  --color-fg-muted:   #7c6f64;
  --color-border:     #d5c4a1;
  --color-accent:     #d79921;
  --color-accent-fg:  #fbf1c7;
  --color-surface:    #d5c4a1;
}

[data-theme="solarized-light"] {
  --color-bg:         #fdf6e3;
  --color-bg-subtle:  #eee8d5;
  --color-fg:         #657b83;
  --color-fg-muted:   #839496;
  --color-border:     #eee8d5;
  --color-accent:     #268bd2;
  --color-accent-fg:  #fdf6e3;
  --color-surface:    #eee8d5;
}

[data-theme="ayu-light"] {
  --color-bg:         #fafafa;
  --color-bg-subtle:  #f3f4f5;
  --color-fg:         #5c6166;
  --color-fg-muted:   #8a9199;
  --color-border:     #e7e8e9;
  --color-accent:     #ff9940;
  --color-accent-fg:  #ffffff;
  --color-surface:    #e7e8e9;
}

[data-theme="one-light"] {
  --color-bg:         #fafafa;
  --color-bg-subtle:  #f0f0f1;
  --color-fg:         #383a42;
  --color-fg-muted:   #696c77;
  --color-border:     #e5e5e6;
  --color-accent:     #4078f2;
  --color-accent-fg:  #fafafa;
  --color-surface:    #e5e5e6;
}

[data-theme="rose-pine-dawn"] {
  --color-bg:         #faf4ed;
  --color-bg-subtle:  #f2e9e1;
  --color-fg:         #575279;
  --color-fg-muted:   #9893a5;
  --color-border:     #dfdad9;
  --color-accent:     #b4637a;
  --color-accent-fg:  #faf4ed;
  --color-surface:    #dfdad9;
}

[data-theme="tomorrow"] {
  --color-bg:         #ffffff;
  --color-bg-subtle:  #f7f7f7;
  --color-fg:         #4d4d4c;
  --color-fg-muted:   #8e908c;
  --color-border:     #e0e0e0;
  --color-accent:     #4271ae;
  --color-accent-fg:  #ffffff;
  --color-surface:    #efefef;
}

[data-theme="everforest-light"] {
  --color-bg:         #f2efdf;
  --color-bg-subtle:  #edeada;
  --color-fg:         #5c6a72;
  --color-fg-muted:   #829181;
  --color-border:     #e0dcc7;
  --color-accent:     #8da101;
  --color-accent-fg:  #f2efdf;
  --color-surface:    #e0dcc7;
}
```

- [ ] **Step 3: Verify Tailwind config reads global.css**

Open `astro.config.mjs` — confirm it has `tailwindcss()` in `vite.plugins`. It should already be there from the Astro setup commit. No changes needed if present.

- [ ] **Step 4: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors (only the Welcome component may warn; that's deleted in Task 11).

---

## Task 3: Update Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Replace Layout.astro content**

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { THEME_SLUGS } from '../lib/themes';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Brandon Wiedman',
  description = 'Software developer in Brisbane, QLD.',
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    <meta name="description" content={description} />

    <script is:inline define:vars={{ THEME_SLUGS }}>
      const saved = localStorage.getItem('theme');
      const theme = saved && THEME_SLUGS.includes(saved)
        ? saved
        : THEME_SLUGS[Math.floor(Math.random() * THEME_SLUGS.length)];
      document.documentElement.setAttribute('data-theme', theme);
    </script>
  </head>
  <body class="bg-bg text-fg min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors on Layout.astro (Header and Footer don't exist yet — that's fine, the check may error on those imports; if so, create stub files to unblock).

If check errors on missing Header/Footer, create temporary stubs:

`src/components/Header.astro`:
```astro
<header></header>
```

`src/components/Footer.astro`:
```astro
<footer></footer>
```

---

## Task 4: ThemePicker.tsx React island

**Files:**
- Create: `src/components/ThemePicker.tsx`

- [ ] **Step 1: Create src/components/ThemePicker.tsx**

```tsx
import { useState, useEffect, useRef } from 'react';
import { Shuffle, Palette } from 'lucide-react';
import { DARK_THEMES, LIGHT_THEMES, THEME_SLUGS } from '../lib/themes';

export default function ThemePicker() {
  const [current, setCurrent] = useState('catppuccin-mocha');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme');
    if (t) setCurrent(t);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const apply = (slug: string, lock: boolean) => {
    document.documentElement.setAttribute('data-theme', slug);
    if (lock) {
      localStorage.setItem('theme', slug);
    } else {
      localStorage.removeItem('theme');
    }
    setCurrent(slug);
    setOpen(false);
  };

  const randomise = () => {
    const slug = THEME_SLUGS[Math.floor(Math.random() * THEME_SLUGS.length)];
    apply(slug, false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Choose theme"
        className="p-1 rounded hover:bg-surface transition-colors"
      >
        <Palette size={20} className="text-fg-muted" />
      </button>

      {open && (
        <div className="absolute right-0 top-9 w-52 bg-bg-subtle border border-border rounded-lg shadow-lg z-50 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-fg-muted uppercase tracking-wider">Theme</span>
            <button
              onClick={randomise}
              className="flex items-center gap-1 text-xs text-accent hover:underline"
            >
              <Shuffle size={12} />
              Random
            </button>
          </div>

          <p className="text-xs text-fg-muted uppercase tracking-wider mb-1">Dark</p>
          {DARK_THEMES.map(t => (
            <button
              key={t.slug}
              onClick={() => apply(t.slug, true)}
              className={`w-full text-left text-sm px-2 py-1 rounded transition-colors ${
                current === t.slug
                  ? 'text-accent font-medium'
                  : 'text-fg hover:bg-surface'
              }`}
            >
              {t.name}
            </button>
          ))}

          <p className="text-xs text-fg-muted uppercase tracking-wider mt-3 mb-1">Light</p>
          {LIGHT_THEMES.map(t => (
            <button
              key={t.slug}
              onClick={() => apply(t.slug, true)}
              className={`w-full text-left text-sm px-2 py-1 rounded transition-colors ${
                current === t.slug
                  ? 'text-accent font-medium'
                  : 'text-fg hover:bg-surface'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors.

---

## Task 5: Header.astro

**Files:**
- Modify: `src/components/Header.astro` (replace stub if created)

- [ ] **Step 1: Write src/components/Header.astro**

```astro
---
import ThemePicker from './ThemePicker.tsx';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { personalInfo } from '../lib/data';

const navItems = [
  { href: '/#projects',   label: 'Projects'   },
  { href: '/#experience', label: 'Experience' },
  { href: '/#education',  label: 'Education'  },
];
---

<header
  id="main-header"
  class="fixed top-0 left-0 right-0 z-50 bg-bg border-b border-border transition-transform duration-300"
>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">

      <!-- Logo -->
      <a href="/" class="text-lg font-bold text-fg hover:text-accent transition-colors">
        {personalInfo.name}
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6">
        {navItems.map(item => (
          <a
            href={item.href}
            class="text-fg-muted hover:text-fg text-sm transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <!-- Desktop right: socials + theme picker -->
      <div class="hidden md:flex items-center gap-3">
        <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer"
           aria-label="GitHub" class="text-fg-muted hover:text-fg transition-colors">
          <Github size={20} />
        </a>
        {personalInfo.linkedinUrl && (
          <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer"
             aria-label="LinkedIn" class="text-fg-muted hover:text-fg transition-colors">
            <Linkedin size={20} />
          </a>
        )}
        <a href={`mailto:${personalInfo.email}`}
           aria-label="Email" class="text-fg-muted hover:text-fg transition-colors">
          <Mail size={20} />
        </a>
        <ThemePicker client:load />
      </div>

      <!-- Mobile: theme picker + hamburger -->
      <div class="flex md:hidden items-center gap-2">
        <ThemePicker client:load />
        <button
          id="menu-btn"
          aria-label="Open menu"
          class="p-1 text-fg-muted hover:text-fg transition-colors"
        >
          <Menu size={24} id="menu-icon-open" />
          <X size={24} id="menu-icon-close" class="hidden" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-border mt-0 pt-3">
      <nav class="flex flex-col gap-3">
        {navItems.map(item => (
          <a
            href={item.href}
            class="text-fg-muted hover:text-fg text-sm transition-colors"
            data-mobile-link
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div class="flex gap-4 mt-4">
        <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer"
           aria-label="GitHub" class="text-fg-muted hover:text-fg transition-colors">
          <Github size={20} />
        </a>
        {personalInfo.linkedinUrl && (
          <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer"
             aria-label="LinkedIn" class="text-fg-muted hover:text-fg transition-colors">
            <Linkedin size={20} />
          </a>
        )}
        <a href={`mailto:${personalInfo.email}`}
           aria-label="Email" class="text-fg-muted hover:text-fg transition-colors">
          <Mail size={20} />
        </a>
      </div>
    </div>
  </div>
</header>

<script>
  // Smart-sticky: hide on scroll down, reveal on scroll up
  const header = document.getElementById('main-header')!;
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 80) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = Math.max(0, current);
  }, { passive: true });

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn')!;
  const mobileMenu = document.getElementById('mobile-menu')!;
  const iconOpen = document.getElementById('menu-icon-open')!;
  const iconClose = document.getElementById('menu-icon-close')!;

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', isOpen);
    iconOpen.classList.toggle('hidden', !isOpen);
    iconClose.classList.toggle('hidden', isOpen);
  });

  // Close mobile menu on link click
  document.querySelectorAll('[data-mobile-link]').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    });
  });
</script>
```

- [ ] **Step 2: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors.

---

## Task 6: Footer.astro

**Files:**
- Modify: `src/components/Footer.astro` (replace stub if created)

- [ ] **Step 1: Write src/components/Footer.astro**

```astro
---
import { personalInfo } from '../lib/data';
---

<footer class="border-t border-border bg-bg">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <p class="text-center text-sm text-fg-muted">
      © {new Date().getFullYear()} {personalInfo.name}. Built with Astro and Tailwind CSS.
    </p>
  </div>
</footer>
```

- [ ] **Step 2: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors.

---

## Task 7: Hero.astro

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Write src/components/Hero.astro**

```astro
---
import { personalInfo } from '../lib/data';
---

<section
  id="about"
  class="min-h-screen flex items-center justify-center pt-16"
>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">

    <div class="space-y-4">
      <h1 class="text-5xl sm:text-6xl font-bold text-fg">
        {personalInfo.name}
      </h1>
      <p class="text-xl text-fg-muted max-w-2xl leading-relaxed">
        {personalInfo.bio}
      </p>
    </div>

    <!-- Interest badges -->
    <div class="flex flex-wrap gap-2">
      {personalInfo.interests.map(interest => (
        <span class="px-3 py-1 rounded-full text-sm bg-bg-subtle border border-border text-fg-muted">
          {interest}
        </span>
      ))}
    </div>

    <!-- Social links -->
    <div class="flex gap-4">
      <a
        href={personalInfo.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="px-4 py-2 rounded-lg bg-bg-subtle border border-border text-fg text-sm hover:bg-surface hover:border-accent transition-colors"
      >
        GitHub
      </a>
      {personalInfo.linkedinUrl && (
        <a
          href={personalInfo.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-lg bg-bg-subtle border border-border text-fg text-sm hover:bg-surface hover:border-accent transition-colors"
        >
          LinkedIn
        </a>
      )}
      <a
        href={`mailto:${personalInfo.email}`}
        class="px-4 py-2 rounded-lg bg-bg-subtle border border-border text-fg text-sm hover:bg-surface hover:border-accent transition-colors"
      >
        Email
      </a>
    </div>

    <!-- Scroll hint -->
    <div class="pt-8">
      <a href="/#projects" class="text-fg-muted hover:text-accent text-sm transition-colors">
        View my work ↓
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors.

---

## Task 8: ProjectCard.astro

**Files:**
- Create: `src/components/ProjectCard.astro`

- [ ] **Step 1: Write src/components/ProjectCard.astro**

```astro
---
import type { Project } from '../lib/types';

interface Props {
  project: Project;
}

const { project } = Astro.props;

const isPortrait = project.image && project.imageHeight > project.imageWidth;
const isLandscape = project.image && project.imageHeight <= project.imageWidth;

const dateLabel = project.startDate.toLocaleDateString('en-AU', {
  month: 'short',
  year: 'numeric',
});
const endLabel = project.endDate
  ? project.endDate.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })
  : project.status === 'in-progress'
  ? 'Present'
  : null;
---

<article class="group border border-border rounded-lg p-6 hover:bg-surface transition-colors">

  {/* Portrait layout: text left, image right */}
  {isPortrait && (
    <div class="flex gap-6 items-start">
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex items-start justify-between gap-4">
          <h3 class="text-xl font-bold text-fg">{project.title}</h3>
          <div class="flex gap-3 shrink-0">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                 class="text-fg-muted hover:text-fg transition-colors text-sm">GitHub</a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                 class="text-fg-muted hover:text-fg transition-colors text-sm">Live</a>
            )}
          </div>
        </div>
        <p class="text-fg-muted text-sm leading-relaxed">{project.description}</p>
        <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
          {project.technologies.map(tech => (
            <span class="px-2 py-0.5 rounded text-xs bg-bg-subtle border border-border text-fg-muted">
              {tech}
            </span>
          ))}
        </div>
        <p class="text-xs text-fg-muted">
          {dateLabel}{endLabel && ` – ${endLabel}`}
        </p>
      </div>
      <div class="hidden md:block shrink-0">
        <img
          src={project.image}
          alt={project.title}
          width={project.imageWidth}
          height={project.imageHeight}
          class="rounded-lg shadow-md object-contain group-hover:scale-105 transition-transform"
          style="max-height: 280px; max-width: 140px;"
          loading="lazy"
        />
      </div>
    </div>
  )}

  {/* Landscape layout: text top, image below */}
  {isLandscape && (
    <div class="flex flex-col gap-4">
      <div class="flex items-start justify-between gap-4">
        <h3 class="text-xl font-bold text-fg">{project.title}</h3>
        <div class="flex gap-3 shrink-0">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
               class="text-fg-muted hover:text-fg transition-colors text-sm">GitHub</a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
               class="text-fg-muted hover:text-fg transition-colors text-sm">Live</a>
          )}
        </div>
      </div>
      <p class="text-fg-muted text-sm leading-relaxed">{project.description}</p>
      <img
        src={project.image}
        alt={project.title}
        width={project.imageWidth}
        height={project.imageHeight}
        class="rounded-lg shadow-md w-full object-cover group-hover:scale-[1.02] transition-transform"
        style="max-height: 300px; object-fit: cover;"
        loading="lazy"
      />
      <div class="flex flex-wrap gap-2 pt-4 border-t border-border">
        {project.technologies.map(tech => (
          <span class="px-2 py-0.5 rounded text-xs bg-bg-subtle border border-border text-fg-muted">
            {tech}
          </span>
        ))}
      </div>
      <p class="text-xs text-fg-muted">
        {dateLabel}{endLabel && ` – ${endLabel}`}
      </p>
    </div>
  )}

  {/* No image */}
  {!project.image && (
    <div class="flex flex-col gap-4">
      <div class="flex items-start justify-between gap-4">
        <h3 class="text-xl font-bold text-fg">{project.title}</h3>
        <div class="flex gap-3 shrink-0">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
               class="text-fg-muted hover:text-fg transition-colors text-sm">GitHub</a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
               class="text-fg-muted hover:text-fg transition-colors text-sm">Live</a>
          )}
        </div>
      </div>
      <p class="text-fg-muted text-sm leading-relaxed">{project.description}</p>
      <div class="flex flex-wrap gap-2 pt-4 border-t border-border">
        {project.technologies.map(tech => (
          <span class="px-2 py-0.5 rounded text-xs bg-bg-subtle border border-border text-fg-muted">
            {tech}
          </span>
        ))}
      </div>
      <p class="text-xs text-fg-muted">
        {dateLabel}{endLabel && ` – ${endLabel}`}
      </p>
    </div>
  )}
</article>
```

- [ ] **Step 2: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors.

---

## Task 9: ExperienceCard.astro

**Files:**
- Create: `src/components/ExperienceCard.astro`

- [ ] **Step 1: Write src/components/ExperienceCard.astro**

```astro
---
import type { WorkExperience } from '../lib/types';

interface Props {
  job: WorkExperience;
}

const { job } = Astro.props;

const startLabel = job.startDate.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' });
const endLabel   = job.endDate
  ? job.endDate.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })
  : 'Present';
---

<article class="border border-border rounded-lg p-6 hover:bg-surface transition-colors space-y-4">
  <div class="flex items-start justify-between gap-4">
    <div>
      <h3 class="text-lg font-bold text-fg">{job.title}</h3>
      <p class="text-fg-muted text-sm">{job.company} · {job.location}</p>
    </div>
    <span class="text-xs text-fg-muted shrink-0 pt-1">
      {startLabel} – {endLabel}
    </span>
  </div>

  <p class="text-fg-muted text-sm leading-relaxed">{job.description}</p>

  <div>
    <h4 class="text-sm font-semibold text-fg mb-2">Key Responsibilities</h4>
    <ul class="list-disc list-inside space-y-1">
      {job.responsibilities.map(r => (
        <li class="text-sm text-fg-muted">{r}</li>
      ))}
    </ul>
  </div>

  <div class="flex flex-wrap gap-2 pt-2 border-t border-border">
    {job.skills.map(skill => (
      <span class="px-2 py-0.5 rounded text-xs bg-bg-subtle border border-border text-fg-muted">
        {skill}
      </span>
    ))}
  </div>
</article>
```

- [ ] **Step 2: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors.

---

## Task 10: EducationCard.astro

**Files:**
- Create: `src/components/EducationCard.astro`

- [ ] **Step 1: Write src/components/EducationCard.astro**

```astro
---
import type { Education } from '../lib/types';

interface Props {
  edu: Education;
}

const { edu } = Astro.props;
---

<article class="border border-border rounded-lg p-6 hover:bg-surface transition-colors space-y-4">
  <div class="flex items-start justify-between gap-4">
    <div>
      <h3 class="text-lg font-bold text-fg">{edu.degree}</h3>
      <p class="text-fg-muted text-sm">{edu.institution}</p>
    </div>
    <span class="text-xs text-fg-muted shrink-0 pt-1">{edu.graduationDate}</span>
  </div>

  {edu.gpa && (
    <p class="text-sm text-fg-muted">GPA: {edu.gpa}</p>
  )}

  <div>
    <h4 class="text-sm font-semibold text-fg mb-2">Notable Achievements & Projects</h4>
    <ul class="space-y-2">
      {edu.notableAchievements.map(item => (
        <li class="text-sm">
          <span class="text-fg">
            {item.title}{item.grade && <span class="text-fg-muted"> {item.grade}</span>}
          </span>
          <p class="text-fg-muted mt-0.5 leading-relaxed">{item.description}</p>
        </li>
      ))}
    </ul>
  </div>
</article>
```

- [ ] **Step 2: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors.

---

## Task 11: Compose index.astro, remove Welcome.astro, verify build

**Files:**
- Modify: `src/pages/index.astro`
- Delete: `src/components/Welcome.astro`

- [ ] **Step 1: Write src/pages/index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import ProjectCard from '../components/ProjectCard.astro';
import ExperienceCard from '../components/ExperienceCard.astro';
import EducationCard from '../components/EducationCard.astro';
import { projects, workExperience, education } from '../lib/data';
---

<Layout>
  <Hero />

  <section id="projects" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
    <h2 class="text-3xl font-bold text-fg">Featured Projects</h2>
    <div class="space-y-6">
      {projects.map(p => <ProjectCard project={p} />)}
    </div>
  </section>

  <section id="experience" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
    <h2 class="text-3xl font-bold text-fg">Work Experience</h2>
    <div class="space-y-6">
      {workExperience.map(j => <ExperienceCard job={j} />)}
    </div>
  </section>

  <section id="education" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
    <h2 class="text-3xl font-bold text-fg">Education</h2>
    <div class="space-y-6">
      {education.map(e => <EducationCard edu={e} />)}
    </div>
  </section>
</Layout>
```

- [ ] **Step 2: Delete Welcome.astro**

```bash
rm src/components/Welcome.astro
```

- [ ] **Step 3: Run astro check**

```bash
pnpm astro check
```

Expected: 0 errors.

- [ ] **Step 4: Run the dev server and verify in browser**

```bash
pnpm run dev
```

Open `http://localhost:4321` and check:
- Page loads with a theme applied (random each fresh load, no flash)
- Header is visible and sticks — scrolling down hides it, scrolling up reveals it
- ThemePicker opens and switching themes applies the colour change immediately
- Locking a theme persists on reload; Randomise button clears the lock
- Hero section fills viewport with name, bio, interests, social links
- All four projects render with correct orientation (VIS Hub portrait → image right; Next HRT/Ravenswatch landscape → image below; Portfolio no-image)
- Experience and education cards render correctly
- Mobile: hamburger menu works and collapses on link click

- [ ] **Step 5: Production build**

```bash
pnpm run build
```

Expected: build completes with 0 errors and output in `dist/`.
