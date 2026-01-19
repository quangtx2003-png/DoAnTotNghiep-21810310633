import { useEffect, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import useMeasure from 'react-use-measure'

const BRANDS = [
  {
    id: 1,
    name: 'Rolex',
    image:
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Omega',
    image:
      'https://images.unsplash.com/photo-1691865179028-1729b766a5cd?q=80&w=802&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Patek Philippe',
    image:
      'https://images.unsplash.com/photo-1745305023239-b476a0faa159?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Audemars Piguet',
    image:
      'https://images.unsplash.com/photo-1638872726444-0579101a60e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Fossil',
    image:
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=704&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'tissot',
    image:
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=694&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    name: 'Cartier',
    image:
      'https://images.unsplash.com/photo-1466684921455-ee202d43c1aa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    name: 'IWC',
    image:
      'https://images.unsplash.com/photo-1696430257997-470acf236b1b?q=80&w=1208&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

function Card({ image, name }: { image: string; name: string }) {
  return (
    <div className="w-full h-full overflow-hidden rounded-lg">
      <img src={image} alt={name} className="w-full h-full object-cover" draggable={false} />
    </div>
  )
}

export function SlidingCarousel({
  cardWidth = 220,
  cardHeight = 220,
  fastDuration = 25,
  slowDuration = 70,
  className = '',
}: {
  cardWidth?: number
  cardHeight?: number
  fastDuration?: number
  slowDuration?: number
  className?: string
}) {
  const x = useMotionValue(0)
  const controls = useRef<ReturnType<typeof animate> | null>(null)
  const durationRef = useRef(fastDuration)
  const [ref, bounds] = useMeasure()

  const items = [...BRANDS, ...BRANDS]
  const distanceRef = useRef(0)

  const startAnimation = () => {
    if (!bounds.width) return

    const distance = -bounds.width / 2
    distanceRef.current = distance

    const currentX = x.get()
    const remaining = distance - currentX
    const progress = Math.abs(remaining / distance)

    controls.current?.stop()

    controls.current = animate(x, distance, {
      duration: durationRef.current * progress,
      ease: 'linear',
      onComplete: () => {
        x.set(0)
        startAnimation()
      },
    })
  }

  useEffect(() => {
    startAnimation()
    return () => controls.current?.stop()
  }, [bounds.width])

  const handleMouseEnter = () => {
    durationRef.current = slowDuration
    startAnimation()
  }

  const handleMouseLeave = () => {
    durationRef.current = fastDuration
    startAnimation()
  }

  return (
    <div className={`relative overflow-hidden py-8 ${className}`}>
      <motion.div
        ref={ref}
        className="flex"
        style={{
          x,
          width: items.length * (cardWidth + 16),
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            className="mx-2 shrink-0"
            style={{ width: cardWidth, height: cardHeight }}
          >
            <Card image={brand.image} name={brand.name} />
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  )
}

export default SlidingCarousel
