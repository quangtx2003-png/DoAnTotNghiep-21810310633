import { Outlet, useLocation, Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Tags,
} from 'lucide-react'
import AdminHeader from '@/components/layout/admin-header'
import AdminFooter from '@/components/layout/admin-footer'

const navItems = [
  // { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/products', label: 'Sản phẩm', icon: Package, exact: true },
  { path: '/admin/categories', label: 'Danh mục', icon: Tags },
  { path: '/admin/orders', label: 'Đơn hàng', icon: ShoppingCart },
  { path: '/admin/users', label: 'Người dùng', icon: Users },
  // { path: '/admin/settings', label: 'Cài đặt', icon: Settings },
]

export default function AdminLayout() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <motion.aside
          animate={{ width: collapsed ? 64 : 256 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="relative hidden lg:flex flex-col border-r bg-muted/30"
        >
          {/* COLLAPSE BUTTON */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute top-6 -right-3 z-20 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow hover:bg-accent"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* NAV */}
          <nav className="mt-6 flex flex-col gap-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path, item.exact)

              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 transition-colors
                      ${active ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-accent'}`}
                  >
                    {/* ICON */}
                    <Icon className="h-5 w-5 shrink-0" />

                    {/* LABEL */}
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          className="whitespace-nowrap font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* TOOLTIP WHEN COLLAPSED */}
                    {collapsed && (
                      <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded bg-popover px-2 py-1 text-sm opacity-0 shadow group-hover:opacity-100">
                        {item.label}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>
        </motion.aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-background p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      <AdminFooter />
    </div>
  )
}
