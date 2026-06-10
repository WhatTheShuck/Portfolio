# Work With Me Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/work-with-me` page as specified in `docs/superpowers/specs/2026-06-05-work-with-me-design.md` — a single long-form page advertising tailored web development to Australian SMBs, with a Web3Forms-backed structured brief form.

**Architecture:** Six new Astro components composed onto a rewritten `src/pages/work-with-me.astro`, backed by a new content module (`src/lib/services.ts`) and two new types in `src/lib/types.ts`. One navigation entry added to `Header.astro`. Form submission goes to Web3Forms via client-side `fetch`, with a permanent `mailto:` fallback link.

**Tech Stack:** Astro 6, Tailwind v4 (via `@tailwindcss/vite`), TypeScript, lucide-react (for icons in `.astro` components), React only for existing islands (no new React in this work). Form backend: Web3Forms (`https://api.web3forms.com/submit`). Package manager: pnpm.

**No-commits note:** The user has asked for no automatic commits. Every task ends in verification only. The final task hands the changes back to the user as a single working-tree diff for them to review and commit themselves.

**Verification toolchain (no test framework exists):**
- `pnpm astro check` — TypeScript and Astro type validation. Use as the per-task gate when types/data are touched.
- `pnpm build` — full structural validation. Use at the end of each component task and as the final gate.
- `pnpm dev` + browser at `http://localhost:4321/work-with-me` — visual / interactive verification of the rendered page and form.

---

## File structure

**Files created:**

| Path | Responsibility |
|------|----------------|
| `src/lib/services.ts` | Value-prop and case-study content; derives `otherWork` from existing `projects`. |
| `src/components/ValueProp.astro` | Single value-prop card. Icon + heading + 1-line body. |
| `src/components/CaseStudyCard.astro` | One case study card with Problem / Approach / Outcome. Supports an optional preface line and a placeholder state when copy is not yet supplied. |
| `src/components/OtherWorkStrip.astro` | Compact responsive tile row for additional portfolio items. |
| `src/components/WorkWithMeHero.astro` | Hero pitch + CTA button that anchors to `#brief`. |
| `src/components/BriefForm.astro` | Web3Forms-backed brief form with validation, honeypot, success/error states, and email fallback. |

**Files modified:**

| Path | Change |
|------|--------|
| `src/lib/types.ts` | Add `ValueProp` and `CaseStudy` types. |
| `src/components/Header.astro` | Add `Work With Me` as the first nav item. |
| `src/pages/work-with-me.astro` | Replace stub with full page composition. |

**Files referenced (read-only):**

- `src/lib/data.ts` — source of `projects` for `otherWork` derivation.
- `src/layouts/Layout.astro` — page wrapper; accepts `title` and `description` props.
- `src/components/ProjectCard.astro` — reference for existing styling patterns.

**Environment:**

- `PUBLIC_WEB3FORMS_KEY` — Web3Forms access key, sourced via `import.meta.env.PUBLIC_WEB3FORMS_KEY` at build time. Brandon to obtain from web3forms.com and set in build env / `.env`.

---

## Task 1: Add `ValueProp` and `CaseStudy` types

**Files:**
- Modify: `src/lib/types.ts`

- [ ] **Step 1: Append new types to `src/lib/types.ts`**

Append below the existing `PersonalInfo` interface:

```ts
export interface ValueProp {
  heading: string;
  body: string;
  icon: "Sparkles" | "Banknote" | "MessageSquare";
}

export interface CaseStudyQuote {
  text: string;
  attribution: string;
}

export interface CaseStudy {
  kind: "client" | "production";
  title: string;
  preface: string | null;
  problem: string;
  approach: string;
  outcome: string;
  quote: CaseStudyQuote | null;
  liveUrl: string | null;
  image: string | null;
}
```

Notes:
- `icon` is constrained to the three icons committed in the spec. Constraining it as a union makes `ValueProp.astro` simpler and catches typos at type-check time.
- `preface` is non-null for `kind: "production"` (used to honestly frame Next HRT) and null for `kind: "client"`.
- `problem === "PLACEHOLDER"` is the convention `CaseStudyCard.astro` will use to render a "coming soon" state (see Task 5).

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes with no new errors. (Pre-existing warnings, if any, are out of scope.)

