/* QA verification script (dev-only, not a site dependency).
 * Runs real-browser checks against the dev/preview server at mobile /
 * tablet / desktop widths and exercises the key interactions.
 *
 * Usage: BASE_URL=http://localhost:4323 node scripts/qa-check.mjs
 */
import { chromium } from 'playwright-core';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const CHROME = process.env.CHROME_PATH ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEL = 'tel:+14379923243';

const results = [];
const ok = (name, pass, detail = '') =>
  results.push({ name, pass: !!pass, detail });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });

const checkOverflow = async (page) =>
  page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

const newPage = (width, height = 900) => browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 1,
});

/* ---------- Mobile (375px) ---------- */
{
  const page = await newPage(375, 812);
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  ok('mobile: homepage loads', (await page.title()).includes('Appliance Repair'));
  ok('mobile: no horizontal overflow', (await checkOverflow(page)) <= 0, `overflow=${await checkOverflow(page)}`);

  // Sticky CTA visible on mobile
  ok('mobile: sticky Call/Book bar visible', await page.locator('.sticky-cta').isVisible());

  // Hamburger visible, inline nav hidden
  ok('mobile: hamburger toggle visible', await page.locator('[data-menu-toggle]').isVisible());
  ok('mobile: inline desktop nav hidden', !(await page.locator('.nav-desktop').isVisible()));

  // Open menu
  await page.click('[data-menu-toggle]');
  await page.waitForSelector('#mobile-menu.is-open', { timeout: 3000 });
  ok('mobile: menu opens (is-open class)', true);
  ok('mobile: toggle aria-expanded=true', (await page.getAttribute('[data-menu-toggle]', 'aria-expanded')) === 'true');

  const menuLinks = await page.locator('#mobile-menu a').count();
  ok('mobile: menu contains service links', menuLinks >= 4, `links=${menuLinks}`);
  ok('mobile: menu includes service-area link',
    (await page.locator('#mobile-menu a[href="/service-areas/"]').count()) === 1);

  // Escape closes
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  ok('mobile: Escape closes menu', !(await page.locator('#mobile-menu.is-open').count()));

  // Open again, navigate via menu
  await page.click('[data-menu-toggle]');
  await page.waitForSelector('#mobile-menu.is-open');
  const url = BASE + '/fridge-repair/';
  await page.locator('#mobile-menu a[href="/fridge-repair/"]').first().click();
  await page.waitForURL(url);
  ok('mobile: menu link navigates to /fridge-repair/', page.url() === url);
  ok('mobile: menu closes after navigation', !(await page.locator('#mobile-menu.is-open').count()));
  await page.waitForFunction(() => document.querySelectorAll('h1').length >= 1, null, { timeout: 5000 });
  const h1Count = await page.evaluate(() => document.querySelectorAll('h1').length);
  ok('mobile: service page has one H1', h1Count === 1, `h1=${h1Count}`);

  // tel: link present and uses the real number
  const tel = await page.getAttribute('a[href^="tel:"]', 'href');
  ok('mobile: tel: link uses real number', tel === TEL, String(tel));

  await page.close();
  if (errors.length) results.push({ name: 'mobile: console errors', pass: false, detail: errors.join(' | ') });
  else ok('mobile: no console errors', true);
}

