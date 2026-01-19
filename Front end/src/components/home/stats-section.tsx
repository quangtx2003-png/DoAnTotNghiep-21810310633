// src/components/sections/stats-section.tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeInUp, staggerContainer } from '@/lib/animations/variants'

export const StatsSection = () => {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })

  const stats = [
    { number: '10K+', label: 'Khách Hàng' },
    { number: '500+', label: 'Sản Phẩm' },
    { number: '50+', label: 'Thương Hiệu' },
    { number: '99%', label: 'Hài Lòng' },
  ]

  return (
    <section ref={statsRef} className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={statsInView ? 'visible' : 'hidden'}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <motion.p
              className="text-4xl font-bold text-primary mb-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: idx * 0.1, type: 'spring' }}
            >
              {stat.number}
            </motion.p>
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
