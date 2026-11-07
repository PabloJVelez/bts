import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.AUDIT_URL || 'http://127.0.0.1:3105';
const browser = await chromium.launch();
try {
  for (const mobile of [false, true]) {
    const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 } });
    page.setDefaultTimeout(30000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.waitForFunction(() => document.querySelector('body')?.innerText.includes('Get My Booking Page Built'));
    if (mobile) await page.getByRole('button', { name: 'Toggle menu' }).click();
    const cta = page.getByRole('button', { name: 'Get My Booking Page Built', exact: true }).filter({ visible: true }).first();
    await cta.hover();
    // The scheduler should start on intent, before the modal opens.
    await page.waitForFunction(() => !!document.querySelector('.booking-frame')?.getAttribute('src'));
    const start = Date.now();
    await cta.click();
    await page.locator('dialog[open]').waitFor();
    console.log(JSON.stringify({ mobile, modalMs: Date.now() - start }));
    const frame = page.frameLocator('.booking-frame');
    await frame.getByText(mobile ? 'Select a Day' : 'Select a Date & Time', { exact: true }).waitFor({ timeout: 30000 });
    await page.locator('.booking-status').waitFor({ state: 'hidden', timeout: 10000 });
    assert.equal(await page.getByRole('link', { name: 'Open directly in Calendly' }).count(), 0, 'Ready scheduler should hide the direct fallback');
    const bounds = await page.locator('.booking-dialog').boundingBox();
    assert(bounds.x >= 0 && bounds.width <= page.viewportSize().width);
    const originalFrame = page.frames().find(f => f.url().startsWith('https://calendly.com/pmltechpile/30min'));
    await page.getByRole('button', { name: 'Close booking', exact: true }).click();
    await page.locator('dialog[open]').waitFor({ state: 'hidden' });
    await page.waitForFunction(() => document.body.style.overflow === '', null, { timeout: 3000 });
    if (mobile) await page.getByRole('button', { name: 'Toggle menu' }).click();
    await cta.click();
    await page.locator('dialog[open]').waitFor();
    assert(page.frames().includes(originalFrame), 'Reopening should retain the loaded scheduler');
    assert.equal(await page.getByRole('link', { name: 'Open directly in Calendly' }).count(), 0, 'Retained scheduler should keep the fallback hidden');
    await page.keyboard.press('Escape');
    await page.locator('dialog[open]').waitFor({ state: 'hidden' });
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ mobile, calendarLoaded: true, retainedOnReopen: true, pageErrors: errors }));
    await page.close();
  }
  const page = await browser.newPage();
  await page.route('https://calendly.com/**', route => route.abort());
  await page.goto(base);
  await page.getByRole('button', { name: 'Get My Booking Page Built', exact: true }).first().click();
  await page.locator('dialog[open]').waitFor();
  assert.equal(await page.getByRole('link', { name: 'Open directly in Calendly' }).getAttribute('href'), 'https://calendly.com/pmltechpile/30min');
  await page.getByRole('status').filter({ hasText: 'taking longer' }).waitFor({ timeout: 12000 });
  await page.getByRole('button', { name: 'Close booking' }).click();
  await page.locator('dialog[open]').waitFor({ state: 'hidden' });
  console.log('Blocked Calendly: immediate modal, fallback link, timeout message, close all passed');
} finally {
  await browser.close();
}
