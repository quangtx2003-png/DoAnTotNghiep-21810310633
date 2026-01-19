import { getMe } from '@/lib/axios/user'
import { useAuthStore } from '@/store/useAuthStore'

export const loadMe = async () => {
  const { setUser, clear, setAuthLoading } = useAuthStore.getState()

  try {
    setAuthLoading(true)

    const user = await getMe()
    setUser(user)

    return user
  } catch (err) {
    clear()
    return null
  } finally {
    setAuthLoading(false)
  }
}
