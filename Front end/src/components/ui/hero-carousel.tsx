// src/components/ui/hero-carousel.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
import { wrap } from '@popmotion/popcorn'

interface HeroSlide {
  id: number
  image: string
  title: string
  description: string
  link: string
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1612817159623-0399784fd0ce?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Bộ Sưu Tập Đồng Hồ Mới',
    description: 'Khám phá những mẫu đồng hồ cao cấp mới nhất',
    link: '/products',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Đồng Hồ Cơ Cao Cấp',
    description: 'Tinh hoa cơ khí – đẳng cấp vượt thời gian',
    link: '/products',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1507679622673-989605832e3d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Phong Cách & Đẳng Cấp',
    description: 'Phụ kiện hoàn hảo cho quý ông hiện đại',
    link: '/products',
  },
]

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export function HeroCarousel() {
  const [[page, direction], setPage] = useState([0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const imageIndex = wrap(0, slides.length, page)

  const x = useMotionValue(0)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  // Auto-play
  useEffect(() => {
    if (isDragging) return

    const timer = setInterval(() => {
      paginate(1)
    }, 5000)

    return () => clearInterval(timer)
  }, [page, isDragging])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl bg-muted group">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, { offset, velocity }) => {
            setIsDragging(false)
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Background Image */}
          <img
            src={slides[imageIndex].image}
            alt={slides[imageIndex].title}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-2xl text-white"
              >
                <motion.h2
                  className="text-4xl md:text-6xl font-serif mb-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {slides[imageIndex].title}
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl mb-8 text-white/90"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {slides[imageIndex].description}
                </motion.p>
                <motion.a
                  href={slides[imageIndex].link}
                  className="inline-block px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Khám Phá Ngay
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {/* <motion.button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-10 opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>

      <motion.button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-10 opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button> */}

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
            className={`h-2 rounded-full transition-all ${
              idx === imageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
