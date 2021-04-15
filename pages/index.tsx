import { GetStaticProps } from 'next';
import React from 'react';
import Search from '@app/components/Search';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home(): JSX.Element {
  return (
    <div className="container mx-auto px-4">
      <Search></Search>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
};
