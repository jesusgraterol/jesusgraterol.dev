// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, test } from 'vitest';

import { buildLlmsText } from '../src/utilities/llms-text/index.ts';
import { verifyBuild } from './verify-build.ts';

const repositoryRoot = resolve(import.meta.dirname, '..');

describe('static build artifact', () => {
  test('contains the required content, metadata, assets, and routes', async () => {
    await expect(verifyBuild()).resolves.toBeUndefined();
  });

  test('keeps the generated llms.txt artifact synchronized with portfolio content', async () => {
    const artifactText = await readFile(resolve(repositoryRoot, 'dist/llms.txt'), 'utf8');

    expect(artifactText).toBe(buildLlmsText());
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