---

## Task 2: Create `src/lib/services.ts` with value props, case studies, and derived other-work

**Files:**
- Create: `src/lib/services.ts`

- [ ] **Step 1: Write the file**

Create `src/lib/services.ts` with:

```ts
import type { ValueProp, CaseStudy, Project } from "./types";
import { projects } from "./data";

export const valueProps: ValueProp[] = [
  {
    heading: "Built for your business",
    body: "Bespoke to your workflow and brand, not a template adapted to fit.",
    icon: "Sparkles",
  },
  {
    heading: "Cheaper end-to-end",
    body: "A one-off custom build plus optional managed hosting from me, for less than the off-the-shelf platforms charge.",
    icon: "Banknote",
  },
  {
    heading: "You talk to the person building it",
    body: "No agency layers, no offshore handoffs, no support tickets queued behind enterprise customers.",
    icon: "MessageSquare",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    kind: "client",
    title: "Luminous Path",
    preface: null,
    problem: "PLACEHOLDER",
    approach: "PLACEHOLDER",
    outcome: "PLACEHOLDER",
    quote: null,
    liveUrl: null,
    image: null,
  },
  {
    kind: "production",
    title: "Next HRT",
    preface: "An internal enterprise system I built end-to-end for my employer, KSB Australia.",
    problem:
      "KSB Australia's HR team had been running on an Access database built in 2013. Deployment was fragile, access was awkward across sites, and the data model no longer matched how the business worked.",
    approach:
      "I scoped, designed, and built a replacement from scratch in Next.js with Prisma and SQLite. I gathered requirements from the HR team, shipped an MVP for buy-in, and iterated through feedback rounds with the people who use it day-to-day.",
    outcome:
      "Next HRT now runs production HR workflows for the KSB Australia team, replacing the legacy Access tool with a modern, accessible web app that the business actually owns.",
    quote: null,
    liveUrl: "https://hrt.ksb.com.au",
    image: "/nextHRT.png",
  },
];

const OTHER_WORK_TITLES = ["VIS Hub", "Ravenswatch.pro", "TuneDetective 2"];

export const otherWork: Project[] = projects.filter((p) =>
  OTHER_WORK_TITLES.includes(p.title)
);
```

Notes:
- Luminous Path case study deliberately ships with `"PLACEHOLDER"` strings — `CaseStudyCard.astro` will render a "coming soon" state for that case. The user will replace the strings once they have copy and assets.
- Next HRT copy is a rewrite of the existing description in `data.ts` into the Problem / Approach / Outcome shape required by the spec. The user can refine wording later without touching the component.
- `otherWork` derives from `projects` (single source of truth). If the user re-titles one of those projects in `data.ts`, update `OTHER_WORK_TITLES` to match.

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes with no new errors.

---

## Task 3: Build `ValueProp.astro` component

**Files:**
- Create: `src/components/ValueProp.astro`

- [ ] **Step 1: Write the component**

Create `src/components/ValueProp.astro` with:

```astro
---
import type { ValueProp } from '../lib/types';
import { Sparkles, Banknote, MessageSquare } from 'lucide-react';

interface Props {
  valueProp: ValueProp;
}

const { valueProp } = Astro.props;

const iconMap = {
  Sparkles,
  Banknote,
  MessageSquare,
};

const Icon = iconMap[valueProp.icon];
---

<div class="bg-bg-subtle border border-border rounded-lg p-6 flex flex-col gap-3">
  <Icon size={28} class="text-accent" aria-hidden="true" />
  <h3 class="text-lg font-bold text-fg">{valueProp.heading}</h3>
  <p class="text-fg-muted text-sm leading-relaxed">{valueProp.body}</p>
</div>
```

Notes:
- Icon size 28 is a deliberate middle ground — bigger than inline icons (16-20) but smaller than full visuals.
- `aria-hidden="true"` on the icon because the heading already conveys the meaning to screen readers.

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes.

