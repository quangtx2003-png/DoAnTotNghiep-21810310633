import axiosInstance from '@/lib/axios/instance'
import type {
  ProductDetail,
  ProductDetailListResponse,
  ProductListResponse,
  GetProductsRequest,
  Product,
  Category,
  ProductAttribute,
  ProductVariant,
  AttributeValue,
} from '@/types/product'

export async function getProducts(params: GetProductsRequest = {}) {
  try {
    const { data } = await axiosInstance.get<any>('/product/list', {
      params: {
        keyword: params.keyword,
        categoryId: params.categoryId,
        active: params.active,
        page: params.page ?? 1,
        limit: params.limit ?? 12,
      },
    })

    if (data.code === 200 && data.result) {
      return data.result as ProductListResponse
    }
    return { total: 0, page: 1, items: [] }
  } catch (error) {
    console.error('[v0] Error fetching products:', error)
    return { total: 0, page: 1, items: [] }
  }
}

export async function getProductDetail(id: number | string) {
  try {
    const { data } = await axiosInstance.get<any>(`/product/detail/${id}`)

    if (data.code === 200 && data.result) {
      return data.result as ProductDetail
    }
    return null
  } catch (error) {
    console.error('Error fetching product detail:', error)
    return null
  }
}

export async function getProductsDetailList(params: {
  keyword?: string
  categoryId?: number
  priceFrom?: number
  priceTo?: number
  avgRatingFrom?: number
  avgRatingTo?: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  page?: number
  limit?: number
  ids?: number[]
}) {
  try {
    const { data } = await axiosInstance.get<any>('/product/list-detail', {
      params: {
        keyword: params.keyword,
        categoryId: params.categoryId,
        priceFrom: params.priceFrom,
        priceTo: params.priceTo,
        avgRatingFrom: params.avgRatingFrom,
        avgRatingTo: params.avgRatingTo,
        sortBy: params.sortBy,
        sortDir: params.sortDir,
        page: params.page ?? 1,
        limit: params.limit ?? 12,
        ids: params.ids ? params.ids.join(',') : undefined,
      },
    })

    if (data.code === 200 && data.result) {
      return data.result as ProductDetailListResponse
    }
    return { total: 0, page: 1, items: [] }
  } catch (error) {
    console.error('[v0] Error fetching product details list:', error)
    return { total: 0, page: 1, items: [] }
  }
}

// Product APIs
export async function createProduct(product: Partial<Product>) {
  try {
    const { data } = await axiosInstance.post<any>('/product/update', product)
    if (data.code === 200) {
      return data.result as Product
    }
    throw new Error(data.message || 'Failed to create product')
  } catch (error: any) {
    console.error('Error creating product:', error)
    throw error
  }
}

export async function updateProduct(product: Partial<Product>) {
  try {
    const { data } = await axiosInstance.post<any>('/product/update', product)
    if (data.code === 200) {
      return data.result as Product
    }
    throw new Error(data.message || 'Failed to update product')
  } catch (error: any) {
    console.error('Error updating product:', error)
    throw error
  }
}

