import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import { ProductDetailsCard } from '@app/components/ProductDetailsCard';
import { ProductOfferTable } from '@app/components/ProductOfferTable';
import React from 'react';
import { getProduct } from '@app/lib/products';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // don't build any product during build-time, stick to incremental regeneration
    paths: [],
    // blocking fallback renders the page only when its ready
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { id } = context.params;

  try {
    const product = await getProduct(Array.isArray(id) ? id[0] : id);

    return {
      props: {
        product,
        ...(await serverSideTranslations(context.locale, [
          'common',
          'product',
        ])),
      },
      revalidate: 60 * 30, // 30 minutes
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
      revalidate: 60 * 30,
    };
  }
};

export default function Product(
  props: InferGetStaticPropsType<typeof getStaticProps>
): JSX.Element {
  const { t } = useTranslation();
  const { product } = props;

  return (
    <>
      <NextSeo
        title={t('product:seo:title', { product: product.name })}
        description={t('product:seo:description', { product: product.name })}
        languageAlternates={[
          {
            hrefLang: 'x-default',
            href: `${process.env.BASE_URL}/product/${product.id}`,
          },
          {
            hrefLang: 'en',
            href: `${process.env.BASE_URL}/en/product/${product.id}`,
          },
          {
            hrefLang: 'fi',
            href: `${process.env.BASE_URL}/fi/product/${product.id}`,
          },
        ]}
      />
      <div className="container mx-auto space-y-8 px-4">
        <ProductDetailsCard product={product}></ProductDetailsCard>
        <ProductOfferTable product={product}></ProductOfferTable>
      </div>
    </>
  );
}
