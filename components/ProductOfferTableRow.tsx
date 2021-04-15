import { getLauncherIcon, sanitizeVoucherCode } from '@app/utils/product-utils';

import { Offer } from '@app/lib/model/offer.model';
import React from 'react';
import { getFormattedPrice } from '@app/utils/number-utils';
import { useRouter } from 'next/router';

export const ProductOfferTableRow: React.FC<{ offer: Offer }> = ({ offer }) => {
  const { locale } = useRouter();
  const { region, edition, store, currency, url, bestVoucher } = offer;
  const price = bestVoucher?.priceWithVoucher || offer.price;

  return (
    <tr className="min-w-full">
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10"
              src={getLauncherIcon(region.id)}
              alt={region.name}
            ></img>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {region.name}
            </div>
            <div className="text-sm text-gray-500">{edition.name}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        <div>{store.name}</div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right">
        <div className="text-sm text-gray-900">
          {getFormattedPrice(locale, currency, price)}
        </div>
        <div className="text-sm text-gray-500">
          {sanitizeVoucherCode(bestVoucher?.code)}
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-600 hover:text-blue-900 visited:text-purple-600 cursor-pointer"
        >
          Purchase
        </a>
      </td>
    </tr>
  );
};
