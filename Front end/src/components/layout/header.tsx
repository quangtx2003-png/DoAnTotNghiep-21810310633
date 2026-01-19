// src/components/Header.tsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  User,
  LogOut,
  ShoppingBag,
  ClipboardList,
  Heart,
  UserCircle,
  Menu,
  X,
  ChevronRight,
  Home,
  Search,
  Gift,
  HelpCircle,
  Phone,
  Settings,
  Shield,
} from 'lucide-react'
import { IconExpandButton } from '@/components/ui/icon-expand-button'
import CartDrawer from '@/components/ui/cart-drawer'

export default function Header() {
  const navigate = useNavigate()
  const { token, user, clear } = useAuthStore()
  const { syncWithServer, clearWishlist, items: wishlistItems } = useWishlistStore()
  const { items: cartItems, toggleCart } = useCartStore()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (token && user) {
      syncWithServer(user.id)
    } else {
      clearWishlist()
    }
  }, [token, user, syncWithServer, clearWishlist])

  const handleLogout = () => {
    clearWishlist()
    clear()
    navigate('/')
    setShowMobileMenu(false)
  }

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  const closeMobileMenu = () => {
    setShowMobileMenu(false)
  }

  const cartItemCount =
    cartItems.length > 0 ? (cartItems.length > 9 ? '9+' : cartItems.length) : null
  const wishlistItemCount =
    wishlistItems.length > 0 ? (wishlistItems.length > 9 ? '9+' : wishlistItems.length) : null

  // Điều hướng chính
  const mainNavItems = [
    { icon: Home, label: 'Trang chủ', path: '/' },
    { icon: Search, label: 'Sản phẩm', path: '/products' },
    { icon: Gift, label: 'Khuyến mãi', path: '/promotions' },
    { icon: HelpCircle, label: 'Hỗ trợ', path: '/support' },
    { icon: Phone, label: 'Liên hệ', path: '/contact' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif tracking-[0.2em] uppercase">
            <motion.span whileHover={{ scale: 1.05 }}>Elegance</motion.span>
          </Link>

          {/* Desktop Navigation - Ẩn trên mobile */}
          <nav className="hidden lg:flex items-center gap-3">
            {/* ===== Logged in only ===== */}
            {token && (
              <>
                {/* Orders */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <IconExpandButton
                    icon={<ClipboardList className="h-5 w-5 stroke-[1.5]" />}
                    label="Đơn hàng"
                    onClick={() => navigate('/orders')}
                  />
                </motion.div>

                {/* Wishlist */}
                <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                  <IconExpandButton
                    icon={<Heart className="h-5 w-5 stroke-[1.5]" />}
                    label="Yêu thích"
                    onClick={() => navigate('/wishlist')}
                  />

                  {wishlistItemCount && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
                    >
                      {wishlistItemCount}
                    </motion.span>
                  )}
                </motion.div>
              </>
            )}

            {/* ===== Cart (always visible) ===== */}
            <motion.div className="relative" whileHover={{ scale: 1.05 }}>
              <IconExpandButton
                icon={<ShoppingBag className="h-5 w-5 stroke-[1.5]" />}
                label="Giỏ hàng"
                onClick={toggleCart}
              />

              {cartItemCount && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.div>

            {/* ===== User dropdown (always visible) ===== */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <IconExpandButton
                      icon={<User className="h-5 w-5 stroke-[1.5]" />}
                      label="Tài khoản"
                      onClick={() => {}}
                    />
                  </motion.div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="mt-2 w-56 rounded-lg border-border/40 bg-background/95 backdrop-blur-lg"
              >
                {token ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate('/profile')}
                      className="cursor-pointer py-3 text-xs uppercase tracking-widest"
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      Thông tin cá nhân
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    {user?.role === 'admin' && (
                      <>
                        <DropdownMenuItem
                          onClick={() => navigate('/admin')}
                          className="cursor-pointer py-3 text-xs uppercase tracking-widest"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Trang quản trị
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer py-3 text-xs uppercase tracking-widest text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate('/login')}
                      className="cursor-pointer py-3 text-xs uppercase tracking-widest"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Đăng nhập
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate('/register')}
                      className="cursor-pointer py-3 text-xs uppercase tracking-widest"
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      Đăng ký
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Actions - Hiển thị trên mobile */}
          <div className="flex lg:hidden items-center gap-4">
            {/* Cart Button on Mobile */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={toggleCart}
                className="p-2 rounded-lg hover:bg-muted transition-colors relative"
              >
                <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
                {cartItemCount && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer - Tương tự Filter Drawer */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background border-l border-border z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl">Menu</h2>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* User Info */}
                {token && user && (
                  <div className="pb-4 border-b border-border">
                    <p className="font-medium text-lg">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                )}

                {/* Main Navigation */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Điều hướng
                  </h3>
                  {mainNavItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path)
                        closeMobileMenu()
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>

                {/* User Actions */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Tài khoản
                  </h3>

                  {token ? (
                    <>
                      <button
                        onClick={() => {
                          navigate('/orders')
                          closeMobileMenu()
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <ClipboardList className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Đơn hàng</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <button
                        onClick={() => {
                          navigate('/wishlist')
                          closeMobileMenu()
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group relative"
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Yêu thích</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {wishlistItemCount && (
                            <span className="h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                              {wishlistItemCount}
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          navigate('/profile')
                          closeMobileMenu()
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <UserCircle className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Thông tin cá nhân</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut className="h-5 w-5" />
                          <span className="font-medium">Đăng xuất</span>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate('/login')
                          closeMobileMenu()
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Đăng nhập</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <button
                        onClick={() => {
                          navigate('/register')
                          closeMobileMenu()
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <UserCircle className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Đăng ký</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </>
                  )}
                </div>

                {/* Settings */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-2">
                    Cài đặt
                  </h3>
                  <button
                    onClick={() => {
                      navigate('/settings')
                      closeMobileMenu()
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Cài đặt</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>

                {/* Close button at bottom */}
                <button
                  onClick={closeMobileMenu}
                  className="w-full mt-8 px-4 py-3 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all font-medium"
                >
                  Đóng menu
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
