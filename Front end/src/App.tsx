import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import { Route, Routes } from 'react-router'
import NotFoundPage from '@/pages/NotFoundPage'
import Home from '@/pages/Home'
import MainLayout from '@/components/layout/main-layout'
import { useEffect } from 'react'
import ProductDetailPage from '@/pages/ProductDetail'
import WishlistPage from '@/pages/WishlistPage'
import { loadMe } from '@/services/auth'
import ProductSearchPage from '@/pages/ProductSearchPage'
import AdminLayout from '@/components/layout/admin-layout'
import AdminGuard from '@/components/layout/admin-guard'
import OrdersPage from '@/pages/OrderPage'
import AdminProducts from '@/pages/admin/admin-products'
import AdminOrders from '@/pages/admin/admin-orders'
import AdminUsers from '@/pages/admin/admin-users'
import OrderDetailPage from '@/pages/OrderDetailPage'
import CheckoutPage from '@/pages/CheckoutPage'
import PaymentCallbackPage from '@/pages/PaymentCallbackPage'
import AdminCategories from '@/pages/admin/admin-categories'
import ProductReviewsPage from '@/pages/ProductReviewsPage'

export default function App() {
  useEffect(() => {
    loadMe()
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/product/:productId/reviews" element={<ProductReviewsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/products" element={<ProductSearchPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/callback" element={<PaymentCallbackPage />} />
      </Route>

      <Route path="/admin" element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminProducts />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
