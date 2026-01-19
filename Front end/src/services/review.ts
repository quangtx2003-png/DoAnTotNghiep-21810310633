// src/services/review.ts
import { getReviews } from '@/lib/axios/review'
import type { GetReviewsRequest } from '@/types/review'

export async function fetchReviews(params: GetReviewsRequest & { page: number; limit: number }) {
  const result = await getReviews(params)
  return {
    items: result.items,
    total: result.total,
  }
}