---

## Task 4: Build `OtherWorkStrip.astro` component

**Files:**
- Create: `src/components/OtherWorkStrip.astro`

- [ ] **Step 1: Write the component**

Create `src/components/OtherWorkStrip.astro` with:

```astro
---
import type { Project } from '../lib/types';
import { ExternalLink } from 'lucide-react';

interface Props {
  items: Project[];
}

const { items } = Astro.props;
---

<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  {items.map((item) => {
    const href = item.liveUrl ?? item.githubUrl ?? null;
    const isExternal = href?.startsWith('http') ?? false;
    const Tag = href ? 'a' : 'div';
    return (
      <Tag
        {...(href ? { href, ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) } : {})}
        class="group bg-bg-subtle border border-border rounded-lg p-4 flex flex-col gap-2 hover:bg-surface transition-colors"
      >
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            class="w-full h-32 object-cover rounded"
            loading="lazy"
          />
        )}
        <div class="flex items-center justify-between gap-2">
          <h4 class="text-sm font-bold text-fg">{item.title}</h4>
          {href && <ExternalLink size={14} class="text-fg-muted shrink-0 group-hover:text-fg transition-colors" aria-hidden="true" />}
        </div>
        <p class="text-xs text-fg-muted leading-relaxed line-clamp-3">{item.description}</p>
      </Tag>
    );
  })}
</div>
```

Notes:
- Renders as a link when there's a URL, otherwise as a plain `div` — `Project` type makes both `liveUrl` and `githubUrl` optional.
- `line-clamp-3` truncates descriptions for a uniform tile height. The existing project descriptions in `data.ts` are long; truncation keeps the strip compact and a prospective client can click through for detail.
- 2 columns on mobile, 3 columns from `md` up — per spec.
- Internal links (e.g. `/vishub`) don't get `target="_blank"`; external ones do. This is via the `isExternal` flag.

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes.

---

## Task 5: Build `CaseStudyCard.astro` component

**Files:**
- Create: `src/components/CaseStudyCard.astro`

- [ ] **Step 1: Write the component**

Create `src/components/CaseStudyCard.astro` with:

```astro
---
import type { CaseStudy } from '../lib/types';
import { ExternalLink } from 'lucide-react';

interface Props {
  caseStudy: CaseStudy;
}

const { caseStudy } = Astro.props;

const isPlaceholder = caseStudy.problem === 'PLACEHOLDER';
---

<article class="bg-bg-subtle border border-border rounded-lg p-6 space-y-4">
  {caseStudy.preface && (
    <p class="text-xs uppercase tracking-wide text-fg-muted">{caseStudy.preface}</p>
  )}

  <div class="flex items-start justify-between gap-4">
    <h3 class="text-xl font-bold text-fg">{caseStudy.title}</h3>
    {caseStudy.liveUrl && (
      <a
        href={caseStudy.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${caseStudy.title}`}
        class="text-fg-muted hover:text-fg transition-colors shrink-0"
      >
        <ExternalLink size={18} />
      </a>
    )}
  </div>

  {isPlaceholder ? (
    <p class="text-fg-muted text-sm italic">Case study coming soon.</p>
  ) : (
    <>
      {caseStudy.image && (
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          class="rounded-lg w-full object-cover"
          style="max-height: 240px;"
          loading="lazy"
        />
      )}
      <dl class="space-y-3 text-sm">
        <div>
          <dt class="text-xs uppercase tracking-wide text-accent font-semibold mb-1">Problem</dt>
          <dd class="text-fg-muted leading-relaxed">{caseStudy.problem}</dd>
        </div>
        <div>
          <dt class="text-xs uppercase tracking-wide text-accent font-semibold mb-1">Approach</dt>
          <dd class="text-fg-muted leading-relaxed">{caseStudy.approach}</dd>
        </div>
        <div>
          <dt class="text-xs uppercase tracking-wide text-accent font-semibold mb-1">Outcome</dt>
          <dd class="text-fg-muted leading-relaxed">{caseStudy.outcome}</dd>
        </div>
      </dl>
      {caseStudy.quote && (
        <blockquote class="border-l-2 border-accent pl-4 mt-4">
          <p class="text-fg italic text-sm leading-relaxed">"{caseStudy.quote.text}"</p>
          <footer class="text-fg-muted text-xs mt-2">— {caseStudy.quote.attribution}</footer>
        </blockquote>
      )}
    </>
  )}
