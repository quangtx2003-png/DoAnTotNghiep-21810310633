// src/components/product-detail/dialogs/SupportPolicyDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Shield, Truck } from 'lucide-react'

interface SupportPolicyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SupportPolicyDialog = ({ open, onOpenChange }: SupportPolicyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Chính Sách Hỗ Trợ & Bảo Hành
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4" />
                  Chính Sách Bảo Hành
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>5 năm bảo hành cho máy chính hãng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>2 năm bảo hành cho pin và linh kiện điện tử</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                    <span>1 năm bảo hành cho dây đeo và vỏ ngoài</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4" />
                  Giao Hàng & Lắp Đặt
                </h4>
                <p className="text-sm">Miễn phí vận chuyển toàn quốc, hỗ trợ lắp đặt tại nhà</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Điều Kiện Đổi Trả</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Đổi trả trong 30 ngày nếu có lỗi kỹ thuật từ nhà sản xuất</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Hoàn tiền 100% trong 7 ngày nếu sản phẩm không đúng mô tả</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Hỗ trợ sửa chữa tại hơn 50 trung tâm trên toàn quốc</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Miễn phí bảo dưỡng định kỳ 6 tháng/lần</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg border p-4 bg-gradient-to-r from-primary/5 to-transparent">
            <h4 className="font-semibold mb-2">Quy Trình Bảo Hành</h4>
            <ol className="space-y-2 text-sm list-decimal pl-5">
              <li>Liên hệ hotline 1800-xxxx để được tư vấn</li>
              <li>Mang sản phẩm đến trung tâm bảo hành gần nhất</li>
              <li>Nhận phiếu tiếp nhận và thời gian xử lý dự kiến</li>
              <li>Theo dõi tiến độ trực tuyến qua mã phiếu</li>
              <li>Nhận lại sản phẩm đã được sửa chữa hoặc thay thế</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
