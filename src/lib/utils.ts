import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function pricingFormat(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "EUR", notation = "compact" } = options;

  const numericPricing = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPricing);
}

//allows me to use conditional classnames, join them together
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
