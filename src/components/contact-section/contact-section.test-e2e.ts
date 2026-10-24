import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import portfolio from '../../data/portfolio/portfolio.json' with { type: 'json' };

test.use({ contextOptions: { reducedMotion: 'reduce' } });

for (const colorScheme of ['light', 'dark'] as const) {
  for (const width of [320, 1440]) {
    test(`${colorScheme} ${width}px preserves inverse contact actions, contrast and focus`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/#contact');
      const contact = page.getByRole('region', { name: 'Let’s make something amazing.' });
      const email = contact.getByRole('link', { name: 'Email me', exact: true });
      await expect(email).toHaveAttribute('href', 'mailto:' + portfolio.email);
      const profiles = contact.getByRole('group', { name: 'Social profiles' });
      await expect(profiles.getByRole('link')).toHaveCount(4);
      for (const [label, href] of [
        ['GitHub', portfolio.socialPages.github],
        ['LinkedIn', portfolio.socialPages.linkedin],
        ['X', portfolio.socialPages.twitter],
        ['Kaggle', portfolio.socialPages.kaggle],
      ] as const) {
        const link = profiles.getByRole('link', {
          name: label + ' (opens in a new tab)',
          exact: true,
        });
        await expect(link).toHaveAttribute('href', href);
        await expect(link).toHaveAttribute('target', '_blank');
        await link.focus();
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
        await expect(link).toBeFocused();
        await expect(link).toHaveCSS('outline-style', 'solid');
        const box = await link.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(32);
      }
      await expect(contact).toHaveCSS('color-scheme', 'dark');
      const snapshot = page.getByRole('complementary', { name: 'Career snapshot' });
      await expect(snapshot).toHaveCSS('color-scheme', 'dark');
      await expect(snapshot).toContainText('10+');
      await expect(snapshot).toContainText('09');
      await expect(snapshot).toContainText('Professional roles');
      const contrast = await new AxeBuilder({ page })
        .include('#contact')
        .include('aside[aria-label="Career snapshot"]')
        .withRules(['color-contrast'])
        .analyze();
      expect(contrast.violations).toStrictEqual([]);
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
}
