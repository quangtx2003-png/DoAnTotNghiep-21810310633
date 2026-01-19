'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  createProduct,
  updateProduct,
  getProductForEdit,
  createProductAttributeWithValues,
  deleteProductAttributesByProduct,
  deleteProductVariantsByProduct,
  createProductVariant,
} from '@/lib/axios/product'
import type { Product, Category } from '@/types/product'
import {
  BasicInfoSection,
  ImagesSection,
  AttributesSection,
  VariantsSection,
} from '@/components/admin/product-form-section'
import { toast } from 'sonner'
import { getCategories } from '@/lib/axios/category'

interface ProductFormProps {
  productId?: number
  onClose: () => void
  onSuccess: () => void
}

interface AttributeInput {
  id?: number
  fieldName: string
  name: string
  values: string[]
  optionIds?: number[]
}

interface VariantInput {
  id?: number
  sku: string
  image: string
  price: number
  originalPrice?: number
  stock: number
  options: Record<string, string>
}

export default function ProductForm({ productId, onClose, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    images: true,
    attributes: true,
    variants: true,
  })

  // Basic Info
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState<number>(0)
  const [active, setActive] = useState(1)
  const [thumbnail, setThumbnail] = useState('')
  const [images, setImages] = useState<string[]>([])

  // Attributes
  const [attributes, setAttributes] = useState<AttributeInput[]>([
    { fieldName: 'size', name: 'Kích cỡ', values: ['S', 'M', 'L'] },
    { fieldName: 'color', name: 'Màu sắc', values: ['Đỏ', 'Đen'] },
  ])

  // Variants
  const [variants, setVariants] = useState<VariantInput[]>([])

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Map để lưu giá trị -> ID
  const [valueIdMap, setValueIdMap] = useState<Map<string, number>>(new Map())

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const cats = await getCategories()
      setCategories(cats)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }, [])

  // Load product data
  const loadProduct = useCallback(async (id: number) => {
    setLoading(true)
    try {
      const product = await getProductForEdit(id)
      if (product) {
        setName(product.name)
        setDescription(product.description)
        setCategoryId(product.categoryId)
        setActive(product.active)
        setThumbnail(product.thumbnail)

        try {
          const imageArray = JSON.parse(product.image)
          setImages(Array.isArray(imageArray) ? imageArray : [])
        } catch {
          setImages([])
        }

        if (product.attributes && product.attributes.length > 0) {
          const attrs = product.attributes.map((attr: any) => ({
            id: attr.id,
            fieldName: attr.fieldName,
            name: attr.name,
            values:
              attr.values?.map((opt: any) => opt.value) ||
              attr.options?.map((opt: any) => opt.value) ||
              [],
            optionIds:
              attr.values?.map((opt: any) => opt.id) ||
              attr.options?.map((opt: any) => opt.id) ||
              [],
          }))
          setAttributes(attrs)

          const newMap = new Map<string, number>()
          const attributeValues = product.attributes
          attrs.forEach((attr, idx) => {
            const sourceAttr = attributeValues[idx] as any
            const options = sourceAttr?.values || sourceAttr?.options || []
            options.forEach((opt: any) => {
              if (opt.id) {
                const key = `${attr.fieldName}:${opt.value}`
                newMap.set(key, opt.id)
              }
            })
          })
          setValueIdMap(newMap)
        }

        if (product.variants && product.variants.length > 0) {
          const vars = product.variants.map((v: any) => ({
            id: v.id,
            sku: v.sku,
            image: v.image,
            price: v.price,
            originalPrice: v.originalPrice || 0,
            stock: v.stock,
            options: v.options || {},
          }))
          setVariants(vars)
        }
      }
    } catch (error) {
      console.error('Error loading product:', error)
      toast('Có lỗi xảy ra khi tải thông tin sản phẩm')
    } finally {
      setLoading(false)
    }
  }, [])

  // Generate variants from attributes
  const generateVariants = useCallback(() => {
    if (attributes.length === 0 || attributes.some((attr) => attr.values.length === 0)) {
      toast('Vui lòng thêm ít nhất một thuộc tính và giá trị cho mỗi thuộc tính trước')
      setVariants([])
      return
    }

    const combinations: Record<string, string>[] = []

    const generate = (index: number, current: Record<string, string>) => {
      if (index === attributes.length) {
        combinations.push({ ...current })
        return
      }

      const attr = attributes[index]
      for (const value of attr.values) {
        current[attr.fieldName] = value
        generate(index + 1, current)
      }
    }

    generate(0, {})
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()

    const newVariants = combinations.map((combo) => {
      const optionValues = Object.values(combo).join('-').toUpperCase()
      const productNameSlug = name.toLowerCase().replace(/\s+/g, '-').slice(0, 20) || 'product'

      return {
        sku: `${productNameSlug}-${optionValues}-${randomSuffix}`.toUpperCase(),
        image: '',
        price: 0,
        originalPrice: 0,
        stock: 0,
        options: combo,
      }
    })

    setVariants(newVariants)
  }, [attributes, name])

  // Initialize component
  useEffect(() => {
    let mounted = true

    const init = async () => {
      await fetchCategories()
      if (productId && mounted) {
        await loadProduct(productId)
      }
    }

    init()

    return () => {
      mounted = false
    }
  }, [productId, fetchCategories, loadProduct])

  // Auto-generate variants when attributes change (only for new products)
  useEffect(() => {
    if (
      !productId &&
      attributes.length >= 1 &&
      attributes.every((attr) => attr.values.length > 0)
    ) {
      const timer = setTimeout(() => {
        generateVariants()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [productId, attributes, generateVariants])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm'
    if (!categoryId) newErrors.categoryId = 'Vui lòng chọn danh mục'
    // if (!thumbnail.trim()) newErrors.thumbnail = 'Vui lòng nhập URL thumbnail'

    // Validate variants
    // variants.forEach((variant, idx) => {
    //   if (!variant.sku.trim()) newErrors[`variant-${idx}-sku`] = 'Vui lòng nhập SKU'
    //   if (variant.price < 0) newErrors[`variant-${idx}-price`] = 'Giá không được âm'
    //   if (variant.stock < 0) newErrors[`variant-${idx}-stock`] = 'Tồn kho không được âm'
    // })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast('Vui lòng kiểm tra lại thông tin bắt buộc')
      return
    }

    setSaving(true)
    try {
      const productData: Partial<Product> = {
        id: productId,
        name,
        description,
        categoryId,
        active,
        thumbnail,
        image: JSON.stringify(images),
      }

      let savedProductId: number
      if (productId) {
        await updateProduct(productData)
        savedProductId = productId
      } else {
        const createdProduct = await createProduct(productData)
        savedProductId = createdProduct.id
      }

      // Delete existing attributes and variants for update
      if (productId) {
        await deleteProductAttributesByProduct(savedProductId)
        await deleteProductVariantsByProduct(savedProductId)
      }

      const newValueIdMap = new Map<string, number>()

      // Create attributes with values
      for (const attr of attributes) {
        if (attr.fieldName && attr.name && attr.values.length > 0) {
          try {
            const createdAttribute = await createProductAttributeWithValues({
              productId: savedProductId,
              fieldName: attr.fieldName,
              name: attr.name,
              values: attr.values,
            })

            if (createdAttribute.options) {
              createdAttribute.options.forEach((opt: any) => {
                if (opt.id && opt.value) {
                  const key = `${attr.fieldName}:${opt.value}`
                  newValueIdMap.set(key, opt.id)
                }
              })
            }
          } catch (error) {
            console.error(`Error creating attribute ${attr.fieldName}:`, error)
          }
        }
      }

      setValueIdMap(newValueIdMap)

      // Create variants
      for (const variant of variants) {
        if (variant.sku && variant.price >= 0) {
          try {
            const attributeValueIds: number[] = []
            Object.entries(variant.options).forEach(([fieldName, value]) => {
              const key = `${fieldName}:${value}`
              const valueId = newValueIdMap.get(key)
              if (valueId) {
                attributeValueIds.push(valueId)
              }
            })

            await createProductVariant({
              productId: savedProductId,
              sku: variant.sku,
              image: variant.image,
              price: variant.price,
              originalPrice: variant.originalPrice,
              stock: variant.stock,
              attributeValueIds: attributeValueIds,
            })
          } catch (error) {
            console.error(`Error creating variant ${variant.sku}:`, error)
          }
        }
      }

      // Show success message
      toast(productId ? 'Cập nhật sản phẩm thành công!' : 'Tạo sản phẩm thành công!')

      // Call onSuccess to refresh parent list
      onSuccess()

      // Close form after a short delay
      setTimeout(() => {
        onClose()
      }, 300)
    } catch (error: any) {
      console.error('Error saving product:', error)
      toast(error.message || 'Có lỗi xảy ra khi lưu sản phẩm')
    } finally {
      setSaving(false)
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-full md:w-[800px] bg-background border-l border-border z-50 overflow-y-auto"
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background z-10">
            <h2 className="font-serif text-2xl">
              {productId ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              disabled={saving}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 p-6 space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
                </div>
              </div>
            ) : (
              <>
                <BasicInfoSection
                  expanded={expandedSections.basic}
                  onToggle={() => toggleSection('basic')}
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                  active={active}
                  setActive={setActive}
                  categories={categories}
                  errors={errors}
                  setErrors={setErrors}
                />

                <ImagesSection
                  expanded={expandedSections.images}
                  onToggle={() => toggleSection('images')}
                  thumbnail={thumbnail}
                  setThumbnail={setThumbnail}
                  images={images}
                  setImages={setImages}
                  errors={errors}
                  setErrors={setErrors}
                />

                <AttributesSection
                  expanded={expandedSections.attributes}
                  onToggle={() => toggleSection('attributes')}
                  attributes={attributes}
                  setAttributes={setAttributes}
                  onGenerateVariants={generateVariants}
                />

                <VariantsSection
                  expanded={expandedSections.variants}
                  onToggle={() => toggleSection('variants')}
                  variants={variants}
                  setVariants={setVariants}
                  productId={productId}
                  attributesLength={attributes.length}
                  errors={errors}
                  setErrors={setErrors}
                />
              </>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-border sticky bottom-0 bg-background">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={saving || loading}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {productId ? 'Cập nhật' : 'Tạo mới'}
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
