// src/pages/admin/admin-orders.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, RefreshCw, ClipboardList, ChevronDown, Edit } from 'lucide-react'
import axiosInstance from '@/lib/axios/instance'
import { updateOrderStatus } from '@/lib/axios/order'
import type { Order } from '@/types/order'
import {
  getOrderStatusLabel,
  getPaymentStatusLabel,
  getOrderStatusColor,
  getPaymentStatusColor,
  OrderStatus,
  PaymentStatus,
} from '@/types/order'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/pagination'
import { toast } from 'sonner'
import { formatVND } from '@/utils'

const itemsPerPageOptions = [10, 20, 50, 100]

interface EditOrderDialogProps {
  order: Order
  onClose: () => void
  onSuccess: () => void
}

interface FormDropdownProps {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}

function FormDropdown({ label, value, options, onChange }: FormDropdownProps) {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all w-full justify-between border-border hover:border-primary"
      >
        <span className="text-sm font-medium">{selectedOption?.label || 'Chọn...'}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-full rounded-xl border-2 border-border bg-background shadow-xl z-60"
            >
              <div className="p-2">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                      value === option.value ? 'bg-muted font-medium' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
            <div className="fixed inset-0 z-50" onClick={() => setOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function EditOrderDialog({ order, onClose, onSuccess }: EditOrderDialogProps) {
  const [status, setStatus] = useState(order.status)
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus)
  const [loading, setLoading] = useState(false)

  const orderStatusOptions = Object.values(OrderStatus).map((s) => ({
    value: s,
    label: getOrderStatusLabel(s),
  }))

  const paymentStatusOptions = Object.values(PaymentStatus).map((s) => ({
    value: s,
    label: getPaymentStatusLabel(s),
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateOrderStatus({ id: order.id, status, paymentStatus })
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error updating order:', error)
      toast('Có lỗi xảy ra khi cập nhật')
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
        className="bg-card border-2 border-border rounded-xl p-6 max-w-md w-full"
      >
        <h2 className="text-xl font-serif mb-4">Cập nhật đơn hàng #{order.code}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormDropdown
            label="Trạng thái đơn hàng"
            value={status}
            options={orderStatusOptions}
            onChange={setStatus}
          />

          <FormDropdown
            label="Trạng thái thanh toán"
            value={paymentStatus}
            options={paymentStatusOptions}
            onChange={setPaymentStatus}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState('')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    fetchOrders()
  }, [currentPage, itemsPerPage, orderStatusFilter, paymentStatusFilter, searchTerm])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data } = await axiosInstance.get<any>('/order/list', {
        params: {
          orderStatus: orderStatusFilter || undefined,
          paymentStatus: paymentStatusFilter || undefined,
          keyword: searchTerm || undefined,
          page: currentPage,
          limit: itemsPerPage,
        },
      })

      if (data.code === 200 && data.result) {
        setOrders(data.result.items)
        setTotalItems(data.result.total)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5">
              <ClipboardList className="h-6 w-6 text-blue-500" />
            </div>
            Quản lý đơn hàng
          </h1>
          <p className="text-muted-foreground mt-1">Quản lý và theo dõi đơn hàng của khách</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn hàng..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-10 pr-4 py-2 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Order Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('orderStatus')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all min-w-[180px] justify-between ${
              orderStatusFilter
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:border-primary'
            }`}
          >
            <span className="text-sm font-medium">
              {orderStatusFilter ? getOrderStatusLabel(orderStatusFilter) : 'Tất cả trạng thái'}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openDropdown === 'orderStatus' ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {openDropdown === 'orderStatus' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-full rounded-xl border-2 border-border bg-background shadow-xl z-50"
              >
                <div className="p-2">
                  <button
                    onClick={() => {
                      setOrderStatusFilter('')
                      setCurrentPage(1)
                      setOpenDropdown(null)
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                  >
                    Tất cả trạng thái
                  </button>
                  {Object.values(OrderStatus).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setOrderStatusFilter(status)
                        setCurrentPage(1)
                        setOpenDropdown(null)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                        orderStatusFilter === status ? 'bg-muted font-medium' : ''
                      }`}
                    >
                      {getOrderStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Payment Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('paymentStatus')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all min-w-[180px] justify-between ${
              paymentStatusFilter
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border hover:border-primary'
            }`}
          >
            <span className="text-sm font-medium">
              {paymentStatusFilter
                ? getPaymentStatusLabel(paymentStatusFilter)
                : 'Tất cả thanh toán'}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openDropdown === 'paymentStatus' ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {openDropdown === 'paymentStatus' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-full rounded-xl border-2 border-border bg-background shadow-xl z-50"
              >
                <div className="p-2">
                  <button
                    onClick={() => {
                      setPaymentStatusFilter('')
                      setCurrentPage(1)
                      setOpenDropdown(null)
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                  >
                    Tất cả thanh toán
                  </button>
                  {Object.values(PaymentStatus).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setPaymentStatusFilter(status)
                        setCurrentPage(1)
                        setOpenDropdown(null)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                        paymentStatusFilter === status ? 'bg-muted font-medium' : ''
                      }`}
                    >
                      {getPaymentStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button variant="outline" onClick={fetchOrders} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Làm mới
        </Button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-2 border-border rounded-xl overflow-hidden bg-card shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b-2 border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Đơn hàng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Khách hàng</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Ngày đặt</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Số tiền</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Trạng thái</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Thanh toán</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-center"
                      >
                        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                      </motion.div>
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                      Không tìm thấy đơn hàng
                    </td>
                  </tr>
                ) : (
                  orders.map((order, idx) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">#{order.code}</p>
                          <p className="text-sm text-muted-foreground">ID: {order.id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div>
                          <p className="font-medium">Người dùng {order.userId}</p>
                          <p className="text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{formatDate(order.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-lg">{formatVND(order.finalAmount)} VND</p>
                          {order.discountAmount > 0 && (
                            <p className="text-xs text-green-600">
                              -{formatVND(order.discountAmount)} VND giảm
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getOrderStatusColor(
                            order.status
                          )}`}
                        >
                          {getOrderStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {getPaymentStatusLabel(order.paymentStatus)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingOrder(order)
                            }}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && orders.length > 0 && (
          <div className="border-t-2 border-border bg-muted/20">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(value) => {
                setItemsPerPage(value)
                setCurrentPage(1)
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Edit Order Dialog */}
      <AnimatePresence>
        {editingOrder && (
          <EditOrderDialog
            order={editingOrder}
            onClose={() => setEditingOrder(null)}
            onSuccess={fetchOrders}
          />
        )}
      </AnimatePresence>

      {/* Click outside to close dropdown */}
      {openDropdown && <div className="fixed inset-0 z-30" onClick={() => setOpenDropdown(null)} />}
    </div>
  )
}
