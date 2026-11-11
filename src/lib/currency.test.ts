import { describe, expect, it } from "bun:test";
import { convertNaira, formatWithCurrency, CURRENCIES } from "./currency";

describe("Currency Converter", () => {
  it("keeps NGN amount identical and formats correctly", () => {
    expect(convertNaira(2500, "NGN")).toBe(2500);
    expect(formatWithCurrency(2500, "NGN")).toBe("₦2,500");
  });

  it("converts NGN to USD accurately", () => {
    // 2800 NGN / 1400 = 2.00 USD
    expect(convertNaira(2800, "USD")).toBe(2.0);
    expect(formatWithCurrency(2800, "USD")).toBe("$2.00");
  });

  it("converts NGN to GBP accurately", () => {
    // 3600 NGN / 1800 = 2.00 GBP
    expect(convertNaira(3600, "GBP")).toBe(2.0);
    expect(formatWithCurrency(3600, "GBP")).toBe("£2.00");
  });

  it("supports all declared currency codes", () => {
    const codes = Object.keys(CURRENCIES);
    expect(codes).toContain("NGN");
    expect(codes).toContain("USD");
    expect(codes).toContain("GBP");
    expect(codes).toContain("EUR");
    expect(codes).toContain("GHS");
  });
});
