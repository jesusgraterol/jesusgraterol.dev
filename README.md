# jesusgraterol.dev

![Jesus Graterol portfolio](./readme-assets/screenshot-01.png)

The source for [jesusgraterol.dev](https://jesusgraterol.dev/), the static portfolio of seasoned Software Developer Jesus Graterol. It presents selected projects, professional experience, education, and the complete technology stack in a fast, accessible single-page site.

The site is built with Astro, TypeScript, Tailwind CSS, and a small amount of framework-free client JavaScript. Portfolio content is validated at build time from [`src/data/portfolio/portfolio.json`](./src/data/portfolio/portfolio.json).

## Requirements

- Node.js 24.15.0
- npm 11.12.1

## Development

```bash
npm ci --ignore-scripts
npx playwright install --with-deps chromium
npm run dev
```

Astro prints the local URL when the development server starts.

## Verification

```bash
npm run check
```

The complete check runs unit tests, Astro type checks, ESLint, Prettier, a production build, artifact contract tests, and Chromium end-to-end accessibility and interaction tests.

Individual commands are also available:

```bash
npm run test:unit
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run test:integration:artifact
npm run test:e2e:artifact
```

Regenerate the Open Graph image after changing its template:

```bash
npm run assets:generate
```

## Machine-readable portfolio and SEO

The build generates [`/llms.txt`](https://jesusgraterol.dev/llms.txt) directly from the validated portfolio data. It provides a concise index of the portfolio sections, selected projects, professional profiles, and source repository for language models and other automated readers.

Every HTML page links to this resource through `rel="describedby"`. The production build also verifies canonical URLs, robots directives, sitemap membership, Open Graph and Twitter cards, and the connected `WebSite`, `ProfilePage`, `Person`, and `ImageObject` structured-data graph.

## Publishing

GitHub Actions verifies every pull request. Pushes to `main` and manual workflow runs pass through the same verification suite, upload the static `dist` artifact, and deploy it to GitHub Pages.

The custom domain is declared in [`public/CNAME`](./public/CNAME). The repository must use **GitHub Actions** as its Pages source, and the domain DNS must point to GitHub Pages before traffic is switched away from the previous host.

### One-time migration from Firebase

1. In the repository settings, open **Pages** and select **GitHub Actions** as the source.
2. Merge to `main` and confirm the Pages deployment succeeds before changing DNS.
3. Set `jesusgraterol.dev` as the Pages custom domain and follow [GitHub's DNS instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. After DNS resolves to Pages, verify the apex domain, asset loading, and the custom 404, then enable **Enforce HTTPS**.
5. Keep the existing Firebase deployment available during the cutover. Remove its GitHub secret and hosting project only after the Pages deployment has been stable.

## License

[MIT](./LICENSE)