</article>
```

Notes:
- The `dl`/`dt`/`dd` structure is semantically correct for a labelled term/description (Problem: …, Approach: …, Outcome: …) and is friendlier to screen readers than three flat `<h4>` + `<p>` pairs.
- The placeholder branch renders for Luminous Path until the user supplies copy. The card still shows the title and any link so the section doesn't look empty.

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes.

---

## Task 6: Build `WorkWithMeHero.astro` component

**Files:**
- Create: `src/components/WorkWithMeHero.astro`

- [ ] **Step 1: Write the component**

Create `src/components/WorkWithMeHero.astro` with:

```astro
---
import { ArrowDown } from 'lucide-react';
---

<section class="pt-24 pb-12 md:pt-32 md:pb-16">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-fg leading-tight">
      Your website, built for your business. Not 10,000 others.
    </h1>
    <p class="text-lg sm:text-xl text-fg-muted max-w-3xl leading-relaxed">
      Tailored web development for Australian small and medium businesses — by someone you can actually reach.
      No template lock-in, no agency handoffs, and cheaper than Shopify, Wix, or wherever else you're stuck.
    </p>
    <div class="pt-2">
      <a
        href="#brief"
        class="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-bg font-semibold hover:opacity-90 transition-opacity min-h-[44px]"
      >
        Tell me about your project
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </div>
  </div>
</section>
```

Notes:
- `min-h-[44px]` enforces the 44 × 44 px accessibility target the spec requires for the CTA.
- Uses `bg-accent text-bg` for the primary button. If `text-bg` against `bg-accent` is illegible in any theme, swap to `text-fg` and revisit in verification. This pattern is consistent with how the accent token is used elsewhere on the site.
- Padding is `pt-24` to clear the fixed header (header is 16-height, so 24 keeps a comfortable gap). Bottom padding is shorter than typical `py-20` because the hero is the visual lead-in to the next section.

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes.

---

## Task 7: Build `BriefForm.astro` skeleton (fields + email fallback, no submission yet)

**Files:**
- Create: `src/components/BriefForm.astro`

This task creates the form structure. Task 8 wires up submission, validation, and state.

- [ ] **Step 1: Write the skeleton**

Create `src/components/BriefForm.astro` with:

```astro
---
import { Mail } from 'lucide-react';
import { personalInfo } from '../lib/data';

const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '';
---

<form
  id="brief-form"
  class="space-y-4"
  novalidate
  data-access-key={accessKey}
