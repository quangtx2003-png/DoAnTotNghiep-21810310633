// src/pages/ProductSearchPage.tsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  SlidersHorizontal,
  X,
  Search,
  Loader2,
  Star,
  ArrowUp,
  ShoppingBag,
} from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations/variants'
import { Button } from '@/components/ui/button'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'
import { useInfiniteScroll } from '@/hooks/useInfiniteQuery'
import { ProductCard } from '@/components/ui/product-card'
import { useDebounce } from '@/hooks/useDebounce'

interface FilterState {
  categoryId?: number
  priceFrom?: number
  priceTo?: number
  avgRatingFrom?: number
  avgRatingTo?: number
  sortBy: string
  sortDir: 'asc' | 'desc'
}

const categories = [
  { id: 1, name: 'Đồng hồ', value: 1 },
  { id: 2, name: 'Trang sức', value: 2 },
  { id: 3, name: 'Phụ kiện', value: 3 },
  { id: 4, name: 'Điện tử', value: 4 },
]

const priceRanges = [
  { label: 'Tất cả giá', min: undefined, max: undefined },
  { label: 'Dưới 100$', min: 0, max: 100 },
  { label: '100$ - 500$', min: 100, max: 500 },
  { label: '500$ - 1000$', min: 500, max: 1000 },
  { label: '1000$ - 5000$', min: 1000, max: 5000 },
  { label: 'Trên 5000$', min: 5000, max: undefined },
]

const ratingOptions = [
  { label: 'Tất cả đánh giá', value: undefined, from: undefined, to: undefined },
  { label: '5 Sao', value: 5, from: 5, to: 5 },
  { label: '4 Sao trở lên', value: 4, from: 4, to: 5 },
  { label: '3 Sao trở lên', value: 3, from: 3, to: 5 },
  { label: '2 Sao trở lên', value: 2, from: 2, to: 5 },
  { label: '1 Sao trở lên', value: 1, from: 1, to: 5 },
]

const sortOptions = [
  { label: 'Mới nhất', value: 'createdAt', dir: 'desc' },
  { label: 'Giá: Thấp đến cao', value: 'minPrice', dir: 'asc' },
  { label: 'Giá: Cao đến thấp', value: 'minPrice', dir: 'desc' },
  { label: 'Tên: A đến Z', value: 'name', dir: 'asc' },
  { label: 'Tên: Z đến A', value: 'name', dir: 'desc' },
  { label: 'Đánh giá: Cao đến thấp', value: 'avgRating', dir: 'desc' },
  { label: 'Đánh giá: Thấp đến cao', value: 'avgRating', dir: 'asc' },
]

