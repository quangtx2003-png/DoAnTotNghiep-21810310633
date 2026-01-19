'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

interface Slide {
  id: number
  image: string
  title: string
  description: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    title: 'Bộ Sưu Tập Mới',
    description: 'Khám phá những sản phẩm cao cấp mới nhất',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop',
    title: 'Đồng Hồ Sang Trọng',
    description: 'Thể hiện đẳng cấp với đồng hồ cao cấp',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    title: 'Phụ Kiện Thời Trang',
    description: 'Hoàn thiện phong cách của bạn',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=600&fit=crop',
    title: 'Giày Dép Cao Cấp',
    description: 'Bước đi tự tin với phong cách riêng',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop',
    title: 'Túi Xách Sang Trọng',
    description: 'Điểm nhấn hoàn hảo cho mọi trang phục',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop',
    title: 'Túi Xách Sang Trọng',
    description: 'Điểm nhấn hoàn hảo cho mọi trang phục',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop',
    title: 'Túi Xách Sang Trọng',
    description: 'Điểm nhấn hoàn hảo cho mọi trang phục',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=600&fit=crop',
    title: 'Túi Xách Sang Trọng',
    description: 'Điểm nhấn hoàn hảo cho mọi trang phục',
  },
]

export function CoverflowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDrag = (event: any, info: PanInfo) => {
    // Cập nhật offset drag
    const slideWidth = 280 // xSpacing value
    const dragProgress = info.offset.x / slideWidth
    setDragOffset(dragProgress)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)

    const slideWidth = 280
    const dragProgress = info.offset.x / slideWidth
    const velocity = info.velocity.x

    // Tính toán index mới dựa trên drag và velocity
    const velocityFactor = Math.abs(velocity) / 1000
    const direction = velocity > 0 ? -1 : 1
    const momentumChange = velocityFactor * direction

    // Tổng hợp cả drag và momentum
    const totalChange = dragProgress + momentumChange

    // Tính index mới, làm tròn với "snap" effect
    let indexChange = Math.round(totalChange)

    // Nếu drag nhỏ nhưng velocity lớn, vẫn chuyển slide
    if (Math.abs(totalChange) < 0.5 && Math.abs(velocity) > 500) {
      indexChange = velocity > 0 ? -1 : 1
    }

    const newIndex = (currentIndex - indexChange + slides.length) % slides.length
    setCurrentIndex(newIndex)
    setDragOffset(0)
  }

  // Tính toán vị trí 3D cho từng slide với drag offset
  const calculateStyle = (index: number): React.CSSProperties => {
    // Tính khoảng cách tính đến drag đang diễn ra
    let distance = index - currentIndex + dragOffset

    // Điều chỉnh khoảng cách để tạo hiệu ứng vòng lặp mượt
    if (distance > Math.floor(slides.length / 2)) {
      distance -= slides.length
    } else if (distance < -Math.floor(slides.length / 2)) {
      distance += slides.length
    }

    const isActive = Math.abs(distance) < 0.5 && !isDragging
    const isVisible = Math.abs(distance) <= 2.5 // Hiển thị nhiều hơn khi đang kéo

    if (!isVisible && !isDragging) {
      return {
        opacity: 0,
        pointerEvents: 'none',
        display: 'none',
      } as React.CSSProperties
    }

    // Các thông số cho hiệu ứng coverflow
    const baseWidth = 400
    const baseHeight = 500
    const xSpacing = 280
    const zOffset = -400
    const rotation = 40

    // Tính opacity và scale dựa trên distance
    const opacity = Math.max(0, 0.8 - Math.abs(distance) * 0.3)
    const scale = 0.85 + 0.15 * (1 - Math.min(Math.abs(distance) / 2, 1))

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: `${baseWidth}px`,
      height: `${baseHeight}px`,
      marginLeft: `-${baseWidth / 2}px`,
      marginTop: `-${baseHeight / 2}px`,
      transform: `
        translateX(${distance * xSpacing}px)
        translateZ(${isActive ? 0 : zOffset}px)
        rotateY(${distance * -rotation}deg)
        scale(${scale})
      `,
      opacity: isActive ? 1 : opacity,
      filter: isActive
        ? 'brightness(1)'
        : `brightness(${0.7 + 0.3 * (1 - Math.abs(distance) / 2)})`,
      transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 100 - Math.abs(distance * 10),
      transformStyle: 'preserve-3d',
      pointerEvents: isDragging ? 'none' : 'auto',
    } as React.CSSProperties
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setDragOffset(0)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Container với perspective 3D */}
        <div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'pan-y' }}
            drag="x"
            dragElastic={0.1}
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {/* Render tất cả slides cùng lúc */}
            {slides.map((slide, index) => {
              const slideStyle = calculateStyle(index)

              return (
                <motion.div
                  key={slide.id}
                  className="absolute"
                  style={slideStyle}
                  onClick={() => {
                    if (!isDragging && Math.abs(index - currentIndex) > 0.5) {
                      setCurrentIndex(index)
                    }
                  }}
                  animate={
                    isDragging
                      ? undefined
                      : {
                          transition: {
                            duration: 0.5,
                            ease: 'easeInOut',
                          },
                        }
                  }
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
