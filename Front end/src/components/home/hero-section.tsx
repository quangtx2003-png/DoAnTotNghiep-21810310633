// src/components/sections/hero-section.tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HeroCarousel } from '@/components/ui/hero-carousel'

export const HeroSection = () => {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })

  return (
    <section ref={heroRef} className="mx-auto max-w-7xl px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <HeroCarousel />
      </motion.div>
    </section>
  )
}
