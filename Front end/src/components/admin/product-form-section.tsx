import { Plus, Trash2, X, ChevronDown, ChevronUp, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MultiImageUploader } from '@/components/ui/image-uploader'
import type { Category } from '@/types/product'

// ============ Basic Info Section ============
interface BasicInfoSectionProps {
  expanded: boolean
  onToggle: () => void
  name: string
  setName: (value: string) => void
  description: string
  setDescription: (value: string) => void
  categoryId: number
  setCategoryId: (value: number) => void
  active: number
  setActive: (value: number) => void
  categories: Category[]
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
}

export function BasicInfoSection({
  expanded,
  onToggle,
  name,
  setName,
  description,
  setDescription,
  categoryId,
  setCategoryId,
  active,
  setActive,
  categories,
  errors,
  setErrors,
}: BasicInfoSectionProps) {
  return (
    <section className="border-2 border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors"
      >
        <h3 className="font-semibold text-lg">Thông tin cơ bản</h3>
        {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {expanded && (
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Tên sản phẩm <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: '' })
              }}
              required
              className={`w-full px-4 py-2 border-2 rounded-xl bg-background focus:outline-none transition-colors ${
                errors.name ? 'border-destructive' : 'border-border focus:border-primary'
              }`}
              placeholder="Nhập tên sản phẩm"
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary"
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Danh mục <span className="text-destructive">*</span>
            </label>
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(Number(e.target.value))
                if (errors.categoryId) setErrors({ ...errors, categoryId: '' })
              }}
              required
              className={`w-full px-4 py-2 border-2 rounded-xl bg-background focus:outline-none transition-colors ${
                errors.categoryId ? 'border-destructive' : 'border-border focus:border-primary'
              }`}
            >
              <option value={0}>Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-destructive mt-1">{errors.categoryId}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={active === 1}
              onChange={(e) => setActive(e.target.checked ? 1 : 0)}
              className="w-4 h-4 rounded border-border"
            />
            <label htmlFor="active" className="text-sm font-medium">
              Kích hoạt sản phẩm
            </label>
          </div>
        </div>
      )}
    </section>
  )
}

// ============ Images Section ============
interface ImagesSectionProps {
  expanded: boolean
  onToggle: () => void
  thumbnail: string
  setThumbnail: (value: string) => void
  images: string[]
  setImages: (value: string[]) => void
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
}

export function ImagesSection({
  expanded,
  onToggle,
  thumbnail,
  setThumbnail,
  images,
  setImages,
  errors,
  setErrors,
}: ImagesSectionProps) {
  return (
    <section className="border-2 border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors"
      >
        <h3 className="font-semibold text-lg">Hình ảnh</h3>
        {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {expanded && (
        <div className="p-4 space-y-4">
          <MultiImageUploader values={images} onChange={setImages} label=" " maxImages={10} />
        </div>
      )}
    </section>
  )
}

// ============ Attributes Section ============
interface AttributeInput {
  id?: number
  fieldName: string
  name: string
  values: string[]
  optionIds?: number[]
}

interface AttributesSectionProps {
  expanded: boolean
  onToggle: () => void
  attributes: AttributeInput[]
  setAttributes: (attrs: AttributeInput[]) => void
  onGenerateVariants: () => void
}

export function AttributesSection({
  expanded,
  onToggle,
  attributes,
  setAttributes,
  onGenerateVariants,
}: AttributesSectionProps) {
  const addAttribute = () => {
    setAttributes([...attributes, { fieldName: '', name: '', values: [] }])
  }

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index))
  }

  const updateAttribute = (index: number, field: keyof AttributeInput, value: any) => {
    const newAttrs = [...attributes]
    newAttrs[index] = { ...newAttrs[index], [field]: value }
    setAttributes(newAttrs)
  }

  const addAttributeValue = (attrIndex: number) => {
    const newAttrs = [...attributes]
    newAttrs[attrIndex].values.push('')
    setAttributes(newAttrs)
  }

  const updateAttributeValue = (attrIndex: number, valIndex: number, value: string) => {
    const newAttrs = [...attributes]
    newAttrs[attrIndex].values[valIndex] = value
    setAttributes(newAttrs)
  }

  const removeAttributeValue = (attrIndex: number, valIndex: number) => {
    const newAttrs = [...attributes]
    newAttrs[attrIndex].values = newAttrs[attrIndex].values.filter((_, i) => i !== valIndex)
    setAttributes(newAttrs)
  }

  return (
    <section className="border-2 border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">Thuộc tính</h3>
          <span className="text-sm text-muted-foreground">({attributes.length} thuộc tính)</span>
        </div>
        {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {expanded && (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Thêm các thuộc tính như kích cỡ, màu sắc để tạo biến thể
            </p>
            <Button type="button" size="sm" variant="outline" onClick={addAttribute}>
              <Plus className="h-4 w-4 mr-1" />
              Thêm thuộc tính
            </Button>
          </div>

          {attributes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Chưa có thuộc tính nào</div>
          ) : (
            attributes.map((attr, attrIdx) => (
              <div key={attrIdx} className="p-4 border-2 border-border rounded-xl space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Field name</label>
                    <input
                      type="text"
                      value={attr.fieldName}
                      onChange={(e) => updateAttribute(attrIdx, 'fieldName', e.target.value)}
                      placeholder="vd: size, color"
                      className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Tên hiển thị</label>
                    <input
                      type="text"
                      value={attr.name}
                      onChange={(e) => updateAttribute(attrIdx, 'name', e.target.value)}
                      placeholder="vd: Kích cỡ"
                      className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeAttribute(attrIdx)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Giá trị</label>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => addAttributeValue(attrIdx)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  {attr.values.map((val, valIdx) => (
                    <div key={valIdx} className="flex gap-2">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => updateAttributeValue(attrIdx, valIdx, e.target.value)}
                        placeholder="Giá trị (vd: S, M, L)"
                        className="flex-1 px-3 py-1 border border-border rounded-lg bg-background focus:outline-none focus:border-primary text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeAttributeValue(attrIdx, valIdx)}
                        className="p-1 hover:bg-destructive/10 rounded text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {attr.values.length === 0 && (
                    <p className="text-sm text-muted-foreground">Chưa có giá trị nào</p>
                  )}
                </div>
              </div>
            ))
          )}

          {attributes.length > 0 && (
            <Button type="button" onClick={onGenerateVariants} variant="outline" className="w-full">
              Tạo biến thể từ thuộc tính
            </Button>
          )}
        </div>
      )}
    </section>
  )
}

