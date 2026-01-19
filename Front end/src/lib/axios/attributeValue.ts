// services/attributeValue.ts
import axiosInstance from '@/lib/axios/instance'
import type { AttributeValue } from '@/types/product'

export async function getAttributeValuesByAttribute(
  attributeId: number
): Promise<AttributeValue[]> {
  try {
    const { data } = await axiosInstance.get<any>(`/attributeValue/byAttribute/${attributeId}`)
    if (data.code === 200 && data.result) {
      return data.result
    }
    return []
  } catch (error) {
    console.error('Error fetching attribute values:', error)
    return []
  }
}

export async function createAttributeValue(value: AttributeValue) {
  const { data } = await axiosInstance.post('/attributeValue/update', value)
  return data
}
