// src/hooks/useInfiniteQuery.ts
import { useState, useCallback, useEffect, useRef } from 'react'

export interface InfiniteQueryParams<T, P> {
  fetcher: (params: P & { page: number; limit: number }) => Promise<{
    items: T[]
    total: number
  }>
  params: P
  limit?: number
  enabled?: boolean
}

export interface InfiniteQueryResult<T> {
  items: T[]
  loading: boolean
  hasMore: boolean
  loadMore: () => void
  total: number
  reset: () => void
  page: number
}

export function useInfiniteQuery<T, P extends Record<string, any>>({
  fetcher,
  params,
  limit = 12,
  enabled = true,
}: InfiniteQueryParams<T, P>): InfiniteQueryResult<T> {
  const [items, setItems] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  // Keep track of previous params to detect changes
  const prevParamsRef = useRef(params)

  const fetchItems = useCallback(
    async (pageNum: number, shouldReset = false) => {
      if (!enabled) return

      setLoading(true)
      try {
        const result = await fetcher({
          ...params,
          page: pageNum,
          limit,
        })

        if (shouldReset) {
          setItems(result.items)
        } else {
          setItems((prev) => [...prev, ...result.items])
        }

        setTotal(result.total)

        // Calculate if there are more items
        const itemsLoaded = shouldReset ? result.items.length : items.length + result.items.length
        setHasMore(itemsLoaded < result.total && result.items.length > 0)
      } catch (error) {
        console.error('Error fetching items:', error)
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    },
    [fetcher, params, limit, enabled]
  )

  const loadMore = useCallback(() => {
    if (!loading && hasMore && enabled) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchItems(nextPage, false)
    }
  }, [loading, hasMore, page, fetchItems, enabled])

  const reset = useCallback(() => {
    setPage(1)
    setItems([])
    setHasMore(true)
    setTotal(0)
    if (enabled) {
      fetchItems(1, true)
    }
  }, [fetchItems, enabled])

  // Reset when params change
  useEffect(() => {
    const paramsChanged = Object.keys(params).some(
      (key) => prevParamsRef.current[key] !== params[key]
    )

    if (paramsChanged) {
      prevParamsRef.current = params
      reset()
    }
  }, [params, reset])

  // Initial load
  useEffect(() => {
    if (enabled && items.length === 0 && !loading) {
      fetchItems(1, true)
    }
  }, [enabled])

  return {
    items,
    loading,
    hasMore,
    loadMore,
    total,
    reset,
    page,
  }
}
export interface UseInfiniteScrollOptions {
  enabled?: boolean
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions = { enabled: true, threshold: 0.1 }
) {
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!options.enabled || !callback) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
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
