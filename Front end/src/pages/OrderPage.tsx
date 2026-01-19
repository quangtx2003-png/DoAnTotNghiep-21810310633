// src/pages/OrderPage.tsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ChevronDown, X, Loader2, ShoppingBag, ArrowUp } from 'lucide-react'
import { useInfiniteOrders } from '@/hooks/useInfiniteOrders'
import { useInfiniteScroll } from '@/hooks/useInfiniteQuery'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import {
  getOrderStatusLabel,
  getPaymentStatusLabel,
  getOrderStatusColor,
  getPaymentStatusColor,
  OrderStatus,
  PaymentStatus,
} from '@/types/order'
import { fadeInUp, staggerContainer } from '@/lib/animations/variants'
import { formatVND } from '@/utils'

const orderStatusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: OrderStatus.NEW, label: getOrderStatusLabel(OrderStatus.NEW) },
  { value: OrderStatus.CONFIRMED, label: getOrderStatusLabel(OrderStatus.CONFIRMED) },
  { value: OrderStatus.SHIPPING, label: getOrderStatusLabel(OrderStatus.SHIPPING) },
  { value: OrderStatus.COMPLETED, label: getOrderStatusLabel(OrderStatus.COMPLETED) },
  { value: OrderStatus.CANCELLED, label: getOrderStatusLabel(OrderStatus.CANCELLED) },
  { value: OrderStatus.REFUNDED, label: getOrderStatusLabel(OrderStatus.REFUNDED) },
]

const paymentStatusOptions = [
  { value: '', label: 'Tất cả thanh toán' },
  { value: PaymentStatus.UNPAID, label: getPaymentStatusLabel(PaymentStatus.UNPAID) },
  { value: PaymentStatus.PAID, label: getPaymentStatusLabel(PaymentStatus.PAID) },
  { value: PaymentStatus.PARTIAL, label: getPaymentStatusLabel(PaymentStatus.PARTIAL) },
  { value: PaymentStatus.FAILED, label: getPaymentStatusLabel(PaymentStatus.FAILED) },
  { value: PaymentStatus.REFUNDED, label: getPaymentStatusLabel(PaymentStatus.REFUNDED) },
]