export async function deleteProduct(id: number) {
  try {
    const { data } = await axiosInstance.delete<any>(`/product/${id}`)
    return data
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

// Get product detail for editing
export async function getProductForEdit(id: number): Promise<ProductDetail | null> {
  try {
    const { data } = await axiosInstance.get<any>(`/product/detail/${id}`)
    if (data.code === 200 && data.result) {
      return data.result as ProductDetail
    }
    return null
  } catch (error) {
    console.error('Error fetching product for edit:', error)
    return null
  }
}

export async function createProductAttribute(
  attribute: Omit<ProductAttribute, 'id' | 'createdAt'>
): Promise<any> {
  try {
    const { data } = await axiosInstance.post('/productAttribute/update', attribute)
    if (data.code === 200) {
      return data
    }
    throw new Error(data.message || 'Có lỗi xảy ra khi tạo thuộc tính')
  } catch (error) {
    console.error('Error creating product attribute:', error)
    throw error
  }
}

export async function deleteProductAttribute(id: number): Promise<void> {
  try {
    const { data } = await axiosInstance.delete(`/productAttribute/${id}`)
    if (data.code !== 200) {
      throw new Error(data.message || 'Có lỗi xảy ra khi xóa thuộc tính')
    }
  } catch (error) {
    console.error('Error deleting product attribute:', error)
    throw error
  }
}

export async function deleteProductAttributesByProduct(productId: number): Promise<void> {
  try {
    const attributes = await getProductAttributesByProduct(productId)
    for (const attr of attributes) {
      if (attr.id) {
        await deleteProductAttribute(attr.id)
      }
    }
  } catch (error) {
    console.error('Error deleting product attributes:', error)
    throw error
  }
}

// Product Variant API
export async function getProductVariantsByProduct(productId: number): Promise<ProductVariant[]> {
  try {
    const { data } = await axiosInstance.get(`/productVariant/byProduct/${productId}`)
    if (data.code === 200 && data.result) {
      return data.result
    }
    return []
  } catch (error) {
    console.error('Error fetching product variants:', error)
    return []
  }
}

export async function createProductVariant(variant: ProductVariant): Promise<any> {
  try {
    const { data } = await axiosInstance.post('/productVariant/update', variant)
    if (data.code === 200) {
      return data
    }
    throw new Error(data.message || 'Có lỗi xảy ra khi tạo biến thể')
  } catch (error) {
    console.error('Error creating product variant:', error)
    throw error
  }
}

export async function deleteProductVariant(id: number): Promise<void> {
  try {
    const { data } = await axiosInstance.delete(`/productVariant/${id}`)
    if (data.code !== 200) {
      throw new Error(data.message || 'Có lỗi xảy ra khi xóa biến thể')
    }
  } catch (error) {
    console.error('Error deleting product variant:', error)
    throw error
  }
}

export async function deleteProductVariantsByProduct(productId: number): Promise<void> {
  try {
    const variants = await getProductVariantsByProduct(productId)
    for (const variant of variants) {
      if (variant.id) {
        await deleteProductVariant(variant.id)
      }
    }
  } catch (error) {
    console.error('Error deleting product variants:', error)
    throw error
  }
}

export async function getProductAttributesByProduct(
  productId: number
): Promise<ProductAttribute[]> {
  try {
    const { data } = await axiosInstance.get(`/productAttribute/byProduct/${productId}`)
    if (data.code === 200 && data.result) {
      return data.result
    }
    return []
  } catch (error) {
    console.error('Error fetching product attributes:', error)
    return []
  }
}

export async function createProductAttributeWithValues(attribute: {
  productId: number
  fieldName: string
  name: string
  values: string[]
}): Promise<ProductAttribute> {
  try {
    // Tạo attribute trước
    const attributeData = {
      productId: attribute.productId,
      fieldName: attribute.fieldName,
      name: attribute.name,
    }

    const { data } = await axiosInstance.post('/productAttribute/update', attributeData)
    if (data.code === 200 && data.result) {
      const createdAttribute = data.result
      const attributeId = createdAttribute.id

      // Tạo các giá trị cho attribute
      const valuesWithIds: AttributeValue[] = []

      for (const value of attribute.values) {
        try {
          const valueData = {
            attributeId,
            value,
          }
          const valueResponse = await axiosInstance.post('/attributeValue/update', valueData)
          if (valueResponse.data.code === 200) {
            valuesWithIds.push({
              id: valueResponse.data.result?.id || 0,
              value,
              attributeId,
            })
          }
        } catch (error) {
          console.error('Error creating attribute value:', error)
        }
      }

      return {
        ...createdAttribute,
        options: valuesWithIds,
      }
    }
    throw new Error(data.message || 'Có lỗi xảy ra khi tạo thuộc tính')
  } catch (error) {
    console.error('Error creating product attribute:', error)
    throw error
  }
}

export async function getVariantsByIds(ids: number[]): Promise<ProductVariant[]> {
  try {
    if (ids.length === 0) return []

    const { data } = await axiosInstance.get<any>('/productVariant/detailByIds', {
      params: { ids: ids.join(',') },
      paramsSerializer: {
        indexes: null, // important for array params
      },
    })

    if (data.code === 200 && data.result) {
      return data.result as ProductVariant[]
    }
    return []
  } catch (error) {
    console.error('Error fetching variants by ids:', error)
    return []
  }
}
