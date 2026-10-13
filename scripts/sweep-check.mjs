/* Dev-only: post-fix route sweep — overflow, h1, console errors, broken images. */
import { chromium } from 'playwright-core';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const CHROME = process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROUTES = [
  '/', '/fridge-repair/', '/washer-dryer-repair/', '/stove-repair/',
  '/dishwasher-repair/', '/service-areas/', '/about/', '/book-repair/',
];
const WIDTHS = [320, 375, 768, 800, 1024, 1280, 1440];

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const failures = [];
const counts = { routes: 0, checks: 0 };

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of ROUTES) {
    counts.routes++;
    const errs = [];
    page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.goto(BASE + route, { waitUntil: 'networkidle' }).catch((e) => failures.push(`${width}px ${route}: goto ${e}`));
    const r = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
    }));
    counts.checks++;
    if (r.overflow > 0) failures.push(`${width}px ${route}: overflow=${r.overflow}`);
    if (r.h1 !== 1) failures.push(`${width}px ${route}: h1=${r.h1}`);
    if (!r.title) failures.push(`${width}px ${route}: empty title`);
    if (!r.hasCanonical) failures.push(`${width}px ${route}: no canonical`);
    if (errs.length) failures.push(`${width}px ${route}: console errors: ${errs.join(' | ')}`);
    const brokenImages = await page.evaluate(() =>
      Array.from(document.images)
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc));
    if (brokenImages.length) failures.push(`${width}px ${route}: broken images ${brokenImages.join(',')}`);
  }
  await page.close();
}

await browser.close();
console.log(`swept ${counts.routes} route×viewport combos (${counts.checks} checks)`);
if (failures.length) {
  console.log('FAILURES:');
  for (const f of failures) console.log(' -', f);
  process.exit(1);
}
console.log('ALL CLEAN');