import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/product'

export interface WishlistStore {
  items: Product[]
  toggle: (product: Product) => void
  isWishlisted: (id: string) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => set(state => {
        const exists = state.items.find(i => i.id === product.id)
        return { items: exists ? state.items.filter(i => i.id !== product.id) : [...state.items, product] }
      }),
      isWishlisted: (id) => get().items.some(i => i.id === id),
    }),
    { name: 'wishlist-storage' }
  )
)
