import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const outputDir = path.join(root, "public", "videos");
const outputPath = path.join(outputDir, "chef-booking-flow.webm");
const tempDir = path.join(root, ".tmp", "demo-video");

const demoUrl =
  process.env.DEMO_STOREFRONT_URL ?? "https://store.chefeventhub.com/";
const bundledChromiumPath = path.join(
  process.env.HOME ?? "",
  ".cache",
  "ms-playwright",
  "chromium-1208",
  "chrome-linux64",
  "chrome"
);
const executablePath =
  process.env.CHROMIUM_PATH ??
  ((await fs
    .access(bundledChromiumPath)
    .then(() => true)
    .catch(() => false))
    ? bundledChromiumPath
    : undefined);

const viewport = { width: 1280, height: 720 };

await fs.rm(tempDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(tempDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath,
});

const context = await browser.newContext({
  viewport,
  deviceScaleFactor: 1,
  recordVideo: {
    dir: tempDir,
    size: viewport,
  },
});

const page = await context.newPage();

const wait = (ms) => page.waitForTimeout(ms);

async function installDemoCursor() {
  await page.evaluate(() => {
    const existing = document.querySelector("[data-demo-cursor]");
    existing?.remove();

    const cursor = document.createElement("div");
    cursor.dataset.demoCursor = "true";
    cursor.innerHTML = `
      <svg data-demo-cursor-arrow viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 3.5 25.5 18l-9.1 1.4 5.1 8.7-4.9 2.8-5-8.6-5.8 6.9L5 3.5Z" />
      </svg>
      <div data-demo-cursor-ring></div>
    `;
    Object.assign(cursor.style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: "40px",
      height: "40px",
      zIndex: "2147483647",
      pointerEvents: "none",
      transform: "translate3d(1120px, 120px, 0)",
      filter: "drop-shadow(0 10px 18px rgba(17, 24, 39, 0.38))",
    });

    const arrow = cursor.querySelector("[data-demo-cursor-arrow]");
    const ring = cursor.querySelector("[data-demo-cursor-ring]");

    Object.assign(arrow.style, {
      position: "absolute",
      left: "0",
      top: "0",
      width: "34px",
      height: "34px",
      fill: "#111827",
      stroke: "#ffffff",
      strokeWidth: "2.5",
      paintOrder: "stroke fill",
    });

    Object.assign(ring.style, {
      position: "absolute",
      left: "3px",
      top: "3px",
      width: "24px",
      height: "24px",
      borderRadius: "999px",
      border: "3px solid rgba(17, 24, 39, 0.7)",
      boxSizing: "border-box",
      opacity: "0",
      transform: "scale(0.5)",
    });

    document.body.appendChild(cursor);

    window.__demoCursor = {
      x: 1120,
      y: 120,
      move(x, y, duration = 700) {
        const startX = this.x;
        const startY = this.y;
        const start = performance.now();
        const ease = (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        return new Promise((resolve) => {
          const frame = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = ease(progress);
            this.x = startX + (x - startX) * eased;
            this.y = startY + (y - startY) * eased;
            cursor.style.transform = `translate3d(${this.x - 6}px, ${
              this.y - 5
            }px, 0)`;

            if (progress < 1) {
              requestAnimationFrame(frame);
            } else {
              resolve();
            }
          };

          requestAnimationFrame(frame);
        });
      },
      click() {
        return new Promise((resolve) => {
          ring.animate(
            [
              { opacity: 0.65, transform: "scale(0.55)" },
              { opacity: 0, transform: "scale(1.75)" },
            ],
            { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" }
          );
          arrow.animate(
            [
              { transform: "scale(1)" },
              { transform: "scale(0.82)" },
              { transform: "scale(1)" },
            ],
            { duration: 220, easing: "ease-out" }
          );
          window.setTimeout(resolve, 260);
        });
      },
    };
  });
}

async function moveCursor(x, y, duration) {
  await page.evaluate(
    ({ x: targetX, y: targetY, duration: ms }) =>
      window.__demoCursor.move(targetX, targetY, ms),
    { x, y, duration }
  );
}

async function cursorClick(locator, options = {}) {
  const box = await locator.boundingBox();
  if (!box) return false;

  const x = box.x + box.width * (options.xRatio ?? 0.5);
  const y = box.y + box.height * (options.yRatio ?? 0.5);
  await moveCursor(x, y, options.duration ?? 650);
  await page.evaluate(() => window.__demoCursor.click());
  await locator.click({ timeout: options.timeout ?? 3000 });
  return true;
}

async function clickFirstVisible(selectors, options = {}) {
  for (const selector of selectors) {
    const locator =
      typeof selector === "string" ? page.locator(selector).first() : selector;
    try {
      await locator.waitFor({ state: "visible", timeout: 1200 });
      if (await cursorClick(locator, options)) return true;
    } catch {
      // Try the next selector. The live storefront changes often enough that
      // resilient labels are better than one brittle selector.
    }
  }

  return false;
}

async function fillFirstVisible(selectors, value) {
  for (const selector of selectors) {
    const locator =
      typeof selector === "string" ? page.locator(selector).first() : selector;
    try {
      await locator.waitFor({ state: "visible", timeout: 1000 });
      const box = await locator.boundingBox();
      if (!box) continue;
      await moveCursor(box.x + Math.min(220, box.width / 2), box.y + box.height / 2, 520);
      await page.evaluate(() => window.__demoCursor.click());
      await locator.click();
      await locator.fill(value);
      await wait(350);
      return true;
    } catch {
      // Keep the capture moving if this field is absent on the current demo.
    }
  }

  return false;
}

