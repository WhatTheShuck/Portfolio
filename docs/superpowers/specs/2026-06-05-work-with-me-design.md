# Work With Me Page — Design Spec

**Date:** 2026-06-05
**Owner:** Brandon Wiedman
**Status:** Approved (pending implementation plan)

---

## 1. Overview

A new `/work-with-me` page advertising Brandon's web development services to small and medium businesses in Australia. The page replaces the current empty `src/pages/work-with-me.astro` stub with a single, focused, long-form page that converts inbound interest into structured project briefs.

The page is part of the existing personal portfolio site (`brandonwiedman.com`, hosted on GitHub Pages) and reuses the existing Astro + Tailwind + theming setup. No new design system, no new framework, no new routes beyond `/work-with-me` itself.

---

## 2. Goals

- Position Brandon as a maker of tailored, business-specific websites for Australian SMBs — distinguished from off-the-shelf platforms (Shopify, Wix, etc.) on both customisation and total cost.
- Capture qualified inbound interest via a structured brief form, with a plain email fallback for visitors who prefer it.
- Establish credibility despite a single current client (Luminous Path), by combining one real client case study with one production employer project (Next HRT) and a strip of additional portfolio work.
- Quietly signal availability for iOS / SwiftUI app development without diluting the primary website pitch.

## Non-goals

- This is not a separate business site. Voice and visuals remain consistent with the rest of the portfolio.
- No pricing transparency (no fixed packages or "starting from" figures). The positioning is comparison-only: cheaper than off-the-shelf platforms.
- No blog, insights section, or process page. Single page only.
- No equal billing for app development. Apps are a quiet "also available" mention.

---

## 3. Page architecture

The page is organised top-to-bottom around the visitor's decision journey: hook → why you → proof → next-best fit → take action.

| # | Section | Anchor | Purpose | Approx. height |
|---|---------|--------|---------|----------------|
| 1 | Hero | (top) | One-line pitch + sub-pitch + primary CTA button anchoring to `#brief`. | Compact, ~half-viewport. |
| 2 | Why tailored, not templated | `#why` | 3 value props + comparison angle. The positioning argument. | Medium. |
| 3 | Proof (case study + production project + other work) | `#proof` | Luminous Path case study, Next HRT framed as production project, "Other recent builds" strip. | Largest. |
| 4 | Also available — apps | `#apps` | Quiet two-line note about SwiftUI app availability. | Single paragraph. |
| 5 | Brief / contact | `#brief` | Structured brief form + email fallback. | Medium. |
| 6 | Footer | — | Reused `Footer.astro`. | Reused. |

Anchor links are used so the hero CTA can deep-link to `#brief` and the page is shareable to specific sections.

---

## 4. Section details

### 4.1 Hero (`WorkWithMeHero.astro`)

**Final copy (approved):**

> **Your website, built for your business. Not 10,000 others.**
>
> Tailored web development for Australian small and medium businesses — by someone you can actually reach. No template lock-in, no agency handoffs, and cheaper than Shopify, Wix, or wherever else you're stuck.

**CTA button:** "Tell me about your project →" → scrolls to `#brief`.

**Typography:** matches existing `Hero.astro` — `text-5xl sm:text-6xl font-bold text-fg` for the headline, `text-xl text-fg-muted max-w-2xl leading-relaxed` for the sub-pitch.

### 4.2 Why tailored, not templated

Section heading: "Why tailored, not templated".

Three value-prop cards, each composed of an icon + 3-4 word heading + 1 sentence body:

1. **Built for your business** — bespoke to your workflow and brand, not a template adapted to fit.
   Icon: lucide `Sparkles`.
2. **Cheaper end-to-end** — a one-off custom build plus optional managed hosting from me, for less than the off-the-shelf platforms charge.
   Icon: lucide `Banknote` (or `PiggyBank`).
3. **You talk to the person building it** — no agency layers, no offshore handoffs, no support tickets queued behind enterprise customers.
   Icon: lucide `MessageSquare` (or `UserRound`).

Below the three cards, a single one-line comparison panel reinforces the pricing angle without specific numbers, e.g. "A one-off custom build plus my managed hosting comes in cheaper than ongoing platform subscriptions." (Final copy to be tuned at build time.)

