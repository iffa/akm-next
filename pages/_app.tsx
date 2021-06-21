import '@app/styles/global.css';
import 'nprogress/css/nprogress.css';

import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Footer } from '@app/components/Footer';
import { NavBar } from '@app/components/NavBar';
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { defaultSeo } from '@app/utils/default-seo.config';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

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
  // Next.js bug where page state is not reset - https://github.com/vercel/next.js/issues/9992
  // Affects /product/:id and navigating between different platforms via the pill buttons
  const { asPath } = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <TopProgressBar />
      <DefaultSeo {...defaultSeo} />
      <NavBar />
      <main className="flex-grow py-8 bg-gray-50">
        <Component {...pageProps} key={asPath} />
      </main>
      <Footer />
    </div>
  );
}

export default appWithTranslation(App);
