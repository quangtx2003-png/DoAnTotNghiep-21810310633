import { motion } from 'framer-motion'
import { shimmer, fadeIn, scaleIn } from '@/lib/animations/variants'

interface ProductCardSkeletonProps {
  showPrice?: boolean
  showColors?: boolean
}

const ProductCardSkeleton = ({ showPrice = true, showColors = true }: ProductCardSkeletonProps) => {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible" className="group/card h-full">
      <div className="flex flex-col h-full space-y-3">
        {/* Product Image Skeleton */}
        <div className="relative overflow-hidden rounded-xl bg-muted aspect-square shadow-lg">
          <motion.div
            variants={shimmer}
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            style={{ backgroundSize: '200% 100%' }}
          />
          {/* Rating Badge Skeleton */}
          <motion.div
            variants={scaleIn}
            className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-gray-200 backdrop-blur-sm px-3 py-1.5 shadow-lg"
          >
            <div className="h-3.5 w-3.5 bg-gray-300 rounded-full" />
            <div className="h-3 w-6 bg-gray-300 rounded" />
          </motion.div>

          {/* Action Buttons Skeleton */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.div
              variants={scaleIn}
              className="p-2.5 rounded-full bg-gray-200 backdrop-blur-sm shadow-lg"
            >
              <div className="h-4 w-4 bg-gray-300 rounded-full" />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="p-2.5 rounded-full bg-gray-200 backdrop-blur-sm shadow-lg"
            >
              <div className="h-4 w-4 bg-gray-300 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="flex-1 flex flex-col space-y-2.5 px-1">
          {/* Title Skeleton */}
          <div className="space-y-1.5">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-3/4" />
          </div>

          {/* Color Options Skeleton */}
          {showColors && (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((color) => (
                <motion.div
                  key={color}
                  variants={scaleIn}
                  className="h-6 w-6 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Price Skeleton */}
          {showPrice && (
            <div className="flex items-center justify-between pt-1 mt-auto">
              <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCardSkeleton
