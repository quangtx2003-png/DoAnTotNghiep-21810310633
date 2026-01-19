import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/user'

interface AuthState {
  token: string | null
  user: User | null
  authLoading: boolean

  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  setAuthLoading: (loading: boolean) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      authLoading: true, // ⬅️ QUAN TRỌNG

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setAuthLoading: (authLoading) => set({ authLoading }),

      clear: () =>
        set({
          token: null,
          user: null,
          authLoading: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
      }),
      onRehydrateStorage: () => () => {
        // Persist hydrate xong
        useAuthStore.getState().setAuthLoading(false)
      },
    }
  )
)
