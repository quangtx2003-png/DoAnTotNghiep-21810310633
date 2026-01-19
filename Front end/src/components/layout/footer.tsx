import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { useRef } from 'react'

export default function Footer() {
  const footerRef = useRef(null)
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 })

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0 }}
      animate={footerInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="border-t border-border/40 bg-muted/30"
    >
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={footerInView ? 'visible' : 'hidden'}
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5 }} className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={footerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="font-serif text-2xl tracking-widest"
            >
              ELEGANCE
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={footerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              Định nghĩa lại sự sang trọng thông qua những thiết kế tinh tế và nghệ thuật thủ công
              vượt thời gian.
            </motion.p>
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={footerInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <motion.h4
              initial={{ opacity: 0 }}
              animate={footerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="font-serif text-lg mb-6"
            >
              Liên Kết Nhanh
            </motion.h4>
            <ul className="space-y-3">
              {[
                { label: 'Về Chúng Tôi', href: '/about' },
                { label: 'Bộ Sưu Tập', href: '/products' },
                { label: 'Câu Chuyện Thương Hiệu', href: '/story' },
                { label: 'Blog', href: '/blog' },
                { label: 'Liên Hệ', href: '/contact' },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={footerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition group flex items-center gap-2"
                  >
                    <motion.span
                      className="inline-block w-0 h-0.5 bg-primary group-hover:w-2 transition-all"
                      initial={{ width: 0 }}
                      whileHover={{ width: 8 }}
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <motion.h4
              initial={{ opacity: 0 }}
              animate={footerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="font-serif text-lg mb-6"
            >
              Dịch Vụ Khách Hàng
            </motion.h4>
            <ul className="space-y-3">
              {[
                { label: 'Trung Tâm Trợ Giúp', href: '/help' },
                { label: 'Theo Dõi Đơn Hàng', href: '/track' },
                { label: 'Chính Sách Đổi Trả', href: '/returns' },
                { label: 'Giao Hàng & Vận Chuyển', href: '/shipping' },
                { label: 'Câu Hỏi Thường Gặp', href: '/faq' },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={footerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition group flex items-center gap-2"
                  >
                    <motion.span
                      className="inline-block w-0 h-0.5 bg-primary group-hover:w-2 transition-all"
                      initial={{ width: 0 }}
                      whileHover={{ width: 8 }}
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5, delay: 0.3 }}>
            <motion.h4
              initial={{ opacity: 0 }}
              animate={footerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="font-serif text-lg mb-6"
            >
              Liên Hệ
            </motion.h4>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  content: (
                    <>
                      123 Đường Sang Trọng, Quận 1<br />
                      Thành phố Hồ Chí Minh, Việt Nam
                    </>
                  ),
                  href: null,
                },
                {
                  icon: Phone,
                  content: '+84 123 456 789',
                  href: 'tel:+84123456789',
                },
                {
                  icon: Mail,
                  content: 'contact@elegance.vn',
                  href: 'mailto:contact@elegance.vn',
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={footerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="h-5 w-5 text-primary shrink-0 mt-0.5"
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{item.content}</span>
                  )}
                </motion.li>
              ))}
            </ul>

            {/* Newsletter */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={footerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              <p className="text-sm text-muted-foreground mb-3">Đăng ký nhận thông tin mới nhất</p>
              <motion.div
                className="flex gap-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                >
                  Đăng ký
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={footerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2 }}
        className="border-t border-border/20 bg-muted/50"
      >
        <div className="container mx-auto px-6 py-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground"
            initial="hidden"
            animate={footerInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              © 2026 Elegance. Bảo lưu mọi quyền.
            </motion.p>
            <motion.div
              className="flex gap-6"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              {[
                { label: 'Chính Sách Bảo Mật', href: '/privacy' },
                { label: 'Điều Khoản Sử Dụng', href: '/terms' },
                { label: 'Chính Sách Cookie', href: '/cookies' },
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={footerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  <Link to={link.href} className="hover:text-primary transition relative group">
                    {link.label}
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.footer>
  )
}
