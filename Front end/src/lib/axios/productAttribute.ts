// services/productAttribute.ts
import axiosInstance from '@/lib/axios/instance'
import type { ProductAttribute } from '@/types/product'

export async function getProductAttributesByProduct(
  productId: number
): Promise<ProductAttribute[]> {
  try {
    const { data } = await axiosInstance.get<any>(`/productAttribute/byProduct/${productId}`)
    if (data.code === 200 && data.result) {
      return data.result
    }
    return []
  } catch (error) {
    console.error('Error fetching product attributes:', error)
    return []
  }
}

export async function createProductAttribute(attribute: ProductAttribute) {
  const { data } = await axiosInstance.post('/productAttribute/update', attribute)
  return data
}

export async function updateProductAttribute(attribute: ProductAttribute) {
  const { data } = await axiosInstance.post('/productAttribute/update', attribute)
  return data
}

export async function deleteProductAttribute(id: number) {
  const { data } = await axiosInstance.delete(`/productAttribute/${id}`)
  return data
}
