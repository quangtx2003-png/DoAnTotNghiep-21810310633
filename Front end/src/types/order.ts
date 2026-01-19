// src/types/order.ts

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  productName: string
  productVariantId: number
  sku: string
  productVariantImage: string
  price: number
  quantity: number
  totalPrice: number
}

export interface Order {
  id: number
  code: string
  userId: number
  totalAmount: number
  discountAmount: number
  finalAmount: number
  status: string
  paymentStatus: string
  paymentMethod: string
  note: string
  address: string
  createdAt: string
  updatedAt: string
}

export interface OrderResponse extends Order {
  items: OrderItem[]
}

export interface OrderListResponse {
  total: number
  page: number
  items: Order[]
}

export interface GetOrdersRequest {
  userId?: number
  orderStatus?: string
  paymentStatus?: string
  page?: number
  limit?: number
}

export interface CreateOrderRequest {
  paymentMethod: string
  paymentReturnUrl?: string
  note?: string
  address: string
  items: {
    productVariantId: number
    quantity: number
  }[]
}

export interface UpdateOrderStatusRequest {
  id: number
  status: string
  paymentStatus: string
}

// Order status constants - SYNCED WITH BACKEND
export const OrderStatus = {
  NEW: 'NEW',
  CONFIRMED: 'CONFIRMED',
  SHIPPING: 'SHIPPING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const

// Payment status constants - SYNCED WITH BACKEND
export const PaymentStatus = {
  UNPAID: 'UNPAID',
  PAID: 'PAID',
  PARTIAL: 'PARTIAL',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const

// Payment method constants - SYNCED WITH BACKEND
export const PaymentMethod = {
  COD: 'COD',
  VNPAY: 'VNPAY',
  PAYPAL: 'PAYPAL',
  PAYOS: 'PAYOS',
  BANK_TRANSFER: 'BANK_TRANSFER',
} as const

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus]
export type PaymentStatusType = (typeof PaymentStatus)[keyof typeof PaymentStatus]
export type PaymentMethodType = (typeof PaymentMethod)[keyof typeof PaymentMethod]

// Status display helpers
export const getOrderStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    NEW: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    SHIPPING: 'Đang giao hàng',
    COMPLETED: 'Đã giao',
    CANCELLED: 'Đã hủy',
    REFUNDED: 'Đã hoàn tiền',
  }
  return labels[status] || status
}

export const getPaymentStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    UNPAID: 'Chưa thanh toán',
    PAID: 'Đã thanh toán',
    PARTIAL: 'Thanh toán một phần',
    FAILED: 'Thanh toán thất bại',
    REFUNDED: 'Đã hoàn tiền',
  }
  return labels[status] || status
}

export const getPaymentMethodLabel = (method: string): string => {
  const labels: Record<string, string> = {
    COD: 'Thanh toán khi nhận hàng',
    VNPAY: 'VNPay',
    PAYPAL: 'PayPal',
    PAYOS: 'PayOS',
    BANK_TRANSFER: 'Chuyển khoản ngân hàng',
  }
  return labels[method] || method
}

export const getOrderStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    NEW: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-300',
    SHIPPING: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    COMPLETED: 'bg-green-100 text-green-800 border-green-300',
    CANCELLED: 'bg-red-100 text-red-800 border-red-300',
    REFUNDED: 'bg-gray-100 text-gray-800 border-gray-300',
  }
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300'
}

export const getPaymentStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    UNPAID: 'bg-orange-100 text-orange-800 border-orange-300',
    PAID: 'bg-green-100 text-green-800 border-green-300',
    PARTIAL: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    FAILED: 'bg-red-100 text-red-800 border-red-300',
    REFUNDED: 'bg-gray-100 text-gray-800 border-gray-300',
  }
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300'
}
