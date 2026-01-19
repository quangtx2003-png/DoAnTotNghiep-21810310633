// src/pages/Login.tsx
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, useInView } from 'framer-motion'
import { login } from '@/lib/axios/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { LogIn, Loader2, Mail, Lock, Sparkles, EyeOff, Eye } from 'lucide-react'
import { fadeInUp } from '@/lib/animations/variants'
import { loadMe } from '@/services/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [plainPassword, setPlainPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { setToken } = useAuthStore()

  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await login({ email, plainPassword })
      setToken(result.token)
      toast.success('Đăng nhập thành công')
      await loadMe()
      navigate('/')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-7rem)] items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4 py-12 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 15 - 7.5, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Floating sparkles */}
      <motion.div
        className="absolute top-1/4 left-1/4 -z-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="h-8 w-8 text-primary/20" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 -z-10"
        animate={{
          y: [0, 20, 0],
          rotate: [360, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <Sparkles className="h-6 w-6 text-primary/20" />
      </motion.div>

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={cardInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, type: 'spring' }}
        className="w-full max-w-md"
      >
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
          <Card className="border-border/40 bg-card/80 backdrop-blur-sm shadow-2xl shadow-primary/5">
            <CardHeader className="text-center space-y-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mx-auto mb-4"
              >
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <LogIn className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-primary/30 -z-10 blur-sm"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <CardTitle className="font-serif text-3xl tracking-wider">Đăng Nhập</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Nhập email và mật khẩu của bạn để truy cập tài khoản.
                </CardDescription>
              </motion.div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 mb-6">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate={cardInView ? 'visible' : 'hidden'}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="email"
                    className="text-sm uppercase tracking-widest flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-lg border-border bg-background/50 focus:border-primary focus:ring-primary/20"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate={cardInView ? 'visible' : 'hidden'}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="plainPassword"
                    className="text-sm uppercase tracking-widest flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Mật khẩu
                  </Label>
                  <motion.div className="relative" whileHover={{ scale: 1.01 }}>
                    <Input
                      id="plainPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={plainPassword}
                      onChange={(e) => setPlainPassword(e.target.value)}
                      required
                      className="rounded-lg border-border bg-background/50 pr-10 focus:border-primary focus:ring-primary/20"
                    />

                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="w-full"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-gradient-to-r from-primary to-primary/80 py-6 text-sm uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                    >
                      {loading ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Đang xử lý...
                        </motion.span>
                      ) : (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <LogIn className="h-4 w-4" />
                          Đăng Nhập
                        </motion.span>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={cardInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                  className="text-center text-sm text-muted-foreground"
                >
                  Chưa có tài khoản?{' '}
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                    <Link
                      to="/register"
                      className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Đăng ký ngay
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.span>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
