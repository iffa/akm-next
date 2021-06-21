import { AvailablePlatform } from '@app/lib/model/product.model';
import Link from 'next/link';
import React from 'react';

export const PlatformPill: React.FC<{
  platform: AvailablePlatform;
  isCurrent: boolean;
}> = ({ platform, isCurrent }) => {
  return (
    <Link
      href={{
        pathname: '/product/[id]',
        query: { id: platform.gameId },
      }}
      passHref
    >
      <a
        data-cy={platform.gameId}
        className={`${
          isCurrent
            ? 'bg-blue-700 text-gray-200 hover:bg-blue-800'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        } py-2 px-4 inline-flex text-xs leading-5 whitespace-nowrap font-semibold rounded-full transition duration-200 ease-in-out`}
      >
        <span>{platform.platformName}</span>
      </a>
    </Link>
  );
};
