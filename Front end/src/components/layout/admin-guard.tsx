import { useAuthStore } from '@/store/useAuthStore'
import { Navigate, Outlet, useLocation } from 'react-router'

export default function AdminGuard() {
  const { user, authLoading } = useAuthStore()
  const location = useLocation()

  if (authLoading) {
    return <></>
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
