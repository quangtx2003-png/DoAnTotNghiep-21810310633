import axiosInstance from '@/lib/axios/instance'
import type {
  GetMeApiResponse,
  User,
  UserDetailsApiRequest,
  UserDetailsApiResponse,
  UserListApiRequest,
  UserListApiResponse,
} from '@/types/user'

export const getInfiniteUsers = async (filters: UserListApiRequest) => {
  const response = await axiosInstance.get<UserListApiResponse>('/user/list', {
    params: {
      keyword: filters.keyword,
      status: filters.status,
      sortBy: filters.sortBy,
      sortDir: filters.sortDir,
      page: filters.paging?.page,
      limit: filters.paging?.limit,
    },
  })

  return response.data.result
}

export const getUserDetails = async (params: UserDetailsApiRequest) => {
  const response = await axiosInstance.get<UserDetailsApiResponse>(`/user/details/${params.id}`)

  return response.data.result
}

export const getMe = async (): Promise<GetMeApiResponse['result']> => {
  const response = await axiosInstance.get<GetMeApiResponse>('/authenticate/me')
  return response.data.result
}

export const updateUser = async (user: Partial<User>) => {
  const response = await axiosInstance.post<{
    code: number
    message: string
    result: User
  }>('/me/update', {
    name: user.name,
    phone: user.phone,
  })

  return response.data.result
}

interface GetUsersParams {
  keyword?: string
  page?: number
  limit?: number
}

interface UserListResponse {
  total: number
  page: number
  items: User[]
}

export async function getUsers(params?: GetUsersParams): Promise<UserListResponse> {
  try {
    const { data } = await axiosInstance.get<{
      code: number
      message: string
      result: UserListResponse
    }>('/user/list', {
      params: {
        keyword: params?.keyword,
        page: params?.page || 1,
        limit: params?.limit || 10,
      },
    })

    if (data.code === 200 && data.result) {
      return data.result
    }
    return { total: 0, page: 1, items: [] }
  } catch (error) {
    console.error('Error fetching users:', error)
    return { total: 0, page: 1, items: [] }
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const { data } = await axiosInstance.get<{
      code: number
      message: string
      result: User
    }>(`/user/${id}`)

    if (data.code === 200 && data.result) {
      return data.result
    }
    return null
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function updateUserBasicInfo(id: number, userData: Partial<User>) {
  const { data } = await axiosInstance.post('/me/update', {
    name: userData.name,
    phone: userData.phone,
  })
  return data
}

export async function setUserActive(id: number, active: boolean) {
  const { data } = await axiosInstance.post(`/user/${id}/active`, null, {
    params: { active },
  })
  return data
}

export async function deleteUser(id: number) {
  const { data } = await axiosInstance.delete<{
    code: number
    message: string
    result: string
  }>(`/user/${id}`)
  return data
}
