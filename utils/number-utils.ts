export function getFormattedPrice(
  locale: string,
  currency: string,
  price: number
): string {
  const format = Intl.NumberFormat(locale || 'en', {
    style: 'currency',
    currency,
  });

  return format.format(price);
}

export function getFormattedNumber(locale: string, value: number): string {
  const format = Intl.NumberFormat(locale || 'en', {
    style: 'decimal',
  });

  return format.format(value);
}
