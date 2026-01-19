// src/components/product-detail/ProductGuides.tsx
import { motion } from 'framer-motion'
import { Ruler, Shield, HelpCircle, ChevronRight } from 'lucide-react'

interface ProductGuidesProps {
  onOpenSizeGuide: () => void
  onOpenSupport: () => void
  onOpenFAQ: () => void
}

export const ProductGuides = ({
  onOpenSizeGuide,
  onOpenSupport,
  onOpenFAQ,
}: ProductGuidesProps) => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-serif mb-3">Hỗ Trợ & Hướng Dẫn</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Chúng tôi luôn đồng hành cùng bạn với đầy đủ thông tin hướng dẫn và chính sách hỗ trợ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Size Guide */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Ruler className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Chọn Size Phù Hợp</h3>
            </div>
            <p className="text-muted-foreground">
              Đồng hồ có nhiều kích thước khác nhau phù hợp với cổ tay. Để chọn size chính xác:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <span>Đo vòng cổ tay tại vị trí xương nhô ra</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <span>Cổ tay 13-15cm: chọn size 38-40mm</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <span>Cổ tay 15-17cm: chọn size 40-42mm</span>
              </li>
            </ul>
            <button
              onClick={onOpenSizeGuide}
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Xem bảng size chi tiết
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          {/* Support Policy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Chính Sách Hỗ Trợ</h3>
            </div>
            <p className="text-muted-foreground">
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất với các chính sách:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <span>Bảo hành 5 năm cho máy, 2 năm cho pin</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <span>Đổi trả trong 30 ngày nếu có lỗi sản xuất</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <span>Hỗ trợ sửa chữa tại 50+ trung tâm</span>
              </li>
            </ul>
            <button
              onClick={onOpenSupport}
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Xem đầy đủ chính sách
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Câu Hỏi Thường Gặp</h3>
            </div>
            <p className="text-muted-foreground">
              Dưới đây là những câu hỏi phổ biến về sản phẩm và dịch vụ:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <span>Đồng hồ có chống nước khi đi mưa không?</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <span>Thời gian sạc pin đầy mất bao lâu?</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                <span>Có thể thay dây đồng hồ không?</span>
              </li>
            </ul>
            <button
              onClick={onOpenFAQ}
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Xem tất cả câu hỏi
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
