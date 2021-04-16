import { Product } from '@app/lib/model/product.model';
import { ProductOfferTableRow } from './ProductOfferTableRow';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { filterDistinct } from '@app/utils/array-utils';
import { FilterCheckbox } from './FilterCheckbox';

export const ProductOfferTable: React.FC<{ product: Product }> = ({
  product,
}) => {
  const offers = product.offers
    .filter((offer) => offer.available)
    .sort((a, b) => {
      return (
        (a?.bestVoucher?.priceWithVoucher || a.price) -
        (b?.bestVoucher?.priceWithVoucher || b.price)
      );
    });
  const launchers = filterDistinct(
    offers.map((offer) => ({ ...offer.region })),
    (a, b) => a.id === b.id
  );
  const editions = filterDistinct(
    offers.map((offer) => ({ ...offer.edition })),
    (a, b) => a.id === b.id
  );

  const { t } = useTranslation();
  const [filteredOffers, setFilteredOffers] = useState(offers);
  const [selectedLaunchers, setSelectedLaunchers] = useState(launchers);
  const [selectedEditions, setSelectedEditions] = useState(editions);

  /**
   * Update shown offers based on filters
   */
  useEffect(() => {
    setFilteredOffers(
      offers
        .filter((offer) => {
          // filter by selected launchers
          return !!selectedLaunchers.find(
            (launcher) => launcher.id === offer.region.id
          );
        })
        .filter((offer) => {
          // filter by selected editions
          return !!selectedEditions.find(
            (edition) => edition.id === offer.edition.id
          );
        })
    );
  }, [selectedLaunchers, selectedEditions]);

  return (
    <div className="flex flex-col">
      <form className="flex flex-col px-4 mb-8 space-y-6 md:flex-row md:space-y-0 md:space-x-12">
        <div className="flex flex-col">
          <h4 className="text-lg text-gray-900 font-semibold mb-2">
            {t('product:platforms')}
          </h4>
          <div className="flex flex-col space-y-0.5">
            {launchers.map((launcher) => (
              <FilterCheckbox
                key={launcher.id}
                title={launcher.name}
                name={launcher.id}
                value={launcher.id}
                checked={!!selectedLaunchers.find((x) => x.id === launcher.id)}
                onChecked={(checked) => {
                  setSelectedLaunchers(
                    checked
                      ? [...selectedLaunchers, launcher]
                      : selectedLaunchers.filter((x) => x.id !== launcher.id)
                  );
                }}
              ></FilterCheckbox>
            ))}
            <div>
              <button
                className="place-self-start mt-1 text-sm text-gray-600 hover:text-gray-900"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedLaunchers(launchers);
                }}
              >
                {t('product:selectAll')}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="text-lg text-gray-900 font-semibold mb-2">
            {t('product:editions')}
          </h4>
          <div className="flex flex-col space-y-0.5">
            {editions.map((edition) => (
              <FilterCheckbox
                key={edition.id}
                title={edition.name}
                name={edition.id}
                value={edition.id}
                checked={!!selectedEditions.find((x) => x.id === edition.id)}
                onChecked={(checked) => {
                  setSelectedEditions(
                    checked
                      ? [...selectedEditions, edition]
                      : selectedEditions.filter((x) => x.id !== edition.id)
                  );
                }}
              ></FilterCheckbox>
            ))}
            <div>
              <button
                className="place-self-start mt-1 text-sm text-gray-600 hover:text-gray-900"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedEditions(editions);
                }}
              >
                {t('product:selectAll')}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col rounded shadow">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('product:platformAndEdition')}
                    </th>
                    <th
                      scope="col"
                      className="hidden md:visible px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('product:store')}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('product:priceAndVoucher')}
                    </th>
                    <th scope="col" className="relative px-4 py-3">
                      <span className="sr-only">{t('product:purchase')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOffers.map((offer) => (
                    <ProductOfferTableRow
                      offer={offer}
                      key={offer.url}
                    ></ProductOfferTableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
