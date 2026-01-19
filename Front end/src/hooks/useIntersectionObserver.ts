// src/hooks/useIntersectionObserver.ts
import { useEffect, useRef } from 'react'

interface UseIntersectionObserverOptions {
  enabled?: boolean
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver(
  callback: () => void,
  options: UseIntersectionObserverOptions = { enabled: true, threshold: 0.1 }
) {
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!options.enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback()
        }
      },
      {
        threshold: options.threshold,
        root: options.root,
        rootMargin: options.rootMargin,
      }
    )

    const currentRef = targetRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [callback, options.enabled, options.threshold, options.root, options.rootMargin])

  return targetRef
}