async function selectFirstVisible(selectors, value) {
  for (const selector of selectors) {
    const locator =
      typeof selector === "string" ? page.locator(selector).first() : selector;
    try {
      await locator.waitFor({ state: "visible", timeout: 1000 });
      const box = await locator.boundingBox();
      if (!box) continue;
      await moveCursor(box.x + Math.min(220, box.width / 2), box.y + box.height / 2, 520);
      await page.evaluate(() => window.__demoCursor.click());
      await locator.selectOption(value);
      await wait(350);
      return true;
    } catch {
      // Keep trying other visible controls.
    }
  }

  return false;
}

async function scrollTo(y, duration = 850) {
  await page.evaluate(
    ({ top, ms }) =>
      new Promise((resolve) => {
        const start = window.scrollY;
        const distance = top - start;
        const startedAt = performance.now();
        const ease = (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const frame = (now) => {
          const progress = Math.min(1, (now - startedAt) / ms);
          window.scrollTo(0, start + distance * ease(progress));
          if (progress < 1) requestAnimationFrame(frame);
          else resolve();
        };

        requestAnimationFrame(frame);
      }),
    { top: y, ms: duration }
  );
}

try {
  await page.goto(demoUrl, { waitUntil: "networkidle", timeout: 60_000 });
  await installDemoCursor();
  await wait(900);

  await moveCursor(880, 92, 750);
  await wait(300);

  await clickFirstVisible([
    page.getByRole("link", { name: /browse our menus/i }),
    page.getByRole("link", { name: /our menus/i }),
    'a[href="/menus"]',
  ]);

  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
  await installDemoCursor();
  await wait(600);
  await scrollTo(340);
  await wait(450);

  await clickFirstVisible(
    [
      page.getByRole("link", { name: /request this experience/i }),
      page.getByRole("link", { name: /book/i }),
      'a[href*="/request"]',
    ],
    { duration: 820 }
  );

  await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
  await installDemoCursor();
  await wait(700);

  await clickFirstVisible(
    [
      page.getByRole("button", { name: "Next Step", exact: true }),
      page.getByRole("button", { name: /^2$/ }),
    ],
    { duration: 650 }
  );
  await wait(500);

  await fillFirstVisible([page.locator('input[type="date"]')], "2026-08-15");
  await clickFirstVisible(
    [page.getByRole("button", { name: "6:00 PM", exact: true })],
    { duration: 520 }
  );
  await selectFirstVisible([page.locator("select")], "18:00");
  await clickFirstVisible(
    [page.getByRole("button", { name: /contact information/i })],
    { duration: 520 }
  );
  await wait(300);

  await fillFirstVisible(
    [
      page.getByLabel(/first name/i),
      page.getByPlaceholder(/first name/i),
      'input[name="firstName"]',
      'input[placeholder*="First" i]',
    ],
    "Alex"
  );
  await fillFirstVisible(
    [
      page.getByLabel(/last name/i),
      page.getByPlaceholder(/last name/i),
      'input[name="lastName"]',
      'input[placeholder*="Last" i]',
    ],
    "Morgan"
  );
  await fillFirstVisible(
    [
      page.getByLabel(/email/i),
      page.getByPlaceholder(/email/i),
      'input[name="email"]',
      'input[type="email"]',
    ],
    "alex@example.com"
  );
  await fillFirstVisible(
    [
      page.getByLabel(/phone/i),
      page.getByPlaceholder("(702) 349-6158"),
      'input[name="phone"]',
      'input[type="tel"]',
    ],
    "(555) 123-0188"
  );
  await clickFirstVisible(
    [page.getByRole("button", { name: /event address/i })],
    { duration: 520 }
  );
  await wait(300);
  await fillFirstVisible([page.getByPlaceholder("123 Main St")], "123 Market St");
  await fillFirstVisible([page.getByPlaceholder("New York")], "Austin");
  await fillFirstVisible([page.getByPlaceholder("NY")], "TX");
  await fillFirstVisible([page.getByPlaceholder("10001")], "78701");

  await scrollTo(Math.max(0, await page.evaluate(() => document.body.scrollHeight - 760)));
  await wait(450);
  await clickFirstVisible(
    [
      page.getByRole("button", { name: "Next Step", exact: true }),
      page.getByRole("button", { name: /review|submit|request/i }),
    ],
    { duration: 650 }
  );
  await wait(900);

  await clickFirstVisible(
    [
      page.getByRole("button", { name: "Vegetarian", exact: true }),
      page.getByRole("button", { name: "Gluten-Free", exact: true }),
    ],
    { duration: 520 }
  );
  await fillFirstVisible(
    [page.getByPlaceholder(/special occasions|preferences|allergies/i), "textarea"],
    "Anniversary dinner. Please keep dessert light and seasonal."
  );
  await wait(500);
  await scrollTo(Math.max(0, await page.evaluate(() => document.body.scrollHeight - 760)));
  await wait(500);
  await clickFirstVisible(
    [page.getByRole("button", { name: "Next Step", exact: true })],
    { duration: 650 }
  );
  await wait(2600);

  const video = page.video();
  if (!video) {
    throw new Error("Playwright did not return a recorded video.");
  }

  await page.close();
  await fs.rm(outputPath, { force: true });
  await video.saveAs(outputPath);
  await context.close();
  await browser.close();
  await fs.rm(tempDir, { recursive: true, force: true });

  console.log(`Wrote ${path.relative(root, outputPath)}`);
} catch (error) {
  await context.close().catch(() => {});
  await browser.close().catch(() => {});

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    String(error.message).includes("Executable doesn't exist")
  ) {
    throw new Error(
      "Playwright Chromium is not installed. Run `npx playwright install chromium` or set CHROMIUM_PATH to an installed Chrome/Chromium binary."
    );
  }

  throw error;
}
