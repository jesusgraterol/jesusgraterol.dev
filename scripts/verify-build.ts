import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { PORTFOLIO } from '../src/data/portfolio/index.ts';
import { SITE_CONFIG } from '../src/site.config.ts';

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DEFAULT_BUILD_DIRECTORY = resolve(repositoryRoot, 'dist');
const REQUIRED_BUILD_PATHS = [
  'index.html',
  '404.html',
  'CNAME',
  PORTFOLIO.avatar.path,
  'favicon.ico',
  'llms.txt',
  'og.png',
  'robots.txt',
  'sitemap-index.xml',
] as const;

/** Escapes text so it can be compared with generated HTML. */
const escapeHtml = (input: string): string =>
  input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

/** Checks whether an unknown JSON value is an object record. */
const isRecord = (input: unknown): input is Record<string, unknown> =>
  typeof input === 'object' && input !== null && !Array.isArray(input);

/** Rejects em dashes from public human-facing prose. */
const verifyPunctuation = (content: string, source: string): void => {
  if (content.includes('\u2014')) throw new Error(`${source} contains a prohibited em dash.`);
};

/** Checks generated HTML for a link with the specified relationship and URL. */
const hasLinkReference = (html: string, relationship: string, href: string): boolean => {
  for (const match of html.matchAll(/<link\b[^>]*>/gu)) {
    const link = match[0];
    if (link.includes(`rel="${relationship}"`) && link.includes(`href="${href}"`)) return true;
  }

  return false;
};

/** Parses the page-level JSON-LD graph from generated HTML. */
const parseStructuredData = (html: string): Record<string, unknown> => {
  const serializedStructuredData = html.match(
    /<script type="application\/ld\+json">([^<]+)<\/script>/u,
  )?.[1];
  if (!serializedStructuredData) throw new Error('Missing homepage structured data.');

  const structuredData: unknown = JSON.parse(serializedStructuredData);
  if (!isRecord(structuredData)) throw new Error('Homepage structured data is not an object.');

  return structuredData;
};

/** Lists every file below a directory using stable relative paths. */
const listBuildFiles = async (
  directoryPath: string,
  rootPath = directoryPath,
): Promise<string[]> => {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directoryPath, entry.name);
      return entry.isDirectory()
        ? listBuildFiles(entryPath, rootPath)
        : [relative(rootPath, entryPath)];
    }),
  );

  return files.flat().toSorted();
};

