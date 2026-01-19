// src/lib/axios/wishlist.ts
import axiosInstance from '@/lib/axios/instance'
import type { ProductWishlist, WishlistResponse } from '@/types/wishlist'

export async function getWishlistByUser() {
  try {
    const { data } = await axiosInstance.get<WishlistResponse>(`/wishlist`)

    if (data.code === 200) {
      return data.result as ProductWishlist[]
    }
    return []
  } catch (error) {
    console.error('[Wishlist] Error fetching wishlist:', error)
    return []
  }
}

export async function addToWishlist(productId: number) {
  try {
    const { data } = await axiosInstance.post<WishlistResponse>('/wishlist/add', null, {
      params: { productId },
    })

    return data.code === 200
  } catch (error) {
    console.error('[Wishlist] Error adding to wishlist:', error)
    return false
  }
}

export async function removeFromWishlist(productId: number) {
  try {
    const { data } = await axiosInstance.delete<WishlistResponse>('/wishlist/remove', {
      params: { productId },
    })

    return data.code === 200
  } catch (error) {
    console.error('[Wishlist] Error removing from wishlist:', error)
    return false
  }
}
