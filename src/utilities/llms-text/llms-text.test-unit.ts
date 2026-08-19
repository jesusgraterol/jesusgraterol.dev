// @vitest-environment node
import { describe, expect, test } from 'vitest';

import { PORTFOLIO } from '../../data/portfolio/index.ts';
import { SITE_CONFIG } from '../../site.config.ts';
import { buildLlmsText } from './llms-text.ts';

describe('buildLlmsText', () => {
  test('builds the required index structure from the canonical portfolio', () => {
    const text = buildLlmsText();

    expect(text).toMatch(/^# Jesus Graterol\n\n> .+\n/u);
    expect(text).toContain('## Core portfolio');
    expect(text).toContain('## Selected projects');
    expect(text).toContain('## Professional profiles');
    expect(text).toContain('## Optional');
    expect(text).toContain(`- [Portfolio homepage](${SITE_CONFIG.url}/)`);
    expect(text).toContain(`${PORTFOLIO.positions.length} roles`);
    expect(text).toContain('75 technologies grouped by discipline');
    expect(text).toContain('grades and available credentials');
    expect(text).toContain('[Agentic Coding](https://agenticcoding.jesusgraterol.dev/)');
    expect(text).not.toContain('verified professional profiles');
    expect(text.endsWith('\n')).toBe(true);
  });

  test('publishes every project and professional profile in source order', () => {
    const text = buildLlmsText();
    const projectOffsets = PORTFOLIO.projects.map((project) => {
      expect(text).toContain(`[${project.name}](${project.url})`);
      expect(text).toContain(`[Source repository](${project.githubURL})`);
      return text.indexOf(`[${project.name}]`);
    });

    expect(projectOffsets).toStrictEqual(projectOffsets.toSorted((left, right) => left - right));
    for (const profileUrl of Object.values(PORTFOLIO.socialPages)) {
      expect(text).toContain(profileUrl);
    }
  });
});
