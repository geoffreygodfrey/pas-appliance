# GTA Appliance Repair — website

A conversion-focused, multi-page marketing site for an appliance-repair business
based in **Brampton, Ontario** and serving Brampton and surrounding communities
across the **Greater Toronto Area**. Built with Astro as a static site.

---

## Stack

- **[Astro](https://astro.build) 7** — static output, zero client framework
- **TypeScript** — typed data layer, checked with `astro check`
- **Scoped + global CSS** — design tokens in `src/styles/`
- **[@lucide/astro](https://www.npmjs.com/package/@lucide/astro)** — icons
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** — `sitemap-index.xml`
- Remote photography from the **Pexels CDN** (resized via URL params)

No runtime JS framework. Interactivity is a few small, progressively-enhanced
Astro `<script>` blocks (mobile menu, booking form).

---

## Getting started

Requires **Node 18+** (developed on Node 24).

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:4321
npm run build     # production build to ./dist
npm run preview   # serve the production build locally
npm run check     # Astro + TypeScript diagnostics
```

### Site URL

The canonical URL and sitemap entries are configurable. Set it via env vars or
edit the defaults:

```bash
# .env or shell
PUBLIC_SITE_URL=https://your-domain.example
```

- `astro.config.mjs` reads `SITE_URL` / `PUBLIC_SITE_URL` for the sitemap.
- `src/data/business.ts` reads `PUBLIC_SITE_URL` for canonical/OG tags and
  JSON-LD (Astro only exposes `PUBLIC_`-prefixed vars to page code).

Default: `https://gta-appliance-repair.example.com`.

---

## Project structure

```
src/
  data/            # all editable content, typed
    business.ts    #   name, phone, CTAs, reviews, site URL
    services.ts    #   the 4 service pages + appliance options
    service-areas.ts
    faqs.ts
    images.ts      #   Pexels asset IDs + URL/srcset builders
  layouts/
    BaseLayout.astro     # <head>, SEO/OG, canonical, JSON-LD, robots
    ServiceLayout.astro  # renders every service page from services.ts
  components/       # Header, Footer, MobileMenu, Hero, BookingForm, …
  pages/            # routes (one .astro file per page) + robots.txt.ts
  scripts/booking.ts     # booking validation + submission boundary
  lib/icons.ts      # whitelisted Lucide icon names
  styles/           # tokens.css + global.css (design system)
public/             # favicon.svg
scripts/            # dev-only QA tooling (not shipped)
```

**Editing content:** almost all copy lives in `src/data/*`. Change the business
name, phone or CTAs in `src/data/business.ts`; change service copy, symptoms and
FAQs in `src/data/services.ts`. The service pages re-render from that data
automatically.

---

## Routes

| Route                     | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `/`                       | Home — hero, services grid, process, trust, areas    |
| `/fridge-repair/`         | Refrigerator repair                                  |
| `/washer-dryer-repair/`   | Washer **and** dryer repair                          |
| `/stove-repair/`          | Stove / cooktop repair                               |
| `/dishwasher-repair/`     | Dishwasher repair                                    |
| `/service-areas/`         | Coverage list                                        |
| `/about/`                 | Approach, diagnosis & estimates                      |
| `/book-repair/`           | Repair request form                                  |
| `404.html`                | Not-found page                                       |
| `/robots.txt`             | Generated endpoint, references the sitemap           |

Service pages are all rendered by `ServiceLayout.astro` from `services.ts`, so
the four appliance pages share one consistent structure.

### Booking form behaviour

- Client-side validation with inline errors and preserved values
- Accessible: `aria-invalid`, `aria-describedby`, focus moves to the first
  invalid field
- On a valid submit it shows a confirmation panel
- `?appliance=<id>` preselects the appliance type (e.g. the "Book a Repair"
  buttons on service pages link to `/book-repair/?appliance=refrigerator`)

The single submission boundary is `src/scripts/booking.ts`
(`submitBookingRequest`). Wire a real backend (a POST to your endpoint) into that
function — the form markup does not need to change.

---

## Configuration

Before deploying, set the following to the real business details:

- [ ] **Business name** — `src/data/business.ts` (`name`)
- [ ] **Phone number** — `src/data/business.ts` (`phone.display` and `phone.href`)
- [ ] **Google reviews** — add real review excerpts and the profile URL in
      `src/data/business.ts` (`reviews.profileUrl`, `reviews.items`). Until then
      the site shows a clearly-labelled placeholder instead of fake reviews.
- [ ] **Service areas** — `src/data/service-areas.ts`
- [ ] **Photography** — swap the Pexels stock IDs in `src/data/images.ts` for
      real business photos
- [ ] **Site URL** — set `PUBLIC_SITE_URL` (see above)
- [ ] **Backend** — implement `submitBookingRequest` in `src/scripts/booking.ts`

---

## Accessibility & SEO

- One `<h1>` per page; semantic landmarks (`header`, `nav`, `main`, `footer`)
- Skip link, visible focus styles, keyboard-operable menus (`Escape` closes,
  focus is managed)
- Unique `<title>` + meta description per page, canonical URLs, Open Graph tags,
  and WebSite/BreadcrumbList JSON-LD
- `robots.txt` generated at build time, referencing the sitemap
- Images are lazy-loaded with responsive `srcset`/`sizes` and descriptive alt text
- Verified with no horizontal overflow from 320px up to 1440px

---

## Verification scripts (dev-only)

These are QA helpers, not part of the site bundle. They drive the locally
installed Chrome via `playwright-core`.

```bash
npm run dev                          # in one terminal
node scripts/qa-check.mjs            # 34 interaction/a11y checks (any URL)
node scripts/sweep-check.mjs         # 8 routes × 7 viewports: overflow/H1/SEO

# point at another server (e.g. the production preview):
BASE_URL=http://localhost:4323 node scripts/qa-check.mjs
```

`qa-check.mjs` covers the mobile menu, desktop inline navigation, form
validation and the success state, plus a crawl of every internal link.
`sweep-check.mjs` verifies no horizontal overflow, a single `<h1>`, titles,
canonical tags and no console errors or broken images across viewports.

To test the production build specifically:

```bash
npm run build
npm run preview -- --port 4323
BASE_URL=http://localhost:4323 node scripts/qa-check.mjs
BASE_URL=http://localhost:4323 node scripts/sweep-check.mjs
```

---

## License / content note

Stock photography is used under the
[Pexels license](https://www.pexels.com/license/).
