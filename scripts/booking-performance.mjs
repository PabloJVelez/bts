import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const base = process.env.AUDIT_URL || 'http://localhost:3107';
const dwell = Number(process.env.DWELL_MS || 8000);
const mobile = process.env.MOBILE === '1';
const slow = process.env.SLOW === '1';
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 }, hasTouch: mobile });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  // Full-page throttling, including first-party content and competing media.
  if (slow) {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 100000 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }
  const start = Date.now();
  let providerStart, availabilityAt;
  page.on('request', request => {
    if (request.isNavigationRequest() && request.url().startsWith('https://calendly.com/pmltechpile/30min')) providerStart ??= Date.now() - start;
  });
  page.on('response', async response => {
    if (response.url().includes('/calendar/range') && response.ok()) {
      await response.finished();
      availabilityAt ??= Date.now() - start;
    }
  });
  await page.goto(base, { waitUntil: 'load' });
  await page.waitForTimeout(dwell);
  const beforeClick = { providerStart, availabilityAt };
  if (process.env.EXPECT_PRELOAD === "1") assert(availabilityAt !== undefined, "Availability must load before any booking interaction");
  assert.equal(await page.locator('dialog[open]').count(), 0);
  assert.equal(await page.evaluate(() => document.activeElement?.closest('dialog') !== null), false);
  if (mobile) await page.getByRole('button', { name: 'Toggle menu' }).tap();
  const cta = page.getByRole('button', { name: 'Get My Booking Page Built', exact: true }).filter({ visible: true }).first();
  const click = Date.now();
  if (mobile) await cta.tap(); else await cta.click();
  await page.locator('dialog[open]').waitFor();
  const dialogMs = Date.now() - click;
  const frame = page.frameLocator('.booking-frame');
  const date = frame.locator('button[aria-label$=" - Times available"]:not([disabled])').first();
  await date.waitFor();
  const usableDatesMs = Date.now() - click;
  const decline = frame.getByRole('button', { name: 'Decline', exact: true });
  if (await decline.isVisible()) await decline.click();
  await date.click();
  const time = frame.getByRole('button', { name: /^\d{1,2}:\d{2}(?:\s?(?:am|pm))?$/i }).first();
  await time.waitFor();
  const timeSlotsMs = Date.now() - click;
  const timings = await page.evaluate(() => ({
    fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
    load: performance.getEntriesByType('navigation')[0]?.loadEventEnd,
  }));
  console.log(JSON.stringify({ base, mobile, slow, dwell, beforeClick, providerStart, availabilityAt, dialogMs, usableDatesMs, timeSlotsMs, timings }));
  await page.getByRole('button', { name: 'Close booking', exact: true }).click();
  await page.waitForFunction(() => document.body.style.overflow === '');
  // Selecting a date is read-only. Do not select a time or submit a booking.
} finally { await browser.close(); }
