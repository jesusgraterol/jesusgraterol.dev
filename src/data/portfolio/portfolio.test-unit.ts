// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { PORTFOLIO } from './portfolio.ts';
import { PortfolioSchema } from './types.ts';

describe('portfolio content', () => {
  test('satisfies the canonical content contract', () => {
    expect(PortfolioSchema.parse(PORTFOLIO)).toStrictEqual(PORTFOLIO);
  });

  test('preserves the complete migrated content inventory', () => {
    expect(PORTFOLIO.projects).toHaveLength(7);
    expect(PORTFOLIO.positions).toHaveLength(10);
    expect(
      PORTFOLIO.positions.reduce(
        (responsibilityCount, position) => responsibilityCount + position.responsibilities.length,
        0,
      ),
    ).toBe(43);
    expect(PORTFOLIO.education.certifications).toHaveLength(5);
    expect(PORTFOLIO.techStack).toHaveLength(10);
    expect(
      PORTFOLIO.techStack.reduce(
        (technologyCount, category) => technologyCount + category.items.length,
        0,
      ),
    ).toBe(76);
  });

  test('keeps the private project repository unpublished', () => {
    const fiveMinutesProject = PORTFOLIO.projects.find(({ name }) => name === '5minutes');

    expect(fiveMinutesProject).toMatchObject({
      name: '5minutes',
      url: 'https://5minutes.jesusgraterol.dev/',
    });
    expect(fiveMinutesProject).not.toHaveProperty('githubURL');
  });

  test('places the refreshed technologies in their requested disciplines', () => {
    const technologyNamesByCategory = new Map(
      PORTFOLIO.techStack.map(({ title, items }) => [title, items.map(({ name }) => name)]),
    );

    expect(technologyNamesByCategory.get('Data science & AI')).toContain('Codex');
    expect(technologyNamesByCategory.get('Infrastructure')).toContain('GitHub Actions');
    const miscTechnologyNames = technologyNamesByCategory.get('Misc');
    expect(miscTechnologyNames).toEqual(expect.arrayContaining(['NATS', 'PayPal', 'pg-boss']));
    const stripeIndex = miscTechnologyNames?.indexOf('Stripe') ?? -1;
    expect(miscTechnologyNames?.[stripeIndex - 1]).toBe('PayPal');
  });

  test('publishes Coursera grades without inventing a UNISA credential', () => {
    const courseraPrograms = PORTFOLIO.education.certifications.filter((certification) =>
      certification.certificateURL?.startsWith('https://www.coursera.org/'),
    );
    const unisa = PORTFOLIO.education.certifications.find(
      ({ institution }) => institution === 'University of South Australia',
    );

    expect(courseraPrograms).toHaveLength(4);
    expect(courseraPrograms.every(({ grade }) => grade === '10/10')).toBe(true);
    expect(unisa?.grade).toBe('Unfinished');
    expect(unisa).not.toHaveProperty('certificateURL');
  });

  test('keeps project, position, and technology names unambiguous', () => {
    const projectNames = PORTFOLIO.projects.map(({ name }) => name);
    const positionKeys = PORTFOLIO.positions.map(
      ({ companyName, dateRange, positionName }) => `${companyName}:${positionName}:${dateRange}`,
    );
    const technologyNames = PORTFOLIO.techStack.flatMap(({ items }) =>
      items.map(({ name }) => name),
    );

    expect(new Set(projectNames).size).toBe(projectNames.length);
    expect(new Set(positionKeys).size).toBe(positionKeys.length);
    expect(new Set(technologyNames).size).toBe(technologyNames.length);
  });
});