/** Resolves a root-relative URL to its static artifact path. */
const resolveInternalArtifact = (href: string): string => {
  const path = href.split(/[?#]/u, 1)[0] ?? '/';
  if (path === '/') return 'index.html';
  if (extname(path)) return path.slice(1);
  return `${path.replace(/^\//u, '').replace(/\/$/u, '')}/index.html`;
};

/** Verifies the deployable site contract. */
export const verifyBuild = async (buildDirectory = DEFAULT_BUILD_DIRECTORY): Promise<void> => {
  const buildFiles = await listBuildFiles(buildDirectory);

  await Promise.all(
    REQUIRED_BUILD_PATHS.map(async (requiredPath) => access(resolve(buildDirectory, requiredPath))),
  );

  const emittedTestFile = buildFiles.find((filePath) =>
    /\.test-(?:unit|integration|e2e|bench)\./u.test(filePath),
  );
  if (emittedTestFile) throw new Error(`Production build contains a test file: ${emittedTestFile}`);

  const indexHtml = await readFile(resolve(buildDirectory, 'index.html'), 'utf8');
  verifyPunctuation(indexHtml, 'Homepage');
  const canonicalUrl = new URL('/', SITE_CONFIG.url).toString();
  const llmsTextUrl = new URL('/llms.txt', SITE_CONFIG.url).toString();
  const openGraphImageUrl = new URL(SITE_CONFIG.openGraph.image, SITE_CONFIG.url).toString();
  const requiredMetadata = [
    `<html lang="${SITE_CONFIG.language}">`,
    `<title>${SITE_CONFIG.title}</title>`,
    `content="${SITE_CONFIG.defaultDescription}"`,
    `rel="canonical" href="${canonicalUrl}"`,
    `rel="describedby" href="${llmsTextUrl}"`,
    'content="index, follow, max-image-preview:large"',
    'property="og:type" content="profile"',
    `property="og:url" content="${canonicalUrl}"`,
    `property="og:image" content="${openGraphImageUrl}"`,
    `property="og:image:secure_url" content="${openGraphImageUrl}"`,
    `property="profile:first_name" content="${SITE_CONFIG.author.givenName}"`,
    `property="profile:last_name" content="${SITE_CONFIG.author.familyName}"`,
    `property="profile:username" content="${SITE_CONFIG.author.username}"`,
    'name="twitter:card" content="summary_large_image"',
    `name="twitter:creator" content="${SITE_CONFIG.author.twitterHandle}"`,
    'type="application/ld+json"',
    '"@type":"WebSite"',
    '"@type":"ProfilePage"',
    '"@type":"Person"',
    '"@type":"ImageObject"',
  ];

  for (const metadata of requiredMetadata) {
    if (!indexHtml.includes(metadata)) throw new Error(`Missing homepage metadata: ${metadata}`);
  }
  if (hasLinkReference(indexHtml, 'alternate', llmsTextUrl)) {
    throw new Error('The homepage must not present llms.txt as an alternate representation.');
  }

  const structuredData = parseStructuredData(indexHtml);
  const structuredDataGraph: unknown = structuredData['@graph'];
  if (!Array.isArray(structuredDataGraph)) throw new Error('Homepage JSON-LD graph is missing.');
  const structuredDataEntries: Record<string, unknown>[] = structuredDataGraph.filter(isRecord);

  const website = structuredDataEntries.find((entry) => entry['@type'] === 'WebSite');
  const profilePage = structuredDataEntries.find((entry) => entry['@type'] === 'ProfilePage');
  const person = structuredDataEntries.find((entry) => entry['@type'] === 'Person');
  const image = structuredDataEntries.find((entry) => entry['@type'] === 'ImageObject');
  if (
    !isRecord(website) ||
    website['url'] !== canonicalUrl ||
    !isRecord(profilePage) ||
    profilePage['url'] !== canonicalUrl ||
    !isRecord(person) ||
    person['url'] !== canonicalUrl ||
    person['name'] !== PORTFOLIO.name ||
    !isRecord(image) ||
    image['url'] !== new URL(`/${PORTFOLIO.avatar.path}`, SITE_CONFIG.url).toString()
  ) {
    throw new Error('Homepage structured data does not match the canonical portfolio.');
  }

  const visibleContent = [
    ...PORTFOLIO.bio.content,
    ...PORTFOLIO.projects.flatMap((project) => [project.name, project.description]),
    ...PORTFOLIO.positions.flatMap((position) => [
      position.positionName,
      position.companyName,
      ...position.responsibilities,
    ]),
    ...PORTFOLIO.education.certifications.flatMap((certification) => [
      certification.degree,
      certification.institution,
      certification.grade,
    ]),
    ...PORTFOLIO.techStack.flatMap((category) => [
      category.title,
      ...category.items.map((technology) => technology.name),
    ]),
  ];

  for (const content of visibleContent) {
    if (!indexHtml.includes(escapeHtml(content)) && !indexHtml.includes(content)) {
      throw new Error(`Portfolio content is missing from the homepage: ${content}`);
    }
  }

  const internalReferences = [...indexHtml.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/gu)].map(
    (match) => match[1] ?? '/',
  );
  for (const reference of internalReferences) {
    if (reference.startsWith('/#')) continue;
    const artifactPath = resolveInternalArtifact(reference);
    if (!buildFiles.includes(artifactPath)) {
      throw new Error(`Broken internal reference: ${reference} -> ${artifactPath}`);
    }
  }

  const notFoundHtml = await readFile(resolve(buildDirectory, '404.html'), 'utf8');
  verifyPunctuation(notFoundHtml, '404 page');
  if (
    !notFoundHtml.includes('content="noindex, follow"') ||
    !notFoundHtml.includes('property="og:type" content="website"') ||
    hasLinkReference(notFoundHtml, 'alternate', llmsTextUrl)
  ) {
    throw new Error('The custom 404 page must remain excluded from search indexes.');
  }

  const llmsText = await readFile(resolve(buildDirectory, 'llms.txt'), 'utf8');
  verifyPunctuation(llmsText, 'llms.txt');
  if (
    !llmsText.startsWith(`# ${SITE_CONFIG.name}\n\n> ${SITE_CONFIG.defaultDescription}\n`) ||
    !llmsText.includes('\n## Core portfolio\n') ||
    !llmsText.includes('\n## Selected projects\n') ||
    !llmsText.includes('\n## Professional profiles\n')
  ) {
    throw new Error('llms.txt does not follow the required portfolio index structure.');
  }

  for (const project of PORTFOLIO.projects) {
    if (!llmsText.includes(`[${project.name}](${project.url})`)) {
      throw new Error(`llms.txt is missing project: ${project.name}`);
    }
  }

  const llmsLinks = [...llmsText.matchAll(/\[[^\]]+\]\((https:\/\/[^)]+)\)/gu)].map(
    (match) => match[1],
  );
  for (const link of llmsLinks) {
    if (!link) continue;
    const url = new URL(link);
    if (url.origin !== new URL(SITE_CONFIG.url).origin) continue;
    const artifactPath = resolveInternalArtifact(url.pathname);
    if (!buildFiles.includes(artifactPath)) {
      throw new Error(`Broken internal llms.txt link: ${link} -> ${artifactPath}`);
    }
  }

  const cname = (await readFile(resolve(buildDirectory, 'CNAME'), 'utf8')).trim();
  if (cname !== new URL(SITE_CONFIG.url).hostname) {
    throw new Error(`CNAME does not match ${SITE_CONFIG.url}.`);
  }

  const sitemapFiles = buildFiles.filter((filePath) => /^sitemap-\d+\.xml$/u.test(filePath));
  const sitemap = (
    await Promise.all(
      sitemapFiles.map(async (sitemapPath) =>
        readFile(resolve(buildDirectory, sitemapPath), 'utf8'),
      ),
    )
  ).join('\n');
  if (
    !sitemap.includes(`<loc>${canonicalUrl}</loc>`) ||
    sitemap.includes('/404/') ||
    buildFiles.includes('sitemap.xml')
  ) {
    throw new Error('The canonical homepage is missing from the sitemap.');
  }

  const robotsText = await readFile(resolve(buildDirectory, 'robots.txt'), 'utf8');
  if (!robotsText.includes(`Sitemap: ${SITE_CONFIG.url}/sitemap-index.xml`)) {
    throw new Error('robots.txt does not advertise the canonical sitemap index.');
  }

  const [readmeText, openGraphTemplate] = await Promise.all([
    readFile(resolve(repositoryRoot, 'README.md'), 'utf8'),
    readFile(resolve(repositoryRoot, 'scripts/open-graph-template.html'), 'utf8'),
  ]);
  verifyPunctuation(readmeText, 'README.md');
  verifyPunctuation(openGraphTemplate, 'Open Graph template');
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await verifyBuild();
}
