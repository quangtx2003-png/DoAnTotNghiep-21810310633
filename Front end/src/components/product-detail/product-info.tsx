// src/components/product-detail/ProductInfo.tsx
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonTap } from '@/lib/animations/variants'
import type { ProductDetail, ProductVariant } from '@/types/product'
import { Link } from 'react-router'
import { formatVND } from '@/utils'

interface ProductInfoProps {
  product: ProductDetail
  selectedOptions: Record<string, string>
  matchingVariant: ProductVariant | null
  quantity: number
  addedToCart: boolean
  onOptionChange: (fieldName: string, value: string) => void
  onQuantityChange: (newQuantity: number) => void
  onAddToCart: () => void
  getAvailableOptions: (attributeFieldName: string) => { id: string; value: string }[]
  getStockForOption: (attributeFieldName: string, optionValue: string) => number
}

export const ProductInfo = ({
  product,
  selectedOptions,
  matchingVariant,
  quantity,
  addedToCart,
  onOptionChange,
  onQuantityChange,
  onAddToCart,
  getAvailableOptions,
  getStockForOption,
}: ProductInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="lg:col-span-6 space-y-6"
    >
      {/* Header */}
      <div>
        <motion.h1
          className="mb-3 font-serif text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {product.name}
        </motion.h1>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Star
                  className={`h-4 w-4 ${
                    i < Math.floor(product.avgRating)
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              </motion.div>
            ))}
          </div>
          {/* <span className="text-sm text-muted-foreground">
            {product.avgRating.toFixed(1)} (24 đánh giá)
          </span> */}
          <span className="text-sm text-muted-foreground">{product.avgRating.toFixed(1)}</span>
          <Link
            to={`/product/${product.id}/reviews`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            (Xem tất cả đánh giá)
          </Link>
        </motion.div>
      </div>

      <motion.p
        className="text-muted-foreground leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {product.description}
      </motion.p>

      {/* Price */}
      <motion.div
        className="border-t border-border py-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-2 text-sm text-muted-foreground">Giá</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={matchingVariant?.id || 'default'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            {matchingVariant
              ? `${formatVND(matchingVariant.price)} VND`
              : `${formatVND(product.minPrice)} - ${formatVND(product.maxPrice)} VND`}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Attributes */}
      {product.attributes && product.attributes.length > 0 && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {product.attributes.map((attr, attrIdx) => {
            const availableOptions = getAvailableOptions(attr.fieldName)

            return (
              <div key={attr.id}>
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-medium">{attr.name}</p>
                  <AnimatePresence mode="wait">
                    {selectedOptions[attr.fieldName] && (
                      <motion.span
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="text-sm text-primary font-semibold"
                      >
                        {selectedOptions[attr.fieldName]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-wrap gap-2">
                  {attr.options?.map((option, optIdx) => {
                    const isAvailable = availableOptions.some((opt) => opt.value === option.value)
                    const stock = getStockForOption(attr.fieldName, option.value)
                    const isSelected = selectedOptions[attr.fieldName] === option.value

                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => isAvailable && onOptionChange(attr.fieldName, option.value)}
                        disabled={!isAvailable}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: attrIdx * 0.1 + optIdx * 0.05 }}
                        whileHover={isAvailable ? { scale: 1.05 } : {}}
                        whileTap={isAvailable ? buttonTap : {}}
                        className={`group relative rounded-xl border-2 px-6 py-3 text-sm font-medium transition-all ${
                          isSelected
                            ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                            : isAvailable
                            ? 'border-border hover:border-primary hover:bg-primary/5'
                            : 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                        }`}
                      >
                        <span>{option.value}</span>
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-px w-full bg-muted-foreground/50 rotate-[-15deg]"></div>
                          </div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </motion.div>
      )}

      {/* Quantity & CTA */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-xl border-2 border-border bg-background">
            <motion.button
              onClick={() => onQuantityChange(quantity - 1)}
              whileTap={buttonTap}
              className="px-4 py-3 hover:bg-muted transition-colors"
            >
              −
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.span
                key={quantity}
                initial={{ scale: 1.5, color: 'hsl(var(--primary))' }}
                animate={{ scale: 1, color: 'currentColor' }}
                className="px-6 py-3 font-semibold"
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
            <motion.button
              onClick={() => onQuantityChange(quantity + 1)}
              whileTap={buttonTap}
              className="px-4 py-3 hover:bg-muted transition-colors"
            >
              +
            </motion.button>
          </div>

          {matchingVariant && (
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {matchingVariant.stock > 0 ? `${matchingVariant.stock} còn hàng` : 'Hết hàng'}
            </motion.p>
          )}
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onAddToCart}
            disabled={!matchingVariant || matchingVariant.stock === 0}
            size="lg"
            className="w-full rounded-xl text-base shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {addedToCart ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-5 w-5" />
                  Đã Thêm Vào Giỏ!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {matchingVariant?.stock === 0 ? 'Hết Hàng' : 'Thêm Vào Giỏ'}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
