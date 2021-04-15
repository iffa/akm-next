import { Action } from './enum/action.enum';
import { Currency } from './enum/currency.enum';
import { Locale } from './enum/locale.enum';
import { Product } from './model/product.model';
import { ProductsResponseDto } from './dto/products-response.dto';
import got from 'got';

const INVALID_GAME_IDS_REMOVED = 'Invalid game IDs item';
const ENDPOINT = process.env.ENDPOINT;
const API_KEY = process.env.API_KEY;

export async function getProducts(
  query: string,
  showOffers = true,
  showVouchers = true,
  currency = Currency.EUR,
  locale = Locale.en_GB
): Promise<Product[]> {
  return await got(ENDPOINT, {
    searchParams: {
      apiKey: API_KEY,
      action: Action.PRODUCTS,
      search: query,
      showOffers: showOffers ? '1' : '0',
      showVouchers: showVouchers ? '1' : '0',
      currency,
      locale,
    },
    timeout: 10 * 1000, // 10 seconds
  })
    .json<ProductsResponseDto>()
    .then((response) => response.products)
    // if product has no best offer, consider it as not available
    .then((products) => products.filter((product) => product.bestOffer));
}

export async function getProduct(
  id: string,
  showOffers = true,
  showVouchers = true,
  currency = Currency.EUR,
  locale = Locale.en_GB
): Promise<Product> {
  return await got(ENDPOINT, {
    searchParams: {
      apiKey: API_KEY,
      action: Action.PRODUCTS,
      showOffers: showOffers ? '1' : '0',
      showVouchers: showVouchers ? '1' : '0',
      ids: id,
      currency,
      locale,
    },
    timeout: 10 * 1000, // 10 seconds
  })
    .json<ProductsResponseDto>()
    .then((response) => {
      if (
        response.warnings.some((warning) =>
          warning.includes(INVALID_GAME_IDS_REMOVED)
        ) ||
        !response.products ||
        !response.products[0]
      ) {
        throw new Error(`No product found for id ${id}`);
      }
      return response;
    })
    .then((response) => response.products[0]);
}
