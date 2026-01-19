import axiosInstance from '@/lib/axios/instance'
import type {
  LoginApiRequest,
  LoginApiResponse,
  SignupApiRequest,
  SignupApiResponse,
} from '@/types/auth'

export const login = async ({ email, plainPassword }: LoginApiRequest) => {
  const response = await axiosInstance.post<LoginApiResponse>('/authenticate/login', {
    email,
    plainPassword,
  })
  return response.data.result
}

export const signup = async ({ email, plainPassword, name }: SignupApiRequest) => {
  const response = await axiosInstance.post<SignupApiResponse>('/authenticate/register', {
    email,
    plainPassword,
    name,
  })
  return response.data.result
}

export const changePassword = async (oldPassword: string, newPassword: string) => {
  const response = await axiosInstance.post<{
    code: number
    message: string
    result: any
  }>('/authenticate/change-password', {
    oldPassword,
    newPassword,
  })
  return response.data.result
}
