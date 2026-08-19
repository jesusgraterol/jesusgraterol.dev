import { PORTFOLIO } from '../../data/portfolio/index.ts';
import { SITE_CONFIG } from '../../site.config.ts';

import type { IProfileStructuredDataOptions } from './types.ts';

/** Builds the JSON-LD graph for the portfolio's profile page. */
export const buildProfileStructuredData = ({
  canonicalUrl,
  description,
  title,
}: IProfileStructuredDataOptions): Record<string, unknown> => {
  const profileUrl = new URL(canonicalUrl).toString();
  const websiteUrl = new URL('/', SITE_CONFIG.url).toString();
  const websiteId = `${websiteUrl}#website`;
  const profileId = `${profileUrl}#profile`;
  const personId = `${profileUrl}#person`;
  const imageUrl = new URL(`/${PORTFOLIO.avatar.path}`, SITE_CONFIG.url).toString();
  const imageId = `${imageUrl}#primaryimage`;
  const technologies = PORTFOLIO.techStack.flatMap((category) =>
    category.items.map((technology) => technology.name),
  );
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': websiteId,
        '@type': 'WebSite',
        description,
        inLanguage: SITE_CONFIG.language,
        name: SITE_CONFIG.name,
        publisher: { '@id': personId },
        url: websiteUrl,
      },
      {
        '@id': profileId,
        '@type': 'ProfilePage',
        description,
        inLanguage: SITE_CONFIG.language,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        name: title,
        primaryImageOfPage: { '@id': imageId },
        url: profileUrl,
      },
      {
        '@id': personId,
        '@type': 'Person',
        description,
        email: `mailto:${PORTFOLIO.email}`,
        image: { '@id': imageId },
        jobTitle: SITE_CONFIG.author.jobTitle,
        knowsAbout: technologies,
        name: PORTFOLIO.name,
        sameAs: Object.values(PORTFOLIO.socialPages),
        url: profileUrl,
      },
      {
        '@id': imageId,
        '@type': 'ImageObject',
        caption: SITE_CONFIG.openGraph.imageAlt,
        contentUrl: imageUrl,
        height: PORTFOLIO.avatar.height,
        url: imageUrl,
        width: PORTFOLIO.avatar.width,
      },
    ],
  };
};
