import { motion } from 'framer-motion'
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  shimmer,
} from '@/lib/animations/variants'

const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Product Detail Section Skeleton */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12"
        >
          {/* Images Column Skeleton */}
          <motion.div variants={slideInLeft} className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="relative">
                {/* Wishlist Button Skeleton */}
                <div className="absolute top-4 right-4 z-10 rounded-full bg-muted p-3 backdrop-blur-sm shadow-lg">
                  <div className="h-5 w-5 bg-gray-300 rounded-full" />
                </div>

                {/* Image Carousel Skeleton */}
                <div className="aspect-square rounded-2xl overflow-hidden relative">
                  <motion.div
                    variants={shimmer}
                    animate="animate"
                    className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200"
                    style={{ backgroundSize: '200% 100%' }}
                  />
                </div>

                {/* Image Thumbnails Skeleton */}
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3, 4].map((item) => (
                    <motion.div
                      key={item}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: item * 0.1 }}
                      className="relative aspect-square w-20 rounded-xl overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Column Skeleton */}
          <motion.div variants={slideInRight} className="lg:col-span-6 space-y-6">
            {/* Header Skeleton */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {/* Title Skeleton */}
              <motion.div
                variants={fadeInUp}
                className="h-10 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-3 relative overflow-hidden"
              >
                <motion.div
                  variants={shimmer}
                  animate="animate"
                  className="absolute inset-0"
                  style={{ backgroundSize: '200% 100%' }}
                />
              </motion.div>

              {/* Rating Skeleton */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={scaleIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: i * 0.05 }}
                      className="h-4 w-4 bg-gray-300 rounded-full mr-1"
                    />
                  ))}
                </div>
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Description Skeleton */}
            <motion.div variants={fadeIn} className="space-y-2">
              <div className="h-4 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-4/6" />
            </motion.div>

            {/* Price Skeleton */}
            <motion.div variants={scaleIn} className="border-t border-border py-4">
              <div className="mb-2 h-4 w-16 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
              <div className="h-10 w-32 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse" />
            </motion.div>

            {/* Attributes Skeleton */}
            <motion.div variants={fadeIn} className="space-y-6">
              {[1, 2].map((attr) => (
                <motion.div key={attr} variants={fadeInUp}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="h-5 w-24 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((option) => (
                      <motion.div
                        key={option}
                        variants={scaleIn}
                        transition={{ delay: option * 0.1 }}
                        className="h-10 w-20 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-pulse"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quantity & CTA Skeleton */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border-2 border-border bg-background">
                  <div className="px-4 py-3">
                    <div className="h-4 w-4 bg-gray-300 rounded" />
                  </div>
                  <div className="px-6 py-3">
                    <div className="h-6 w-8 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded" />
                  </div>
                  <div className="px-4 py-3">
                    <div className="h-4 w-4 bg-gray-300 rounded" />
                  </div>
                </div>
                <div className="h-4 w-32 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
              </div>

              <div className="h-12 w-full bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-pulse" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Related Products Section Skeleton */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-16 border-t border-border"
      >
        {/* Title Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="space-y-3"
            >
              <div className="aspect-square rounded-2xl bg-linear-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
              <div className="h-4 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-1/2" />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default ProductDetailSkeleton
