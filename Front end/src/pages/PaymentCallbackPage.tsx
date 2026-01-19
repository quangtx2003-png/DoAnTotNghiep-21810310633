// src/pages/PaymentCallbackPage.tsx
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Loader2, Package, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PaymentCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [message, setMessage] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    // Parse payment response from URL params
    const vnpResponseCode = searchParams.get('vnp_ResponseCode')
    const vnpOrderInfo = searchParams.get('vnp_OrderInfo')
    const payosStatus = searchParams.get('status')
    const payosOrderId = searchParams.get('orderId')

    // Check VNPay response
    if (vnpResponseCode) {
      if (vnpResponseCode === '00') {
        setStatus('success')
        setMessage('Thanh toán thành công qua VNPay!')
        setOrderId(vnpOrderInfo)
      } else {
        setStatus('failed')
        setMessage('Thanh toán thất bại hoặc đã bị hủy.')
      }
    }
    // Check PayOS response
    else if (payosStatus) {
      if (payosStatus === 'PAID' || payosStatus === 'success') {
        setStatus('success')
        setMessage('Thanh toán thành công qua PayOS!')
        setOrderId(payosOrderId)
      } else if (payosStatus === 'CANCELLED' || payosStatus === 'cancelled') {
        setStatus('failed')
        setMessage('Thanh toán đã bị hủy.')
      } else {
        setStatus('failed')
        setMessage('Thanh toán thất bại.')
      }
    }
    // No payment params found
    else {
      setStatus('failed')
      setMessage('Không tìm thấy thông tin thanh toán.')
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-card border-2 border-border rounded-2xl p-8 text-center space-y-6">
          {status === 'loading' ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 mx-auto"
              >
                <Loader2 className="w-full h-full text-primary" />
              </motion.div>
              <h2 className="text-2xl font-serif">Đang xử lý...</h2>
              <p className="text-muted-foreground">Vui lòng đợi trong giây lát</p>
            </>
          ) : status === 'success' ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
              </motion.div>

              <div>
                <h2 className="text-2xl font-serif mb-2">Thanh toán thành công!</h2>
                <p className="text-muted-foreground">{message}</p>
                {orderId && (
                  <p className="text-sm text-muted-foreground mt-2">Mã đơn hàng: #{orderId}</p>
                )}
              </div>

              <div className="space-y-3">
                {orderId ? (
                  <Button
                    onClick={() => navigate(`/orders/${orderId}`)}
                    className="w-full"
                    size="lg"
                  >
                    <Package className="mr-2 h-5 w-5" />
                    Xem đơn hàng
                  </Button>
                ) : (
                  <Button onClick={() => navigate('/orders')} className="w-full" size="lg">
                    <Package className="mr-2 h-5 w-5" />
                    Xem đơn hàng của tôi
                  </Button>
                )}

                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Tiếp tục mua sắm
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-20 h-20 mx-auto rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center"
              >
                <XCircle className="w-12 h-12 text-red-600 dark:text-red-500" />
              </motion.div>

              <div>
                <h2 className="text-2xl font-serif mb-2">Thanh toán thất bại</h2>
                <p className="text-muted-foreground">{message}</p>
              </div>

              <div className="space-y-3">
                <Button onClick={() => navigate('/checkout')} className="w-full" size="lg">
                  Thử lại
                </Button>

                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Quay về trang chủ
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Additional Info */}
        {status !== 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            <p>
              Nếu có thắc mắc, vui lòng liên hệ{' '}
              <a href="/support" className="text-primary hover:underline">
                hỗ trợ khách hàng
              </a>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
