import { create } from 'zustand';

interface WishlistState {
  items: any[];
}

export const useWishlistStore = create<WishlistState>((set) => ({
  items: [],
}));
