// src/services/wishlist.ts
import { getProductsDetailList } from '@/lib/axios/product'
import type { ProductDetail } from '@/types/product'

export async function fetchWishlistProducts(params: {
  productIds: number[]
  page: number
  limit: number
}) {
  // Tính toán phân trang: lấy ra productIds cho trang hiện tại
  const startIndex = (params.page - 1) * params.limit
  const endIndex = startIndex + params.limit
  const pageProductIds = params.productIds.slice(startIndex, endIndex)

  // Nếu không có productIds thì trả về mảng rỗng
  if (pageProductIds.length === 0) {
    return {
      items: [] as ProductDetail[],
      total: params.productIds.length,
    }
  }

  // Gọi API lấy chi tiết sản phẩm cho các productIds
  const result = await getProductsDetailList({
    ids: pageProductIds,
    page: 1,
    limit: params.limit,
  })

  return {
    items: result.items,
    total: params.productIds.length,
  }
}
