// src/components/product-detail/dialogs/FAQDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { HelpCircle } from 'lucide-react'

interface FAQDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const FAQDialog = ({ open, onOpenChange }: FAQDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Câu Hỏi Thường Gặp
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2">Đồng hồ có chống nước không?</h4>
              <p className="text-sm text-muted-foreground">
                Tất cả đồng hồ của chúng tôi đều có khả năng chống nước từ 3ATM (30 mét) trở lên,
                phù hợp cho các hoạt động hàng ngày như đi mưa, rửa tay. Tuy nhiên, không nên đeo
                khi bơi lội, tắm biển hoặc xông hơi để đảm bảo độ bền của sản phẩm.
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2">Thời gian sạc pin bao lâu?</h4>
              <p className="text-sm text-muted-foreground">
                Thời gian sạc đầy pin khoảng 2-3 giờ tùy model. Pin có thể sử dụng liên tục từ 7-10
                ngày với các chức năng cơ bản. Với các tính năng như GPS, đo nhịp tim liên tục, thời
                gian sử dụng có thể giảm xuống 3-5 ngày.
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2">Có thể đổi dây đồng hồ không?</h4>
              <p className="text-sm text-muted-foreground">
                Có, chúng tôi cung cấp dịch vụ thay dây với nhiều chất liệu khác nhau như da, thép
                không gỉ, silicone, nylon. Bạn có thể đặt mua dây thay thế trên website hoặc đến
                trực tiếp cửa hàng để được tư vấn và lắp đặt miễn phí.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Làm sao để vệ sinh đồng hồ?</h4>
              <p className="text-sm text-muted-foreground">
                Sử dụng khăn mềm, khô để lau bề mặt đồng hồ. Đối với dây đeo, có thể dùng bàn chải
                mềm với nước xà phòng loãng. Tránh sử dụng hóa chất mạnh, cồn hoặc dung môi. Với
                đồng hồ chống nước, có thể rửa nhẹ dưới vòi nước nhưng phải đảm bảo núm vặn đã được
                đóng kín.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
