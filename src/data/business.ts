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
  /**
   * Optional reviewer profile photo URL (e.g. the Google profile image).
   * When omitted, the site shows a monogram avatar built from the name.
   */
  avatar?: string;
}

export const business = {
  /** Business name shown throughout the site. */
  name: 'PAS Appliance Repair',

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
    import.meta.env.PUBLIC_SITE_URL ?? 'https://pas-appliance-repair.example.com',

  /** Contact details. The phone number is the single source of truth. */
  phone: {
    display: '(437) 992-3243',
    href: 'tel:+14379923243',
  },

  /** Email contact. */
  email: {
    display: 'pasappliancerepairs@gmail.com',
    href: 'mailto:pasappliancerepairs@gmail.com',
  },

  /**
   * Google reviews. Until genuine data is supplied this stays empty and the
   * site shows a clearly-labelled placeholder instead of fabricated reviews.
   */
  reviews: {
    /** Google Business Profile / reviews URL. Add when supplied. */
    profileUrl: 'https://maps.app.goo.gl/aAqkCundMWtZCUJC6' as string | null,
    /** Real review excerpts. Add when supplied by the business. */
    items: [
      {
        author: 'Tushar Luthra',
        rating: 5,
        text: "They've helped me with the repair of my dishwasher and undoubtedly they are very professional and knowledgeable. It didn't take them long to identify the problem and their charges were nominal too.",
        relativeDate: 'a month ago',
      },
      {
        author: 'Erkhes Bayan',
        rating: 5,
        text: 'Great fast service! Akash is a real professional!',
        relativeDate: 'a week ago',
      },
      {
        author: 'Gurpreet Singh',
        rating: 5,
        text: 'Great job done with my dryer Thank you 🙏',
        relativeDate: 'a week ago',
      },
      {
        author: 'Inderdeep Kalra',
        rating: 5,
        text: 'I had my washer and dryer serviced today and was happy with the experience. The technician was professional, explained the work clearly, and took the time to answer my questions. I appreciate the service and would recommend them.',
        relativeDate: '2 weeks ago',
      },
      {
        author: 'tanmay',
        rating: 5,
        text: 'Great service quick in and out with reasonable charge. I call for my rental property and with smooth service and transection done without even meeting technician. 🙏🙏Great and friendly service🙏🙏',
        relativeDate: '3 weeks ago',
      },
    ] as ReviewItem[],
  },

  /** Social profiles. */
  social: {
    instagram: 'https://www.instagram.com/pas_appliance/',
    facebook: 'https://www.facebook.com/p/PAS-Appliance-repair-61593736977810/',
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