>
  {/* Honeypot — must be present in the DOM but invisible to users */}
  <input
    type="checkbox"
    name="botcheck"
    style="position:absolute; left:-9999px; width:1px; height:1px;"
    aria-hidden="true"
    tabindex={-1}
  />

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="flex flex-col gap-1">
      <label for="name" class="text-sm text-fg">Your name <span class="text-accent" aria-hidden="true">*</span></label>
      <input id="name" name="name" type="text" required aria-required="true"
        class="bg-bg-subtle border border-border rounded-lg px-3 py-2 text-fg focus:border-accent focus:outline-none" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="business" class="text-sm text-fg">Business name <span class="text-accent" aria-hidden="true">*</span></label>
      <input id="business" name="business" type="text" required aria-required="true"
        class="bg-bg-subtle border border-border rounded-lg px-3 py-2 text-fg focus:border-accent focus:outline-none" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="email" class="text-sm text-fg">Email <span class="text-accent" aria-hidden="true">*</span></label>
      <input id="email" name="email" type="email" required aria-required="true"
        class="bg-bg-subtle border border-border rounded-lg px-3 py-2 text-fg focus:border-accent focus:outline-none" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="phone" class="text-sm text-fg">Phone <span class="text-fg-muted text-xs">(optional)</span></label>
      <input id="phone" name="phone" type="tel"
        class="bg-bg-subtle border border-border rounded-lg px-3 py-2 text-fg focus:border-accent focus:outline-none" />
    </div>
  </div>

  <fieldset class="flex flex-col gap-2">
    <legend class="text-sm text-fg">What kind of project? <span class="text-accent" aria-hidden="true">*</span></legend>
    <div class="flex flex-wrap gap-x-6 gap-y-2">
      {[
        ['new-website', 'New website'],
        ['redesign', 'Redesign of existing site'],
        ['ios-app', 'iOS app'],
        ['not-sure', 'Not sure yet'],
      ].map(([value, label]) => (
        <label class="inline-flex items-center gap-2 text-sm text-fg-muted">
          <input type="radio" name="projectType" value={value} required class="accent-accent" />
          {label}
        </label>
      ))}
    </div>
  </fieldset>

  <div class="flex flex-col gap-1">
    <label for="details" class="text-sm text-fg">Tell me about your business and what you're after <span class="text-accent" aria-hidden="true">*</span></label>
    <textarea id="details" name="details" rows={4} required aria-required="true"
      class="bg-bg-subtle border border-border rounded-lg px-3 py-2 text-fg focus:border-accent focus:outline-none resize-y" />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="flex flex-col gap-1">
      <label for="budget" class="text-sm text-fg">Rough budget range <span class="text-accent" aria-hidden="true">*</span></label>
      <select id="budget" name="budget" required aria-required="true"
        class="bg-bg-subtle border border-border rounded-lg px-3 py-2 text-fg focus:border-accent focus:outline-none">
        <option value="">Select…</option>
        <option value="under-2k">Under $2k</option>
        <option value="2k-5k">$2–5k</option>
        <option value="5k-10k">$5–10k</option>
        <option value="10k-plus">$10k+</option>
        <option value="discuss">Prefer to discuss</option>
      </select>
    </div>
    <div class="flex flex-col gap-1">
      <label for="timeline" class="text-sm text-fg">When would you ideally launch? <span class="text-accent" aria-hidden="true">*</span></label>
      <select id="timeline" name="timeline" required aria-required="true"
        class="bg-bg-subtle border border-border rounded-lg px-3 py-2 text-fg focus:border-accent focus:outline-none">
        <option value="">Select…</option>
        <option value="asap">ASAP</option>
        <option value="3-months">Within 3 months</option>
        <option value="3-6-months">3–6 months</option>
        <option value="flexible">Flexible</option>
      </select>
    </div>
  </div>

  <button
    type="submit"
    id="brief-submit"
    class="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-accent text-bg font-semibold hover:opacity-90 transition-opacity min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
  >
    Send brief
  </button>

  <div id="brief-status" role="status" aria-live="polite" class="text-sm"></div>
</form>

<p class="text-sm text-fg-muted mt-6">
  Prefer email? Reach me at
  <a href={`mailto:${personalInfo.email}`} class="inline-flex items-center gap-1 text-fg hover:text-accent transition-colors">
    <Mail size={14} aria-hidden="true" />
    {personalInfo.email}
  </a>.
