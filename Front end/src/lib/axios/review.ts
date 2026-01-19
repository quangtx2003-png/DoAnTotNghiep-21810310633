// src/lib/axios/review.ts
import axiosInstance from '@/lib/axios/instance'
import type {
  ProductReview,
  ReviewListResponse,
  GetReviewsRequest,
  CreateReviewRequest,
} from '@/types/review'

export async function getReviews(params: GetReviewsRequest = {}) {
  try {
    const { data } = await axiosInstance.get<any>('/productReview/list', {
      params: {
        productId: params.productId,
        productVariantId: params.productVariantId,
        userId: params.userId,
        rating: params.rating,
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      },
    })

    if (data.code === 200 && data.result) {
      return data.result as ReviewListResponse
    }
    return { total: 0, page: 1, items: [] }
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return { total: 0, page: 1, items: [] }
  }
}

export async function createReview(reviewData: CreateReviewRequest) {
  try {
    const { data } = await axiosInstance.post<any>('/productReview/update', {
      orderId: reviewData.orderId,
      orderItemId: reviewData.orderItemId,
      productId: reviewData.productId,
      productVariantId: reviewData.productVariantId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      files: reviewData.files ? JSON.stringify(reviewData.files) : null,
    })

    if (data.code === 200 && data.result) {
      return data.result as ProductReview
    }
    throw new Error(data.message || 'Failed to create review')
  } catch (error) {
    console.error('Error creating review:', error)
    throw error
  }
}

export async function deleteReview(id: number) {
  try {
    const { data } = await axiosInstance.delete<any>(`/productReview/${id}`)
    return data
  } catch (error) {
    console.error('Error deleting review:', error)
    throw error
  }
}