export default function OrdersPage() {
  const navigate = useNavigate()
  const { user, token, authLoading } = useAuthStore()
  const [orderStatusFilter, setOrderStatusFilter] = useState('')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)

  useEffect(() => {
    if (authLoading) return
    if (!token || !user) {
      navigate('/login')
    }
  }, [authLoading, token, user, navigate])

  const {
    items: orders,
    loading,
    hasMore,
    loadMore,
    total,
  } = useInfiniteOrders({
    userId: user?.id,
    orderStatus: orderStatusFilter || undefined,
    paymentStatus: paymentStatusFilter || undefined,
    enabled: !!user,
  })

  const loadMoreRef = useInfiniteScroll(loadMore, {
    enabled: hasMore && !loading,
    threshold: 0.1,
  })

  const handleScroll = useCallback(() => {
    if (ticking.current) return

    ticking.current = true

    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up'

      // Chỉ ẩn header khi scroll xuống đủ nhiều (> 100px)
      if (scrollDirection === 'down' && currentScrollY > 100) {
        setIsHeaderVisible(false)
        setIsScrollingUp(false)
      }
      // Hiện header ngay khi bắt đầu scroll lên
      else if (scrollDirection === 'up') {
        setIsHeaderVisible(true)
        setIsScrollingUp(true)
      }

      // Reset scrollingUp nếu đang ở đầu trang
      if (currentScrollY <= 10) {
        setIsScrollingUp(false)
      }

      setLastScrollY(currentScrollY)
      ticking.current = false
    })
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!isHeaderVisible) {
      setOpenDropdown(null)
    }
  }, [isHeaderVisible])

  const clearFilters = () => {
    setOrderStatusFilter('')
    setPaymentStatusFilter('')
  }

  const activeFilterCount = [orderStatusFilter, paymentStatusFilter].filter(Boolean).length

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsHeaderVisible(true)
  }

  if (authLoading || !user) {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Main Header */}
      <div
        ref={headerRef}
        className={`
          relative z-40 bg-background transition-all duration-300 ease-in-out
          ${
            isHeaderVisible
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0 pointer-events-none'
          }
        `}
      >
        <div className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5"
                >
                  <Package className="h-8 w-8 text-blue-500" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-serif">Đơn Hàng Của Tôi</h1>
                  <p className="text-muted-foreground">Quản lý và theo dõi đơn hàng của bạn</p>
                </div>
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div
              className="flex items-center gap-3 flex-wrap"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Order Status Filter */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('orderStatus')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                    orderStatusFilter
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <span className="text-sm font-medium">
                    {orderStatusFilter
                      ? getOrderStatusLabel(orderStatusFilter)
                      : 'Trạng thái đơn hàng'}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === 'orderStatus' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === 'orderStatus' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl border-2 border-border bg-background shadow-xl z-50"
                    >
                      <div className="p-2">
                        {orderStatusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setOrderStatusFilter(option.value)
                              setOpenDropdown(null)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                              orderStatusFilter === option.value ? 'bg-muted font-medium' : ''
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Payment Status Filter */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('paymentStatus')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                    paymentStatusFilter
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <span className="text-sm font-medium">
                    {paymentStatusFilter
                      ? getPaymentStatusLabel(paymentStatusFilter)
                      : 'Trạng thái thanh toán'}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === 'paymentStatus' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === 'paymentStatus' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl border-2 border-border bg-background shadow-xl z-50"
                    >
                      <div className="p-2">
                        {paymentStatusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setPaymentStatusFilter(option.value)
                              setOpenDropdown(null)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                              paymentStatusFilter === option.value ? 'bg-muted font-medium' : ''
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <motion.button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border hover:border-destructive hover:text-destructive transition-all"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-4 w-4" />
                  <span className="text-sm font-medium">Xóa lọc</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Padding cho content */}
      <div className="pt-6" />

      {/* Orders List */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <motion.p
          className="text-sm text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Hiển thị {orders.length} / {total} đơn hàng
        </motion.p>

        {loading && orders.length === 0 ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-xl" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="font-serif text-xl mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-muted-foreground mb-6">Bạn chưa có đơn hàng nào</p>
            <Button onClick={() => navigate('/')}>Bắt đầu mua sắm</Button>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  variants={fadeInUp}
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="group border-2 border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer bg-card"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-serif text-lg">Đơn hàng #{order.code}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getOrderStatusColor(
                            order.status
                          )}`}
                        >
                          {getOrderStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ngày đặt: {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-primary">
                        {formatVND(order.finalAmount)} VND
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium border ${getPaymentStatusColor(
                          order.paymentStatus
                        )}`}
                      >
                        {getPaymentStatusLabel(order.paymentStatus)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      <p>Phương thức: {order.paymentMethod}</p>
                      {order.address && <p className="truncate max-w-md">{order.address}</p>}
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:bg-muted">
                      Xem chi tiết →
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Infinite Scroll Trigger */}
            <div ref={loadMoreRef} className="mt-12 flex justify-center">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang tải thêm...</span>
                </motion.div>
              )}
              {!hasMore && orders.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted-foreground"
                >
                  Đã hiển thị tất cả đơn hàng
                </motion.p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {openDropdown && <div className="fixed inset-0 z-30" onClick={() => setOpenDropdown(null)} />}

      {/* Floating Action Button */}
      <AnimatePresence>
        {(!isHeaderVisible || isScrollingUp) && window.scrollY > 300 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-8 right-8 z-40 flex flex-col gap-2"
          >
            <motion.button
              onClick={scrollToTop}
              className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
