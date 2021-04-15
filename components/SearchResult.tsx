import Link from 'next/link';
import { Product } from '@app/lib/model/product.model';
import React from 'react';
import { getFormattedPrice } from '@app/utils/number-utils';
import { useRouter } from 'next/router';

export const SearchResult: React.FC<{ product: Product }> = (props) => {
  const { product } = props;
  const { locale } = useRouter();
  const price =
    product.bestOffer?.bestVoucher?.priceWithVoucher ||
    product.bestOffer?.price;
  const currency = product.bestOffer?.currency;

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-0 md:p-4">
      <Link
        href={{
          pathname: '/product/[id]',
          query: { id: product.id },
        }}
        passHref
      >
        <a
          className="flex flex-row bg-white hover:bg-gray-50 rounded shadow transition duration-200 ease-in-out"
          title={product.name}
        >
          <div className="w-2/3 p-4">
            <h2 className="text-base font-semibold text-gray-800 line-clamp-2 mb-1">
              {product.name}
            </h2>
            <p className="text-base text-blue-600 font-normal">
              {getFormattedPrice(locale, currency, price)}
            </p>
          </div>
          <div className="w-1/3">
            <div className="aspect-w-9 aspect-h-11">
              <img
                className="rounded"
                width={180}
                height={220}
                src={product.coverImageUrl || '/img/placeholder_cover.svg'}
              ></img>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
