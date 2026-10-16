/**
 * Resolves a homepage section link for the page that renders it.
 * @param href The section fragment, such as `#projects`.
 * @param pathname The path of the page that renders the link.
 * @returns The bare fragment on the homepage, otherwise the fragment on the homepage URL.
 */
export const resolveSectionHref = (href: string, pathname: string): string =>
  pathname === '/' ? href : `/${href}`;
