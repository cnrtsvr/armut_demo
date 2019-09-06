const locale = 'en-EN';

function defaultFormatterOptions(currency = false) {
  return {
    minimumIntegerDigits: 1,
    minimumFractionDigits: currency ? 2 : 0,
    maximumFractionDigits: 2
  }
}

export const currencyFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', ...defaultFormatterOptions(true) });
export const decimalFormatter = new Intl.NumberFormat(locale, { ...defaultFormatterOptions() });

export function formatCurrency(num) {
  return currencyFormatter.format(num);
}


export function formatDecimal(dec) {
  return decimalFormatter.format(dec);
}