</p>
```

Notes:
- The honeypot is `botcheck`, the Web3Forms-recognised field name. Web3Forms drops submissions where it's filled.
- `accent-accent` on radios is a Tailwind utility that maps the `accent-color` CSS property to the `accent` theme token — gives the radios themed colour.
- The access key is read via `import.meta.env.PUBLIC_WEB3FORMS_KEY`. Astro exposes any `PUBLIC_`-prefixed env var to client code at build time. If unset, the form will still render but submissions will fail — Task 8 handles that case.
- The status `<div>` is `role="status"` + `aria-live="polite"`, satisfying the spec's accessibility requirement for announced success/error states.

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes.

---

## Task 8: Wire up `BriefForm.astro` submission

**Files:**
- Modify: `src/components/BriefForm.astro` (append a `<script>` block)

- [ ] **Step 1: Append the script to `BriefForm.astro`**

Add this `<script>` block at the bottom of `BriefForm.astro` (after the closing `</p>` of the email fallback):

```astro
<script>
  type BriefStatus = 'idle' | 'submitting' | 'success' | 'error';

  const form = document.getElementById('brief-form') as HTMLFormElement | null;
  const submitBtn = document.getElementById('brief-submit') as HTMLButtonElement | null;
  const statusEl = document.getElementById('brief-status') as HTMLDivElement | null;

  if (form && submitBtn && statusEl) {
    const accessKey = form.dataset.accessKey ?? '';

    const setStatus = (state: BriefStatus, message = '') => {
      form.setAttribute('aria-busy', state === 'submitting' ? 'true' : 'false');
      submitBtn.disabled = state === 'submitting';
      submitBtn.textContent = state === 'submitting' ? 'Sending…' : 'Send brief';
      statusEl.textContent = message;
      statusEl.className =
        'text-sm ' +
        (state === 'success'
          ? 'text-fg'
          : state === 'error'
            ? 'text-accent'
            : 'text-fg-muted');
    };

    const firstInvalid = (): HTMLElement | null => {
      const required = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[required]');
      for (const el of required) {
        if (!el.checkValidity()) return el;
      }
      const radioGroups = new Set<string>();
      form.querySelectorAll<HTMLInputElement>('input[type="radio"][required]').forEach((r) => radioGroups.add(r.name));
      for (const name of radioGroups) {
        const anyChecked = form.querySelector<HTMLInputElement>(`input[type="radio"][name="${name}"]:checked`);
        if (!anyChecked) {
          return form.querySelector<HTMLInputElement>(`input[type="radio"][name="${name}"]`);
        }
      }
      return null;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const invalid = firstInvalid();
      if (invalid) {
        invalid.focus();
        setStatus('error', 'Please fill in the highlighted fields.');
        return;
      }

      if (!accessKey) {
        setStatus(
          'error',
          "The form isn't configured yet. Please email me directly using the link below.",
        );
        return;
      }

      setStatus('submitting');

      const formData = new FormData(form);
      const payload: Record<string, FormDataEntryValue> = {
        access_key: accessKey,
        subject: 'New project brief from brandonwiedman.com',
        from_name: String(formData.get('name') ?? ''),
      };
      formData.forEach((value, key) => {
        payload[key] = value;
      });

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = (await response.json()) as { success: boolean; message?: string };
        if (data.success) {
          form.reset();
          setStatus('success', "Thanks — I'll get back to you within 2 business days.");
        } else {
          setStatus(
            'error',
            "Something went wrong sending that. Please email me directly using the link below.",
          );
        }
      } catch {
        setStatus(
          'error',
          "Something went wrong sending that. Please email me directly using the link below.",
        );
      }
    });
  }
</script>
```

Notes:
- The script is at the bottom of an `.astro` file, so it runs only on the page where `BriefForm` is included. Astro scopes the script to the page.
- `firstInvalid()` walks `[required]` controls and handles the radio-group case explicitly (HTML's built-in required on radios checks if *any* in the group is checked, but `querySelectorAll` returns all of them — we need group-level logic).
- The access-key absence check is the "form isn't configured yet" fallback — important for early development before the env var is set.
- Submission failure always tells the user to fall back to email; the link is permanently visible beneath the form so they have somewhere to land.

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes.

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: build succeeds. (You won't see the form rendered yet — Task 9 wires it into the page.)

---

## Task 9: Assemble `src/pages/work-with-me.astro`

**Files:**
- Modify: `src/pages/work-with-me.astro`

- [ ] **Step 1: Replace the stub with the full page**

Replace the entire contents of `src/pages/work-with-me.astro` with:

```astro
---
import Layout from '../layouts/Layout.astro';
import WorkWithMeHero from '../components/WorkWithMeHero.astro';
import ValueProp from '../components/ValueProp.astro';
import CaseStudyCard from '../components/CaseStudyCard.astro';
import OtherWorkStrip from '../components/OtherWorkStrip.astro';
import BriefForm from '../components/BriefForm.astro';
import { valueProps, caseStudies, otherWork } from '../lib/services';
---

