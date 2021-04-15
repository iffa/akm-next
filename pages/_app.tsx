import '@formatjs/intl-displaynames/polyfill';
import '@formatjs/intl-displaynames/locale-data/en'; // locale-data for en
import '@formatjs/intl-displaynames/locale-data/fi'; // locale-data for fi
import 'tailwindcss/tailwind.css';
import 'nprogress/css/nprogress.css';

import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Footer } from '@app/components/Footer';
import { NavBar } from '@app/components/NavBar';
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { defaultSeo } from '@app/utils/default-seo.config';
import dynamic from 'next/dynamic';

/**
 * Include top progress bar in client.
 */
const TopProgressBar = dynamic(
  () => {
    return import('components/TopProgressBar');
  },
  { ssr: false }
);

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className="flex flex-col h-screen">
      <TopProgressBar />
      <DefaultSeo {...defaultSeo} />
      <NavBar />
      <main className="flex-grow py-8 bg-gray-50">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default appWithTranslation(App);
