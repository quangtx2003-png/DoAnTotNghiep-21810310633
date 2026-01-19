// src/pages/Profile.tsx
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { getMe, updateUser } from '@/lib/axios/user'
import { changePassword } from '@/lib/axios/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import type { User } from '@/types/user'
import { Loader2, Eye, EyeOff, User as UserIcon, KeyRound } from 'lucide-react'
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  cardHover,
  buttonTap,
} from '@/lib/animations/variants'

export default function Profile() {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'password'>('info')
  const [tabDirection, setTabDirection] = useState(0)

  // Info form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Password form
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const fetchUser = async () => {
      try {
        const data = await getMe()
        setUser(data)
        setName(data.name || '')
        setEmail(data.email || '')
        setPhone(data.phone || '')
      } catch (error) {
        console.error('[v0] Failed to fetch user:', error)
        toast.error('Không thể lấy thông tin người dùng')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [token, navigate])

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    try {
      await updateUser({
        name,
        phone,
      })
      toast.success('Cập nhật thông tin thành công')
      const updatedData = await getMe()
      setUser(updatedData)
    } catch (error: any) {
      console.error('[v0] Update failed:', error)
      toast.error(error.response?.data?.message || 'Cập nhật thất bại')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Vui lòng điền tất cả các trường')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới không khớp')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }

    setSaving(true)
    try {
      await changePassword(oldPassword, newPassword)
      toast.success('Đổi mật khẩu thành công')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      console.error('[v0] Change password failed:', error)
      toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại')
    } finally {
      setSaving(false)
    }
  }

  const handleTabChange = (tab: 'info' | 'password') => {
    const direction = tab === 'info' ? -1 : 1
    setTabDirection(direction)
    setActiveTab(tab)
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            className="mx-auto mb-4 h-16 w-16 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-muted-foreground">Đang tải thông tin...</p>
        </motion.div>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Sửa ở đây - thay animate có điều kiện bằng whileInView */}
      <motion.div
        ref={cardRef}
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={cardHover} whileHover="hover">
          <Card className="border-border bg-card shadow-xl shadow-black/5">
            <CardHeader className="text-center">
              {/* Avatar with animation */}
              <motion.div
                className="mx-auto mb-4"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Avatar className="h-24 w-24 border-4 border-primary/10">
                    {/* <AvatarImage src={user?.avatarUrl || undefined} /> */}
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-2xl text-primary-foreground">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <CardTitle className="font-serif text-2xl md:text-3xl tracking-wide mb-2">
                  {user?.name || 'Người dùng'}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Quản lý và cập nhật thông tin tài khoản của bạn
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent>
              {/* Tab Navigation with animations */}
              <motion.div
                className="mb-8 flex gap-4 border-b border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={() => handleTabChange('info')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={buttonTap}
                  className={`relative pb-3 text-xs uppercase tracking-widest transition-colors ${
                    activeTab === 'info'
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span>Thông Tin</span>
                  </div>
                  {activeTab === 'info' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>

                <motion.button
                  onClick={() => handleTabChange('password')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={buttonTap}
                  className={`relative pb-3 text-xs uppercase tracking-widest transition-colors ${
                    activeTab === 'password'
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    <span>Đổi Mật Khẩu</span>
                  </div>
                  {activeTab === 'password' && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {/* Info Tab */}
                {activeTab === 'info' && (
                  <motion.form
                    key="info"
                    onSubmit={handleUpdateInfo}
                    className="space-y-6"
                    initial={{ opacity: 0, x: tabDirection > 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: tabDirection > 0 ? 50 : -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="name" className="text-sm uppercase tracking-widest">
                        Họ và tên
                      </Label>
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-2 rounded-lg border-border bg-background focus:border-primary"
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="email" className="text-sm uppercase tracking-widest">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        disabled
                        className="mt-2 cursor-not-allowed rounded-lg border-border bg-muted/50 opacity-70"
                      />
                      <motion.p
                        className="mt-1 text-xs text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Email không thể thay đổi
                      </motion.p>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="phone" className="text-sm uppercase tracking-widest">
                        Số điện thoại
                      </Label>
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-2 rounded-lg border-border bg-background focus:border-primary"
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          disabled={saving}
                          className="w-full rounded-lg bg-gradient-to-r from-primary to-primary/80 py-6 text-sm uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
                        >
                          {saving ? (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-2"
                            >
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Đang lưu...
                            </motion.span>
                          ) : (
                            'Cập nhật thông tin'
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                )}

                {/* Password Tab */}
                {activeTab === 'password' && (
                  <motion.form
                    key="password"
                    onSubmit={handleChangePassword}
                    className="space-y-6"
                    initial={{ opacity: 0, x: tabDirection > 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: tabDirection > 0 ? 50 : -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="oldPassword" className="text-sm uppercase tracking-widest">
                        Mật khẩu hiện tại
                      </Label>
                      <motion.div className="relative mt-2" whileHover={{ scale: 1.01 }}>
                        <Input
                          id="oldPassword"
                          type={showOldPassword ? 'text' : 'password'}
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="rounded-lg border-border bg-background pr-10 focus:border-primary"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          whileHover={{ scale: 1.1 }}
                          whileTap={buttonTap}
                        >
                          {showOldPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="newPassword" className="text-sm uppercase tracking-widest">
                        Mật khẩu mới
                      </Label>
                      <motion.div className="relative mt-2" whileHover={{ scale: 1.01 }}>
                        <Input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="rounded-lg border-border bg-background pr-10 focus:border-primary"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          whileHover={{ scale: 1.1 }}
                          whileTap={buttonTap}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 }}
                    >
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm uppercase tracking-widest"
                      >
                        Xác nhận mật khẩu
                      </Label>
                      <motion.div className="relative mt-2" whileHover={{ scale: 1.01 }}>
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="rounded-lg border-border bg-background pr-10 focus:border-primary"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          whileHover={{ scale: 1.1 }}
                          whileTap={buttonTap}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          disabled={saving}
                          className="w-full rounded-lg bg-gradient-to-r from-primary to-primary/80 py-6 text-sm uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
                        >
                          {saving ? (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-2"
                            >
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Đang xử lý...
                            </motion.span>
                          ) : (
                            'Đổi mật khẩu'
                          )}
                        </Button>
                      </motion.div>

                      <motion.p
                        className="mt-4 text-center text-xs text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        Mật khẩu phải có ít nhất 6 ký tự
                      </motion.p>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  )
}
