// src/components/review/ReviewDialog.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createReview } from '@/lib/axios/review'
import type { OrderItem } from '@/types/order'
import { toast } from 'sonner'

interface ReviewDialogProps {
  orderItem: OrderItem
  orderId: number
  onClose: () => void
  onSuccess: () => void
}

export function ReviewDialog({ orderItem, orderId, onClose, onSuccess }: ReviewDialogProps) {
  const [rating, setRating] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ comment?: string }>({})

  const validate = () => {
    const newErrors: { comment?: string } = {}
    if (!comment.trim()) {
      newErrors.comment = 'Vui lòng nhập nhận xét'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await createReview({
        orderId,
        orderItemId: orderItem.id,
        productId: orderItem.productId,
        productVariantId: orderItem.productVariantId,
        rating,
        comment: comment.trim(),
      })
      toast('Đánh giá thành công!')
      onSuccess()
      onClose()
    } catch (error) {
      toast('Có lỗi xảy ra khi đánh giá')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border-2 border-border rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif">Đánh giá sản phẩm</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex gap-4 mb-6 p-4 rounded-lg bg-muted/50">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img
              src={orderItem.productVariantImage || '/placeholder.svg'}
              alt={orderItem.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium line-clamp-2">{orderItem.productName}</p>
            <p className="text-sm text-muted-foreground">SKU: {orderItem.sku}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Đánh giá của bạn <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= (hoveredRating || rating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {rating === 5 && 'Xuất sắc'}
              {rating === 4 && 'Tốt'}
              {rating === 3 && 'Trung bình'}
              {rating === 2 && 'Tạm được'}
              {rating === 1 && 'Kém'}
            </p>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Nhận xét <span className="text-red-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value)
                if (errors.comment) setErrors({ ...errors, comment: undefined })
              }}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
              rows={5}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-background resize-none focus:outline-none focus:border-primary transition-colors ${
                errors.comment ? 'border-red-500' : 'border-border'
              }`}
            />
            {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Gửi đánh giá
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
