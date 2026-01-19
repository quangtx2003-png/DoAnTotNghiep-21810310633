import type { Paging, SortDirection } from '@/types/page'

export type UserSortField = 'id' | 'email' | 'name' | 'active' | 'role'

export interface User {
  id: number
  name: string
  email: string
  phone: string | null
  password?: string
  plainPassword?: string
  role: string
  active: boolean
}

export interface UserListResponse {
  total: number
  page: number
  items: User[]
}

export interface UserListApiRequest {
  keyword?: string
  status?: number
  sortBy?: UserSortField
  sortDir?: SortDirection
  paging?: Paging
}

export interface UserListApiResponse {
  code: number
  message: string
  result: UserListResponse
}

export interface UserDetailsApiRequest {
  id: string | number
}

export interface UserDetailsApiResponse {
  code: number
  message: string
  result: User
}

export interface GetMeApiResponse {
  code: number
  message: string
  result: User
}
