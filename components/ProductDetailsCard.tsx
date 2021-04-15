import { Trans, useTranslation } from 'next-i18next';
import { getFormattedNumber, getFormattedPrice } from '@app/utils/number-utils';

import { PlatformPill } from './PlatformPill';
import { Product } from '@app/lib/model/product.model';
import React from 'react';
import { getStoresAmountForProduct } from '@app/utils/product-utils';
import { useRouter } from 'next/router';

export const ProductDetailsCard: React.FC<{ product: Product }> = ({
  product,
}) => {
  const { t } = useTranslation();
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
          <Trans
            i18nKey="product:developedBy"
            values={{ developer: product.developer }}
            components={{ span: <span className="font-semibold" /> }}
          />
        </p>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          <Trans
            i18nKey="product:publishedBy"
            values={{ publisher: product.publisher }}
            components={{ span: <span className="font-semibold" /> }}
          />
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
            <dt className="text-sm font-medium text-gray-500">
              {t('product:bestOfferTitle')}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a
                className="text-blue-600 hover:text-blue-900 visited:text-purple-600"
                href={product.bestOffer?.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Trans
                  i18nKey="product:bestOffer"
                  values={{
                    price: getFormattedPrice(locale, currency, price),
                    store: product.bestOffer?.store?.name,
                  }}
                  components={{ span: <span className="font-semibold" /> }}
                />
                {product.bestOffer?.bestVoucher && (
                  <Trans
                    i18nKey="product:bestOfferVoucher"
                    values={{
                      voucher: product.bestOffer?.bestVoucher.code,
                    }}
                    components={{ span: <span className="font-semibold" /> }}
                  />
                )}
              </a>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {t('product:availableOffers')}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Trans
                i18nKey="product:offers"
                count={product.offers?.length || 0}
                components={{ span: <span className="font-semibold" /> }}
              />
              <Trans
                i18nKey="product:fromStores"
                count={getStoresAmountForProduct(product)}
                components={{ span: <span className="font-semibold" /> }}
              />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {t('product:metacriticScore')}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Trans
                i18nKey="product:rating"
                values={{
                  rating: product.metacriticScores.total.rating,
                  votes: getFormattedNumber(
                    locale,
                    product.metacriticScores.total.votes
                  ),
                }}
                components={{ span: <span className="font-semibold" /> }}
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
