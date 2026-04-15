export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  badge?: string
  badgeVariant?: 'sale' | 'new'
  colors: string[]
  bgColor: string
  category: string
  isNew: boolean
  inWishlist: boolean
  images?: string[]
  description?: string
  sizes?: string[]
  rating?: number
  reviewCount?: number
}
