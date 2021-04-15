import { getFormattedNumber, getFormattedPrice } from '@app/utils/number-utils';

import { PlatformPill } from './PlatformPill';
import { Product } from '@app/lib/model/product.model';
import React from 'react';
import { getStoresAmountForProduct } from '@app/utils/product-utils';
import { useRouter } from 'next/router';

export const ProductDetailsCard: React.FC<{ product: Product }> = ({
  product,
}) => {
  const { locale } = useRouter();
  const price =
    product.bestOffer?.bestVoucher?.priceWithVoucher ||
    product.bestOffer?.price;
  const currency = product.bestOffer?.currency;

  return (
    <div className="w-full bg-white rounded shadow">
      <div className="p-4">
        <h3 className="text-xl leading-6 font-medium text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Developed by{' '}
          <span className="font-semibold">{product.developer}</span>
        </p>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Published by{' '}
          <span className="font-semibold">{product.publisher}</span>
        </p>

        <div className="flex flex-row space-x-2 mt-4 overflow-x-auto">
          {Object.entries(product.availablePlatforms).map(([key, value]) => {
            return (
              <PlatformPill
                key={key}
                platform={value}
                isCurrent={value.gameId === product.id}
              ></PlatformPill>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Best offer</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a
                className="text-blue-600 hover:text-blue-900 visited:text-purple-600"
                href={product.bestOffer?.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="font-semibold">
                  {getFormattedPrice(locale, currency, price)}
                </span>{' '}
                from {product.bestOffer?.store?.name}
                {product.bestOffer?.bestVoucher && (
                  <span>
                    {', '}
                    with code{' '}
                    <span className="font-semibold">
                      {product.bestOffer.bestVoucher.code}
                    </span>
                  </span>
                )}
              </a>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Available offers
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="font-semibold">
                {product.offers?.length || 0}
              </span>{' '}
              offers from{' '}
              <span className="font-semibold">
                {getStoresAmountForProduct(product)}
              </span>{' '}
              stores
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Metacritic score
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="font-semibold">
                {product.metacriticScores.total.rating}%
              </span>{' '}
              rating from{' '}
              <span className="font-semibold">
                {getFormattedNumber(
                  locale,
                  product.metacriticScores.total.votes
                )}
              </span>{' '}
              votes
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
