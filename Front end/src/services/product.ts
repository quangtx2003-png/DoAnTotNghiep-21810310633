import { getProductsDetailList } from '@/lib/axios/product'
import type { GetProductsRequest } from '@/types/product'

export async function fetchProducts(params: GetProductsRequest & { page: number; limit: number }) {
  const result = await getProductsDetailList(params)
  return {
    items: result.items,
    total: result.total,
  }
}
