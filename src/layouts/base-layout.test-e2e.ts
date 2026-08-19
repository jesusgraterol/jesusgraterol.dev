import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('portfolio', () => {
  test('publishes the complete portfolio with accessible landmark structure', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'I build software for ambitious ideas.',
    );
    const terminalBrandMark = page.locator('[data-brand-mark="terminal"]').first();
    await expect(terminalBrandMark).toHaveAttribute('src', '/favicons/128x128.png');
    await expect(terminalBrandMark).toHaveJSProperty('complete', true);
    const heroSocialLinks = page
      .locator('main > section')
      .first()
      .locator('[aria-label="Social profiles"]');
    for (const brand of ['github', 'linkedin', 'x', 'kaggle']) {
      await expect(heroSocialLinks.locator(`svg[data-brand="${brand}"] path`)).toHaveCount(1);
    }
    await expect(page.locator('#projects article')).toHaveCount(5);
    const agenticCodingProject = page
      .locator('#projects article')
      .filter({ hasText: 'Agentic Coding' });
    await expect(agenticCodingProject.getByRole('link', { name: 'Visit project' })).toHaveAttribute(
      'href',
      'https://agenticcoding.jesusgraterol.dev/',
    );
    await expect(agenticCodingProject.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      'https://github.com/jesusgraterol/agenticcoding',
    );
    await expect(page.locator('#experience details')).toHaveCount(9);
    await expect(page.locator('#education article')).toHaveCount(5);
    await expect(
      page.locator('#education').getByRole('link', { name: 'View credential' }),
    ).toHaveCount(4);
    const unisaEducation = page
      .locator('#education article')
      .filter({ hasText: 'University of South Australia' });
    await expect(unisaEducation).toContainText('Unfinished');
    await expect(unisaEducation.getByRole('link', { name: 'View credential' })).toHaveCount(0);
    await expect(page.locator('#tech-stack article')).toHaveCount(10);
    await expect(
      page.getByText(
        'Strengthened platform security by identifying and fixing vulnerabilities, improving backend reliability, and reducing operational risk.',
      ),
    ).toBeAttached();

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('supports keyboard navigation and persistent theme selection', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();

    const themeControl = page.getByRole('button', { name: /theme/u }).first();
    await themeControl.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme-preference', /dark|light/u);
    const storedTheme = await page.evaluate(() => localStorage.getItem('jesusgraterol-theme'));
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute(
      'data-theme-preference',
      storedTheme ?? 'system',
    );

    await page.evaluate(() => localStorage.setItem('jesusgraterol-theme', 'dark'));
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-resolved-theme', 'dark');
    const darkThemeResults = await new AxeBuilder({ page }).analyze();
    expect(darkThemeResults.violations).toEqual([]);
  });

  test('marks the current section in desktop and mobile navigation', async ({ page }) => {
    await page.goto('/');

    const primaryNavigation = page.getByRole('navigation', { name: 'Primary navigation' });
    await expect(primaryNavigation.getByRole('link', { name: 'Projects' })).not.toHaveAttribute(
      'aria-current',
    );

    for (const { id, label } of [
      { id: 'projects', label: 'Projects' },
      { id: 'experience', label: 'Experience' },
      { id: 'education', label: 'Education' },
      { id: 'tech-stack', label: 'Stack' },
      { id: 'contact', label: 'Contact' },
    ]) {
      await page.locator(`#${id}`).evaluate((section) => {
        document.documentElement.style.scrollBehavior = 'auto';
        section.scrollIntoView();
      });
      await expect(primaryNavigation.getByRole('link', { name: label })).toHaveAttribute(
        'aria-current',
        'location',
      );
      await expect(
        page.locator(`[aria-label="Mobile navigation"] a[data-section-link="${id}"]`),
      ).toHaveAttribute('aria-current', 'location');
      await expect(primaryNavigation.locator('a[aria-current="location"]')).toHaveCount(1);
    }
  });

  test('has no horizontal overflow at the minimum supported width', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/');
    const mobileMenu = page.locator('header details');
    await mobileMenu.locator('summary').click();
    await expect(mobileMenu).toHaveAttribute('open', '');
    await mobileMenu.getByRole('link', { name: 'Projects' }).click();
    await expect(mobileMenu).not.toHaveAttribute('open', '');
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });

  test('serves a custom, non-indexed 404 page', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'This page took a wrong turn.',
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    await expect(
      page.locator('link[rel="alternate"][href="https://jesusgraterol.dev/llms.txt"]'),
    ).toHaveCount(0);
  });

  test('publishes canonical SEO metadata and the LLM-readable index', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://jesusgraterol.dev/',
    );
    await expect(page.locator('link[rel="describedby"]')).toHaveAttribute(
      'href',
      'https://jesusgraterol.dev/llms.txt',
    );
    await expect(
      page.locator('link[rel="alternate"][href="https://jesusgraterol.dev/llms.txt"]'),
    ).toHaveCount(0);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://jesusgraterol.dev/og.png',
    );
    await expect(page.locator('meta[name="twitter:creator"]')).toHaveAttribute(
      'content',
      '@jesusgrat_dev',
    );

    const llmsResponse = await page.request.get('/llms.txt');
    expect(llmsResponse.ok()).toBe(true);
    expect(llmsResponse.headers()['content-type']).toContain('text/plain');
    const llmsText = await llmsResponse.text();
    expect(llmsText).toContain('# Jesus Graterol\n\n> ');
    expect(llmsText).toContain('## Selected projects');
    expect(llmsText).toContain('https://github.com/bitcoin-balancer');
  });
});
