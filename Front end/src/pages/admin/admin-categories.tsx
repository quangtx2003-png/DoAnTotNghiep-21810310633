// src/pages/admin/admin-categories.tsx
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Edit, Trash2, RefreshCw, FolderOpen, X, Save, Loader2 } from 'lucide-react'
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/axios/category'
import type { Category } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/pagination'
import { toast } from 'sonner'

interface CategoryFormData {
  id?: number
  name: string
  description: string
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
  })
  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<{ name?: string }>({})

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getCategories({
        keyword: searchTerm || undefined,
        page: 1,
        limit: 1000,
      })
      setCategories(result || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Filter and paginate
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalItems = filteredCategories.length
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex)

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await deleteCategory(id)
        toast('Xóa danh mục thành công!')
        fetchCategories()
      } catch (error) {
        toast('Có lỗi xảy ra khi xóa danh mục')
      }
    }
  }

  const handleAdd = () => {
    setFormData({ name: '', description: '' })
    setFormErrors({})
    setShowForm(true)
  }

  const handleEdit = (category: Category) => {
    setFormData({
      id: category.id,
      name: category.name,
      description: category.description || '',
    })
    setFormErrors({})
    setShowForm(true)
  }

  const validateForm = () => {
    const errors: { name?: string } = {}
    if (!formData.name.trim()) {
      errors.name = 'Tên danh mục là bắt buộc'
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
        await updateCategory(formData.id, {
          name: formData.name.trim(),
          description: formData.description.trim(),
        })
        toast('Cập nhật danh mục thành công!')
      } else {
        await createCategory({
          name: formData.name.trim(),
          description: formData.description.trim(),
        })
        toast('Tạo danh mục thành công!')
      }
      setShowForm(false)
      fetchCategories()
    } catch (error) {
      toast('Có lỗi xảy ra')
      console.error(error)
    } finally {
      setFormLoading(false)
    }
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
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5">
                <FolderOpen className="h-6 w-6 text-orange-500" />
              </div>
              Quản lý danh mục
            </h1>
            <p className="text-muted-foreground mt-1">Quản lý danh mục sản phẩm của bạn</p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm danh mục
            </Button>
          </motion.div>
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
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <Button variant="outline" onClick={fetchCategories} className="gap-2">
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
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tên danh mục</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Mô tả</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
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
                  ) : paginatedCategories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                        Không tìm thấy danh mục
                      </td>
                    </tr>
                  ) : (
                    paginatedCategories.map((category, idx) => (
                      <motion.tr
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium">{category.id}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{category.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-muted-foreground max-w-md truncate">
                            {category.description || '—'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(category)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title="Sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(category.id)}
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
          {!loading && paginatedCategories.length > 0 && (
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
                  {formData.id ? 'Cập nhật danh mục' : 'Thêm danh mục'}
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
                    Tên danh mục <span className="text-red-500">*</span>
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
                    placeholder="Nhập tên danh mục"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mô tả</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background resize-none"
                    placeholder="Nhập mô tả (tùy chọn)"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    disabled={formLoading}
                    className="flex-1"
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={formLoading} className="flex-1 gap-2">
                    {formLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Lưu
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
