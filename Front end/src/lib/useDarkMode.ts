import { useEffect } from 'react'

export function useDarkMode() {
  useEffect(() => {
    const root = document.documentElement
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const setDark = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
    setDark(darkQuery.matches)
    const listener = (e: MediaQueryListEvent) => setDark(e.matches)
    darkQuery.addEventListener('change', listener)
    return () => darkQuery.removeEventListener('change', listener)
  }, [])
}
