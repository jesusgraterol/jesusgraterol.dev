import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { chromium } from '@playwright/test';

const outputPath = resolve(import.meta.dirname, '../public/avatar.png');
const avatarSize = 512;
const { values } = parseArgs({ options: { check: { type: 'boolean', default: false } } });

/**
 * Renders the package's jg/ mark with an opaque background for circular avatar crops.
 * @returns A promise that resolves when the PNG is written or verified against its source.
 * @throws
 * - public/avatar.png is stale; run npm run assets:generate.
 */
const generateAvatar = async (): Promise<void> => {
  const svg = await readFile(
    fileURLToPath(import.meta.resolve('jg-personal-astro-ui/jg-mark.svg')),
    'utf8',
  );
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: avatarSize, height: avatarSize },
      deviceScaleFactor: 1,
    });
    await page.setContent(`
      <style>
        html, body { margin: 0; width: ${avatarSize}px; height: ${avatarSize}px; }
        svg { display: block; width: 100%; height: 100%; }
      </style>
      ${svg}
    `);
    // extend the mark's own background color to the square canvas without duplicating it
    await page.evaluate(() => {
      const background = document.querySelector('svg rect');
      if (background) document.body.style.backgroundColor = getComputedStyle(background).fill;
    });
    const png = await page.screenshot({ type: 'png' });

    if (values.check) {
      if (!png.equals(await readFile(outputPath))) {
        throw new Error('public/avatar.png is stale; run npm run assets:generate.');
      }
      return;
    }

    await writeFile(outputPath, png);
  } finally {
    await browser.close();
  }
};

await generateAvatar();
