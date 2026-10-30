// @vitest-environment node
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, resolve } from 'node:path';

import { describe, expect, test } from 'vitest';

import { buildLlmsText } from '../src/utilities/llms-text/index.ts';
import { verifyBuild } from './verify-build.ts';

const repositoryRoot = resolve(import.meta.dirname, '..');
const EXCLUDED_DIRECTORIES = new Set(['_archive', '_archives', '_backup', '_backups']);

describe('static build artifact', () => {
  describe('content and metadata', { tags: ['full'] }, () => {
    test('contains the required content, metadata, assets, and routes', async () => {
      await expect(verifyBuild()).resolves.toBeUndefined();
    });

    test.each([
      ['missing new-tab notices', ' (opens in a new tab)', '', 'moldea'],
      [
        'incorrect source destination',
        'href="https://github.com/jesusgraterol/jg-skills"',
        'href="https://example.com/"',
        'jg-skills',
      ],
    ])(
      'verifyBuild(%s) -> rejects the project link',
      async (_scenario, original, replacement, projectName) => {
        const artifactDirectory = await mkdtemp(resolve(tmpdir(), 'portfolio-build-'));
        try {
          await cp(resolve(repositoryRoot, 'dist'), artifactDirectory, {
            recursive: true,
            filter: (sourcePath) => !EXCLUDED_DIRECTORIES.has(basename(sourcePath)),
          });
          const homepagePath = resolve(artifactDirectory, 'index.html');
          const homepage = await readFile(homepagePath, 'utf8');
          const invalidHomepage = homepage.replaceAll(original, replacement);
          expect(invalidHomepage).not.toBe(homepage);
          await writeFile(homepagePath, invalidHomepage, 'utf8');

          await expect(verifyBuild(artifactDirectory)).rejects.toThrow(
            `Homepage project links are not self-describing: ${projectName}`,
          );
        } finally {
          await rm(artifactDirectory, { recursive: true, force: true });
        }
      },
    );

    test('keeps the generated llms.txt artifact synchronized with portfolio content', async () => {
      const artifactText = await readFile(resolve(repositoryRoot, 'dist/llms.txt'), 'utf8');

      expect(artifactText).toBe(buildLlmsText());
    });
  });

  test('keeps the GitHub Pages workflow gated by verification', async () => {
    const workflow = await readFile(resolve(repositoryRoot, '.github/workflows/pages.yml'), 'utf8');
    const actionReferences = [...workflow.matchAll(/uses: [^@\s]+@([^\s]+)/gu)].map(
      (match) => match[1],
    );

    expect(workflow).toContain('pull_request:');
    expect(workflow).toContain('branches:\n      - main');
    expect(workflow).toContain('run: npm run check');
    expect(workflow).toContain("if: github.event_name != 'pull_request'");
    expect(workflow).toContain('needs: verify');
    expect(workflow).toContain("cancel-in-progress: ${{ github.event_name == 'pull_request' }}");
    expect(workflow).toContain('pages: write');
    expect(workflow).toContain('id-token: write');
    expect(workflow).not.toContain('firebase');
    expect(actionReferences).toHaveLength(5);
    expect(actionReferences.every((reference) => /^[a-f\d]{40}$/u.test(reference ?? ''))).toBe(
      true,
    );

    const deployJobIndex = workflow.indexOf('\n  deploy:');
    const configurePagesIndex = workflow.indexOf('uses: actions/configure-pages@');
    const deployPagesIndex = workflow.indexOf('uses: actions/deploy-pages@');

    expect(configurePagesIndex).toBeGreaterThan(deployJobIndex);
    expect(deployPagesIndex).toBeGreaterThan(configurePagesIndex);
  });
});
