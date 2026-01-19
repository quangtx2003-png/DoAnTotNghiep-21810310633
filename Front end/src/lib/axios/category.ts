// services/category.ts
import axiosInstance from '@/lib/axios/instance'
import type { Category } from '@/types/product'

export async function getCategories(params?: {
  keyword?: string
  page?: number
  limit?: number
}): Promise<Category[]> {
  try {
    const { data } = await axiosInstance.get<any>('/category/list', {
      params: {
        keyword: params?.keyword,
        page: params?.page || 1,
        limit: params?.limit || 100,
      },
    })

    if (data.code === 200 && data.result?.items) {
      return data.result.items
    }
    return []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function createCategory(category: Partial<Category>) {
  const { data } = await axiosInstance.post('/category/update', category)
  return data
}

export async function updateCategory(id: number, category: Partial<Category>) {
  const { data } = await axiosInstance.post('/category/update', {
    ...category,
    id,
  })
  return data
}

export async function deleteCategory(id: number) {
  const { data } = await axiosInstance.delete<any>(`/category/${id}`)
  return data
}
