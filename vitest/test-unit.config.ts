import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    exclude: [...configDefaults.exclude, '**/{_archive,_archives,_backup,_backups}/**'],
    tags: [{ name: 'full', description: 'Additional content, SEO, and presentation coverage.' }],
    include: ['src/**/*.test-unit.ts'],
  },
});
