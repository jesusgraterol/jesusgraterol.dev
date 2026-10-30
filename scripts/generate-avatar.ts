import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { chromium } from '@playwright/test';

const avatarSize = 512;
const avatars = [
  { source: 'jg-mark.svg', output: 'telegram-chat-avatar.png' },
  { source: 'jg-favicon.svg', output: 'telegram-bot-avatar.png' },
];
const { values } = parseArgs({ options: { check: { type: 'boolean', default: false } } });

/**
 * Renders the package's full and slash marks for the Telegram chat and bot avatars.
 * @returns A promise that resolves when both PNGs are written or verified against their sources.
 * @throws
 * - public/telegram-chat-avatar.png is stale; run npm run assets:generate.
 * - public/telegram-bot-avatar.png is stale; run npm run assets:generate.
 */
const generateAvatar = async (): Promise<void> => {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: avatarSize, height: avatarSize },
      deviceScaleFactor: 1,
    });
    for (const { source, output } of avatars) {
      const outputPath = resolve(import.meta.dirname, '../public', output);
      const svg = await readFile(
        fileURLToPath(import.meta.resolve(`jg-personal-astro-ui/${source}`)),
        'utf8',
      );
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
          throw new Error(`public/${output} is stale; run npm run assets:generate.`);
        }
        continue;
      }

      await writeFile(outputPath, png);
    }
  } finally {
    await browser.close();
  }
};

await generateAvatar();
