/**
 * Centralized business information.
 *
 * Edit the values here and the whole site stays consistent. The phone number
 * is defined once and reused by the header, footer, sticky mobile bar, booking
 * form and every call-to-action.
 */

/** A genuine Google review excerpt, used when the business supplies real reviews. */
export interface ReviewItem {
  /** Reviewer name as shown on Google. */
  author: string;
  /** Star rating from 1–5. */
  rating: number;
  /** Review text. */
  text: string;
  /** Optional relative date, e.g. "2 months ago". */
  relativeDate?: string;
}

export const business = {
  /** Business name shown throughout the site. */
  name: 'GTA Appliance Repair',

  /** Where the business is based. */
  base: 'Brampton, Ontario',
  baseCity: 'Brampton',

  /** Primary market — Brampton first, with the wider GTA as coverage. */
  market: 'Brampton and the Greater Toronto Area',
  region: 'Ontario, Canada',
  currency: 'CAD',

  /**
   * Production URL. Keep configurable — no real domain is assumed.
   * Override with the PUBLIC_SITE_URL environment variable (Astro exposes
   * only PUBLIC_-prefixed env vars to the client/server code), or edit the
   * default. Set the same value in astro.config.mjs for the sitemap.
   */
  siteUrl:
    import.meta.env.PUBLIC_SITE_URL ?? 'https://gta-appliance-repair.example.com',

  /** Contact details. The phone number is the single source of truth. */
  phone: {
    display: '(437) 992-3243',
    href: 'tel:+14379923243',
  },

  /**
   * Google reviews. Until genuine data is supplied this stays empty and the
   * site shows a clearly-labelled placeholder instead of fabricated reviews.
   */
  reviews: {
    /** Google Business Profile / reviews URL. Add when supplied. */
    profileUrl: null as string | null,
    /** Real review excerpts. Add when supplied by the business. */
    items: [] as ReviewItem[],
  },

  /** Consistent CTA wording used across the site. */
  cta: {
    primary: 'Book a Repair',
    secondary: 'Call (437) 992-3243',
  },

  /** Navigation / interface labels. */
  nav: {
    services: 'Services',
    home: 'Home',
    serviceAreas: 'Service Areas',
    about: 'About',
    book: 'Book a Repair',
  },
} as const;

export type BusinessConfig = typeof business;
