# BESTCOR PHILS., INC. — Corporate Website

Official corporate website for **Bestcor Phils., Inc.**, a civil–electromechanical contractor based in San Jose del Monte, Bulacan, Philippines, operating since **November 2005**.

**Built on integrity. Driven by quality.**

Live: `https://bestcor.ph` (Render service: `bestcor-website.onrender.com`) · Repository: `Lihok-Technologies/bestcor-website`

---

## 1. Purpose

A standalone, production-ready corporate site that presents Bestcor's real services, real work photography and verified company facts — **without inventing social proof** (no fake clients, projects, stats, testimonials, certifications or contact data). Any detail Bestcor has not confirmed is either omitted or explicitly flagged below.

## 2. Architecture & routes

App Router, Server Components by default. Client components exist only where interaction is genuinely needed (header/sheet menu, entrance animations, quotation form).

| Route | Page |
|---|---|
| `/` | Home — hero, capability strip, services, work, about, safety & quality, CTA |
| `/about` | About Bestcor — intro, history facts, mission, vision, values |
| `/services` | Services overview — seven service lines |
| `/services/[slug]` | Service detail — preventive-maintenance, on-site-repairs, supply-installation-construction, testing-diagnostics, distribution-components-works, pole-line-transmission-works, mechanical-services |
| `/projects` | Our Work — photography-led, capability-labelled, case-study ready |
| `/gallery` | Curated 18-image presentation-photography gallery |
| `/safety-quality` | Safety & Quality approach (no fabricated certifications) |
| `/contact` | Contact + Request a Quotation |
| `/api/quotation` | Quotation intake endpoint (honest delivery semantics, see §9) |

## 3. Technology stack

- **Next.js 16** (App Router, RSC, TypeScript strict)
- **React 19**, **Tailwind CSS v4**
- **shadcn/ui** (Base UI primitives) — button, card, sheet, input, label, select, textarea, checkbox, badge, separator (only what is used)
- **Framer Motion** (`framer-motion` 13.x) — restrained entrances, `prefers-reduced-motion` honored
- **Lucide icons** + two inline brand glyphs (Facebook — lucide dropped brand icons)
- **next/font** — Oswald (technical display type) + Inter (body)
- **Playwright** — lightweight smoke suite
- Node `>=22`

## 4. UI/UX reference sources (design patterns, not code)

Bestcor's own approved design direction (owner-approved static prototype in `source-assets/reference/`, plus the brief) is the north star. **UI/UX patterns** were studied in the following MIT-licensed public repositories and adapted — not copied wholesale (no demo branding, copy or components were shipped):

