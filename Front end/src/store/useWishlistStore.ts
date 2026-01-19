import { create } from 'zustand'
import { addToWishlist, removeFromWishlist, getWishlistByUser } from '@/lib/axios/wishlist'

interface WishlistStore {
  items: number[]
  isLoading: boolean
  addItem: (productId: number, userId?: number) => Promise<boolean>
  removeItem: (productId: number, userId?: number) => Promise<boolean>
  isInWishlist: (productId: number) => boolean
  syncWithServer: (userId: number) => Promise<void>
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isLoading: false,

  addItem: async (productId, userId) => {
    // Check if user is logged in
    if (!userId) {
      // Show login prompt
      return false
    }

    set({ isLoading: true })
    const success = await addToWishlist(productId)

    if (success) {
      set((state) => ({
        items: [...state.items, productId],
        isLoading: false,
      }))
      return true
    }

    set({ isLoading: false })
    return false
  },

  removeItem: async (productId, userId) => {
    if (!userId) {
      return false
    }

    set({ isLoading: true })
    const success = await removeFromWishlist(productId)

    if (success) {
      set((state) => ({
        items: state.items.filter((id) => id !== productId),
        isLoading: false,
      }))
      return true
    }

    set({ isLoading: false })
    return false
  },

  isInWishlist: (productId) => {
    return get().items.includes(productId)
  },

  syncWithServer: async () => {
    set({ isLoading: true })
    const wishlist = await getWishlistByUser()
    set({
      items: wishlist.map((item) => item.productId),
      isLoading: false,
    })
  },

  clearWishlist: () => {
    set({ items: [], isLoading: false })
  },
}))
