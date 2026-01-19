import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import { Menu, X, Store, LogOut } from 'lucide-react'

interface AdminHeaderProps {
  onMenuToggle?: () => void
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const { user, clear } = useAuthStore()
  const navigate = useNavigate()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const onLogout = () => {
    clear()
    navigate('/login')
    setShowMobileMenu(false)
  }

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md"
      >
        <div className="container mx-auto flex items-center justify-between gap-4 py-4 px-4 lg:px-6">
          {/* Left: Welcome + Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>

            {/* Desktop: Greeting */}
            <div className="hidden lg:block text-sm text-muted-foreground">
              Xin chào, <span className="font-medium text-foreground">{user?.name || 'Admin'}</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
                <Store className="h-4 w-4" />
                <span className="hidden sm:inline">Xem cửa hàng</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="sm" onClick={onLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-background border-r border-border z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl">Menu Admin</h2>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* User Info */}
                <div className="pb-4 border-b border-border">
                  <p className="font-medium text-lg">{user?.name || 'Admin'}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  <Link
                    to="/admin"
                    onClick={() => setShowMobileMenu(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-accent transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/products"
                    onClick={() => setShowMobileMenu(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-accent transition-colors font-medium"
                  >
                    Sản phẩm
                  </Link>
                  <Link
                    to="/admin/orders"
                    onClick={() => setShowMobileMenu(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-accent transition-colors font-medium"
                  >
                    Đơn hàng
                  </Link>
                  <Link
                    to="/admin/users"
                    onClick={() => setShowMobileMenu(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-accent transition-colors font-medium"
                  >
                    Người dùng
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setShowMobileMenu(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-accent transition-colors font-medium"
                  >
                    Cài đặt
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