- [shadcnstudio/shadcn-nextjs-ink-landing-page-free](https://github.com/shadcnstudio/shadcn-nextjs-ink-landing-page-free) — MIT. Hero, sticky-header, section rhythm, eyebrow conventions.
- [shadcnstudio/shadcn-nextjs-zolt-landing-page-free](https://github.com/shadcnstudio/shadcn-nextjs-zolt-landing-page-free) — MIT. Corporate-ish sections, service blocks.
- [shadcnstudio/shadcn-nextjs-track-landing-page-free](https://github.com/shadcnstudio/shadcn-nextjs-track-landing-page-free) — MIT. CTA/footer structure.
- [shadcnstudio/shadcn-nextjs-bistro-landing-page-free](https://github.com/shadcnstudio/shadcn-nextjs-bistro-landing-page-free) — MIT. Image-led layout approach.
- [shadcn-ui/ui](https://github.com/shadcn-ui/ui) — MIT. Base component system (adapted via the shadcn CLI, Base UI variant).

Patterns adapted: full-bleed real-photography hero with gradient overlay and technical uppercase typography, border-separated capability strip, image service cards with hover zoom + charcoal gradient, image-led work grid, editorial value pillars, image CTA band, multi-column footer, right-hand sheet mobile menu, `whileInView` reveals, focus-visible rings, reduced-motion support.

**License & attribution:** the standalone shadcnstudio reference repos above are MIT — Copyright (c) 2026 shadcn/studio — and the official [shadcn-ui/ui](https://github.com/shadcn-ui/ui) registry is MIT (© 2023 shadcn). This project **adapted patterns only**; no template code, branding, copy or components were copied, so no notices are embedded in source. Attribution is recorded here out of courtesy. The `shadcnstudio/shadcn-studio` monorepo (MIT + Commons Clause) and paid templates were explicitly avoided.

**Brand & imagery are entirely Bestcor's own** — exact owner logo and Bestcor's real Facebook-exported photographs. The design language (charcoal field, brand green ≈ `#4faf43`, brand red ≈ `#d0211a`) was calibrated from the actual logo file.

## 5. Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

> Note: if your shell exports `NODE_ENV=development` globally, run production builds as `NODE_ENV=production npm run build` (Next requires it).

## 6. Quality gates

```bash
npm run lint         # ESLint, zero warnings
npm run typecheck    # tsc --noEmit
npm run build        # production build (all routes + sitemap/robots)
npm run test:e2e     # Playwright smoke suite (starts `next start` on :3100)
```

The smoke suite covers: homepage renders, main nav works, services page, service detail, Our Work + Gallery, Safety & Quality, primary CTA → quotation flow, quotation form honest validation, and the mobile menu open/navigate/close.

## 7. Environment variables

See `.env.example`. Values are placeholders — real secrets live only in Render
environment variables, never in git:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | on Render | Canonical/OG/sitemap base URL (`https://bestcor.ph`) |
| `RESEND_API_KEY` | for email delivery | Server-side Resend key for quotation emails (never client-side) |
| `BESTCOR_QUOTATION_FROM_EMAIL` | with the key | Verified sender; interim `onboarding@resend.dev` allowed **only** to the email registered on the Resend account |
| `BESTCOR_QUOTATION_TO_EMAIL` | optional | Recipient; defaults to `info@bestcor.ph` |

Without the Resend variables the form stays honest: nothing is sent, the UI
shows "delivery not enabled", and a pre-filled email fallback to
`info@bestcor.ph` is offered. The site never claims a
submission was delivered unless the provider accepted the message.

No keys/passwords/secrets are hardcoded anywhere.

## 8. Content & image structure

- **Central content**: `src/lib/site.ts` (company facts, nav, values), `src/lib/services.ts` (seven service definitions), `src/lib/images.ts` (image manifest with per-image alt text), `src/lib/projects.ts` (completed-project records from the OWNER-supplied company profile deck), `src/lib/metadata.ts` (SEO helper).
- **Quotation logic** (server only): `src/lib/quotation/` — `validate.ts` (clean + server-side validation), `email.ts` (message + Resend transport), `service.ts` (orchestration incl. honeypot + per-IP rate limiting); thin wrapper at `src/app/api/quotation/route.ts`.
- **Source assets** (kept out of git): `source-assets/` — original logo `bestcor-logo.png`, the preserved Facebook export `bestcor-facebook-export.zip`, extracted media + `manifest.playwright.json` + `inventory.json` + full-size photos, and the approved v1 static prototype.
- **Web images**: `public/images/deck-*.webp` — optimized derivatives of ORIGINAL photographs embedded in the OWNER-supplied company profile presentation (`source-assets/bestcor-presentation/`, provenance recorded per asset in `src/lib/images.ts`); every derivative is a QA-reviewed crop, captions stay neutral.
- **Canonical logo**: `public/brand/bestcor-logo.svg` — the exact OWNER-supplied SVG artwork (never regenerated/recolored), used in the header, mobile menu, footer and social identity. Favicon/app icons are separately generated from the original square badge mark and intentionally kept (see README notes).

> Resolution note: the exported Facebook set is mostly 414×414 thumbnails (one 1200×628 feature image). Derivatives are mildly upscaled for retina and presented with dark overlays typical of engineering sites. If Bestcor can re-export original-resolution photos later, re-run `prepare-images.py` after updating sources.

## 9. Quotation architecture

Visitor → `POST /api/quotation` (Next.js server) → honeypot + validation + per-IP rate limit → **Resend** → `info@bestcor.ph` → honest response. Response semantics:

- No `RESEND_API_KEY` → `503 { code: "UNCONFIGURED" }` → UI shows an amber notice + pre-filled mailto button (nothing faked).
- Key set + provider 2xx → `200 { ok: true }` → UI shows "Sent to Bestcor".
- Provider error/timeout → `502` → UI shows an honest error with the direct-email fallback.
- The visitor's address is used as the reply-to only; mail is sent from the configured sender identity (never "from" the visitor).
- Honeypot field traps bots silently (returns success without sending); required fields, email format, service allow-list, description length and consent are enforced server-side; submissions are capped per IP (in-memory, single instance).
- No Supabase is used. **If quotation persistence is ever needed it must use a dedicated Bestcor Supabase project** — never an existing product database.

## 10. GitHub

- Repository: `Lihok-Technologies/bestcor-website`
- Branch: `main`
- `source-assets/` and all private provenance are git-ignored; only optimized web derivatives ship.

## 11. Render deployment

Standalone **Web Service** (not a static site — the quotation API needs a Node server):

- Build: `npm ci && npm run build`
- Start: `npm start`
- Node version: 22 LTS (or current default)
- Env: `NEXT_PUBLIC_SITE_URL=https://bestcor.ph`
- Auto-deploy on push to `main`

## 12. Outstanding factual confirmations (awaiting Bestcor)

Nothing below is published on the site yet:

1. ~~Exact street address~~ — resolved: full office address published from Bestcor's own company profile (8985 Emerald St., Pecsonville Subdivision, Brgy. Tungkong Mangga, City of San Jose del Monte, Bulacan 3023).
2. Official phone / mobile numbers — withheld; profile lists numbers pending currency confirmation.
3. ~~Confirm the preferred inquiry email~~ — resolved: the public inquiry email is now `info@bestcor.ph`.
4. PCAB / ISO / utility accreditations and licenses.
5. Client names, project names, locations, values and case studies.
6. Precise per-photograph descriptions (current alt text is capability-level and conservative).
7. Higher-resolution original photographs for future refreshes.
8. Any claims to statistics, awards or safety records.

**Update any of the above in one place** (`src/lib/site.ts` + README list), then re-deploy.

## 13. License note

This repository contains Bestcor's own branding and photography (used with the owner's authorization) and code assembled from MIT-licensed components/patterns (shadcn/ui, shadcn/studio templates) plus original work. It is published for the Bestcor project's own deployment.
