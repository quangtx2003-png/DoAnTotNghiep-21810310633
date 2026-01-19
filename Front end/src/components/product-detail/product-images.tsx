// src/components/product-detail/ProductImages.tsx
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { ImageCarousel } from '@/components/ui/image-carousel'
import { buttonTap } from '@/lib/animations/variants'

interface ProductImagesProps {
  images: string[]
  activeImage?: string | null
  alt: string
  isWishlisted: boolean
  wishlistLoading: boolean
  onWishlistToggle: () => void
}

export const ProductImages = ({
  images,
  activeImage,
  alt,
  isWishlisted,
  wishlistLoading,
  onWishlistToggle,
}: ProductImagesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-4"
    >
      <div className="sticky top-24">
        <div className="relative">
          <motion.button
            onClick={onWishlistToggle}
            disabled={wishlistLoading}
            whileHover={{ scale: 1.1 }}
            whileTap={buttonTap}
            className="absolute top-4 right-4 z-10 rounded-full bg-background/95 p-3 backdrop-blur-sm transition hover:bg-background shadow-lg disabled:opacity-50"
          >
            <motion.div
              animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'
                }`}
              />
            </motion.div>
          </motion.button>
          <ImageCarousel images={images} activeImage={activeImage} alt={alt} />
        </div>
      </div>
    </motion.div>
  )
}
