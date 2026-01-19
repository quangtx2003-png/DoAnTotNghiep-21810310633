import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  variantId: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (variantId: number, quantity?: number) => void
  removeItem: (variantId: number) => void
  updateQuantity: (variantId: number, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (variantId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.variantId === variantId)

          const items = existing
            ? state.items.map((i) =>
                i.variantId === variantId ? { ...i, quantity: i.quantity + quantity } : i
              )
            : [...state.items, { variantId, quantity }]

          return {
            items,
            isOpen: true,
          }
        }),

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.variantId === variantId ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      getItemCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
)