<Layout
  title="Work With Me — Brandon Wiedman"
  description="Tailored web development for Australian small and medium businesses. Custom-built websites, optional managed hosting, cheaper than off-the-shelf platforms."
>
  <WorkWithMeHero />

  <section id="why" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
    <h2 class="text-3xl font-bold text-fg">Why tailored, not templated</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {valueProps.map((vp) => <ValueProp valueProp={vp} />)}
    </div>
    <p class="text-fg-muted text-sm leading-relaxed border-l-2 border-accent pl-4 max-w-3xl">
      A one-off custom build plus my managed hosting comes in cheaper than ongoing platform subscriptions — and you keep the site you paid for.
    </p>
  </section>

  <section id="proof" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
    <h2 class="text-3xl font-bold text-fg">Recent work</h2>
    <div class="space-y-6">
      {caseStudies.map((cs) => <CaseStudyCard caseStudy={cs} />)}
    </div>
    <div class="pt-8 space-y-4">
      <h3 class="text-lg font-bold text-fg">Other recent builds</h3>
      <p class="text-fg-muted text-sm">Other recent work I've built or contributed to.</p>
      <OtherWorkStrip items={otherWork} />
    </div>
  </section>

  <section id="apps" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <p class="text-fg-muted text-sm leading-relaxed max-w-3xl">
      <span class="text-fg font-semibold">Also available: iOS apps in SwiftUI.</span>
      I'm currently building my own and open to client app projects too. Mention it in your brief.
    </p>
  </section>

  <section id="brief" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-6">
    <div class="space-y-2">
      <h2 class="text-3xl font-bold text-fg">Tell me about your project.</h2>
      <p class="text-fg-muted">Fill in what you can; we can sort the rest on a call.</p>
    </div>
    <BriefForm />
  </section>
</Layout>
```

Notes:
- Section padding `py-20` matches the existing homepage sections — visual consistency.
- The Apps section uses `py-12` (shorter) intentionally — it's a small low-prominence note, not a section in its own right.
- `id="brief"` matches the hero CTA's `#brief` anchor.

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes.

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: build succeeds.

---

## Task 10: Add `Work With Me` to header navigation

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Add the nav item at position 0**

In `src/components/Header.astro`, find the `navItems` array (currently on lines 6-10) which reads:

```ts
const navItems = [
  { href: '/#projects',   label: 'Projects'   },
  { href: '/#experience', label: 'Experience' },
  { href: '/#education',  label: 'Education'  },
];
```

Replace it with:

```ts
const navItems = [
  { href: '/work-with-me', label: 'Work With Me' },
  { href: '/#projects',    label: 'Projects'     },
  { href: '/#experience',  label: 'Experience'   },
  { href: '/#education',   label: 'Education'    },
];
```

No other changes to `Header.astro` — the existing rendering, mobile menu, and sticky behaviour all pick up the new entry automatically.

- [ ] **Step 2: Type-check**

Run: `pnpm astro check`
Expected: passes.

---

## Task 11: Full verification — build + dev server smoke test

**Files:**
- None modified. Verification only.

- [ ] **Step 1: Full type-check and build**

Run: `pnpm astro check && pnpm build`
Expected: both pass with no new errors. If `pnpm build` fails on something Tailwind v4 related, run `pnpm install` first to ensure deps are current.

- [ ] **Step 2: Start the dev server**

Run: `pnpm dev`
Expected: server starts and prints a URL such as `http://localhost:4321/`.

- [ ] **Step 3: Smoke-test the page in a browser**

Open `http://localhost:4321/work-with-me` and verify:

