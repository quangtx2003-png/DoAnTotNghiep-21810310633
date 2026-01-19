// src/components/review/ReviewCard.tsx
import { motion } from 'framer-motion'
import { Star, User } from 'lucide-react'
import type { ProductReview } from '@/types/review'
import { getRatingLabel } from '@/types/review'

interface ReviewCardProps {
  review: ProductReview
  showProduct?: boolean
}

export function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const files = review.files ? JSON.parse(review.files) : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-2 border-border rounded-xl p-6 bg-card hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Người dùng {review.userId}</p>
            <p className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{getRatingLabel(review.rating)}</span>
        </div>
      </div>

      {/* Comment */}
      {review.comment && <p className="text-sm leading-relaxed mb-4">{review.comment}</p>}

      {/* Images */}
      {files.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {files.map((file: string, idx: number) => (
            <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
              <img
                src={file}
                alt={`Review image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
