import { expect, test } from '@playwright/test';

import portfolio from '../../data/portfolio/portfolio.json' with { type: 'json' };

test.use({ contextOptions: { reducedMotion: 'reduce' } });

for (const colorScheme of ['light', 'dark'] as const) {
  for (const width of [320, 1440]) {
    test(`${colorScheme} ${width}px preserves all roles, logos and independent keyboard disclosures`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/#experience');
      const experience = page.getByRole('region', { name: 'Over a decade shipping software.' });
      await expect(experience.locator('details')).toHaveCount(10);
      await expect(experience.locator('details[open]')).toHaveCount(1);
      await expect(page.locator('#experience-1')).toHaveAttribute('open', '');
      for (const [index, position] of portfolio.positions.entries()) {
        const disclosure = page.locator(`#experience-${index + 1}`);
        const summary = disclosure.locator('summary');
        await expect(summary).toContainText(position.positionName);
        await expect(summary).toContainText(position.companyName + ' · ' + position.dateRange);
        await summary.focus();
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
        await expect(summary).toBeFocused();
        await expect(summary).toHaveCSS('outline-style', 'solid');
        if (index > 0) await page.keyboard.press('Enter');
        await expect(disclosure).toHaveAttribute('open', '');
        await expect(disclosure.locator('img')).toHaveAttribute('src', '/' + position.logo);
        await expect(disclosure.locator('img')).toHaveAttribute('width', '56');
        await expect(disclosure.locator('img')).toHaveAttribute('height', '56');
        await expect(disclosure.getByRole('listitem')).toHaveText(position.responsibilities);
      }
      await expect(experience.locator('details[open]')).toHaveCount(10);
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(0);
    });
  }

  test(`${colorScheme} opens the linked role without closing the initially open role`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto('/#experience-2');
    await expect(page.locator('#experience-2')).toHaveAttribute('open', '');
    await expect(page.locator('#experience-1')).toHaveAttribute('open', '');
    await expect(page.locator('#experience-2 summary')).toBeInViewport();
  });
}

test.describe('experience without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`${colorScheme} keeps the first role open and other roles operable at 320px`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.setViewportSize({ width: 320, height: 900 });
      await page.goto('/#experience');
      await expect(page.locator('#experience-1')).toHaveAttribute('open', '');
      const second = page.locator('#experience-2');
      await second.locator('summary').focus();
      await page.keyboard.press('Space');
      await expect(second).toHaveAttribute('open', '');
      await expect(second.getByRole('list')).toBeVisible();
      await expect(page.locator('#experience-1')).toHaveAttribute('open', '');
      await page.keyboard.press('Enter');
      await expect(second).not.toHaveAttribute('open', '');
      await expect(second.getByRole('list')).toBeHidden();
    });
  }
});
