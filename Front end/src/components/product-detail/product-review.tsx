// src/components/product/ProductReviews.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { Star, ChevronRight, MessageSquare } from 'lucide-react'
import { getReviews } from '@/lib/axios/review'
import { ReviewCard } from '@/components/ui/review-card'
import { Button } from '@/components/ui/button'
import type { ProductReview } from '@/types/review'

interface ProductReviewsProps {
  productId: number
  avgRating: number
}

export function ProductReviews({ productId, avgRating }: ProductReviewsProps) {
  const navigate = useNavigate()
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      const result = await getReviews({
        productId,
        page: 1,
        limit: 3, // Only show 3 latest reviews
      })
      setReviews(result.items)
      setTotal(result.total)
      setLoading(false)
    }

    fetchReviews()
  }, [productId])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-muted rounded-xl" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif mb-2">Đánh giá sản phẩm</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(avgRating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-lg">{avgRating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">({total} đánh giá)</span>
          </div>
        </div>

        {total > 3 && (
          <Button
            variant="outline"
            onClick={() => navigate(`/product/${productId}/reviews`)}
            className="gap-2"
          >
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 border-2 border-border rounded-xl bg-muted/20">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Chưa có đánh giá nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {total > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center pt-4"
            >
              <Button
                variant="ghost"
                onClick={() => navigate(`/product/${productId}/reviews`)}
                className="gap-2"
              >
                Xem thêm {total - 3} đánh giá
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
