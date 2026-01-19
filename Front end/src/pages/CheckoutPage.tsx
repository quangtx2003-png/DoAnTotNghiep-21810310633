// src/pages/CheckoutPage.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useCartStore } from '@/store/useCartStore'
import { createOrder } from '@/lib/axios/order'
import { getVariantsByIds } from '@/lib/axios/product'
import { Button } from '@/components/ui/button'
import { PaymentMethod, getPaymentMethodLabel } from '@/types/order'
import { fadeInUp } from '@/lib/animations/variants'
import type { ProductVariant } from '@/types/product'
import { toast } from 'sonner'
import { formatVND } from '@/utils'

interface CartItemWithDetails extends ProductVariant {
  quantity: number
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user, token, authLoading } = useAuthStore()
  const { items, clearCart } = useCartStore()

  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([])
  const [loadingCart, setLoadingCart] = useState(true)
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<string>(PaymentMethod.PAYOS)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ address?: string }>({})

  useEffect(() => {
    if (authLoading) return
    if (!token || !user) {
      navigate('/login')
      return
    }
    if (items.length === 0) {
      navigate('/')
    }
  }, [authLoading, token, user, items, navigate])

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (items.length === 0) {
        setCartItems([])
        setLoadingCart(false)
        return
      }

      setLoadingCart(true)
      const variantIds = items.map((item) => item.variantId)
      const variants = await getVariantsByIds(variantIds)

      const itemsWithDetails = items
        .map((item) => {
          const variant = variants.find((v) => v.id === item.variantId)
          if (!variant) return null
          return {
            ...variant,
            quantity: item.quantity,
          }
        })
        .filter(Boolean) as CartItemWithDetails[]

      setCartItems(itemsWithDetails)
      setLoadingCart(false)
    }

    fetchCartDetails()
  }, [items])

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = 0
  const finalAmount = totalAmount - discountAmount

  const validate = () => {
    const newErrors: { address?: string } = {}
    if (!address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ giao hàng'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || !user) return

    setLoading(true)
    try {
      const orderData = {
        paymentMethod,
        paymentReturnUrl: window.location.origin,
        address: address.trim(),
        note: note.trim(),
        items: items.map((item) => ({
          productVariantId: item.variantId,
          quantity: item.quantity,
        })),
      }

      const paymentUrl = await createOrder(orderData)

      if (paymentUrl) {
        clearCart()
        // Redirect to payment gateway
        window.location.href = paymentUrl
      }
    } catch (error: any) {
      console.error('Error creating order:', error)
      toast(error?.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user || loadingCart) {
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
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>

          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
            >
              <ShoppingCart className="h-8 w-8 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-serif">Thanh Toán</h1>
              <p className="text-muted-foreground">Hoàn tất đơn hàng của bạn</p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="border-2 border-border rounded-xl p-6 bg-card"
              >
                <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Địa chỉ giao hàng
                </h2>
                <div>
                  <textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                      if (errors.address) setErrors({ ...errors, address: undefined })
                    }}
                    placeholder="Nhập địa chỉ đầy đủ: số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    rows={3}
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-background focus:outline-none focus:border-primary transition-colors resize-none ${
                      errors.address ? 'border-red-500' : 'border-border'
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="border-2 border-border rounded-xl p-6 bg-card"
              >
                <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Phương thức thanh toán
                </h2>
                <div className="space-y-3">
                  {[PaymentMethod.PAYOS].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary ${
                        paymentMethod === method ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{getPaymentMethodLabel(method)}</p>
                        <p className="text-sm text-muted-foreground">
                          {method === PaymentMethod.PAYOS
                            ? 'Thanh toán qua cổng PayOS'
                            : 'Thanh toán qua VNPay'}
                        </p>
                      </div>
                      {paymentMethod === method && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Note */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="border-2 border-border rounded-xl p-6 bg-card"
              >
                <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Ghi chú (tùy chọn)
                </h2>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú cho người bán..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="border-2 border-border rounded-xl p-6 bg-card sticky top-6"
              >
                <h2 className="font-serif text-xl mb-4">Tóm tắt đơn hàng</h2>

                {/* Items */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatVND(item.price)} × {item.quantity} VND
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatVND(item.price * item.quantity)} VND</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-2 py-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span className="font-medium">{formatVND(totalAmount)} VND</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Giảm giá</span>
                      <span className="font-medium">-{formatVND(discountAmount)} VND</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold">Tổng cộng</span>
                    <span className="font-bold text-2xl text-primary">
                      {formatVND(finalAmount)} VND
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-base font-semibold mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Đặt hàng
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
