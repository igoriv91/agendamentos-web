import axios from 'axios'

export class ApiError extends Error {
  constructor(
    message: string,
    public code?: number,
    public statusCode?: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const code = error.response?.data?.code
      const message = error.response?.data?.message ?? 'Erro desconhecido'
      if (error.response?.status === 401) {
        sessionStorage.removeItem('token')
        window.location.href = '/'
      }
      throw new ApiError(message, code, error.response?.status)
    }
    throw error
  },
)
