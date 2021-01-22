import { API_BASE } from '@/service/service'

export const MB_TOKEN_KEY = 'mb.auth'

export const getToken = () => {
  return localStorage.getItem(MB_TOKEN_KEY)
}

export const setToken = (token) => {
  localStorage.setItem(MB_TOKEN_KEY, token)
}

export const clearToken = () => {
  localStorage.removeItem(MB_TOKEN_KEY)
}

export const generateImgSrc = (imgPath) => {
  return `${API_BASE}${imgPath}`
}
