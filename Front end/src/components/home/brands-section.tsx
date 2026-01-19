// src/components/sections/brands-section.tsx
import { motion } from 'framer-motion'
import SlidingCarousel from '@/components/ui/sliding-carousel'

export const BrandsSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h2
          className="font-serif text-3xl md:text-4xl mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Thương Hiệu Đối Tác
        </motion.h2>

        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Những thương hiệu đồng hành cùng chúng tôi
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <SlidingCarousel cardWidth={320} cardHeight={200} fastDuration={25} slowDuration={60} />
      </motion.div>
    </section>
  )
}
