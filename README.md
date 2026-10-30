# jesusgraterol.dev

![Jesus Graterol portfolio](./readme-assets/screenshot-01.png)

The source for [jesusgraterol.dev](https://jesusgraterol.dev/), the static portfolio of seasoned Software Developer Jesus Graterol. It presents selected projects, professional experience, education, and the complete technology stack in a fast, accessible single-page site.

The site is built with Astro, TypeScript, Tailwind CSS, and a small amount of framework-free client JavaScript. Its UI comes from [`jg-personal-astro-ui`](https://www.npmjs.com/package/jg-personal-astro-ui), the package Jesus Graterol's sites share: the theme and its tokens, the page head, header, footer, theme switch, section layout, buttons, cards, badges, links, experience accordions, inverse surfaces, and the `jg/` mark. The site keeps only its own content: the portfolio sections, the social links with their brand icons, and its structured data. Portfolio content is validated at build time from [`src/data/portfolio/portfolio.json`](./src/data/portfolio/portfolio.json).

## Requirements

- Node.js 24.15.0
- npm 11.12.1

## Development

```bash
npm ci --ignore-scripts
npm run dev
```

Astro prints the local URL when the development server starts.

## Verification

```bash
npm run check
```

The essential check runs privacy and deployment-gate tests, Astro type checks, ESLint, Prettier, and a production build with its artifact validator. It needs no browser installation. `npm test` runs the essential tests and builds once.

Run the complete suite only when explicitly requested:

```bash
npx playwright install --with-deps chromium
npm run check:full
```

`npm run test:full` runs all unit, artifact integration, and Chromium end-to-end tests with one build. Granular commands remain complete, including full-only tests. See [Testing](./docs/testing.md) for classification and focused verification.

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

`npm run assets:generate` writes the favicons, the `jg/` mark, and the Agentic Coding project's mark from `jg-personal-astro-ui`'s SVG files, then renders the Open Graph image from its template. Run it after updating the package or changing the template:

```bash
npm run assets:generate
```

## Machine-readable portfolio and SEO

The build uses the directly declared `jg-site` package to generate [`/llms.txt`](https://jesusgraterol.dev/llms.txt) from the validated portfolio data. It provides a concise index of the portfolio sections, selected projects, professional profiles, and source repository for language models and other automated readers.

Every HTML page links to this resource through `rel="describedby"`, and the footer exposes a visible `llms.txt` link. The production build also verifies canonical URLs, robots directives, sitemap membership, descriptive project and credential link text, Open Graph and Twitter cards, and the connected `WebSite`, `ProfilePage`, `Person`, and `ImageObject` structured-data graph, including the alternate site and profile identifiers.

## Publishing

GitHub Actions runs essential verification on every pull request. Pushes to `main` and manual workflow runs pass through the same verification suite, upload the static `dist` artifact, and deploy it to GitHub Pages.

The custom domain is declared in [`public/CNAME`](./public/CNAME), and the repository uses **GitHub Actions** as its Pages source. The domain is proxied through Cloudflare, so its visitor-facing redirects, including `http://` to `https://`, and response transformations are controlled at the Cloudflare edge. While the proxy is enabled, GitHub Pages has no certificate for the domain, so its **Enforce HTTPS** setting stays off.

## Project blueprint

- `src/data/portfolio/` owns validated portfolio content; `src/components/` and `src/layouts/` render the site using `jg-personal-astro-ui`.
- `src/utilities/` builds the machine-readable index and structured data. `scripts/verify-build.ts` validates deployable output.
- [Testing](./docs/testing.md) defines suite membership, commands, and focused verification.
- `docs/` holds concise documentation of essential, durable project concepts and processes. API and HTTP endpoint documentation belongs outside `docs/`.

## License

[MIT](./LICENSE)