// ============ Variants Section ============
interface VariantInput {
  id?: number
  sku: string
  image: string
  price: number
  originalPrice?: number
  stock: number
  options: Record<string, string>
}

interface VariantsSectionProps {
  expanded: boolean
  onToggle: () => void
  variants: VariantInput[]
  setVariants: (variants: VariantInput[]) => void
  productId?: number
  attributesLength: number
  errors: Record<string, string>
  setErrors: (errors: Record<string, string>) => void
}

export function VariantsSection({
  expanded,
  onToggle,
  variants,
  setVariants,
  productId,
  attributesLength,
  errors,
  setErrors,
}: VariantsSectionProps) {
  const updateVariant = (index: number, field: keyof VariantInput, value: any) => {
    const newVars = [...variants]
    newVars[index] = { ...newVars[index], [field]: value }
    setVariants(newVars)

    if (errors[`variant-${index}-${field}`]) {
      const newErrors = { ...errors }
      delete newErrors[`variant-${index}-${field}`]
      setErrors(newErrors)
    }
  }

  if (variants.length === 0) return null

  return (
    <section className="border-2 border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">Biến thể</h3>
          <span className="text-sm text-muted-foreground">({variants.length} biến thể)</span>
        </div>
        {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {expanded && (
        <div className="p-4 space-y-3">
          <div className="text-sm text-muted-foreground">
            {!productId && attributesLength >= 2 ? (
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Biến thể đã được tự động tạo dựa trên thuộc tính</span>
              </div>
            ) : (
              <span>Các biến thể sẽ tự động được tạo dựa trên thuộc tính</span>
            )}
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {variants.map((variant, idx) => (
              <div key={idx} className="p-4 border-2 border-border rounded-xl space-y-3">
                <div className="font-medium text-sm text-muted-foreground">
                  {Object.entries(variant.options)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ')}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">SKU</label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateVariant(idx, 'sku', e.target.value)}
                      className={`w-full px-3 py-2 border-2 rounded-lg bg-background focus:outline-none transition-colors ${
                        errors[`variant-${idx}-sku`]
                          ? 'border-destructive'
                          : 'border-border focus:border-primary'
                      }`}
                    />
                    {errors[`variant-${idx}-sku`] && (
                      <p className="text-xs text-destructive mt-1">
                        {errors[`variant-${idx}-sku`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Giá bán ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={variant.price}
                      onChange={(e) => updateVariant(idx, 'price', Number(e.target.value))}
                      className={`w-full px-3 py-2 border-2 rounded-lg bg-background focus:outline-none transition-colors ${
                        errors[`variant-${idx}-price`]
                          ? 'border-destructive'
                          : 'border-border focus:border-primary'
                      }`}
                    />
                    {errors[`variant-${idx}-price`] && (
                      <p className="text-xs text-destructive mt-1">
                        {errors[`variant-${idx}-price`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Giá gốc ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={variant.originalPrice || ''}
                      onChange={(e) => updateVariant(idx, 'originalPrice', Number(e.target.value))}
                      placeholder="Tùy chọn"
                      className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tồn kho</label>
                    <input
                      type="number"
                      min="0"
                      value={variant.stock}
                      onChange={(e) => updateVariant(idx, 'stock', Number(e.target.value))}
                      className={`w-full px-3 py-2 border-2 rounded-lg bg-background focus:outline-none transition-colors ${
                        errors[`variant-${idx}-stock`]
                          ? 'border-destructive'
                          : 'border-border focus:border-primary'
                      }`}
                    />
                    {errors[`variant-${idx}-stock`] && (
                      <p className="text-xs text-destructive mt-1">
                        {errors[`variant-${idx}-stock`]}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Ảnh biến thể</label>
                    <div className="border-2 border-border rounded-lg p-3 bg-muted/30">
                      <div className="flex flex-col gap-3">
                        <MultiImageUploader
                          values={variant.image ? [variant.image] : []}
                          onChange={(urls) => updateVariant(idx, 'image', urls[0] || '')}
                          label=""
                          maxImages={1}
                        />
                      </div>
                    </div>
                    {errors[`variant-${idx}-image`] && (
                      <p className="text-xs text-destructive mt-1">
                        {errors[`variant-${idx}-image`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
