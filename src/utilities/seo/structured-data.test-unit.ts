import { describe, expect, it } from 'vitest';

import { PORTFOLIO } from '../../data/portfolio/index.ts';
import { buildProfileStructuredData } from './structured-data.ts';

describe('buildProfileStructuredData', () => {
  it('connects the canonical website, profile page, person, and image', () => {
    const canonicalUrl = new URL('/', PORTFOLIO.url).toString();
    const data = buildProfileStructuredData({
      canonicalUrl,
      description: 'Portfolio description',
      title: 'Portfolio title',
    });

    expect(data['@context']).toBe('https://schema.org');
    expect(data['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'WebSite', url: canonicalUrl }),
        expect.objectContaining({
          '@type': 'ProfilePage',
          mainEntity: { '@id': `${canonicalUrl}#person` },
          url: canonicalUrl,
        }),
        expect.objectContaining({
          '@type': 'Person',
          name: PORTFOLIO.name,
          sameAs: Object.values(PORTFOLIO.socialPages),
          url: canonicalUrl,
        }),
        expect.objectContaining({
          '@type': 'ImageObject',
          height: PORTFOLIO.avatar.height,
          width: PORTFOLIO.avatar.width,
        }),
      ]),
    );
  });

  it('includes every technology as a declared area of knowledge', () => {
    const data = buildProfileStructuredData({
      canonicalUrl: PORTFOLIO.url,
      description: 'Portfolio description',
      title: 'Portfolio title',
    });
    const graph = data['@graph'] as Array<Record<string, unknown>>;
    const person = graph.find((entry) => entry['@type'] === 'Person');
    const expectedCount = PORTFOLIO.techStack.flatMap((category) => category.items).length;

    expect(person?.['knowsAbout']).toHaveLength(expectedCount);
  });

  it('does not infer alumni relationships from course and certification content', () => {
    const data = buildProfileStructuredData({
      canonicalUrl: PORTFOLIO.url,
      description: 'Portfolio description',
      title: 'Portfolio title',
    });
    const graph = data['@graph'] as Array<Record<string, unknown>>;
    const person = graph.find((entry) => entry['@type'] === 'Person');

    expect(person).not.toHaveProperty('alumniOf');
  });
});
