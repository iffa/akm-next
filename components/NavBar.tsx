import { Menu, Transition } from '@headlessui/react';

import { GrLanguage } from 'react-icons/gr';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const NavBar: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { locale: currentLocale, locales } = router;

  // @ts-expect-error Intl.DisplayNames is polyfilled
  const languageNames = new Intl.DisplayNames([currentLocale], {
    type: 'language',
  });

  return (
    <header className="shadow z-10">
      <div className="container mx-auto p-4 flex flex-row justify-between items-center align-middle">
        <Link href="/">
          <a className="text-xl text-gray-900 font-semibold">
            {t('title')}
            <span className="text-gray-700 font-normal text-sm">
              {t('version')}
            </span>
          </a>
        </Link>
        <div className="relative inline-block text-left">
          <Menu>
            {({ open }) => (
              <>
                <span className="rounded-md shadow-sm">
                  <Menu.Button
                    className="inline-flex justify-center w-full p-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-full hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                    title={t('change-language')}
                  >
                    <GrLanguage className="w-4 h-4" />
                  </Menu.Button>
                </span>

                <Transition
                  show={open}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="absolute right-0 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                  >
                    <div className="py-1">
                      {locales.map((locale) => (
                        <Menu.Item as="div" key={locale}>
                          {({ active }) => (
                            <Link href={router.asPath} locale={locale}>
                              <a
                                className={`${
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700'
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left transition duration-200 ease-in-out`}
                              >
                                {languageNames.of(locale)}
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
};
