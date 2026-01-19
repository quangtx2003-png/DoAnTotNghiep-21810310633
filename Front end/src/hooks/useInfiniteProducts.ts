// src/hooks/useInfiniteProducts.ts
import { useInfiniteQuery } from '@/hooks/useInfiniteQuery'
import { fetchProducts } from '@/services/product'
import type { ProductDetail } from '@/types/product'

export interface UseInfiniteProductsParams {
  keyword?: string
  categoryId?: number
  priceFrom?: number
  priceTo?: number
  avgRatingFrom?: number
  avgRatingTo?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  limit?: number
  enabled?: boolean
}

export function useInfiniteProducts(params: UseInfiniteProductsParams) {
  return useInfiniteQuery<ProductDetail, Omit<UseInfiniteProductsParams, 'limit' | 'enabled'>>({
    fetcher: fetchProducts,
    params: {
      keyword: params.keyword,
      categoryId: params.categoryId,
      priceFrom: params.priceFrom,
      priceTo: params.priceTo,
      avgRatingFrom: params.avgRatingFrom,
      avgRatingTo: params.avgRatingTo,
      sortBy: params.sortBy,
      sortDir: params.sortDir,
    },
    limit: params.limit,
    enabled: params.enabled,
  })
}