**Important:** Do NOT claim "no ongoing fees." Brandon offers hosting/managed services — the angle is *cheaper*, not *free*.

### 4.3 Proof (`#proof`)

Three tiers, honestly framed:

#### Tier 1 — Client work: Luminous Path

One `CaseStudyCard.astro` with Problem / Approach / Outcome structure. ~60 words total across the three blocks. Includes client logo or screenshot, and a link to the live site if available.

> **PLACEHOLDER — content to be supplied by Brandon before launch.**
> Required: client logo or screenshot, one-sentence problem, one-to-two-sentence approach, one-sentence outcome, optional quote, link to live site.
> The card should render gracefully with a generic "Coming soon" placeholder if assets are not yet supplied.

#### Tier 2 — Production project: Next HRT

Same `CaseStudyCard.astro` component, but prefaced with an honest framing line:

> "An internal enterprise system I built end-to-end for my employer, KSB Australia."

Card content draws from the existing Next HRT entry in `data.ts` but is rewritten in Problem / Approach / Outcome shape. Links to `https://hrt.ksb.com.au` and the GitHub repo as already listed.

#### Tier 3 — Other recent builds

A compact `OtherWorkStrip.astro` row showing VIS Hub, Ravenswatch.pro, and TuneDetective 2. Each tile shows the project image (if available), title, one-line description, and links to the existing project page on the portfolio (`/vishub`, etc.) or its existing `liveUrl`.

Intro line: "Other recent work I've built or contributed to."

Tiles are derived from `projects` in `src/lib/data.ts` (single source of truth — see §6).

### 4.4 Also available — apps (`#apps`)

Two lines, low visual prominence (small heading, smaller body text, no card chrome):

> "Also available: iOS apps in SwiftUI. Currently building my own — open to client app projects too. Mention it in your brief."

### 4.5 Brief / contact (`#brief`)

Heading: "Tell me about your project."
Sub-heading: "Fill in what you can; we can sort the rest on a call."

Form fields, in order:

1. **Your name** — text, required.
2. **Business name** — text, required.
3. **Email** — email, required.
4. **Phone** — tel, optional.
5. **What kind of project?** — radio group, required. Options: New website / Redesign of existing site / iOS app / Not sure yet.
6. **Tell me about your business and what you're after** — textarea (~4 rows), required.
7. **Rough budget range** — select, required. Options: Under $2k / $2–5k / $5–10k / $10k+ / Prefer to discuss.
8. **When would you ideally launch?** — select, required. Options: ASAP / Within 3 months / 3–6 months / Flexible.
9. **Honeypot** — hidden text input with `aria-hidden="true"`, `tabindex="-1"`, off-screen positioning. Web3Forms `botcheck` field convention.

**Submit button:** "Send brief".

**Success state** (after successful POST):
> "Thanks — I'll get back to you within 2 business days."

**Error state:**
> "Something went wrong sending that. Email me directly at [contact@brandonwiedman.com](mailto:contact@brandonwiedman.com) and I'll get back to you."

**Email fallback link** beneath the form regardless of submission state:
> "Prefer email? Reach me at [contact@brandonwiedman.com](mailto:contact@brandonwiedman.com)."

See §8 for form-handling implementation detail.

---

## 5. Components

### New components (`src/components/`)

| Component | Purpose |
|-----------|---------|
| `WorkWithMeHero.astro` | Hero section. Distinct from the homepage `Hero.astro`. |
| `ValueProp.astro` | Single value-prop card (icon + heading + body). Composed 3× in §4.2. |
| `CaseStudyCard.astro` | One case study with Problem / Approach / Outcome blocks. Supports an optional preface line (used for Next HRT) and a "placeholder" state (used until Luminous Path content is supplied). |
| `OtherWorkStrip.astro` | Compact responsive tile row showing 3 portfolio items. |
| `BriefForm.astro` | Web3Forms-backed brief form with validation, honeypot, and success/error states. Includes email fallback link. |

### Reused components

- `Header.astro` — with one new nav item (see §7).
- `Footer.astro` — unchanged.

---

## 6. Data layer

### New file: `src/lib/services.ts`

Holds the content for sections that don't already live in `data.ts`:

```ts
import type { ValueProp, CaseStudy } from "./types";
import { projects } from "./data";

export const valueProps: ValueProp[] = [
  { heading: "Built for your business", body: "…", icon: "Sparkles" },
  { heading: "Cheaper end-to-end",      body: "…", icon: "Banknote" },
  { heading: "You talk to the person building it", body: "…", icon: "MessageSquare" },
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
    problem: "…",
    approach: "…",
    outcome: "…",
    quote: null,
    liveUrl: "https://hrt.ksb.com.au",
    image: "/nextHRT.png",
  },
];

const OTHER_WORK_TITLES = ["VIS Hub", "Ravenswatch.pro", "TuneDetective 2"];
export const otherWork = projects.filter(p => OTHER_WORK_TITLES.includes(p.title));
```

### Types added to `src/lib/types.ts`

```ts
export interface ValueProp {
  heading: string;
  body: string;
  icon: string; // lucide-react icon name
}

export interface CaseStudy {
  kind: "client" | "production";
  title: string;
  preface: string | null;       // honest framing line (used for production projects)
  problem: string;              // "PLACEHOLDER" until copy supplied
  approach: string;
  outcome: string;
  quote: { text: string; attribution: string } | null;
  liveUrl: string | null;
  image: string | null;         // path under /public
}
```

**Derivation principle:** `otherWork` derives from `projects` to maintain a single source of truth. If a portfolio project's copy changes, the work-with-me page updates automatically.

**Placeholder rendering:** `CaseStudyCard.astro` detects when `problem === "PLACEHOLDER"` and renders a graceful "Case study coming soon" state instead of literally printing "PLACEHOLDER".

---

## 7. Navigation

Update `src/components/Header.astro` `navItems` to include the new page first:

```ts
const navItems = [
  { href: '/work-with-me', label: 'Work With Me' },
  { href: '/#projects',    label: 'Projects'     },
  { href: '/#experience',  label: 'Experience'   },
  { href: '/#education',   label: 'Education'    },
];
```

Header behaviour (sticky show/hide on scroll, mobile menu) requires no change. The existing anchor-based nav items on the homepage continue to work from the work-with-me page because Astro routes `/#projects` to the homepage with the anchor scroll.

---

## 8. Form handling

### Backend: Web3Forms

The brief form POSTs to `https://api.web3forms.com/submit` with a Web3Forms access key (free tier, 250 submissions/month, no branding on emails).

