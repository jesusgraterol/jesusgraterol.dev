import { buildLlmsText as buildLlmsTextFile } from 'jg-site';

import { PORTFOLIO } from '../../data/portfolio/index.ts';
import { SITE_CONFIG } from '../../site.config.ts';

/** Builds the canonical LLM-readable index from the validated portfolio content. */
export const buildLlmsText = (): string => {
  const websiteUrl = new URL('/', SITE_CONFIG.url).toString();
  const sectionUrl = (fragment: string): string => new URL(`/#${fragment}`, websiteUrl).toString();
  const technologyCount = PORTFOLIO.techStack.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return buildLlmsTextFile({
    name: SITE_CONFIG.name,
    summary: SITE_CONFIG.defaultDescription,
    details: [
      'This is the canonical machine-readable index for Jesus Graterol’s portfolio. The homepage contains the complete professional history, project descriptions, education details, and technology inventory.',
    ],
    sections: [
      {
        heading: 'Core portfolio',
        links: [
          {
            title: 'Portfolio homepage',
            url: websiteUrl,
            description: `Biography and complete portfolio for ${PORTFOLIO.name}.`,
          },
          {
            title: 'Selected projects',
            url: sectionUrl('projects'),
            description: `${PORTFOLIO.projects.length} product and open-source projects with descriptions, technology tags, live links, and public source repositories when available.`,
          },
          {
            title: 'Professional experience',
            url: sectionUrl('experience'),
            description: `${PORTFOLIO.positions.length} roles with the complete responsibility history.`,
          },
          {
            title: 'Education',
            url: sectionUrl('education'),
            description: `${PORTFOLIO.education.certifications.length} degree and certification records with grades and available credentials.`,
          },
          {
            title: 'Technology stack',
            url: sectionUrl('tech-stack'),
            description: `${technologyCount} technologies grouped by discipline.`,
          },
          {
            title: 'Contact',
            url: sectionUrl('contact'),
            description: 'Email and professional profile links.',
          },
        ],
      },
      {
        heading: 'Selected projects',
        links: PORTFOLIO.projects.map((project) => ({
          title: project.name,
          url: project.url,
          description: `${project.description} Technologies: ${project.tags.join(', ')}.${
            project.githubURL ? ` [Source repository](${project.githubURL}).` : ''
          }`,
        })),
      },
      {
        heading: 'Professional profiles',
        links: [
          {
            title: 'GitHub',
            url: PORTFOLIO.socialPages.github,
            description: 'Public source repositories and open-source work.',
          },
          {
            title: 'LinkedIn',
            url: PORTFOLIO.socialPages.linkedin,
            description: 'Professional profile and work history.',
          },
          {
            title: 'Kaggle',
            url: PORTFOLIO.socialPages.kaggle,
            description: 'Data science notebooks and profile.',
          },
          { title: 'X', url: PORTFOLIO.socialPages.twitter, description: 'Public social profile.' },
        ],
      },
      {
        heading: 'Optional',
        links: [
          {
            title: 'Website source repository',
            url: SITE_CONFIG.repositoryUrl,
            description: 'Source code, portfolio content, and issue tracker for this website.',
          },
          {
            title: `Email ${PORTFOLIO.name}`,
            url: `mailto:${PORTFOLIO.email}`,
            description: 'Direct contact.',
          },
        ],
      },
    ],
  });
};