1. **Header**: "Work With Me" appears as the first nav item (desktop) and in the mobile menu.
2. **Hero**: headline and sub-pitch render as approved. The "Tell me about your project" button scrolls smoothly to the brief form when clicked.
3. **Why tailored**: three value-prop cards render with `Sparkles`, `Banknote`, `MessageSquare` icons. Comparison panel renders below them.
4. **Recent work — Luminous Path**: title and "Case study coming soon." render. No `"PLACEHOLDER"` text leaks to the page.
5. **Recent work — Next HRT**: preface line, Problem / Approach / Outcome blocks, Next HRT screenshot, and live-site link render.
6. **Other recent builds**: 3 tiles (VIS Hub, Ravenswatch, TuneDetective 2). Mobile: 2 columns; desktop: 3 columns. Each tile links to its existing target (`/vishub`, `https://ravenswatch.pro`, etc.).
7. **Apps note**: single short paragraph, low visual prominence.
8. **Brief form**: all 8 visible fields render with correct labels and required asterisks. Submit button is large-tap-target. Email fallback link is visible beneath the form.
9. **Form validation (no access key set)**: submit with empty fields → focus jumps to first invalid field and status reads "Please fill in the highlighted fields." Fill everything and submit → status reads "The form isn't configured yet. Please email me directly using the link below."
10. **Responsiveness**: shrink the viewport to ~375px and re-check. Form fields go full-width, value-prop cards stack to 1 column, other-work tiles stay at 2 columns, all text remains readable.
11. **Themes**: cycle a few themes via the theme picker. Verify the accent button is still legible in each theme. If the accent button text is illegible in a theme, switch `WorkWithMeHero.astro`'s and `BriefForm.astro`'s submit button class from `text-bg` to `text-fg` and re-verify.
12. **Existing pages**: visit `/` and confirm the homepage still works as before. Click `Work With Me` in the header and confirm it routes correctly.

- [ ] **Step 4: Optional — end-to-end form submission test**

Skip this step unless the user has set `PUBLIC_WEB3FORMS_KEY`. If set:

1. Stop the dev server, set `PUBLIC_WEB3FORMS_KEY=<key>` in `.env` (create file if needed), restart dev server.
2. Submit the form with real data.
3. Verify status reads "Thanks — I'll get back to you within 2 business days." and an email arrives.
4. Verify the form clears after success.

- [ ] **Step 5: Hand the diff back to the user**

The user has asked for no commits. Run `git status` and `git diff --stat` to show them the working-tree summary. Report:

- New files created (list paths).
- Files modified (list paths).
- Any verification steps that did not pass cleanly, with a short note on each.
- Outstanding content gaps from §13 of the spec (Luminous Path copy / assets / live URL, value prop refinements, comparison-panel one-liner, `PUBLIC_WEB3FORMS_KEY`, response-time commitment confirmation).

The user will review the diff and commit it themselves.

---

## Self-review notes

Spec coverage checked against `docs/superpowers/specs/2026-06-05-work-with-me-design.md`:

| Spec section | Implemented in |
|---|---|
| §3 Page architecture (6 sections) | Task 9 (page composition) |
| §4.1 Hero | Task 6 |
| §4.2 Why tailored (3 value props + comparison) | Tasks 2 (data), 3 (component), 9 (composition) |
| §4.3 Proof (case studies + other work) | Tasks 2 (data), 4 (other-work strip), 5 (case-study card), 9 (composition) |
| §4.4 Apps mention | Task 9 |
| §4.5 Brief form | Tasks 7 (skeleton), 8 (submission) |
| §5 Components | Tasks 3, 4, 5, 6, 7, 8 |
| §6 Data layer (services.ts + types) | Tasks 1, 2 |
| §7 Navigation | Task 10 |
| §8 Form handling (Web3Forms + email fallback + validation) | Tasks 7, 8 |
| §9 Visual treatment | Distributed across component tasks |
| §10 Accessibility (labels, aria-required, honeypot, aria-live) | Tasks 5, 7, 8 |
| §11 Mobile behaviour | Tasks 4, 7, 9 |
| §12 Copy strategy | Reflected in Tasks 2, 6, 9 copy |
| §13 Content gaps | Surfaced in Task 11 Step 5 handoff |
| §15 Files touched | Matches file structure above |

No spec gaps identified.
