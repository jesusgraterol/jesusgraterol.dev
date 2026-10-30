# Testing

`npm test` and `npm run check` select essential coverage. CI always runs `npm run check`. Full suites run locally only when explicitly requested; there is no scheduled or manual CI full mode.

## Membership

Essential protects two consequential guarantees:

- Portfolio data and the generated machine-readable index keep the private project's source repository unpublished.
- GitHub Pages delivery remains gated by successful verification, with deployment permissions confined to the deployment job.

Full includes essential plus content inventories, ordering and metadata, SEO/structured-data permutations, artifact-validator scenarios, and every browser test. Browser accessibility, keyboard/focus, responsive layout, themes, and reduced-motion coverage remain complete in full and focused commands. They need no replacement essential smoke test. The production build still runs its artifact validator in both selections.

Classify each new or materially changed scenario by its concrete failure consequence. Authority, privacy/isolation, core persistence, primary workflows, and required recovery belong in essential when applicable. Speed and test level do not determine membership. Useful secondary cases use Vitest's `full` tag, declared in both category configurations. Mixed cases stay co-located. Unassessed cases remain essential until assessed.

Entirely full-only files are also excluded by native `--exclude` flags in essential aggregates to avoid loading them. Currently this is `src/utilities/seo/structured-data.test-unit.ts`; update both essential aggregates if that file gains essential scenarios. Entirely full-only categories, currently browser E2E, are omitted together with their preparation. Never hide a broken required selection with `passWithNoTests`.

## Commands

| Command                             | Selection and preparation                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| `npm test`                          | Essential unit tests, one validated build, essential artifact integration tests |
| `npm run check`                     | Essential tests plus typecheck, lint, formatting, and one validated build       |
| `npm run test:full`                 | Complete unit, integration, and E2E coverage with one build                     |
| `npm run check:full`                | Complete coverage plus typecheck, lint, formatting, and one validated build     |
| `npm run test:unit`                 | Complete unit category                                                          |
| `npm run test:integration`          | Validated build, then complete integration category                             |
| `npm run test:e2e`                  | Validated build, then complete Chromium E2E category                            |
| `npm run test:integration:artifact` | Complete integration category against the existing build                        |
| `npm run test:e2e:artifact`         | Complete Chromium E2E category against the existing build                       |

Install Chromium before browser checks with `npx playwright install --with-deps chromium`. Essential needs no browser. Aggregate flags apply only to that invocation; granular and focused commands include full-only cases by default.

During development, run complete focused checks for affected behavior. Completion requires essential regression plus complete focused coverage of changed behavior and consumers, including affected full-only scenarios. Reuse successful results while their source, dependencies, configuration, selection, and environment remain unchanged.

```bash
npm run test:unit -- src/utilities/llms-text/llms-text.test-unit.ts
npm run build
npm run test:integration:artifact -- scripts/verify-build.test-integration.ts --repeats=2 --retry=0
npm run test:e2e:artifact -- src/layouts/base-layout.test-e2e.ts --repeat-each=3 --retries=0
```

Use three retry-free runs for changed integration/E2E coverage. Reuse the prepared build only while build inputs are unchanged. `*.test-unit.ts`, `*.test-integration.ts`, and `*.test-e2e.ts` remain co-located with their owning implementation; category configurations keep their discovery separate. The build validator rejects test files in production output. Test discovery excludes archive/backup directories.

The root `/jg-plans/` formatter exception keeps CLI-managed local planning records out of `format:check`. It does not change Git ignore rules or the formatter command.
