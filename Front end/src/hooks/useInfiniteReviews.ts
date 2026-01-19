// src/hooks/useInfiniteReviews.ts
import { useInfiniteQuery } from '@/hooks/useInfiniteQuery'
import { fetchReviews } from '@/services/review'
import type { ProductReview } from '@/types/review'

export interface UseInfiniteReviewsParams {
  productId?: number
  productVariantId?: number
  userId?: number
  rating?: number
  limit?: number
  enabled?: boolean
}

export function useInfiniteReviews(params: UseInfiniteReviewsParams) {
  return useInfiniteQuery<ProductReview, Omit<UseInfiniteReviewsParams, 'limit' | 'enabled'>>({
    fetcher: fetchReviews,
    params: {
      productId: params.productId,
      productVariantId: params.productVariantId,
      userId: params.userId,
      rating: params.rating,
    },
    limit: params.limit,
    enabled: params.enabled,
  })
}
