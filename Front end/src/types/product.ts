export interface AttributeValue {
  id: number
  attributeId: number
  value: string
}

export interface ProductAttribute {
  id?: number
  productId: number
  fieldName: string
  name: string
  createdAt?: string
  updatedAt?: string
  options: AttributeValue[]
}

export interface ProductVariant {
  id?: number
  productId: number
  productName?: string
  sku: string
  image: string
  price: number
  originalPrice?: number
  stock: number
  attributeValueIds: number[]
  options?: Record<string, string>
  createdAt?: string
  updatedAt?: string
}

export interface Product {
  id: number
  name: string
  description: string
  categoryId: number
  categoryName?: string
  avgRating: number
  image: string
  thumbnail: string
  active: number
  minPrice: number
  maxPrice: number
  originalMinPrice?: number
  originalMaxPrice?: number
}

export interface ProductDetail extends Product {
  attributes: ProductAttribute[]
  variants: ProductVariant[]
}

export interface ProductListResponse {
  total: number
  page: number
  items: Product[]
}

export interface ProductDetailListResponse {
  total: number
  page: number
  items: ProductDetail[]
}

export interface GetProductsRequest {
  keyword?: string
  categoryId?: number
  active?: number
  priceFrom?: number
  priceTo?: number
  avgRatingFrom?: number
  avgRatingTo?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  page?: number
  limit?: number
  ids?: number[]
}

export interface GetProductDetailRequest {
  id: number | string
}

export interface ProductFormData {
  id?: number
  name: string
  description: string
  categoryId: number
  image: string
  thumbnail: string
  active: number
}

export interface Category {
  id: number
  name: string
  description?: string
}
