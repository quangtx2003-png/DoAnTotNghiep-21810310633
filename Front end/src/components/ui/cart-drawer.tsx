// src/components/cart/CartDrawer.tsx
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router'
import { useCartStore } from '@/store/useCartStore'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { drawerSlide, overlayFade, fadeInUp, buttonTap } from '@/lib/animations/variants'
import { useState, useEffect } from 'react'
import { getVariantsByIds } from '@/lib/axios/product'
import type { ProductVariant } from '@/types/product'
import { formatVND } from '@/utils'

interface CartItemWithDetails extends ProductVariant {
  quantity: number
}

const CartDrawer = () => {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, isOpen, closeCart } = useCartStore()
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (!isOpen || items.length === 0) {
        setCartItems([])
        return
      }

      setLoading(true)
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
      setLoading(false)
    }

    fetchCartDetails()
  }, [items, isOpen])

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  // const tax = subtotal * 0.1
  const tax = 0
  const shipping = subtotal > 50 ? 0 : 10
  const total = subtotal + tax + shipping

  const freeShippingProgress = Math.min((subtotal / 50) * 100, 100)
  const needForFreeShipping = Math.max(50 - subtotal, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-muted/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-serif font-semibold">Giỏ Hàng</h2>
                  <p className="text-xs text-muted-foreground">{items.length} sản phẩm</p>
                </div>
              </div>
              <motion.button
                onClick={closeCart}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Free Shipping Progress */}
            {/* {items.length > 0 && needForFreeShipping > 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-r from-blue-50 to-primary/5 dark:from-blue-950/20 dark:to-primary/10 border-b"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">
                    Thêm ${needForFreeShipping.toFixed(2)} để được miễn phí ship!
                  </p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/60"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            )} */}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full"
                  >
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Đang tải giỏ hàng...</p>
                  </motion.div>
                ) : items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-4"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 rounded-full bg-muted flex items-center justify-center"
                    >
                      <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-lg mb-1">Giỏ hàng trống</p>
                      <p className="text-sm text-muted-foreground">
                        Thêm sản phẩm để bắt đầu mua sắm
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        closeCart()
                        navigate('/')
                      }}
                    >
                      Khám Phá Sản Phẩm
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: 100 }}
                        custom={idx}
                        layout
                        className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow duration-300"
                      >
                        {/* Product Image */}
                        <motion.div
                          className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            closeCart()
                            navigate(`/product/${item.productId}`)
                          }}
                        >
                          <img
                            src={item.image || '/placeholder.svg'}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className="font-medium text-sm mb-1 cursor-pointer hover:text-primary transition-colors line-clamp-2"
                            onClick={() => {
                              closeCart()
                              navigate(`/product/${item.productId}`)
                            }}
                          >
                            {item.productName}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">SKU: {item.sku}</p>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center rounded-lg border border-border bg-background">
                              <motion.button
                                whileTap={buttonTap}
                                onClick={() =>
                                  updateQuantity(item.id!, Math.max(1, item.quantity - 1))
                                }
                                disabled={item.quantity <= 1}
                                className="p-1.5 hover:bg-muted transition-colors disabled:opacity-50"
                              >
                                <Minus className="h-3 w-3" />
                              </motion.button>
                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 1.2, color: 'rgb(var(--primary))' }}
                                animate={{ scale: 1, color: 'currentColor' }}
                                className="px-3 py-1 font-medium text-sm min-w-[2rem] text-center"
                              >
                                {item.quantity}
                              </motion.span>
                              <motion.button
                                whileTap={buttonTap}
                                onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                                className="p-1.5 hover:bg-muted transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <motion.p
                                className="font-semibold text-primary"
                                key={item.price * item.quantity}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                              >
                                {formatVND(item.price * item.quantity)} VND
                              </motion.p>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id!)}
                          className="p-2 h-fit hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t p-6 space-y-4 bg-muted/30 backdrop-blur-sm"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span className="font-medium">{formatVND(subtotal)} VND</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    {/* <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">Miễn phí</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span> */}
                    <span className="font-medium">
                      <span className="text-green-600 font-semibold">Miễn phí</span>
                    </span>
                  </div>
                  {/* <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Thuế (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div> */}
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-semibold">Tổng cộng</span>
                  <motion.span
                    className="text-2xl font-bold text-primary"
                    key={total}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {formatVND(total)} VND
                  </motion.span>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => {
                      closeCart()
                      navigate('/checkout')
                    }}
                    size="lg"
                    className="w-full shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  >
                    Thanh Toán
                  </Button>
                </motion.div>

                <Button
                  variant="outline"
                  onClick={() => {
                    closeCart()
                  }}
                  className="w-full"
                >
                  Tiếp Tục Mua Sắm
                </Button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
