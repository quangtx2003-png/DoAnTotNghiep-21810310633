import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, ShoppingBag, Heart } from 'lucide-react'
import type { ProductDetail } from '@/types/product'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { cardHover, buttonTap } from '@/lib/animations/variants'
import { getColorHex } from '@/lib/image-parser'
import { useAuthDialogStore } from '@/store/useAuthDialogStore'
import { formatVND } from '@/utils'

interface ProductCardProps {
  product: ProductDetail
}

export function ProductCard({ product }: ProductCardProps) {
  const { user, token } = useAuthStore()
  const {
    isInWishlist,
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isLoading: wishlistLoading,
  } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()
  const isWished = isInWishlist(product.id)

  // Find color attribute
  const colorAttr = product.attributes?.find(
    (attr) =>
      attr.fieldName === 'color' ||
      attr.fieldName === 'dial_color' ||
      attr.name.toLowerCase().includes('màu')
  )

  // Get unique colors from variants
  const availableColors = colorAttr
    ? Array.from(
        new Set(
          product.variants?.map((v) => v.options?.[colorAttr.fieldName]).filter(Boolean) as string[]
        )
      )
    : []

  const [selectedColor, setSelectedColor] = useState<string>(availableColors[0] || '')
  const [isHovering, setIsHovering] = useState(false)
  const { openDialog } = useAuthDialogStore()

  // Get current variant based on selected color
  const currentVariant = product.variants?.find(
    (v) => v.options?.[colorAttr?.fieldName || ''] === selectedColor
  )

  const displayImage =
    currentVariant?.image ||
    product.thumbnail ||
    product.image ||
    '/placeholder.svg?height=300&width=300'

  const displayPrice =
    product.minPrice === product.maxPrice
      ? `${formatVND(product.minPrice)} VND`
      : `${formatVND(product.minPrice)} - ${formatVND(product.maxPrice)} VND`

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!token || !user) {
      openDialog()
      return
    }

    if (isWished) {
      await removeFromWishlist(product.id, user.id)
    } else {
      await addToWishlist(product.id, user.id)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Get first variant or selected variant
    const variant = currentVariant || product.variants?.[0]
    if (!variant || !variant.id) return

    addToCart(variant.id, 1)
  }

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="group/card h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="flex flex-col h-full space-y-3">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-xl bg-muted aspect-square shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="relative overflow-hidden rounded-xl bg-muted aspect-square shadow-lg">
              <AnimatePresence>
                <motion.img
                  key={displayImage}
                  src={displayImage}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </AnimatePresence>
            </div>
            {/* Rating Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/95 backdrop-blur-sm px-3 py-1.5 shadow-lg"
            >
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-semibold">{product.avgRating.toFixed(1)}</span>
            </motion.div>

            {/* Action Buttons - Show on Card Hover */}
            <motion.div
              className="absolute top-3 right-3 flex flex-col gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={isHovering ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Wishlist Button */}
              <motion.button
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                whileTap={buttonTap}
                className="p-2.5 rounded-full bg-background/95 backdrop-blur-sm shadow-lg hover:bg-background disabled:opacity-50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileFocus={{ scale: 1.1 }}
              >
                <motion.div
                  animate={isWished ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      isWished ? 'fill-red-500 text-red-500' : 'text-foreground'
                    }`}
                  />
                </motion.div>
              </motion.button>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                whileTap={buttonTap}
                className="p-2.5 rounded-full bg-background/95 text-primary-foreground backdrop-blur-sm shadow-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileFocus={{ scale: 1.1 }}
              >
                <ShoppingBag className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col space-y-2.5 px-1">
            <h3 className="font-serif text-base line-clamp-2 hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>

            {/* Color Options */}
            {availableColors.length > 0 && (
              <motion.div
                className="flex items-center gap-2"
                onClick={(e) => e.preventDefault()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {availableColors.slice(0, 5).map((color, idx) => (
                  <motion.button
                    key={color}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedColor(color)
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`h-6 w-6 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{
                      backgroundColor: getColorHex(color),
                    }}
                    title={color}
                  />
                ))}
                {availableColors.length > 5 && (
                  <span className="text-xs text-muted-foreground font-medium">
                    +{availableColors.length - 5}
                  </span>
                )}
              </motion.div>
            )}

            <div className="flex items-center justify-between pt-1 mt-auto">
              <motion.span
                className="font-bold text-lg text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {displayPrice}
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
