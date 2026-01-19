// src/lib/axios/order.ts
import axiosInstance from '@/lib/axios/instance'
import type {
  Order,
  OrderResponse,
  OrderListResponse,
  GetOrdersRequest,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
} from '@/types/order'

export async function getOrders(params: GetOrdersRequest = {}) {
  try {
    const { data } = await axiosInstance.get<any>('/order/list', {
      params: {
        userId: params.userId,
        orderStatus: params.orderStatus,
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      },
    })

    if (data.code === 200 && data.result) {
      return data.result as OrderListResponse
    }
    return { total: 0, page: 1, items: [] }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return { total: 0, page: 1, items: [] }
  }
}

export async function getOrderDetail(id: number | string) {
  try {
    const { data } = await axiosInstance.get<any>(`/order/detail/${id}`)

    if (data.code === 200 && data.result) {
      return data.result as OrderResponse
    }
    return null
  } catch (error) {
    console.error('Error fetching order detail:', error)
    return null
  }
}

export async function createOrder(orderData: CreateOrderRequest) {
  try {
    const { data } = await axiosInstance.post<any>('/order/create', orderData)

    if (data.code === 200 && data.result) {
      // Backend returns payment URL as string
      return data.result as string
    }
    return null
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export async function updateOrderStatus(statusData: UpdateOrderStatusRequest) {
  try {
    const { data } = await axiosInstance.post<any>('/order/update-status', statusData)

    if (data.code === 200) {
      return data.message
    }
    return null
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}
