export interface LoginApiRequest {
  email: string
  plainPassword: string
}

export interface LoginResponse {
  token: string
}

export interface LoginApiResponse {
  code: number
  message: string
  result: LoginResponse
}

export interface SignupApiRequest {
  email: string
  plainPassword: string
  name: string
}

export interface SignupResponse {
  placeholder: any
}

export interface SignupApiResponse {
  code: number
  message: string
  result: SignupResponse
}
