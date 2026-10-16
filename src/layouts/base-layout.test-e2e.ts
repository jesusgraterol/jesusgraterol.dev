import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';

/** Reads the control, content, and icon positions in the same browser frame. */
const readLinkAppearance = async (link: Locator) =>
  link.evaluate((element) => {
    const contentRange = document.createRange();
    contentRange.selectNodeContents(element);
    const rectangles = [
      element.getBoundingClientRect(),
      contentRange.getBoundingClientRect(),
      ...Array.from(element.querySelectorAll('svg'), (icon) => icon.getBoundingClientRect()),
    ];

    return {
      backgroundColor: getComputedStyle(element).backgroundColor,
      bounds: rectangles.map(({ x, y, width, height }) => ({ x, y, width, height })),
    };
  });

/** Waits for the control's own transitions without disabling the behavior under test. */
const finishLinkTransitions = async (link: Locator): Promise<void> => {
  await link.evaluate(async (element) => {
    await Promise.all(element.getAnimations().map((animation) => animation.finished));
  });
};

/** Checks that hover changes color while keeping the control and its contents stationary. */
const expectStationaryHover = async (page: Page, link: Locator): Promise<void> => {
  await link.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await finishLinkTransitions(link);
  const beforeHover = await readLinkAppearance(link);

  await link.hover();
  await finishLinkTransitions(link);
  await expect
    .poll(async () => (await readLinkAppearance(link)).bounds)
    .toStrictEqual(beforeHover.bounds);
  await expect
    .poll(async () => (await readLinkAppearance(link)).backgroundColor)
    .not.toBe(beforeHover.backgroundColor);
};

