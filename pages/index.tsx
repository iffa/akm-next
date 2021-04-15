import { GetStaticProps } from 'next';
import React from 'react';
import Search from '@app/components/Search';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

export default function Home(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={t('home:seo:title')}
        description={t('home:seo:description')}
        languageAlternates={[
          {
            hrefLang: 'x-default',
            href: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          },
          {
            hrefLang: 'en',
            href: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
          },
          {
            hrefLang: 'fi',
            href: `${process.env.NEXT_PUBLIC_BASE_URL}/fi`,
          },
        ]}
      />
      <div className="container mx-auto px-4">
        <Search></Search>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
};
