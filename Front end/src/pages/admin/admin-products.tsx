'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Edit, Trash2, RefreshCw, Package, ChevronDown } from 'lucide-react'
import { getProducts, deleteProduct } from '@/lib/axios/product'
import type { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import ProductForm from '@/components/admin/product-form'
import { Pagination } from '@/components/pagination'
import { toast } from 'sonner'
import { formatVND } from '@/utils'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  const [showForm, setShowForm] = useState(false)
  const [editingProductId, setEditingProductId] = useState<number | undefined>(undefined)

  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const isMountedRef = useRef(true)

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isMountedRef.current) return

      setLoading(true)
      try {
        let activeValue: number | undefined
        if (statusFilter === 'active') {
          activeValue = 1
        } else if (statusFilter === 'inactive') {
          activeValue = 0
        }

        const result = await getProducts({
          keyword: searchTerm || undefined,
          active: activeValue,
          page: currentPage,
          limit: itemsPerPage,
        })

        if (!isMountedRef.current) return

        console.log('[v0] Products fetched:', result.items?.length || 0, 'total:', result.total)
        setProducts(result.items || [])
        setTotalItems(result.total || 0)
      } catch (error) {
        console.error('[v0] Error fetching products:', error)
        if (isMountedRef.current) {
          setProducts([])
          setTotalItems(0)
          toast.error('Lỗi khi tải sản phẩm')
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    }

    fetchProducts()
  }, [currentPage, itemsPerPage, searchTerm, statusFilter, refreshTrigger])

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(id)
        toast.success('Xóa sản phẩm thành công!')
        setCurrentPage(1)
        setRefreshTrigger((prev) => prev + 1)
      } catch (error) {
        console.error('[v0] Error deleting product:', error)
        toast.error('Có lỗi xảy ra khi xóa sản phẩm')
      }
    }
  }

  const handleAdd = () => {
    setEditingProductId(undefined)
    setShowForm(true)
  }

  const handleEdit = (productId: number) => {
    setEditingProductId(productId)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProductId(undefined)
  }

  const handleFormSuccess = () => {
    setCurrentPage(1)
    setRefreshTrigger((prev) => prev + 1)
  }

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleStatusChange = (value: 'all' | 'active' | 'inactive') => {
    setStatusFilter(value)
    setCurrentPage(1)
    setOpenDropdown(null)
  }

  const handleRefresh = () => {
    setCurrentPage(1)
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                <Package className="h-6 w-6 text-primary" />
              </div>
              Quản lý sản phẩm
            </h1>
            <p className="text-muted-foreground mt-1">Quản lý danh mục sản phẩm của bạn</p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm sản phẩm
            </Button>
          </motion.div>
        </motion.div>

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
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('status')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all min-w-[160px] justify-between ${
                statusFilter !== 'all'
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary'
              }`}
            >
              <span className="text-sm font-medium">
                {statusFilter === 'all'
                  ? 'Tất cả trạng thái'
                  : statusFilter === 'active'
                  ? 'Đang hoạt động'
                  : 'Ngừng hoạt động'}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openDropdown === 'status' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openDropdown === 'status' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-full rounded-xl border-2 border-border bg-background shadow-xl z-50"
                >
                  <div className="p-2">
                    {[
                      { value: 'all', label: 'Tất cả trạng thái' },
                      { value: 'active', label: 'Đang hoạt động' },
                      { value: 'inactive', label: 'Ngừng hoạt động' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleStatusChange(option.value as any)}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm ${
                          statusFilter === option.value ? 'bg-muted font-medium' : ''
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

          <Button variant="outline" onClick={handleRefresh} className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Làm mới
          </Button>
        </motion.div>

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
                  <th className="px-6 py-4 text-left text-sm font-semibold">Sản phẩm</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Danh mục</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Khoảng giá</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Đánh giá</th>
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
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        Không tìm thấy sản phẩm
                      </td>
                    </tr>
                  ) : (
                    products.map((product, idx) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
  src={
    (() => {
      try {
        const images = JSON.parse(product.image || '[]')
        return images[0] || '/placeholder.png'
      } catch {
        return '/placeholder.png'
      }
    })()
  }
  alt={product.name}
  className="w-full h-full object-cover"
/>
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate">{product.name}</p>
                              <p className="text-sm text-muted-foreground truncate">
                                ID: {product.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 rounded-md bg-primary/10 text-primary">
                            {product.categoryName || `Không có danh mục`}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          {formatVND(product.minPrice) || '0'} -{' '}
                          {formatVND(product.maxPrice) || '0'}
                          {product.originalMinPrice &&
                            product.originalMaxPrice &&
                            product.originalMinPrice > product.minPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                {formatVND(product.originalMinPrice)} -{' '}
                                {formatVND(product.originalMaxPrice)}
                              </div>
                            )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{product.avgRating?.toFixed(1) || '0.0'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.active ? 'Hoạt động' : 'Ngừng'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(product.id)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title="Sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(product.id)}
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

          {!loading && products.length > 0 && (
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

        {openDropdown && (
          <div className="fixed inset-0 z-30" onClick={() => setOpenDropdown(null)} />
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <ProductForm
            productId={editingProductId}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}
      </AnimatePresence>
    </>
  )
}