export default function ProductSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [searchInput, setSearchInput] = useState(searchParams.get('q') || '')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)
  const debouncedSearch = useDebounce(searchInput, 500)

  // Parse initial filters from URL
  const [filters, setFilters] = useState<FilterState>(() => {
    const params = Object.fromEntries(searchParams.entries())
    return {
      categoryId: params.categoryId ? parseInt(params.categoryId) : undefined,
      priceFrom: params.priceFrom ? parseFloat(params.priceFrom) : undefined,
      priceTo: params.priceTo ? parseFloat(params.priceTo) : undefined,
      avgRatingFrom: params.avgRatingFrom ? parseFloat(params.avgRatingFrom) : undefined,
      avgRatingTo: params.avgRatingTo ? parseFloat(params.avgRatingTo) : undefined,
      sortBy: params.sortBy || 'createdAt',
      sortDir: (params.sortDir as 'asc' | 'desc') || 'desc',
    }
  })

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams()

    if (debouncedSearch) params.set('q', debouncedSearch)
    if (filters.categoryId) params.set('categoryId', filters.categoryId.toString())
    if (filters.priceFrom !== undefined) params.set('priceFrom', filters.priceFrom.toString())
    if (filters.priceTo !== undefined) params.set('priceTo', filters.priceTo.toString())
    if (filters.avgRatingFrom !== undefined)
      params.set('avgRatingFrom', filters.avgRatingFrom.toString())
    if (filters.avgRatingTo !== undefined) params.set('avgRatingTo', filters.avgRatingTo.toString())
    if (filters.sortBy) params.set('sortBy', filters.sortBy)
    if (filters.sortDir) params.set('sortDir', filters.sortDir)

    setSearchParams(params, { replace: true })
  }, [filters, debouncedSearch, setSearchParams])

  // Use custom hook for infinite scroll with all filters
  const {
    items: products,
    loading,
    hasMore,
    loadMore,
    total,
  } = useInfiniteProducts({
    keyword: debouncedSearch || undefined,
    categoryId: filters.categoryId,
    priceFrom: filters.priceFrom,
    priceTo: filters.priceTo,
    avgRatingFrom: filters.avgRatingFrom,
    avgRatingTo: filters.avgRatingTo,
    sortBy: filters.sortBy,
    sortDir: filters.sortDir,
  })

  // Correct usage of useInfiniteScroll
  const loadMoreRef = useInfiniteScroll(loadMore, {
    enabled: hasMore && !loading,
    threshold: 0.1,
  })

  // Handle scroll to hide/show header
  const handleScroll = useCallback(() => {
    if (ticking.current) return

    ticking.current = true

    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up'

      // Chỉ ẩn header khi scroll xuống đủ nhiều (> 100px)
      if (scrollDirection === 'down' && currentScrollY > 100) {
        setIsHeaderVisible(false)
        setIsScrollingUp(false)
      }
      // Hiện header ngay khi bắt đầu scroll lên
      else if (scrollDirection === 'up') {
        setIsHeaderVisible(true)
        setIsScrollingUp(true)
      }

      // Reset scrollingUp nếu đang ở đầu trang
      if (currentScrollY <= 10) {
        setIsScrollingUp(false)
      }

      setLastScrollY(currentScrollY)
      ticking.current = false
    })
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!isHeaderVisible) {
      setOpenDropdown(null)
    }
  }, [isHeaderVisible])

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      categoryId: undefined,
      priceFrom: undefined,
      priceTo: undefined,
      avgRatingFrom: undefined,
      avgRatingTo: undefined,
      sortBy: 'createdAt',
      sortDir: 'desc',
    })
    setSearchInput('')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() })
    } else {
      setSearchParams({})
    }
  }

  const handlePriceRangeSelect = (min?: number, max?: number) => {
    updateFilter('priceFrom', min)
    updateFilter('priceTo', max)
    setOpenDropdown(null)
  }

  const handleRatingSelect = (from?: number, to?: number) => {
    updateFilter('avgRatingFrom', from)
    updateFilter('avgRatingTo', to)
    setOpenDropdown(null)
  }

  const activeFilterCount = [
    filters.categoryId !== undefined,
    filters.priceFrom !== undefined || filters.priceTo !== undefined,
    filters.avgRatingFrom !== undefined || filters.avgRatingTo !== undefined,
    searchInput,
  ].filter(Boolean).length

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsHeaderVisible(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Header */}
      <div
        ref={headerRef}
        className={`
          relative z-40 bg-background transition-all duration-300 ease-in-out
          ${
            isHeaderVisible
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0 pointer-events-none'
          }
        `}
      >
        <div className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
                >
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-serif">
                    {searchInput ? `Tìm kiếm: "${searchInput}"` : 'Tất cả sản phẩm'}
                  </h1>
                  <p className="text-muted-foreground">Khám phá bộ sưu tập sản phẩm đa dạng</p>
                </div>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.form
              onSubmit={handleSearch}
              className="mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput('')
                      setSearchParams({})
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.form>

            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <motion.div
                className="flex items-center gap-3 flex-wrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Mobile Filter Button */}
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border hover:border-primary transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-sm font-medium">Bộ lọc</span>
                  {activeFilterCount > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {activeFilterCount}
                    </span>
                  )}
                </motion.button>

                {/* Desktop Filters */}
                <div className="hidden lg:flex items-center gap-3 flex-wrap">
                  {/* Category Filter */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown('category')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                        filters.categoryId
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {filters.categoryId
                          ? categories.find((c) => c.value === filters.categoryId)?.name
                          : 'Danh mục'}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === 'category' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === 'category' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-48 rounded-xl border-2 border-border bg-background shadow-xl z-50"
                        >
                          <div className="p-2">
                            <button
                              onClick={() => {
                                updateFilter('categoryId', undefined)
                                setOpenDropdown(null)
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                            >
                              Tất cả danh mục
                            </button>
                            {categories.map((cat) => (
                              <button
                                key={cat.id}
                                onClick={() => {
                                  updateFilter('categoryId', cat.value)
                                  setOpenDropdown(null)
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                                  filters.categoryId === cat.value ? 'bg-muted font-medium' : ''
                                }`}
                              >
                                {cat.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Price Filter */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown('price')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                        filters.priceFrom !== undefined || filters.priceTo !== undefined
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {filters.priceFrom !== undefined || filters.priceTo !== undefined
                          ? `${filters.priceFrom ? `$${filters.priceFrom}` : '0'} - ${
                              filters.priceTo ? `$${filters.priceTo}` : 'Trên'
                            }`
                          : 'Giá'}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === 'price' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === 'price' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-52 rounded-xl border-2 border-border bg-background shadow-xl z-50"
                        >
                          <div className="p-2">
                            {priceRanges.map((range, idx) => (
                              <button
                                key={idx}
                                onClick={() => handlePriceRangeSelect(range.min, range.max)}
                                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                                  filters.priceFrom === range.min && filters.priceTo === range.max
                                    ? 'bg-muted font-medium'
                                    : ''
                                }`}
                              >
                                {range.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Rating Filter */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown('rating')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                        filters.avgRatingFrom !== undefined
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {filters.avgRatingFrom !== undefined
                          ? `${filters.avgRatingFrom}${
                              filters.avgRatingTo === 5 ? '+ Sao' : ' Sao'
                            }`
                          : 'Đánh giá'}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdown === 'rating' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === 'rating' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-52 rounded-xl border-2 border-border bg-background shadow-xl z-50"
                        >
                          <div className="p-2">
                            {ratingOptions.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleRatingSelect(option.from, option.to)}
                                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                                  filters.avgRatingFrom === option.from &&
                                  filters.avgRatingTo === option.to
                                    ? 'bg-muted font-medium'
                                    : ''
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {option.value && (
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-3 w-3 ${
                                            i < (option.value || 0)
                                              ? 'fill-yellow-500 text-yellow-500'
                                              : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  )}
                                  <span>{option.label}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Clear Filters Button */}
                {activeFilterCount > 0 && (
                  <motion.button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border hover:border-destructive hover:text-destructive transition-all"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-4 w-4" />
                    <span className="text-sm font-medium">Xóa</span>
                  </motion.button>
                )}
              </motion.div>

              {/* Sort Dropdown */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => toggleDropdown('sort')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-border hover:border-primary transition-all"
                >
                  <span className="text-sm font-medium">
                    {sortOptions.find(
                      (s) => s.value === filters.sortBy && s.dir === filters.sortDir
                    )?.label || 'Sắp xếp'}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === 'sort' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === 'sort' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-56 rounded-xl border-2 border-border bg-background shadow-xl z-50"
                    >
                      <div className="p-2">
                        {sortOptions.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              updateFilter('sortBy', option.value)
                              updateFilter('sortDir', option.dir)
                              setOpenDropdown(null)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                              filters.sortBy === option.value && filters.sortDir === option.dir
                                ? 'bg-muted font-medium'
                                : ''
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Padding cho content */}
      <div className="pt-6" />

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background border-l border-border z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl">Bộ lọc</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Sắp xếp theo</h3>
                    <div className="space-y-2">
                      {sortOptions.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            updateFilter('sortBy', option.value)
                            updateFilter('sortDir', option.dir)
                            setShowFilters(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border-2 transition-all ${
                            filters.sortBy === option.value && filters.sortDir === option.dir
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Danh mục</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => updateFilter('categoryId', undefined)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border-2 transition-all ${
                          !filters.categoryId
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        Tất cả danh mục
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => updateFilter('categoryId', cat.value)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border-2 transition-all ${
                            filters.categoryId === cat.value
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Khoảng giá</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePriceRangeSelect(range.min, range.max)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border-2 transition-all ${
                            filters.priceFrom === range.min && filters.priceTo === range.max
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Đánh giá</h3>
                    <div className="space-y-2">
                      {ratingOptions.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRatingSelect(option.from, option.to)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border-2 transition-all ${
                            filters.avgRatingFrom === option.from &&
                            filters.avgRatingTo === option.to
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {option.value && (
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < (option.value || 0)
                                        ? 'fill-yellow-500 text-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                            <span>{option.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => {
                        clearFilters()
                        setShowFilters(false)
                      }}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                    >
                      Xóa tất cả bộ lọc
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <motion.p
          className="text-sm text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Hiển thị {products.length} trong tổng số {total} sản phẩm
        </motion.p>

        {loading && products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-xl mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h3 className="font-serif text-xl mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-muted-foreground mb-6">
              Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <Button onClick={clearFilters} variant="outline">
              Xóa bộ lọc
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {/* Infinite Scroll Trigger & Loader */}
            <div ref={loadMoreRef} className="mt-12 flex justify-center">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang tải thêm sản phẩm...</span>
                </motion.div>
              )}
              {!hasMore && products.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted-foreground"
                >
                  Bạn đã xem hết
                </motion.p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {openDropdown && <div className="fixed inset-0 z-30" onClick={() => setOpenDropdown(null)} />}

      {/* Floating Action Button - Scroll to Top */}
      <AnimatePresence>
        {(!isHeaderVisible || isScrollingUp) && window.scrollY > 300 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-8 right-8 z-40 flex flex-col gap-2"
          >
            <motion.button
              onClick={scrollToTop}
              className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
