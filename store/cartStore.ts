import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/product'

export interface CartItem { product: Product; quantity: number; size: string }
export interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size: string) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size) => set(state => {
        const exists = state.items.find(i => i.product.id === product.id && i.size === size)
        if (exists) return { items: state.items.map(i => i.product.id === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i) }
        return { items: [...state.items, { product, quantity: 1, size }] }
      }),
      removeItem: (productId) => set(state => ({ items: state.items.filter(i => i.product.id !== productId) })),
      updateQty: (productId, quantity) => set(state => ({ items: state.items.map(i => i.product.id === productId ? { ...i, quantity } : i) })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
)
