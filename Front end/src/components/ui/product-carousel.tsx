import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProductDetail } from '@/types/product'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ui/product-card'

interface ProductCarouselProps {
  products: ProductDetail[]
  title?: string
}

export function ProductCarousel({ products, title }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const carouselRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 })

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1)
      else if (window.innerWidth < 768) setItemsPerView(2)
      else if (window.innerWidth < 1024) setItemsPerView(3)
      else setItemsPerView(4)
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  if (products.length === 0) return null

  return (
    <div className="relative">
      {title && (
        <motion.div
          ref={titleRef}
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 font-serif text-3xl md:text-4xl">{title}</h2>
          <motion.div
            className="h-1 w-24 bg-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={titleInView ? { width: 96 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>
      )}

      <div className="relative group">
        {/* Previous Button */}
        {currentIndex > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Button
              onClick={prev}
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </motion.div>
        )}

        {/* Carousel Container */}
        <div className="overflow-hidden" ref={carouselRef}>
          <motion.div
            className="flex pt-4"
            animate={{
              x: `-${currentIndex * (100 / itemsPerView)}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Next Button */}
        {currentIndex < maxIndex && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Button
              onClick={next}
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Dots Indicator */}
      {maxIndex > 0 && (
        <motion.div
          className="flex justify-center gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
