// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Production site URL.
 *
 * Keep this configurable. Set `SITE_URL` or `PUBLIC_SITE_URL` (or edit the
 * default below) to the production domain. Use PUBLIC_SITE_URL when you also
 * want the site URL resolved inside page code (see src/data/business.ts).
 */
const site =
  process.env.SITE_URL ??
  process.env.PUBLIC_SITE_URL ??
  'https://pas-appliance-repair.example.com';

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [sitemap()],
  trailingSlash: 'ignore',
  build: {
    // Inline small assets (icons, critical CSS) for a fast first paint on mobile.
    inlineStylesheets: 'auto',
  },
});