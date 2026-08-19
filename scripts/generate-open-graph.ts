import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { chromium } from '@playwright/test';

const scriptDirectory = fileURLToPath(new URL('.', import.meta.url));
const templatePath = resolve(scriptDirectory, 'open-graph-template.html');
const outputPath = resolve(scriptDirectory, '../public/og.png');

/** Generates the deterministic 1200 × 630 portfolio social image. */
const generateOpenGraphImage = async (): Promise<void> => {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.goto(pathToFileURL(templatePath).toString());
    await page.evaluate(async () => document.fonts.ready);
    await page.locator('.canvas').screenshot({ path: outputPath });
  } finally {
    await browser.close();
  }
};

await generateOpenGraphImage();
