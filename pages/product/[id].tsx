import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';

import { ProductDetailsCard } from '@app/components/ProductDetailsCard';
import { ProductOfferTable } from '@app/components/ProductOfferTable';
import React from 'react';
import { getProduct } from '@app/lib/products';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // don't build any product during build-time, stick to incremental regeneration
    paths: [],
    // blocking fallback renders the page only when its ready
    fallback: 'blocking',
  };
};

// https://github.com/vercel/next.js/issues/15913
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params;

  try {
    const product = await getProduct(Array.isArray(id) ? id[0] : id);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          'common',
          'product',
        ])),
        product,
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
  const { product } = props;

  return (
    <div className="container mx-auto space-y-8 px-4">
      <ProductDetailsCard product={product}></ProductDetailsCard>
      <ProductOfferTable product={product}></ProductOfferTable>
    </div>
  );
}
