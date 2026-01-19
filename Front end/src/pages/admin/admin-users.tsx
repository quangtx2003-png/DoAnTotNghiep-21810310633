import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Users,
  Mail,
  Phone,
  ChevronDown,
  X,
  Save,
  Loader2,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { getUsers, getUserById, setUserActive, deleteUser } from '@/lib/axios/user'
import type { User } from '@/types/user'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/pagination'
import { toast } from 'sonner'

interface UserFormData {
  id?: number
  name: string
  email: string
  phone: string
  role: 'admin' | 'user'
  active: boolean
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    active: true,
  })
  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({})

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getUsers({
        keyword: searchTerm || undefined,
        page: currentPage,
        limit: itemsPerPage,
      })

      let filteredUsers = result.items
      if (roleFilter !== 'all') {
        filteredUsers = filteredUsers.filter((u: User) => u.role === roleFilter)
      }

      setUsers(filteredUsers)
      setTotalItems(roleFilter === 'all' ? result.total : filteredUsers.length)
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, searchTerm, roleFilter])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await deleteUser(id)
        toast('Xóa người dùng thành công!')
        fetchUsers()
      } catch (error) {
        toast('Có lỗi xảy ra khi xóa người dùng')
      }
    }
  }

  const handleToggleActive = async (id: number, currentActive: boolean) => {
    try {
      await setUserActive(id, !currentActive)
      toast(`${!currentActive ? 'Kích hoạt' : 'Vô hiệu hóa'} người dùng thành công!`)
      fetchUsers()
    } catch (error) {
      toast('Có lỗi xảy ra')
    }
  }

  const handleAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      active: true,
    })
    setFormErrors({})
    setShowForm(true)
  }

  const handleEdit = async (user: User) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role as 'admin' | 'user',
      active: user.active,
    })
    setFormErrors({})
    setShowForm(true)
  }

  const validateForm = () => {
    const errors: { name?: string; email?: string } = {}
    if (!formData.name.trim()) {
      errors.name = 'Tên người dùng là bắt buộc'
    }
    if (!formData.email.trim()) {
      errors.email = 'Email là bắt buộc'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setFormLoading(true)
    try {
      if (formData.id) {
        // Update user - Backend chỉ hỗ trợ cập nhật name và phone qua /me/update
        // Để cập nhật đầy đủ, bạn cần thêm endpoint mới hoặc dùng endpoint hiện có
        toast('Chức năng cập nhật người dùng đang được phát triển')
        // Tạm thời chỉ đóng form
        setShowForm(false)
      } else {
        // Create user - Backend chưa có endpoint tạo user
        toast('Chức năng thêm người dùng đang được phát triển')
        setShowForm(false)
      }
      fetchUsers()
    } catch (error) {
      toast('Có lỗi xảy ra')
      console.error(error)
    } finally {
      setFormLoading(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    return role === 'admin'
      ? 'bg-purple-100 text-purple-800 border-purple-300'
      : 'bg-blue-100 text-blue-800 border-blue-300'
  }

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              Quản lý người dùng
            </h1>
            <p className="text-muted-foreground mt-1">Quản lý tài khoản và quyền hạn</p>
          </div>
          {/* <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm người dùng
            </Button>
          </motion.div> */}
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
              placeholder="Tìm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('role')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all min-w-[160px] justify-between ${
                roleFilter !== 'all'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary'
              }`}
            >
              <span className="text-sm font-medium">
                {roleFilter === 'all'
                  ? 'Tất cả vai trò'
                  : roleFilter === 'admin'
                  ? 'Quản trị viên'
                  : 'Người dùng'}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openDropdown === 'role' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openDropdown === 'role' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-full rounded-xl border-2 border-border bg-background shadow-xl z-50"
                >
                  <div className="p-2">
                    {[
                      { value: 'all', label: 'Tất cả vai trò' },
                      { value: 'admin', label: 'Quản trị viên' },
                      { value: 'user', label: 'Người dùng' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setRoleFilter(option.value as any)
                          setCurrentPage(1)
                          setOpenDropdown(null)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                          roleFilter === option.value ? 'bg-muted font-medium' : ''
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

          <Button variant="outline" onClick={fetchUsers} className="gap-2">
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
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Người dùng</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Liên hệ</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Vai trò</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Trạng thái</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
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
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        Không tìm thấy người dùng
                      </td>
                    </tr>
                  ) : (
                    users.map((user, idx) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium">{user.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="min-w-0">
                              <p className="font-medium truncate">{user.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="truncate">{user.email}</span>
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span>{user.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role === 'admin' ? 'QUẢN TRỊ' : 'NGƯỜI DÙNG'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            disabled={user.role === 'admin'}
                            onClick={() => handleToggleActive(user.id, user.active)}
                            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-colors ${
                              user.active
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {user.active ? (
                              <>
                                <CheckCircle className="h-3 w-3" />
                                Hoạt động
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3" />
                                Ngừng
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {/* <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(user)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title="Xem"
                            >
                              <Edit className="h-4 w-4" />
                            </motion.button> */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(user.id)}
                              className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                              title="Xóa"
                            >
                              <Trash2 className="h-4 w-4" />
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
          {!loading && users.length > 0 && (
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
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => !formLoading && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border-2 border-border rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif">
                  {formData.id ? 'Xem thông tin người dùng' : 'Thêm người dùng'}
                </h2>
                <button
                  onClick={() => !formLoading && setShowForm(false)}
                  disabled={formLoading}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tên người dùng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (formErrors.name) setFormErrors({ ...formErrors, name: undefined })
                    }}
                    className={`w-full px-3 py-2 border-2 rounded-lg bg-background ${
                      formErrors.name ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Nhập tên người dùng"
                    disabled={!!formData.id}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (formErrors.email) setFormErrors({ ...formErrors, email: undefined })
                    }}
                    className={`w-full px-3 py-2 border-2 rounded-lg bg-background ${
                      formErrors.email ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Nhập email"
                    disabled={!!formData.id}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background"
                    placeholder="Nhập số điện thoại"
                    disabled={!!formData.id}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Vai trò</label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })
                    }
                    className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background"
                    disabled={!!formData.id}
                  >
                    <option value="user">Người dùng</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 rounded border-border"
                    disabled={!!formData.id}
                  />
                  <label htmlFor="active" className="text-sm font-medium">
                    Kích hoạt tài khoản
                  </label>
                </div>

                {formData.id && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                    Chức năng cập nhật người dùng đang được phát triển. Vui lòng sử dụng nút trạng
                    thái trong bảng để kích hoạt/vô hiệu hóa người dùng.
                  </div>
                )}

                {!formData.id && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                    Chức năng thêm người dùng đang được phát triển.
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    disabled={formLoading}
                    className="flex-1"
                  >
                    Đóng
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close dropdown */}
      {openDropdown && <div className="fixed inset-0 z-30" onClick={() => setOpenDropdown(null)} />}
    </>
  )
}
