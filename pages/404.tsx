import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error'])),
    },
  };
};

export default function NotFoundPage(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto p-4 flex flex-col">
      <h2 className="text-3xl text-gray-900">{t('error:notFoundTitle')}</h2>
      <p className="text-xl text-gray-700 mt-1">{t('error:notFoundContent')}</p>

      <Link href="/">
        <a className="text-base text-blue-600 hover:text-blue-900 visited:text-purple-600 mt-4">
          {t('error:returnToHome')}
        </a>
      </Link>
    </div>
  );
}
