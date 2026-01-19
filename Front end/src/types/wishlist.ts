export interface ProductWishlist {
  userId: number
  productId: number
  createdAt: string
}

export interface WishlistResponse {
  code: number
  message: string
  result: ProductWishlist[] | any
}
