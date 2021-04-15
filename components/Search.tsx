import React, { useEffect, useRef, useState } from 'react';

import { GoSearch } from 'react-icons/go';
import { Product } from '@app/lib/model/product.model';
import { SearchResult } from './SearchResult';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

export default function Search(): JSX.Element {
  const { t } = useTranslation('home');
  const [results, setResults] = useState<Product[]>([]);
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
  });
  const searchInputRef = useRef(null);
  const { ref, ...rest } = register('search', { required: true, minLength: 3 });

  const onSubmit = async ({ search }) => {
    const response = await fetch(`/api/products?query=${search}`, {
      method: 'GET',
    });

    const products = await response.json();
    setResults(products);
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="">
      <div className="relative flex w-full flex-wrap items-stretch">
        <label htmlFor="search" className="sr-only">
          {t('search-hint')}
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder={t('search-hint')}
          className="relative px-4 py-4 bg-white placeholder-gray-300 text-gray-600 rounded text-base border-0 shadow focus:ring w-full pr-12 transition duration-200 ease-in-out"
          {...rest}
          name="search"
          ref={(e) => {
            ref(e);
            searchInputRef.current = e;
          }}
        />
        <button
          id="searchSubmit"
          className="h-full font-normal absolute text-center text-gray-700 bg-transparent items-center justify-center w-8 right-0 py-4 mr-3 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          disabled={!formState.isValid}
          title={t('search-submit')}
        >
          <GoSearch className="w-full h-full" />
        </button>
      </div>

      <div
        id="searchResults"
        className="mt-8 space-y-6 md:space-y-0 content-evenly flex flex-col md:flex-row md:flex-wrap md:-mx-4"
      >
        {results.map((result, index) => (
          <SearchResult
            product={result}
            index={index}
            key={result.id}
          ></SearchResult>
        ))}
      </div>
    </form>
  );
}
