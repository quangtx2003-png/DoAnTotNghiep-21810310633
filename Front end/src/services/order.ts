import { getOrders } from '@/lib/axios/order'
import type { GetOrdersRequest } from '@/types/order'

export async function fetchOrders(params: GetOrdersRequest & { page: number; limit: number }) {
  const result = await getOrders(params)
  return {
    items: result.items,
    total: result.total,
  }
}
