// src/hooks/useInfiniteOrders.ts
import { useInfiniteQuery } from '@/hooks/useInfiniteQuery'
import { fetchOrders } from '@/services/order'
import type { Order } from '@/types/order'

export interface UseInfiniteOrdersParams {
  userId?: number
  orderStatus?: string
  paymentStatus?: string
  limit?: number
  enabled?: boolean
}

export function useInfiniteOrders(params: UseInfiniteOrdersParams) {
  return useInfiniteQuery<Order, Omit<UseInfiniteOrdersParams, 'limit' | 'enabled'>>({
    fetcher: fetchOrders,
    params: {
      userId: params.userId,
      orderStatus: params.orderStatus,
      paymentStatus: params.paymentStatus,
    },
    limit: params.limit,
    enabled: params.enabled,
  })
}
