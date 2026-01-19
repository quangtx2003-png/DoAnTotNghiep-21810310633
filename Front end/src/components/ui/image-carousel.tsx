import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'

interface ImageCarouselProps {
  images: string[]
  alt: string
  activeImage?: string | null
}

export function ImageCarousel({ images, alt, activeImage }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi | null>(null)

  // Sync từ variant → ảnh lớn
  useEffect(() => {
    if (!activeImage) return
    const index = images.findIndex((img) => img === activeImage)
    if (index >= 0) {
      setCurrentIndex(index)
    }
  }, [activeImage, images])

  // Sync ảnh lớn → thumbnail carousel
  useEffect(() => {
    if (!api) return
    api.scrollTo(currentIndex)
  }, [currentIndex, api])

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-lg bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No image available</p>
      </div>
    )
  }

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted group">
        <AnimatePresence>
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <Button
              onClick={prev}
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={next}
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        <div className="absolute bottom-4 right-4 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1.5 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <Carousel opts={{ align: 'start', dragFree: true }} setApi={setApi} className="w-full">
        <CarouselContent className="-ml-2">
          {images.map((image, idx) => {
            const isActive = idx === currentIndex

            return (
              <CarouselItem key={image} className="pl-2 pt-0.5 basis-1/4 md:basis-1/5 lg:basis-1/6">
                <motion.button
                  onClick={() => setCurrentIndex(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-full aspect-square overflow-hidden rounded-lg transition-all
                    ${
                      isActive
                        ? 'border-3 border-primary'
                        : 'border border-border hover:border-primary/50'
                    }
                  `}
                >
                  <img
                    src={image}
                    alt={`${alt} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </motion.button>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