/* ---------- Tablet (900px) ---------- */
{
  const page = await newPage(900, 1000);
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  ok('tablet: no horizontal overflow', (await checkOverflow(page)) <= 0, `overflow=${await checkOverflow(page)}`);
  ok('tablet: fat inline nav hidden (compact menu used)', !(await page.locator('.nav-desktop').isVisible()));
  ok('tablet: hamburger visible', await page.locator('[data-menu-toggle]').isVisible());
  ok('tablet: phone action visible', await page.locator('.phone-link').isVisible());

  await page.click('[data-menu-toggle]');
  await page.waitForSelector('#mobile-menu.is-open', { timeout: 3000 });
  ok('tablet: menu opens with every service + areas',
    (await page.locator('#mobile-menu a[href$="-repair/"]').count()) >= 4
      && (await page.locator('#mobile-menu a[href="/service-areas/"]').count()) === 1,
    `links=${await page.locator('#mobile-menu a').count()}`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  ok('tablet: Escape closes menu', !(await page.locator('#mobile-menu.is-open').count()));

  await page.close();
  if (errors.length) results.push({ name: 'tablet: page errors', pass: false, detail: errors.join(' | ') });
}

/* ---------- Desktop (1366px) ---------- */
{
  const page = await newPage(1366, 900);
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ok('desktop: no horizontal overflow', (await checkOverflow(page)) <= 0, `overflow=${await checkOverflow(page)}`);
  ok('desktop: inline primary nav visible', await page.locator('.nav-desktop').isVisible());
  ok('desktop: 4 service links visible inline',
    (await page.locator('.nav-desktop a[href$="-repair/"]').count()) >= 4,
    `count=${await page.locator('.nav-desktop a[href$="-repair/"]').count()}`);
  ok('desktop: service-area link visible inline',
    await page.locator('.nav-desktop a[href="/service-areas/"]').isVisible());
  ok('desktop: no Services dropdown remains', (await page.locator('[data-dropdown-toggle]').count()) === 0);
  ok('desktop: hamburger hidden', !(await page.locator('[data-menu-toggle]').isVisible()));
  ok('desktop: sticky CTA hidden', !(await page.locator('.sticky-cta').isVisible()));
  await page.close();
}

/* ---------- Booking form validation & submission ---------- */
{
  const page = await newPage(1100, 900);
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + '/book-repair/', { waitUntil: 'networkidle' });

  // Empty submit — expect inline errors
  await page.click('#booking-form button[type="submit"]');
  await page.waitForTimeout(200);
  const visibleErrors = await page.locator('.field__error:not([hidden])').count();
  ok('form: invalid submit shows inline errors', visibleErrors >= 5, `errors=${visibleErrors}`);
  ok('form: first invalid field gets focus', await page.evaluate(() => document.activeElement?.id === 'field-name'));

  // Preserved values + valid email check
  await page.fill('#field-name', 'Jane');
  await page.fill('#field-phone', '4379923243');
  await page.fill('#field-email', 'not-an-email');
  await page.fill('#field-city', 'Brampton');
  await page.fill('#field-description', 'The fridge is running but not cooling.');
  await page.selectOption('#field-appliance', 'refrigerator');
  await page.click('#booking-form button[type="submit"]');
  await page.waitForTimeout(200);
  ok('form: bad email shows inline error', await page.locator('#error-email:not([hidden])').isVisible());
  ok('form: entered values preserved', (await page.inputValue('#field-description')) === 'The fridge is running but not cooling.');

  // Valid submit → success panel
  await page.fill('#field-email', 'jane@example.com');
  await page.click('#booking-form button[type="submit"]');
  await page.waitForSelector('#booking-success:not([hidden])', { timeout: 5000 });
  ok('form: valid submit shows success panel', true);
  const successText = await page.locator('#booking-success').innerText();
  ok('form: success panel confirms receipt', /received|in touch|contact/i.test(successText), successText.slice(0, 80));

  // Preselect via query param
  await page.goto(BASE + '/book-repair/?appliance=dishwasher', { waitUntil: 'networkidle' });
  ok('form: appliance preselected from URL', (await page.inputValue('#field-appliance')) === 'dishwasher');

  await page.close();
  if (errors.length) results.push({ name: 'form: page errors', pass: false, detail: errors.join(' | ') });
}

/* ---------- Content & link integrity (bot-like crawl) ---------- */
{
  const page = await newPage(1280, 900);
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  // Redundant "Explore our services" section removed from the homepage.
  ok('content: homepage has no "Explore our services" section',
    (await page.getByRole('heading', { name: /explore our services/i }).count()) === 0);

  // Reviews are not fabricated — placeholder is clearly labelled.
  const reviewLabel = await page.locator('.review-placeholder__label').first().innerText().catch(() => '');
  ok('content: reviews show a labelled placeholder (no fake testimonials)',
    /placeholder/i.test(reviewLabel),
    reviewLabel);

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]'))
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && h.startsWith('/') && !h.startsWith('//')),
  );
  const unique = [...new Set(links)];
  const failures = [];
  for (const href of unique) {
    const resp = await page.request.get(BASE + href).catch(() => null);
    if (!resp || resp.status() >= 400) failures.push(`${href} -> ${resp?.status()}`);
  }
  ok('links: all internal links resolve (200)', failures.length === 0, failures.join(', '));
  await page.close();
}

await browser.close();

console.log(JSON.stringify({ checks: results }, null, 2));
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) process.exit(1);
