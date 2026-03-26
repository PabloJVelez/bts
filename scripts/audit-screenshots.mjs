import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.AUDIT_URL ?? "http://127.0.0.1:3000/";
const OUT_DIR = process.env.AUDIT_OUT_DIR
  ? path.resolve(process.cwd(), process.env.AUDIT_OUT_DIR)
  : path.resolve(process.cwd(), "audit", "screenshots", "pre-polish");

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function waitForFonts(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(600);
  await page.evaluate(async () => {
    // Ensure webfonts are settled if any are used.
    // eslint-disable-next-line no-undef
    if ("fonts" in document) await document.fonts.ready;
  });
  // Let motion/animations settle (Framer Motion whileInView).
  await page.waitForTimeout(650);
}

async function shot(page, fileName, fullPage = false, clip) {
  const outPath = path.join(OUT_DIR, fileName);
  await page.screenshot({ path: outPath, fullPage, clip });
  return outPath;
}

async function main() {
  await ensureDir(OUT_DIR);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Desktop baseline (1440x900)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await waitForFonts(page);

  const desktopFull = await shot(page, "desktop-full-1440x900.png", true);

  // Desktop key sections: hero, trust strip, features, final cta, footer.
  const sectionSelectors = [
    { key: "hero", selector: "main > section:nth-of-type(1)" },
    { key: "trust-strip", selector: "main > section:nth-of-type(2)" },
    { key: "features", selector: "#features" },
    { key: "final-cta", selector: "main > section:nth-last-of-type(1)" },
    { key: "footer", selector: "footer" },
  ];

  const desktopSectionShots = [];
  for (const s of sectionSelectors) {
    const el = await page.$(s.selector);
    if (!el) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    const box = await el.boundingBox();
    if (!box) continue;

    const clip = {
      x: Math.max(0, box.x),
      y: Math.max(0, box.y),
      width: Math.min(page.viewportSize().width, Math.ceil(box.width)),
      height: Math.min(page.viewportSize().height, Math.ceil(box.height)),
    };

    desktopSectionShots.push(
      await shot(page, `desktop-section-${s.key}-1440x900.png`, false, clip)
    );
  }

  // Mobile / tablet key breakpoints
  const viewports = [
    { name: "bp-1024", width: 1024, height: 900 },
    { name: "mobile-320", width: 320, height: 820 },
    { name: "bp-360", width: 360, height: 820 },
    { name: "bp-390", width: 390, height: 820 },
    { name: "bp-430", width: 430, height: 860 },
    { name: "mobile-375", width: 375, height: 820 },
    { name: "tablet-768", width: 768, height: 900 },
  ];

  const responsiveShots = [];
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await waitForFonts(page);

    responsiveShots.push(await shot(page, `${vp.name}-full.png`, true));

    for (const s of sectionSelectors) {
      const el = await page.$(s.selector);
      if (!el) continue;
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      const box = await el.boundingBox();
      if (!box) continue;
      const clip = {
        x: 0,
        y: Math.max(0, box.y),
        width: vp.width,
        height: Math.min(vp.height, Math.ceil(box.height)),
      };
      responsiveShots.push(
        await shot(page, `${vp.name}-section-${s.key}.png`, false, clip)
      );
    }
  }

  await browser.close();

  const manifest = {
    baseUrl: BASE_URL,
    outDir: OUT_DIR,
    desktopFull,
    desktopSectionShots,
    responsiveShots,
  };

  await fs.writeFile(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