test.describe('portfolio', () => {
  test('publishes the complete portfolio with accessible landmark structure', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'I build software for ambitious ideas.',
    );
    await expect(
      page.getByRole('link', {
        name: 'Jesus Graterol Software Developer',
        exact: true,
      }),
    ).toHaveAttribute('href', '/');
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
    await expect(page.locator('#projects article')).toHaveCount(7);
    await expect(page.locator('#projects').getByRole('heading', { level: 3 })).toHaveText([
      'moldea',
      '5minutes',
      'jg-skills',
      'Agentic Coding',
      'Balancer',
      'Published Packages',
      'Kaggle Notebooks',
    ]);
    await expect(page.getByRole('heading', { name: 'uipalettes', exact: true })).toHaveCount(0);
    const moldeaProject = page.locator('#projects article').first();
    await expect(moldeaProject.getByRole('heading')).toHaveText('moldea');
    await expect(moldeaProject.getByRole('link', { name: 'Visit moldea' })).toHaveAttribute(
      'href',
      'https://moldea.ai/',
    );
    await expect(moldeaProject.getByRole('list', { name: 'moldea technologies' })).toContainText(
      'Codex',
    );
    await expect(moldeaProject.getByRole('list', { name: 'moldea technologies' })).toContainText(
      'OpenAI API',
    );
    const moldeaLogo = moldeaProject.locator('img');
    await expect(moldeaLogo).toHaveAttribute('src', '/projects/moldea.png');
    await moldeaLogo.scrollIntoViewIfNeeded();
    await expect
      .poll(async () => moldeaLogo.evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    const fiveMinutesProject = page.locator('#projects article').filter({ hasText: '5minutes' });
    await expect(fiveMinutesProject.getByRole('heading')).toHaveText('5minutes');
    await expect(fiveMinutesProject.getByRole('link', { name: 'Visit 5minutes' })).toHaveAttribute(
      'href',
      'https://5minutes.jesusgraterol.dev/',
    );
    await expect(
      fiveMinutesProject.getByRole('link', { name: /source \(opens in a new tab\)$/u }),
    ).toHaveCount(0);
    const jgSkillsProject = page.locator('#projects article').filter({ hasText: 'jg-skills' });
    await expect(jgSkillsProject.getByRole('link', { name: 'Visit jg-skills' })).toHaveAttribute(
      'href',
      'https://jg-skills.jesusgraterol.dev/',
    );
    await expect(jgSkillsProject.getByRole('link', { name: 'jg-skills source' })).toHaveAttribute(
      'href',
      'https://github.com/jesusgraterol/jg-skills',
    );
    const jgSkillsLogo = jgSkillsProject.locator('img');
    await expect(jgSkillsLogo).toHaveAttribute('src', '/favicon.svg');
    await jgSkillsLogo.scrollIntoViewIfNeeded();
    await expect
      .poll(async () => jgSkillsLogo.evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    const agenticCodingProject = page
      .locator('#projects article')
      .filter({ hasText: 'Agentic Coding' });
    await expect(
      agenticCodingProject.getByRole('link', { name: 'Visit Agentic Coding' }),
    ).toHaveAttribute('href', 'https://agenticcoding.jesusgraterol.dev/');
    await expect(
      agenticCodingProject.getByRole('link', { name: 'Agentic Coding source' }),
    ).toHaveAttribute('href', 'https://github.com/jesusgraterol/agenticcoding');
    await expect(page.locator('#experience details')).toHaveCount(10);
    const currentEmployment = page.locator('#experience details').first();
    await expect(currentEmployment.locator('summary')).toContainText('Software developer');
    await expect(currentEmployment.locator('summary')).toContainText('moldea · Apr 2026 - Present');
    await expect(currentEmployment).toHaveAttribute('open', '');
    await expect(page.locator('#education article')).toHaveCount(5);
    await expect(
      page
        .locator('#education')
        .getByRole('link', { name: /^View .+ credential \(opens in a new tab\)$/u }),
    ).toHaveCount(4);
    const unisaEducation = page
      .locator('#education article')
      .filter({ hasText: 'University of South Australia' });
    await expect(unisaEducation).toContainText('Unfinished');
    await expect(
      unisaEducation.getByRole('link', { name: /^View .+ credential \(opens in a new tab\)$/u }),
    ).toHaveCount(0);
    await expect(page.locator('#tech-stack article')).toHaveCount(10);
    const aiCategory = page.locator('#tech-stack article').filter({
      has: page.getByRole('heading', { name: 'Data science & AI', exact: true }),
    });
    for (const name of ['Claude API Platform', 'Claude Code']) {
      const technology = aiCategory.getByRole('listitem').filter({ hasText: name });
      await expect(technology).toBeVisible();
      const icon = technology.locator('img');
      await expect(icon).toHaveAttribute('src', '/tech-stack/claude.png');
      await icon.scrollIntoViewIfNeeded();
      await expect
        .poll(async () => icon.evaluate((image) => (image as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
    }
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

  test('announces new tabs outside the repository navigation', async ({ page }) => {
    await page.goto('/');

    const newTabLinks = page.locator('main a[target="_blank"], footer a[target="_blank"]');
    await expect(newTabLinks).toHaveCount(27);
    for (const link of await newTabLinks.all()) {
      await expect(link).toHaveAccessibleName(/\(opens in a new tab\)$/u);
      await expect(link.locator('[data-new-tab-indicator]')).toBeVisible();
    }

    const repositoryNavigation = page.locator('header a[target="_blank"]');
    await expect(repositoryNavigation).toHaveCount(2);
    for (const link of await repositoryNavigation.all()) {
      await expect(link.locator('[data-new-tab-indicator]')).toHaveCount(0);
    }
    await expect(
      page.getByRole('link', { name: 'See selected work', exact: true }),
    ).not.toHaveAttribute('target');
    await expect(page.getByRole('link', { name: 'Email me', exact: true })).not.toHaveAttribute(
      'target',
    );
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

    await expect(page).toHaveTitle('Jesus Graterol | Software developer');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://jesusgraterol.dev/',
    );
    await expect(page.locator('link[rel="describedby"]')).toHaveAttribute(
      'href',
      'https://jesusgraterol.dev/llms.txt',
    );
    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: 'llms.txt', exact: true }),
    ).toHaveAttribute('href', '/llms.txt');
    await expect(
      page.locator('link[rel="alternate"][href="https://jesusgraterol.dev/llms.txt"]'),
    ).toHaveCount(0);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://jesusgraterol.dev/og.png',
    );
    await expect(page.locator('meta[name="twitter:creator"]')).toHaveAttribute(
      'content',
      '@jesus__graterol',
    );

    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    expect(structuredData).toContain('"alternateName":"jesusgraterol.dev"');
    expect(structuredData).toContain('"alternateName":"@jesus__graterol"');

    const llmsResponse = await page.request.get('/llms.txt');
    expect(llmsResponse.ok()).toBe(true);
    expect(llmsResponse.headers()['content-type']).toContain('text/plain');
    const llmsText = await llmsResponse.text();
    expect(llmsText).toContain('# Jesus Graterol\n\n> ');
    expect(llmsText).toContain('## Selected projects');
    expect(llmsText).toContain('https://github.com/bitcoin-balancer');
  });
});

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`CTA feedback in ${colorScheme} mode`, () => {
    test.use({ colorScheme });

    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      test.describe(`with ${reducedMotion} motion`, () => {
        test.use({ contextOptions: { reducedMotion } });

        test('keeps CTA hover feedback stationary', async ({ page }) => {
          await page.goto('/');
          expect(
            await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches),
          ).toBe(reducedMotion === 'reduce');

          for (const name of ['See selected work', 'Start a conversation', 'Email me']) {
            await expectStationaryHover(page, page.getByRole('link', { name, exact: true }));
          }

          await page.goto('/404.html');
          await expectStationaryHover(
            page,
            page.getByRole('link', { name: 'Return home', exact: true }),
          );
        });
      });
    }

    test('shows keyboard focus on the hero and contact CTAs', async ({ page }) => {
      await page.goto('/');

      for (const name of ['See selected work', 'Start a conversation', 'Email me']) {
        const link = page.getByRole('link', { name, exact: true });
        await link.focus();
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
        await expect(link).toBeFocused();
        await expect(link).toHaveCSS('outline-style', 'solid');
        await expect(link).toHaveCSS('outline-width', '2px');
        await expect(link).toHaveCSS('outline-offset', '3px');
      }

      await expect(page.getByRole('link', { name: 'Email me', exact: true })).toHaveCSS(
        'outline-color',
        'rgb(255, 255, 255)',
      );
    });
  });
}
