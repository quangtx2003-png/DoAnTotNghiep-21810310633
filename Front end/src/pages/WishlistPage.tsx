import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useAuthStore } from '@/store/useAuthStore'
import { getProductDetail } from '@/lib/axios/product'
import { Button } from '@/components/ui/button'
import { Heart, ArrowLeft, Sparkles, Loader2, ArrowUp } from 'lucide-react'
import type { ProductDetail } from '@/types/product'
import { useCartStore } from '@/store/useCartStore'
import { useInfiniteScroll } from '@/hooks/useInfiniteQuery'
import { WishlistCard } from '@/components/ui/wishlist-product-card'

const ITEMS_PER_PAGE = 12

const WishlistPage = () => {
  const navigate = useNavigate()
  const { user, token, authLoading } = useAuthStore()
  const { items, removeItem, syncWithServer, isLoading } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

  const [products, setProducts] = useState<ProductDetail[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [removingId, setRemovingId] = useState<number | null>(null)
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)

  useEffect(() => {
    if (authLoading) return

    if (!token || !user) {
      navigate('/login')
      return
    }

    syncWithServer(user.id)
  }, [authLoading, token, user, navigate, syncWithServer])

  useEffect(() => {
    const fetchProducts = async () => {
      if (items.length === 0) {
        setProducts([])
        setLoadingProducts(false)
        return
      }

      setLoadingProducts(true)
      const productPromises = items.map((productId) => getProductDetail(productId.toString()))
      const productData = await Promise.all(productPromises)
      setProducts(productData.filter((p) => p !== null) as ProductDetail[])
      setLoadingProducts(false)
    }

    fetchProducts()
    setDisplayCount(ITEMS_PER_PAGE) // Reset display count when items change
  }, [items])

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

  const handleRemove = async (productId: number) => {
    if (!user) return
    setRemovingId(productId)
    await removeItem(productId, user.id)
    setRemovingId(null)
  }

  const handleAddToCart = (product: ProductDetail) => {
    const variant = product.variants?.[0]
    if (!variant || !variant.id) return
    addToCart(variant.id, 1)
  }

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, products.length))
  }

  const hasMore = displayCount < products.length
  const displayedProducts = products.slice(0, displayCount)

  const loadMoreRef = useInfiniteScroll(loadMore, {
    enabled: hasMore && !loadingProducts,
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsHeaderVisible(true)
  }

  if (!token || !user) {
    return null
  }

  if (isLoading || loadingProducts) {
    return (
      <div className="min-h-screen bg-background">
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-muted-foreground">Đang tải...</p>
          </motion.div>
        </div>
      </div>
    )
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
                  className="p-3 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20"
                >
                  <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-serif">Sản Phẩm Yêu Thích</h1>
                  <p className="text-muted-foreground">
                    Bạn có {products.length} sản phẩm trong danh sách yêu thích
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Padding cho content */}
      <div className="pt-6" />

      {/* Back Button and Content */}
      <div className="mx-auto max-w-7xl px-6 pb-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          {/* <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
            <Button variant="ghost" onClick={() => navigate(-1)} className="-ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </motion.div> */}
        </motion.div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[50vh] flex items-center justify-center"
          >
            <div className="text-center space-y-6 px-6">
              <motion.div
                className="flex justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Heart className="h-12 w-12 text-primary" />
                </div>
              </motion.div>
              <div>
                <h2 className="text-2xl font-serif mb-2">Danh Sách Yêu Thích Trống</h2>
                <p className="text-muted-foreground">
                  Bạn chưa có sản phẩm nào trong danh sách yêu thích
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => navigate('/')} size="lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Khám Phá Sản Phẩm
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displayedProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <WishlistCard
                    product={product}
                    index={idx}
                    isRemoving={removingId === product.id}
                    onRemove={() => handleRemove(product.id)}
                    onView={() => navigate(`/product/${product.id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Infinite Scroll Trigger & Loader */}
            {products.length > ITEMS_PER_PAGE && (
              <div ref={loadMoreRef} className="mt-12 flex justify-center">
                {hasMore ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Đang tải thêm...</span>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground"
                  >
                    Đã hiển thị tất cả sản phẩm
                  </motion.p>
                )}
              </div>
            )}

            {/* Continue Shopping */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="lg"
                  className="min-w-[200px]"
                >
                  Tiếp Tục Mua Sắm
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>

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

export default WishlistPage
