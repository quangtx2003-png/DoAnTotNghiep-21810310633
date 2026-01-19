import { Link } from 'react-router'
import { motion, type Variants } from 'framer-motion'
import { Home, Compass, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const slideInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const numberAnimation: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-background to-muted/30 px-6 text-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        className="relative"
      >
        {/* Animated search icon */}
        <motion.div
          className="absolute -top-12 -right-12"
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <SearchX className="h-24 w-24 text-primary/20" />
        </motion.div>

        {/* 404 Numbers with individual animations */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <motion.div
            variants={numberAnimation}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <span className="font-serif text-9xl md:text-[10rem] font-bold text-neutral-900">
              4
            </span>
            <motion.div
              className="absolute -inset-4 bg-linear-to-r from-primary/20 to-primary/5 rounded-full -z-10 blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            variants={numberAnimation}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <span className="font-serif text-9xl md:text-[10rem] font-bold text-neutral-900">
              0
            </span>
            <motion.div
              className="absolute -inset-4 bg-linear-to-r from-primary/20 to-primary/5 rounded-full -z-10 blur-xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>

          <motion.div
            variants={numberAnimation}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <span className="font-serif text-9xl md:text-[10rem] font-bold text-neutral-900">
              4
            </span>
            <motion.div
              className="absolute -inset-4 bg-linear-to-r from-primary/20 to-primary/5 rounded-full -z-10 blur-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Error message */}
      <motion.div
        variants={slideInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        className="space-y-4 max-w-lg"
      >
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <Compass className="h-12 w-12 text-primary mx-auto mb-4" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-serif text-3xl md:text-4xl tracking-wide text-neutral-800"
        >
          Không Tìm Thấy Trang
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg text-muted-foreground"
        >
          Trang bạn đang tìm có thể đã bị xoá, đổi tên hoặc hiện không còn khả dụng.
        </motion.p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        variants={slideInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.4 }}
        className="flex flex-col sm:flex-row gap-4 mt-12"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            asChild
            className="rounded-full px-8 py-6 text-sm uppercase tracking-widest bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Về Trang Chủ
            </Link>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            asChild
            className="rounded-full px-8 py-6 text-sm uppercase tracking-widest border-2"
          >
            <Link to="/products" className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Khám Phá Sản Phẩm
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute bottom-20 left-10 h-40 w-40 rounded-full bg-linear-to-br from-primary/5 to-primary/10 -z-10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 right-10 h-60 w-60 rounded-full bg-linear-to-br from-primary/5 to-primary/10 -z-10 blur-3xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </div>
  )
}