**Access key storage:** the access key is non-secret (it's required to be public for client-side submission) but should be sourced from an environment variable (`PUBLIC_WEB3FORMS_KEY`) at build time, not hard-coded.

**Submission flow:**

1. Client-side JS captures the submit event, runs validation, disables the submit button, sets `aria-busy="true"` on the form.
2. POST as `application/json` to Web3Forms with form fields plus the access key.
3. On `success: true` response → show success state.
4. On error or network failure → show error state with mailto fallback.
5. Honeypot field (`botcheck`) is included; Web3Forms drops submissions where it's filled.

**Email fallback:** A `mailto:contact@brandonwiedman.com` link is always visible beneath the form, regardless of submission state.

### Validation

Client-side validation only (no server). Required-field validation uses native HTML `required` attributes plus visible error messages on submit. Email field uses `type="email"` for browser-level format validation. The submit handler short-circuits and focuses the first invalid field on validation failure.

### Response time commitment

The success state promises a 2-business-day response. Brandon to confirm at build time whether this commitment is appropriate, or whether to soften ("I'll get back to you as soon as I can") or remove the timeframe.

---

## 9. Visual treatment

The work-with-me page uses the existing theme tokens — `bg`, `bg-subtle`, `fg`, `fg-muted`, `border`, `accent`, `surface` — and reuses Tailwind utility patterns already present in the site. No new design system.

**Section container pattern** (matches existing pages):
```
max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8
```

**Section headings:** `text-3xl font-bold text-fg`.

**Value prop cards & case study cards:** `bg-bg-subtle border border-border rounded-lg p-6`.

**Form inputs:** `bg-bg-subtle border border-border rounded-lg px-3 py-2 text-fg focus:border-accent focus:outline-none`.

**Labels:** rendered above inputs, not floating. Required-field asterisks use `text-accent`.

**Icons:** sourced from the existing `lucide-react` package (already a dependency via `ThemePicker.tsx`).

---

## 10. Accessibility

- All form labels are associated with their inputs via `for` / `id`.
- Required fields are marked both visually (asterisk) and semantically (`aria-required="true"`).
- Honeypot field has `aria-hidden="true"`, `tabindex="-1"`, and is positioned off-screen — not just `display:none` (some bots skip hidden fields, but ours must be present in the DOM).
- Submit button toggles `aria-busy` during submission. Success and error messages are announced via an `aria-live="polite"` region.
- All interactive elements (CTA button, nav, form controls, links) have `:focus-visible` styling using the `accent` token.
- Colour contrast meets WCAG AA against the configured theme tokens — the existing theme system is assumed to satisfy this and is not re-audited as part of this work.

---

## 11. Mobile behaviour

- Form fields stack full-width below the `md` breakpoint.
- Case study cards stack vertically (already the pattern used by `ProjectCard.astro`).
- Value prop cards: 1 column on mobile, 3 columns on `md` and above.
- Other Recent Builds strip: 2 columns on mobile, 3 columns on `md` and above.
- Hero CTA button: minimum 44 × 44 px tap target.
- Existing header behaviour (mobile menu, sticky hide-on-scroll-down) is unchanged.

---

## 12. Copy strategy & voice

- **First-person, plain Australian English.** "I build websites for Australian small businesses" — not "We deliver world-class digital experiences."
- Contractions are fine ("I'll", "you're"). Avoid superlatives ("best", "leading", "industry-leading"). Avoid hedge words ("solutions", "leverage", "synergy").
- Every section reinforces one of three threads: **tailored**, **cheaper end-to-end**, **you talk to the person building it**.
- No specific dollar figures. The pricing angle is directional: cheaper than the off-the-shelf platforms.
- The pitch frames the alternative as "Shopify, Wix, or wherever else you're stuck" — naming the competition by name is intentional and gives the line bite.

---

## 13. Content gaps to fill before launch

The following content is required from Brandon before the page is launch-ready. The implementation can ship without it (rendering placeholder states), but launch should not happen until these are filled:

- [ ] **Luminous Path case study copy** — problem (1 sentence), approach (1-2 sentences), outcome (1 sentence). Optional quote with attribution.
- [ ] **Luminous Path visual** — client logo or screenshot.
- [ ] **Luminous Path live URL** (if appropriate to link).
- [ ] **Next HRT case study copy** — problem / approach / outcome rewrite of the existing description.
- [ ] **Value prop body copy** — three short sentences. Spec contains drafts but Brandon should refine.
- [ ] **Comparison panel one-liner** — the small reinforcement line within §4.2.
- [ ] **Web3Forms access key** — set as `PUBLIC_WEB3FORMS_KEY` in build environment.
- [ ] **Response-time commitment** — confirm "2 business days" or supply alternative wording.

---

## 14. Out of scope (future work)

These were considered and explicitly deferred:

- Dedicated case-study pages (option B from brainstorming). Revisit when there is enough depth per project to justify it.
- A separate `/process` page (option C). Premature until there's a real process to document.
- Pricing transparency (fixed packages or "starting from" figures). Revisit if the brief form is converting poorly because prospects can't self-qualify on budget.
- Equal billing for app development. Revisit when there is a shippable SwiftUI app in the portfolio.
- Server-side form handling (e.g. Cloudflare Worker). Revisit if Web3Forms limits become a problem or third-party reliance becomes a concern.
- Logo wall / testimonial-led hero. Revisit when there are more clients to feature.

---

## 15. Files touched

**New:**
- `src/pages/work-with-me.astro` (currently a stub — full rewrite)
- `src/components/WorkWithMeHero.astro`
- `src/components/ValueProp.astro`
- `src/components/CaseStudyCard.astro`
- `src/components/OtherWorkStrip.astro`
- `src/components/BriefForm.astro`
- `src/lib/services.ts`

**Modified:**
- `src/components/Header.astro` — add Work With Me nav item.
- `src/lib/types.ts` — add `ValueProp`, `CaseStudy` types.

**Environment:**
- `PUBLIC_WEB3FORMS_KEY` — Web3Forms access key, set at build time.
