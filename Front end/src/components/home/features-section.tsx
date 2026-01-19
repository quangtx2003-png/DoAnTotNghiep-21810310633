// src/components/sections/features-section.tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, TrendingUp, Award } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations/variants'

export const FeaturesSection = () => {
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })

  const features = [
    {
      icon: Sparkles,
      title: 'Tuyển Dụng Kỹ Lưỡng',
      desc: 'Mỗi sản phẩm đều được lựa chọn với sự chăm sóc và chú ý',
    },
    {
      icon: Award,
      title: 'Chất Lượng Đảm Bảo',
      desc: 'Cam kết chất lượng cao nhất từ những thương hiệu hàng đầu',
    },
    {
      icon: TrendingUp,
      title: 'Hỗ Trợ Khách Hàng',
      desc: 'Đội ngũ chuyên gia sẵn sàng hỗ trợ',
    },
  ]

  return (
    <section
      ref={featuresRef}
      className="border-y border-border bg-muted/30 relative overflow-hidden my-12"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 text-center md:grid-cols-3 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate={featuresInView ? 'visible' : 'hidden'}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="mb-4 p-4 rounded-full bg-primary/10"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <feature.icon className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.p
              className="mb-2 font-serif text-lg"
              initial={{ opacity: 0 }}
              animate={featuresInView ? { opacity: 1 } : {}}
              transition={{ delay: idx * 0.1 }}
            >
              {feature.title}
            </motion.p>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
