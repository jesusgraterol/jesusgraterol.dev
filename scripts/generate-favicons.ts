import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

const scriptDirectory = fileURLToPath(new URL('.', import.meta.url));
const publicDirectory = resolve(scriptDirectory, '../public');
const faviconDirectory = resolve(publicDirectory, 'favicons');
const sourcePath = resolve(publicDirectory, 'favicon.svg');
const faviconPath = resolve(publicDirectory, 'favicon.ico');
const faviconSizes = [
  16, 32, 48, 64, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 384, 512,
];
const icoSizes = [16, 32, 48];

interface IcoImage {
  data: Buffer;
  size: number;
}

const buildIco = (images: IcoImage[]): Buffer => {
  const directory = Buffer.alloc(6 + images.length * 16);
  directory.writeUInt16LE(0, 0);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(images.length, 4);

  let imageOffset = directory.length;
  images.forEach(({ data, size }, index) => {
    const entryOffset = 6 + index * 16;
    directory.writeUInt8(size === 256 ? 0 : size, entryOffset);
    directory.writeUInt8(size === 256 ? 0 : size, entryOffset + 1);
    directory.writeUInt8(0, entryOffset + 2);
    directory.writeUInt8(0, entryOffset + 3);
    directory.writeUInt16LE(1, entryOffset + 4);
    directory.writeUInt16LE(32, entryOffset + 6);
    directory.writeUInt32LE(data.length, entryOffset + 8);
    directory.writeUInt32LE(imageOffset, entryOffset + 12);
    imageOffset += data.length;
  });

  return Buffer.concat([directory, ...images.map(({ data }) => data)]);
};

/** Generates the PNG and ICO favicon set from the canonical SVG mark. */
const generateFavicons = async (): Promise<void> => {
  const svg = await readFile(sourcePath, 'utf8');
  await mkdir(faviconDirectory, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    for (const size of faviconSizes) {
      await page.setViewportSize({ width: size, height: size });
      await page.setContent(`
        <style>
          html, body { width: ${size}px; height: ${size}px; margin: 0; background: transparent; }
          svg { display: block; width: ${size}px; height: ${size}px; }
        </style>
        ${svg}
      `);
      await page.screenshot({
        path: resolve(faviconDirectory, `${size}x${size}.png`),
        omitBackground: true,
      });
    }
  } finally {
    await browser.close();
  }

  const icoImages = await Promise.all(
    icoSizes.map(async (size) => ({
      data: await readFile(resolve(faviconDirectory, `${size}x${size}.png`)),
      size,
    })),
  );
  await writeFile(faviconPath, buildIco(icoImages));
};

await generateFavicons();
