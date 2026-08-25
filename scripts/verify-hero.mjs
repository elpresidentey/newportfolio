import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('scripts/verify-out');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function capture(name, { width, height, url }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);

  const shot = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: shot, fullPage: false });

  const metrics = await page.evaluate(() => {
    const header = document.querySelector('header');
    const nav = document.querySelector('header nav');
    const weather = document.querySelector('header')?.previousElementSibling;
    const h1 = document.querySelector('h1');
    const intro = document.querySelector('[aria-label="Skip intro"]')?.closest('div.fixed') || document.querySelector('main > div.fixed');
    const skip = document.querySelector('button[aria-label="Skip intro"]');
    const introWordmark = [...document.querySelectorAll('span')].find((el) => el.textContent?.trim().startsWith('IEL'));

    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height };
    };

    const navBox = box(nav);
    const h1Box = box(h1);
    const overlap = navBox && h1Box
      ? !(h1Box.bottom <= navBox.top || h1Box.top >= navBox.bottom || h1Box.right <= navBox.left || h1Box.left >= navBox.right)
      : null;

    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      header: box(header),
      nav: navBox,
      weather: box(weather),
      h1: h1Box,
      intro: box(intro),
      skip: box(skip),
      introWordmark: box(introWordmark),
      overlap,
      h1BelowNav: navBox && h1Box ? h1Box.top >= navBox.bottom + 8 : null,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });

  await page.close();
  return { name, shot, metrics };
}

const results = [];
results.push(await capture('intro-mobile', { width: 390, height: 844, url: 'http://localhost:3000/?intro=1' }));
results.push(await capture('intro-desktop', { width: 1280, height: 800, url: 'http://localhost:3000/?intro=1' }));
results.push(await capture('hero-mobile', { width: 390, height: 844, url: 'http://localhost:3000/?intro=0' }));
results.push(await capture('hero-desktop', { width: 1280, height: 800, url: 'http://localhost:3000/?intro=0' }));
results.push(await capture('hero-small', { width: 320, height: 568, url: 'http://localhost:3000/?intro=0' }));
results.push(await capture('intro-small', { width: 320, height: 568, url: 'http://localhost:3000/?intro=1' }));

console.log(JSON.stringify(results, null, 2));
await browser.close();
