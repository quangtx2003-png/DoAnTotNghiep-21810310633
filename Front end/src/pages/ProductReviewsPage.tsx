// src/pages/ProductReviewsPage.tsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Star, ChevronDown, Loader2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReviewCard } from '@/components/ui/review-card'
import { useInfiniteReviews } from '@/hooks/useInfiniteReviews'
import { useInfiniteScroll } from '@/hooks/useInfiniteQuery'
import { staggerContainer, fadeInUp } from '@/lib/animations/variants'

const ratingFilterOptions = [
  { label: 'Tất cả đánh giá', value: undefined },
  { label: '5 Sao', value: 5 },
  { label: '4 Sao', value: 4 },
  { label: '3 Sao', value: 3 },
  { label: '2 Sao', value: 2 },
  { label: '1 Sao', value: 1 },
]

export default function ProductReviewsPage() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const [ratingFilter, setRatingFilter] = useState<number | undefined>(undefined)
  const [openDropdown, setOpenDropdown] = useState(false)

  const {
    items: reviews,
    loading,
    hasMore,
    loadMore,
    total,
  } = useInfiniteReviews({
    productId: productId ? parseInt(productId) : undefined,
    rating: ratingFilter,
    limit: 10,
    enabled: !!productId,
  })

  const loadMoreRef = useInfiniteScroll(loadMore, {
    enabled: hasMore && !loading,
    threshold: 0.1,
  })

  // Calculate rating statistics
  const ratingStats = {
    average: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  }

  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0)
    ratingStats.average = totalRating / reviews.length

    reviews.forEach((review) => {
      ratingStats.distribution[review.rating as keyof typeof ratingStats.distribution]++
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-serif">Đánh giá sản phẩm</h1>
          </div>
          <p className="text-muted-foreground">{total} đánh giá</p>
        </motion.div>

        {/* Rating Summary */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-border rounded-xl p-6 mb-6 bg-card"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Rating */}
              <div className="text-center md:text-left">
                <p className="text-5xl font-bold mb-2">{ratingStats.average.toFixed(1)}</p>
                <div className="flex justify-center md:justify-start mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(ratingStats.average)
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{total} đánh giá</p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count =
                    ratingStats.distribution[rating as keyof typeof ratingStats.distribution]
                  const percentage = total > 0 ? (count / total) * 100 : 0

                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      </div>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative inline-block">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all ${
                ratingFilter !== undefined
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary'
              }`}
            >
              <span className="text-sm font-medium">
                {ratingFilter !== undefined ? `${ratingFilter} Sao` : 'Tất cả đánh giá'}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${openDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-52 rounded-xl border-2 border-border bg-background shadow-xl z-50"
                >
                  <div className="p-2">
                    {ratingFilterOptions.map((option) => (
                      <button
                        key={option.value ?? 'all'}
                        onClick={() => {
                          setRatingFilter(option.value)
                          setOpenDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                          ratingFilter === option.value ? 'bg-muted font-medium' : ''
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
        </motion.div>

        {/* Reviews List */}
        {loading && reviews.length === 0 ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-40 bg-muted rounded-xl" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl mb-2">Chưa có đánh giá</h3>
            <p className="text-muted-foreground">Hãy là người đầu tiên đánh giá sản phẩm này</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {reviews.map((review) => (
                <motion.div key={review.id} variants={fadeInUp}>
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </motion.div>

            {/* Infinite Scroll Trigger */}
            <div ref={loadMoreRef} className="mt-12 flex justify-center">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang tải thêm...</span>
                </motion.div>
              )}
              {!hasMore && reviews.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted-foreground"
                >
                  Đã hiển thị tất cả đánh giá
                </motion.p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {openDropdown && (
        <div className="fixed inset-0 z-30" onClick={() => setOpenDropdown(false)} />
      )}
    </div>
  )
}
