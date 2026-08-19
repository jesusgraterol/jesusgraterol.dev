import { PORTFOLIO } from '../../data/portfolio/index.ts';
import { SITE_CONFIG } from '../../site.config.ts';

/** Escapes text used as a Markdown link label. */
const escapeMarkdownLabel = (label: string): string =>
  label.replaceAll('\\', '\\\\').replaceAll('[', '\\[').replaceAll(']', '\\]');

/** Collapses prose into one concise line for a Markdown file list. */
const normalizeDescription = (description: string): string =>
  description.replaceAll(/\s+/gu, ' ').trim();

/** Builds the canonical LLM-readable index from the validated portfolio content. */
export const buildLlmsText = (): string => {
  const websiteUrl = new URL('/', SITE_CONFIG.url).toString();
  const sectionUrl = (fragment: string): string => new URL(`/#${fragment}`, websiteUrl).toString();
  const technologyCount = PORTFOLIO.techStack.reduce(
    (total, category) => total + category.items.length,
    0,
  );
  const projectLinks = PORTFOLIO.projects.map(
    (project) =>
      `- [${escapeMarkdownLabel(project.name)}](${project.url}): ${normalizeDescription(project.description)} Technologies: ${project.tags.join(', ')}. [Source repository](${project.githubURL}).`,
  );

  return [
    `# ${SITE_CONFIG.name}`,
    '',
    `> ${SITE_CONFIG.defaultDescription}`,
    '',
    'This is the canonical machine-readable index for Jesus Graterol’s portfolio. The homepage contains the complete professional history, project descriptions, education details, and technology inventory.',
    '',
    '## Core portfolio',
    '',
    `- [Portfolio homepage](${websiteUrl}): Biography and complete portfolio for ${PORTFOLIO.name}.`,
    `- [Selected projects](${sectionUrl('projects')}): ${PORTFOLIO.projects.length} open-source and product projects with descriptions, technology tags, live links, and source repositories.`,
    `- [Professional experience](${sectionUrl('experience')}): ${PORTFOLIO.positions.length} roles with the complete responsibility history.`,
    `- [Education](${sectionUrl('education')}): ${PORTFOLIO.education.certifications.length} degree and certification records with grades and available credentials.`,
    `- [Technology stack](${sectionUrl('tech-stack')}): ${technologyCount} technologies grouped by discipline.`,
    `- [Contact](${sectionUrl('contact')}): Email and professional profile links.`,
    '',
    '## Selected projects',
    '',
    ...projectLinks,
    '',
    '## Professional profiles',
    '',
    `- [GitHub](${PORTFOLIO.socialPages.github}): Public source repositories and open-source work.`,
    `- [LinkedIn](${PORTFOLIO.socialPages.linkedin}): Professional profile and work history.`,
    `- [Kaggle](${PORTFOLIO.socialPages.kaggle}): Data science notebooks and profile.`,
    `- [X](${PORTFOLIO.socialPages.twitter}): Public social profile.`,
    '',
    '## Optional',
    '',
    `- [Website source repository](${SITE_CONFIG.repositoryUrl}): Source code, portfolio content, and issue tracker for this website.`,
    `- [Email ${PORTFOLIO.name}](mailto:${PORTFOLIO.email}): Direct contact.`,
    '',
  ].join('\n');
};
