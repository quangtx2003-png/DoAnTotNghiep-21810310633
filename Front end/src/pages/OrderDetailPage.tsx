// src/pages/OrderDetailPage.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Package, MapPin, CreditCard, FileText, Calendar, Star } from 'lucide-react'
import { getOrderDetail } from '@/lib/axios/order'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { ReviewDialog } from '@/components/ui/review-dialog'
import type { OrderResponse, OrderItem } from '@/types/order'
import {
  getOrderStatusLabel,
  getPaymentStatusLabel,
  getOrderStatusColor,
  getPaymentStatusColor,
  getPaymentMethodLabel,
  OrderStatus,
  PaymentStatus,
} from '@/types/order'
import { fadeInUp } from '@/lib/animations/variants'
import { formatVND } from '@/utils'

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, token, authLoading } = useAuthStore()
  const [order, setOrder] = useState<OrderResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [reviewingItem, setReviewingItem] = useState<OrderItem | null>(null)

  useEffect(() => {
    if (authLoading) return
    if (!token || !user) {
      navigate('/login')
      return
    }

    const fetchOrder = async () => {
      if (!id) return
      setLoading(true)
      const data = await getOrderDetail(id)
      setOrder(data)
      setLoading(false)
    }

    fetchOrder()
  }, [id, authLoading, token, user, navigate])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Check if order can be reviewed
  const canReview =
    order && order.status === OrderStatus.SHIPPING && order.paymentStatus === PaymentStatus.PAID

  if (loading || authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-muted-foreground">Đang tải...</p>
        </motion.div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-serif mb-4">Không tìm thấy đơn hàng</h2>
          <Button onClick={() => navigate('/orders')} variant="outline">
            Quay lại danh sách
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => navigate('/orders')} className="mb-4 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-serif">Đơn hàng #{order.code}</h1>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getOrderStatusColor(
                    order.status
                  )}`}
                >
                  {getOrderStatusLabel(order.status)}
                </span>
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Đặt ngày: {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Tổng tiền</p>
              <p className="text-3xl font-bold text-primary">{formatVND(order.finalAmount)} VND</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="border-2 border-border rounded-xl p-6 bg-card"
            >
              <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Sản phẩm ({order.items.length})
              </h2>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div
                      onClick={() => navigate(`/product/${item.productId}`)}
                      className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={item.productVariantImage || '/placeholder.svg'}
                        alt={item.productName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        onClick={() => navigate(`/product/${item.productId}`)}
                        className="font-medium line-clamp-1 group-hover:text-primary transition-colors cursor-pointer"
                      >
                        {item.productName}
                      </h3>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm">
                          {formatVND(item.price)} × {item.quantity} VND
                        </span>
                      </div>

                      {/* Review Button */}
                      {canReview && (
                        <Button
                          onClick={() => setReviewingItem(item)}
                          size="sm"
                          variant="outline"
                          className="mt-3 gap-2"
                        >
                          <Star className="h-4 w-4" />
                          Đánh giá
                        </Button>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatVND(item.totalPrice)} VND</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Note */}
            {order.note && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="border-2 border-border rounded-xl p-6 bg-card"
              >
                <h2 className="font-serif text-xl mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Ghi chú
                </h2>
                <p className="text-muted-foreground">{order.note}</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Info */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="border-2 border-border rounded-xl p-6 bg-card"
            >
              <h2 className="font-serif text-lg mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Thanh toán
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tổng tiền hàng</span>
                  <span className="font-medium">{formatVND(order.totalAmount)} VND</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span className="font-medium">-{formatVND(order.discountAmount)} VND</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold">Tổng thanh toán</span>
                  <span className="font-bold text-xl text-primary">
                    {formatVND(order.finalAmount)} VND
                  </span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Phương thức</span>
                    <span className="text-sm font-medium">
                      {getPaymentMethodLabel(order.paymentMethod)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Trạng thái</span>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium border ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="border-2 border-border rounded-xl p-6 bg-card"
            >
              <h2 className="font-serif text-lg mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Địa chỉ giao hàng
              </h2>
              <p className="text-sm leading-relaxed">{order.address}</p>
            </motion.div>

            {/* Order Timeline */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="border-2 border-border rounded-xl p-6 bg-card"
            >
              <h2 className="font-serif text-lg mb-4">Lịch sử đơn hàng</h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">Đã tạo đơn hàng</p>
                    <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                {order.updatedAt !== order.createdAt && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-muted mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">Cập nhật lần cuối</p>
                      <p className="text-sm text-muted-foreground">{formatDate(order.updatedAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Button variant="outline" onClick={() => navigate('/orders')}>
            Quay lại danh sách
          </Button>
          <Button onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>
        </motion.div>
      </div>

      {/* Create Review Dialog */}
      <AnimatePresence>
        {reviewingItem && order && (
          <ReviewDialog
            orderItem={reviewingItem}
            orderId={order.id}
            onClose={() => setReviewingItem(null)}
            onSuccess={() => {
              // Optionally refresh order data
              setReviewingItem(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
