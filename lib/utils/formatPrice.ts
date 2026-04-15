export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function getDiscountPercent(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100)
}
