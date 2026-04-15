import type { Product } from "@/types/product"

export function filterProducts(products: Product[], filter: string): Product[] {
  if (filter === 'all' || !filter) return products
  if (filter === 'under-599') return products.filter(p => p.price < 599)
  if (filter === 'new-arrivals') return products.filter(p => p.isNew)
  return products.filter(p => p.category === filter)
}

export function sortProducts(products: Product[], sort: string): Product[] {
  const arr = [...products]
  if (sort === 'price_asc') return arr.sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') return arr.sort((a, b) => b.price - a.price)
  if (sort === 'newest') return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  return arr
}
