// src/components/product-detail/dialogs/SizeGuideDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Ruler } from 'lucide-react'

interface SizeGuideDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SizeGuideDialog = ({ open, onOpenChange }: SizeGuideDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Hướng Dẫn Chọn Size Đồng Hồ
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Cách Đo Cổ Tay Chính Xác</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Dùng thước dây mềm đo vòng quanh cổ tay</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Đo ở vị trí xương nhô ra của cổ tay (nơi đeo đồng hồ)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Không siết quá chặt hoặc quá lỏng, để thước vừa khít</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                  <span>Ghi lại số đo chính xác đến 0.1cm</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Bảng Size Tham Khảo</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-3 text-left">Cổ Tay (cm)</th>
                      <th className="border p-3 text-left">Size Đề Xuất</th>
                      <th className="border p-3 text-left">Độ Dày Dây</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { wrist: '13-15cm', size: '38-40mm', band: '18-20mm' },
                      { wrist: '15-17cm', size: '40-42mm', band: '20-22mm' },
                      { wrist: '17-19cm', size: '42-44mm', band: '22-24mm' },
                      { wrist: '19-21cm', size: '44-46mm', band: '24-26mm' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/50 transition-colors">
                        <td className="border p-3">{row.wrist}</td>
                        <td className="border p-3 font-medium">{row.size}</td>
                        <td className="border p-3">{row.band}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
