import { DefaultSeoProps } from 'next-seo';

/**
 * Site metadata that is to be included in all pages by default.
 * Note: title, description, alternate languages etc. should be set on a
 * per-page basis.
 *
 * Learn more: https://github.com/garmeeh/next-seo
 */
export const defaultSeo: DefaultSeoProps = {
  title: 'AKM - Find affordable game keys',
  description:
    'Find affordable games and downloadable content from dozens of stores with zero hassle.',
  /**
   * Include all available locales and their alternative urls in metadata.
   * This is important for SEO if the website is available in multiple locales.
   *
   * See: https://developers.google.com/search/docs/advanced/crawling/localized-versions
   */
  languageAlternates: [
    {
      hrefLang: 'x-default',
      href: 'https://akm.iffa.dev/',
    },
    {
      hrefLang: 'en',
      href: 'https://akm.iffa.dev/en',
    },
    {
      hrefLang: 'fi',
      href: 'https://akm.iffa.dev/fi',
    },
  ],
};
