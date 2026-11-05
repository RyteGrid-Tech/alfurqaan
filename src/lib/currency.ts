export type CurrencyCode = "NGN" | "USD" | "GBP" | "EUR" | "GHS";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstNaira: number; // e.g. 1 USD = 1400 NGN => 1 / 1400
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  NGN: {
    code: "NGN",
    symbol: "₦",
    name: "Nigerian Naira",
    rateAgainstNaira: 1,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    rateAgainstNaira: 1 / 1400,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    rateAgainstNaira: 1 / 1800,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    rateAgainstNaira: 1 / 1520,
  },
  GHS: {
    code: "GHS",
    symbol: "GH₵",
    name: "Ghanaian Cedi",
    rateAgainstNaira: 1 / 95,
  },
};

export function convertNaira(amountInNaira: number, targetCurrency: CurrencyCode): number {
  if (targetCurrency === "NGN") return amountInNaira;
  const config = CURRENCIES[targetCurrency];
  if (!config) return amountInNaira;
  const converted = amountInNaira * config.rateAgainstNaira;
  return Math.round(converted * 100) / 100;
}

export function formatWithCurrency(
  amountInNaira: number,
  currencyCode: CurrencyCode = "NGN",
): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.NGN;
  const converted = convertNaira(amountInNaira, currencyCode);

  if (currencyCode === "NGN") {
    return `${config.symbol}${converted.toLocaleString("en-NG")}`;
  }

  return `${config.symbol}${converted.toFixed(2)}`;
}
