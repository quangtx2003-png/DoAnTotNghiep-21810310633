// src/types/review.ts

export interface ProductReview {
  id: number
  orderId: number
  orderItemId: number
  productId: number
  productVariantId: number
  userId: number
  rating: number // 1-5
  comment: string
  files: string // JSON string of file URLs
  createdAt: string
}

export interface ProductReviewWithUser extends ProductReview {
  userName?: string
  userAvatar?: string
}

export interface GetReviewsRequest {
  productId?: number
  productVariantId?: number
  userId?: number
  rating?: number
  page?: number
  limit?: number
}

export interface CreateReviewRequest {
  orderId: number
  orderItemId: number
  productId: number
  productVariantId: number
  rating: number
  comment: string
  files?: string[]
}

export interface ReviewListResponse {
  total: number
  page: number
  items: ProductReview[]
}

export const getRatingLabel = (rating: number): string => {
  const labels: Record<number, string> = {
    5: 'Xuất sắc',
    4: 'Tốt',
    3: 'Trung bình',
    2: 'Tạm được',
    1: 'Kém',
  }
  return labels[rating] || 'Chưa đánh giá'
}

export const getRatingColor = (rating: number): string => {
  if (rating >= 4) return 'text-green-600'
  if (rating >= 3) return 'text-yellow-600'
  return 'text-red-600'
}
