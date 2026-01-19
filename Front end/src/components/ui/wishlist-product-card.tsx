// src/components/wishlist/wishlist-card.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Star, Loader2 } from 'lucide-react'
import type { ProductDetail } from '@/types/product'
import { buttonTap } from '@/lib/animations/variants'
import { getColorHex } from '@/lib/image-parser'
import { formatVND } from '@/utils'

interface WishlistCardProps {
  product: ProductDetail
  index: number
  isRemoving: boolean
  onRemove: () => void
  onView: () => void
}

export function WishlistCard({ product, index, isRemoving, onRemove, onView }: WishlistCardProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
      className="group relative rounded-xl border border-border bg-card overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Product Image Container */}
      <div
        className="aspect-square overflow-hidden bg-muted cursor-pointer relative"
        onClick={onView}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        {product.avgRating > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/95 backdrop-blur-sm px-3 py-1.5 shadow-lg"
          >
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold">{product.avgRating.toFixed(1)}</span>
          </motion.div>
        )}

        {/* Delete Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          disabled={isRemoving}
          whileHover={{ scale: 1.1 }}
          whileTap={buttonTap}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-background/95 backdrop-blur-sm hover:bg-destructive/90 hover:text-red-500 transition-colors shadow-lg z-10 disabled:opacity-50"
        >
          {isRemoving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3
            className="font-serif text-base line-clamp-2 hover:text-primary transition-colors cursor-pointer mb-2"
            onClick={onView}
          >
            {product.name}
          </h3>

          {/* Color Options */}
          {availableColors.length > 0 && (
            <motion.div
              className="flex items-center gap-2 mb-2"
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
        </div>

        <div className="flex items-center justify-between">
          <motion.span
            className="font-bold text-lg text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {displayPrice}
          </motion.span>

          {/* View Button */}
          {/* <motion.button
            onClick={onView}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 text-sm rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
          >
            Xem chi tiết
          </motion.button> */}
        </div>
      </div>
    </motion.div>
  )
}
